/**
 * Recall.ai チャット受信サーバー（ローカル常駐）
 *
 * Recall.ai のボットがZoom会議で受信した「参加者チャット」を webhook で受け取り、
 *   - ターミナルに1行ずつ表示
 *   - ~/Desktop/zoom-chat-YYYYMMDD.jsonl に追記（CC が読んで分析する用）
 * する。DLP不要・Zoom権限不要（ボットが見てるチャットを横流しするだけ）。
 *
 * 使い方:
 *   1. これを起動:            bun scripts/recall-chat-receiver.ts
 *   2. 別ターミナルでトンネル: cloudflared tunnel --url http://localhost:8787
 *        → 出てくる https://xxxx.trycloudflare.com を控える
 *      (cloudflared が無ければ: brew install cloudflared / または ngrok http 8787)
 *   3. ボット起動:            bun scripts/recall-bot-start.ts "<Zoom会議URL>" "https://xxxx.trycloudflare.com/recall-chat"
 *
 * ENV(任意): RECALL_RECEIVER_PORT (既定 8787)
 */

import { appendFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const PORT = Number(process.env.RECALL_RECEIVER_PORT || 8787);

function outFile(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return join(homedir(), "Desktop", `zoom-chat-${ymd}.jsonl`);
}
function ts(): string {
  return new Date().toLocaleTimeString("ja-JP", { hour12: false });
}

/**
 * Recall webhook body から chat を取り出す。
 * 実データ構造(2026-05-31 実機確認):
 *   body.data.data = { action, participant{name,is_host}, timestamp{absolute}, data{text,to} }
 */
function extractChat(body: any) {
  if (!body || body.event !== "participant_events.chat_message") return null;
  const core = body?.data?.data ?? body?.data ?? {};
  const msg = core?.data ?? {};
  const text = msg?.text ?? core?.text;
  if (!text) return null;
  return {
    sender: core?.participant?.name ?? "（不明）",
    isHost: core?.participant?.is_host ?? false,
    to: msg?.to ?? "everyone",
    text: String(text),
    at: core?.timestamp?.absolute,
  };
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    if (req.method !== "POST") {
      return new Response("recall chat receiver up\n");
    }
    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return new Response("bad json", { status: 400 });
    }
    if (body?.event === "participant_events.chat_message") {
      // 本文の場所を確定するため、chatイベントは生データを必ず吐く＋保存する
      const rawLine = JSON.stringify(body);
      console.log(`[${ts()}] RAW chat: ${rawLine}`);
      appendFileSync(
        join(homedir(), "Desktop", "recall-raw.jsonl"),
        rawLine + "\n",
      );
      const chat = extractChat(body);
      if (chat) {
        console.log(
          `[${ts()}] 💬 ${chat.sender}${chat.isHost ? "(host)" : ""} → ${chat.to}: ${chat.text}`,
        );
        appendFileSync(
          outFile(),
          JSON.stringify({
            received_at: new Date().toISOString(),
            sender: chat.sender,
            is_host: chat.isHost,
            to: chat.to,
            text: chat.text,
            zoom_time: chat.at,
          }) + "\n",
        );
      }
    } else {
      console.log(`[${ts()}] (event: ${body?.event ?? "unknown"})`);
    }
    return new Response("ok");
  },
});

console.log(`🎧 Recall チャット受信サーバー起動: http://localhost:${PORT}`);
console.log(`   出力先: ${outFile()}`);
console.log(`   次: 別ターミナルで  cloudflared tunnel --url http://localhost:${PORT}`);
console.log(`       出た https URL + "/recall-chat" を recall-bot-start.ts に渡す`);
