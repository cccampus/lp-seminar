/**
 * Zoom ライブチャット リスナー（WebSocket イベント配信）
 *
 * セミナー中の「ミーティング内チャット」をリアルタイムで受け取り、
 *   - ターミナルに1行ずつ表示
 *   - ~/Desktop/zoom-chat-YYYYMMDD.jsonl に追記（CC が読んで分析する用）
 * する常駐スクリプト。公開サーバー不要（こちらから wss://ws.zoom.us に繋ぐ）。
 *
 * 仕組み:
 *   Zoom App「cc-seminar-meeting-bot」の Event Subscription (WebSocket) で
 *   "In-meeting chat message received" (meeting.chat_message_sent) を購読 →
 *   このスクリプトが wss に接続してイベントを受信。
 *
 * 必要な ENV（.env.local に追記。Bun が自動ロード）:
 *   ZOOM_ACCOUNT_ID         （既存・S2S 認証）
 *   ZOOM_CLIENT_ID          （既存）
 *   ZOOM_CLIENT_SECRET      （既存）
 *   ZOOM_WS_SUBSCRIPTION_ID （★今回追加。Event Subscription 保存後に出る ID）
 *
 * 任意:
 *   ZOOM_WS_RAW=1   初回テスト用。受信ペイロードを丸ごと表示（本文の場所を確認するため）
 *
 * 使い方:
 *   セミナー開始前に →  bun scripts/zoom-chat-listener.ts
 *   止める時        →  Ctrl+C
 *
 * 注意: access_token は約1時間で失効するので、切断/失効時に自動で取り直して再接続する。
 */

import { getZoomAccessToken } from "../lib/zoom";
import { appendFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const SUBSCRIPTION_ID = process.env.ZOOM_WS_SUBSCRIPTION_ID;
const RAW_DUMP = process.env.ZOOM_WS_RAW === "1";
const WS_BASE = "wss://ws.zoom.us/ws";
const HEARTBEAT_MS = 30_000;
// access_token 失効前に張り替える（トークンは約1時間有効）
const RECONNECT_MS = 50 * 60_000;

function outFile(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return join(homedir(), "Desktop", `zoom-chat-${ymd}.jsonl`);
}

function ts(): string {
  return new Date().toLocaleTimeString("ja-JP", { hour12: false });
}

/** 受信した生メッセージから chat イベントらしきものを取り出す（envelope の形は実機で確定する） */
function tryExtractChat(raw: string):
  | { sender: string; text: string; meetingId?: string | number; at?: string }
  | null {
  let env: unknown;
  try {
    env = JSON.parse(raw);
  } catch {
    return null;
  }
  // Zoom WebSocket は {module, content} 形式のことがある。content が文字列ならもう一段パース
  const layers: unknown[] = [env];
  const top = env as Record<string, unknown>;
  if (top && typeof top.content === "string") {
    try {
      layers.push(JSON.parse(top.content));
    } catch {
      /* noop */
    }
  }
  for (const layer of layers) {
    const o = layer as Record<string, any>;
    if (!o) continue;
    const event: string | undefined = o.event;
    if (event && !String(event).includes("chat_message")) continue;
    const payload = o.payload ?? o;
    const obj = payload?.object ?? payload;
    // 想定されるフィールド名のゆれを総当たり（実機で確定したら絞る）
    const msg =
      obj?.chat_message ?? obj?.message ?? payload?.chat_message ?? null;
    const text: string | undefined =
      (typeof msg === "string" ? msg : msg?.message) ??
      obj?.message_content ??
      obj?.text;
    const sender: string | undefined =
      msg?.sender_name ??
      msg?.sender ??
      obj?.sender_name ??
      obj?.operator ??
      obj?.participant?.user_name ??
      "（不明）";
    if (text) {
      return {
        sender: String(sender),
        text: String(text),
        meetingId: obj?.id ?? obj?.meeting_id ?? payload?.object?.id,
        at: msg?.date_time ?? obj?.date_time,
      };
    }
  }
  return null;
}

let ws: WebSocket | null = null;
let heartbeat: ReturnType<typeof setInterval> | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let closingForRefresh = false;

async function connect(): Promise<void> {
  if (!SUBSCRIPTION_ID) {
    console.error(
      "❌ ZOOM_WS_SUBSCRIPTION_ID が未設定。Zoom App の Event Subscription を保存して出た ID を .env.local に入れてください。",
    );
    process.exit(1);
  }

  const token = await getZoomAccessToken();
  const url = `${WS_BASE}?subscriptionId=${encodeURIComponent(SUBSCRIPTION_ID)}&access_token=${encodeURIComponent(token)}`;

  console.log(`[${ts()}] 接続中… (subscription=${SUBSCRIPTION_ID})`);
  ws = new WebSocket(url);
  closingForRefresh = false;

  ws.addEventListener("open", () => {
    console.log(`[${ts()}] ✅ 接続成功。チャット待受中。出力先: ${outFile()}`);
    heartbeat = setInterval(() => {
      try {
        ws?.send(JSON.stringify({ module: "heartbeat" }));
      } catch {
        /* noop */
      }
    }, HEARTBEAT_MS);

    // トークン失効前に張り替え
    reconnectTimer = setTimeout(() => {
      console.log(`[${ts()}] 🔄 トークン更新のため再接続`);
      closingForRefresh = true;
      ws?.close();
    }, RECONNECT_MS);
  });

  ws.addEventListener("message", (ev: MessageEvent) => {
    const raw = typeof ev.data === "string" ? ev.data : String(ev.data);
    // ハートビート応答などは無視（chat 以外は RAW_DUMP の時だけ見せる）
    if (RAW_DUMP) {
      console.log(`[${ts()}] RAW: ${raw}`);
    }
    const chat = tryExtractChat(raw);
    if (chat) {
      // 表示
      console.log(`[${ts()}] 💬 ${chat.sender}: ${chat.text}`);
      // 追記（生イベントも保持して取りこぼしゼロに）
      const line = JSON.stringify({
        received_at: new Date().toISOString(),
        sender: chat.sender,
        text: chat.text,
        meeting_id: chat.meetingId,
        zoom_time: chat.at,
        raw: RAW_DUMP ? undefined : raw,
      });
      appendFileSync(outFile(), line + "\n");
    }
  });

  ws.addEventListener("close", () => {
    if (heartbeat) clearInterval(heartbeat);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    heartbeat = null;
    reconnectTimer = null;
    const delay = closingForRefresh ? 500 : 3000;
    console.log(`[${ts()}] 切断。${delay}ms 後に再接続…`);
    setTimeout(() => connect().catch((e) => console.error("再接続失敗:", e)), delay);
  });

  ws.addEventListener("error", (e) => {
    console.error(`[${ts()}] WebSocket エラー:`, (e as ErrorEvent).message ?? e);
    // close イベントが続けて発火するのでそちらで再接続
  });
}

console.log("🎥 Zoom ライブチャット リスナー起動");
if (RAW_DUMP) console.log("（RAWダンプモード: 受信内容を丸ごと表示します）");
connect().catch((e) => {
  console.error("初回接続失敗:", e);
  process.exit(1);
});
