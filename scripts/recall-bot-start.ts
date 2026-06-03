/**
 * Recall.ai ボットをZoom会議に参加させ、チャットを webhook へ流す
 *
 * 使い方:
 *   bun scripts/recall-bot-start.ts "<Zoom会議URL>" "<webhook URL>"
 *   例: bun scripts/recall-bot-start.ts \
 *        "https://us05web.zoom.us/j/1234567890?pwd=xxxx" \
 *        "https://xxxx.trycloudflare.com/recall-chat"
 *
 * 必要 ENV (.env.local に追記。Recall ダッシュボードで取得):
 *   RECALL_API_KEY    Recall の API キー
 *   RECALL_API_BASE   リージョン別ベースURL。ダッシュボードの Region で確認。
 *                     例: https://us-west-2.recall.ai/api/v1
 *                         https://us-east-1.recall.ai/api/v1
 *                         https://eu-central-1.recall.ai/api/v1
 * 任意 ENV:
 *   RECALL_BOT_NAME   ボット表示名（既定 "AI書記"）
 *   RECALL_AUTH       認証ヘッダ方式 "token"(既定) か "bare"。401が出たらもう片方に。
 */

const API_KEY = process.env.RECALL_API_KEY;
const API_BASE = process.env.RECALL_API_BASE;
const BOT_NAME = process.env.RECALL_BOT_NAME || "AI書記";
const AUTH = (process.env.RECALL_AUTH || "token").toLowerCase();

const meetingUrl = process.argv[2] || process.env.ZOOM_MEETING_URL;
const webhookUrl = process.argv[3] || process.env.RECALL_WEBHOOK_URL;

function die(msg: string): never {
  console.error("❌ " + msg);
  process.exit(1);
}

if (!API_KEY) die("RECALL_API_KEY 未設定（.env.local に入れて）");
if (!API_BASE) die("RECALL_API_BASE 未設定（例 https://us-west-2.recall.ai/api/v1 。ダッシュボードのRegionで確認）");
if (!meetingUrl) die('Zoom会議URLを第1引数で渡して（"https://...zoom.us/j/..."）');
if (!webhookUrl) die('webhook URLを第2引数で渡して（"https://xxxx.trycloudflare.com/recall-chat"）');

const authHeader = AUTH === "bare" ? API_KEY : `Token ${API_KEY}`;

const body = {
  meeting_url: meetingUrl,
  bot_name: BOT_NAME,
  recording_config: {
    realtime_endpoints: [
      {
        type: "webhook",
        url: webhookUrl,
        events: ["participant_events.chat_message"],
      },
    ],
  },
};

const endpoint = `${API_BASE.replace(/\/$/, "")}/bot/`;
console.log(`🤖 ボット作成: ${endpoint}`);
console.log(`   会議: ${meetingUrl}`);
console.log(`   webhook: ${webhookUrl}`);
console.log(`   bot名: ${BOT_NAME}`);

const res = await fetch(endpoint, {
  method: "POST",
  headers: { Authorization: authHeader, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const textOut = await res.text();
if (!res.ok) {
  console.error(`❌ 失敗: ${res.status}\n${textOut}`);
  if (res.status === 401) {
    console.error('   → 401。RECALL_AUTH を "bare" に変えて再実行してみて（認証ヘッダ方式の違い）');
  }
  if (res.status === 404 || res.status === 400) {
    console.error("   → RECALL_API_BASE のリージョンが違う可能性。ダッシュボードのRegionを確認");
  }
  process.exit(1);
}

let parsed: any = null;
try {
  parsed = JSON.parse(textOut);
} catch {
  /* noop */
}
console.log("✅ ボット作成成功。会議に参加します（参加者一覧に表示される）");
if (parsed?.id) console.log(`   bot id: ${parsed.id}  status: ${parsed?.status_changes?.at?.(-1)?.code ?? "(起動中)"}`);
console.log("   → 受信サーバーのターミナルにチャットが流れてくればOK");

export {};
