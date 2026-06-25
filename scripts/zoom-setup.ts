/**
 * Zoom Meeting セットアップ（冪等版・Server-to-Server OAuth）
 *
 * 使い方:
 *   1. .env.local に以下を入れる:
 *        ZOOM_ACCOUNT_ID=... / ZOOM_CLIENT_ID=... / ZOOM_CLIENT_SECRET=...
 *   2. bun scripts/zoom-setup.ts
 *
 * 動作（冪等）:
 *   既存のスケジュール済 Meeting を取得して、SESSIONS の各 startISO と一致するものがあれば:
 *     - topic が違えば PATCH で更新（新Meeting作らない）
 *     - 同じなら何もしない
 *   一致が無ければ新規作成。
 *   さらに同 startISO で重複している古い Meeting（残骸）は DELETE する。
 *   最後に Vercel production env を最新値で上書き。
 *
 * 必要 Scope (Zoom Marketplace):
 *   meeting:write:meeting:admin / meeting:read:meeting:admin
 *   meeting:update:meeting:admin / meeting:delete:meeting:admin
 *
 * セミナー日程を変更したい場合は SESSIONS 配列を編集して再実行（冪等なので安全）。
 */

import { execFileSync, spawnSync } from "child_process";
import {
  createZoomMeeting,
  listZoomMeetings,
  patchZoomMeetingTopic,
  deleteZoomMeeting,
  type ZoomMeeting,
} from "../lib/zoom";

type SessionDef = {
  key: string;
  topic: string;
  startISO: string;
  durationMin: number;
};

const SESSIONS: SessionDef[] = [
  {
    key: "20260603",
    topic: "Claude Code 実践セミナー（6/3 水 19:00）",
    startISO: "2026-06-03T19:00:00",
    durationMin: 120,
  },
  {
    key: "20260614",
    topic: "Claude Code 実践セミナー（6/14 日 11:00）",
    startISO: "2026-06-14T11:00:00",
    durationMin: 120,
  },
  {
    key: "20260708",
    topic: "Claude Code 実践セミナー（7/8 水 19:00）",
    startISO: "2026-07-08T19:00:00",
    durationMin: 120,
  },
];

function setVercelEnv(key: string, value: string) {
  try {
    execFileSync("vercel", ["env", "rm", key, "production", "--yes"], { stdio: "pipe" });
  } catch {
    // 無ければ無視
  }
  const r = spawnSync("vercel", ["env", "add", key, "production"], {
    input: value,
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) throw new Error(`vercel env add ${key} failed (exit ${r.status})`);
}

// "2026-06-03T19:00:00" (JST想定) を Zoom返却の start_time (UTC ISO) に変換して比較
function startISOEqual(zoomStart: string, jstStartISO: string): boolean {
  // jstStartISO は timezone=Asia/Tokyo で投入 → Zoom側は内部UTCで保存
  // 比較は両方を Date.parse で millis 化して一致確認
  const jstAsUtc = new Date(`${jstStartISO}+09:00`).getTime();
  const zoomUtc = new Date(zoomStart).getTime();
  return jstAsUtc === zoomUtc;
}

async function ensureMeeting(
  session: SessionDef,
  existing: ZoomMeeting[],
): Promise<{ meeting: ZoomMeeting; deletedDups: number[] }> {
  const matches = existing.filter((m) => startISOEqual(m.start_time, session.startISO));

  if (matches.length === 0) {
    console.log(`  📝 新規作成: ${session.topic}`);
    const m = await createZoomMeeting({
      topic: session.topic,
      startISO: session.startISO,
      durationMin: session.durationMin,
      timezone: "Asia/Tokyo",
      agenda: "Claude Code 実践セミナー",
    });
    return { meeting: m, deletedDups: [] };
  }

  // 最初の1つを正本として再利用、残りは重複として削除
  const [primary, ...dups] = matches;
  const deletedDups: number[] = [];

  if (primary.topic !== session.topic) {
    console.log(`  ✏️  topic更新: ${primary.id}`);
    console.log(`      旧: ${primary.topic}`);
    console.log(`      新: ${session.topic}`);
    await patchZoomMeetingTopic(primary.id, session.topic);
    primary.topic = session.topic;
  } else {
    console.log(`  ✅ 既存再利用: ${primary.id} (${primary.topic})`);
  }

  for (const d of dups) {
    console.log(`  🗑️  重複削除: ${d.id} (${d.topic})`);
    await deleteZoomMeeting(d.id);
    deletedDups.push(d.id);
  }

  return { meeting: primary, deletedDups };
}

async function main() {
  if (!process.env.ZOOM_ACCOUNT_ID || !process.env.ZOOM_CLIENT_ID || !process.env.ZOOM_CLIENT_SECRET) {
    console.error("❌ Zoom credentials missing.");
    process.exit(1);
  }

  console.log("🎥 Zoom Meeting セットアップ（冪等モード）\n");

  console.log("🔍 既存のスケジュール済 Meeting を取得...");
  const existing = await listZoomMeetings();
  console.log(`   ${existing.length}件 取得\n`);

  const results: { key: string; meeting: ZoomMeeting }[] = [];

  for (const s of SESSIONS) {
    console.log(`📅 ${s.topic}`);
    console.log(`   開始: ${s.startISO} (Asia/Tokyo)`);
    const { meeting } = await ensureMeeting(s, existing);
    console.log(`   → ID: ${meeting.id} / ${meeting.join_url}\n`);
    results.push({ key: s.key, meeting });
  }

  console.log("\n📤 Vercel production env に値をセット（既存があれば上書き）...\n");
  for (const r of results) {
    setVercelEnv(`ZOOM_URL_${r.key}`, r.meeting.join_url);
    setVercelEnv(`ZOOM_ID_${r.key}`, String(r.meeting.id));
    setVercelEnv(`ZOOM_PW_${r.key}`, r.meeting.password);
  }

  console.log("\n─────────────────────────────────────");
  console.log("🎉 完了。次のステップ:");
  console.log("─────────────────────────────────────");
  console.log("  1. vercel --prod --yes で再デプロイ（env変更を反映）");
  console.log("  2. https://zoom.us/meeting で Meeting が想定通りか目視確認");
}

main().catch((e) => {
  console.error("❌ Zoom setup failed:", e);
  process.exit(1);
});
