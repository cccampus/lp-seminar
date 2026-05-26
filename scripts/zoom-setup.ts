/**
 * Zoom Meeting セットアップ（Server-to-Server OAuth）
 *
 * 使い方:
 *   1. .env.local に以下を入れる（ZoomマケプレでServer-to-Server OAuth App作成して取得）:
 *        ZOOM_ACCOUNT_ID=...
 *        ZOOM_CLIENT_ID=...
 *        ZOOM_CLIENT_SECRET=...
 *   2. bun scripts/zoom-setup.ts
 *
 * 動作:
 *   - 第1回(6/3 火 19:00) と 第2回(6/14 土 11:00) の Meeting を Zoom API で作成
 *   - URL/ID/Password を取得
 *   - Vercel production env に ZOOM_URL/ID/PW_20260603/20260614 を自動セット
 *   - 既存env があれば上書き
 *
 * セミナー日程を変更したい場合は SESSIONS 配列を編集して再実行。
 */

import { execFileSync, spawnSync } from "child_process";
import { createZoomMeeting } from "../lib/zoom";

type SessionDef = {
  key: string; // "20260603" 等。env変数のサフィックス
  topic: string;
  startISO: string; // "2026-06-03T19:00:00" (Asia/Tokyo)
  durationMin: number;
};

const SESSIONS: SessionDef[] = [
  {
    key: "20260603",
    topic: "Claude Code 実践セミナー 第1回（6/3 水 19:00）",
    startISO: "2026-06-03T19:00:00",
    durationMin: 120,
  },
  {
    key: "20260614",
    topic: "Claude Code 実践セミナー 第2回（6/14 日 11:00）",
    startISO: "2026-06-14T11:00:00",
    durationMin: 120,
  },
];

function setVercelEnv(key: string, value: string) {
  // 既存があれば一度削除（存在しなければ silent fail）
  try {
    execFileSync("vercel", ["env", "rm", key, "production", "--yes"], { stdio: "pipe" });
  } catch {
    // env が無ければエラーが返る。無視
  }
  // 追加（vercel env add は stdin で値を読む）
  const r = spawnSync("vercel", ["env", "add", key, "production"], {
    input: value,
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) {
    throw new Error(`vercel env add ${key} failed (exit ${r.status})`);
  }
}

async function main() {
  if (!process.env.ZOOM_ACCOUNT_ID || !process.env.ZOOM_CLIENT_ID || !process.env.ZOOM_CLIENT_SECRET) {
    console.error("❌ Zoom credentials missing. Set ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET in .env.local");
    process.exit(1);
  }

  console.log("🎥 Zoom Server-to-Server OAuth で Meeting を作成します\n");

  const results: { key: string; meeting: { id: number; join_url: string; password: string } }[] = [];

  for (const s of SESSIONS) {
    console.log(`📅 ${s.topic}`);
    console.log(`   開始: ${s.startISO} (Asia/Tokyo) / ${s.durationMin}分`);
    const meeting = await createZoomMeeting({
      topic: s.topic,
      startISO: s.startISO,
      durationMin: s.durationMin,
      timezone: "Asia/Tokyo",
      agenda: "Claude Code 実践セミナー",
    });
    console.log(`   ✅ Meeting ID: ${meeting.id}`);
    console.log(`      URL: ${meeting.join_url}`);
    console.log(`      Password: ${meeting.password}\n`);
    results.push({ key: s.key, meeting });
  }

  console.log("\n📤 Vercel production env に値をセットします（既存があれば上書き）...\n");

  for (const r of results) {
    setVercelEnv(`ZOOM_URL_${r.key}`, r.meeting.join_url);
    setVercelEnv(`ZOOM_ID_${r.key}`, String(r.meeting.id));
    setVercelEnv(`ZOOM_PW_${r.key}`, r.meeting.password);
  }

  console.log("\n─────────────────────────────────────");
  console.log("🎉 完了。次のステップ:");
  console.log("─────────────────────────────────────");
  console.log("  1. vercel --prod --yes で再デプロイ（env変更を反映）");
  console.log("  2. テスト申込で Zoom URL が日程別に正しく送られるか確認");
  console.log("\n登録した env 一覧:");
  for (const r of results) {
    console.log(`  ZOOM_URL_${r.key}`);
    console.log(`  ZOOM_ID_${r.key}`);
    console.log(`  ZOOM_PW_${r.key}`);
  }
}

main().catch((e) => {
  console.error("❌ Zoom setup failed:", e);
  process.exit(1);
});
