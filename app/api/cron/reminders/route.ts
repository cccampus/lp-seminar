import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SessionMeta = {
  label: string;
  dateText: string;
  time: string;
  zoomUrl: string;
  zoomId: string;
  zoomPw: string;
  startISO: string; // JST 開始時刻 (ISO with +09:00)
};

const SESSION_MAP: Record<string, SessionMeta> = {
  "2026-06-03": {
    label: "第1回",
    dateText: "2026年6月3日(水)",
    time: "19:00 – 21:00",
    zoomUrl: process.env.ZOOM_URL_20260603 || "",
    zoomId: process.env.ZOOM_ID_20260603 || "",
    zoomPw: process.env.ZOOM_PW_20260603 || "",
    startISO: "2026-06-03T19:00:00+09:00",
  },
  "2026-06-14": {
    label: "第2回",
    dateText: "2026年6月14日(日)",
    time: "11:00 – 13:00",
    zoomUrl: process.env.ZOOM_URL_20260614 || "",
    zoomId: process.env.ZOOM_ID_20260614 || "",
    zoomPw: process.env.ZOOM_PW_20260614 || "",
    startISO: "2026-06-14T11:00:00+09:00",
  },
  "2026-07-08": {
    label: "第3回",
    dateText: "2026年7月8日(水)",
    time: "19:00 – 21:00",
    zoomUrl: process.env.ZOOM_URL_20260708 || "",
    zoomId: process.env.ZOOM_ID_20260708 || "",
    zoomPw: process.env.ZOOM_PW_20260708 || "",
    startISO: "2026-07-08T19:00:00+09:00",
  },
};

const CONTACT_FROM = process.env.CONTACT_FROM || "noreply@isshin-ai.co.jp";
const CONTACT_TO = process.env.CONTACT_TO || "noreply@isshin-gym.co.jp";

function buildBody(meta: SessionMeta, type: "24h" | "1h"): { subject: string; html: string } {
  const zoomBlock = `
    <table style="border-collapse:collapse;margin-top:16px;background:#faf9f5;padding:12px 16px;border-radius:6px;">
      <tr><td style="font-family:monospace;font-size:13px;color:#373737;padding:4px 12px 4px 0;">Zoom URL</td><td style="font-size:14px;"><a href="${meta.zoomUrl}" style="color:#d97757;">${meta.zoomUrl}</a></td></tr>
      <tr><td style="font-family:monospace;font-size:13px;color:#373737;padding:4px 12px 4px 0;">ミーティングID</td><td style="font-size:14px;">${meta.zoomId}</td></tr>
      <tr><td style="font-family:monospace;font-size:13px;color:#373737;padding:4px 12px 4px 0;">パスコード</td><td style="font-size:14px;">${meta.zoomPw}</td></tr>
    </table>`;

  if (type === "24h") {
    return {
      subject: `【明日開催】Claude Code 実践セミナー (${meta.label})`,
      html: `
        <div style="font-family:'Hiragino Sans',sans-serif;line-height:1.8;color:#373737;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="font-size:20px;color:#373737;margin:0 0 16px;">明日 ${meta.dateText} ${meta.time} 開催です</h2>
          <p>Claude Code 実践セミナーへのお申込み、ありがとうございます。</p>
          <p>いよいよ明日開催となります。お時間になりましたら下記URLからZoom入室してください。</p>
          ${zoomBlock}
          <h3 style="font-size:16px;color:#373737;margin:24px 0 8px;">事前準備</h3>
          <ul style="padding-left:20px;">
            <li>PC・タブレット (音声と画面共有が見られる環境)</li>
            <li>安定したネット環境</li>
            <li>イヤホン推奨</li>
          </ul>
          <p style="margin-top:24px;">当日お会いできるのを楽しみにしております。</p>
          <p style="font-size:13px;color:#888;margin-top:24px;">陳紀洋 / Claude Code Campus<br/>株式会社ISSHIN</p>
        </div>`,
    };
  }
  return {
    subject: `【まもなく開催】Claude Code 実践セミナー (${meta.label})`,
    html: `
      <div style="font-family:'Hiragino Sans',sans-serif;line-height:1.8;color:#373737;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="font-size:20px;color:#373737;margin:0 0 16px;">まもなく開始です (${meta.time.split(" ")[0]} 開始)</h2>
        <p>下記URLからZoom入室してください。</p>
        ${zoomBlock}
        <p style="margin-top:16px;">直前のご準備、ありがとうございます。会場でお会いしましょう。</p>
        <p style="font-size:13px;color:#888;margin-top:24px;">陳紀洋 / Claude Code Campus<br/>株式会社ISSHIN</p>
      </div>`,
  };
}

export async function GET(request: Request) {
  // Verify Vercel Cron (Bearer CRON_SECRET) or allow manual trigger with same secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!stripeKey || !resendKey) {
    return NextResponse.json({ error: "config missing" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2026-04-22.dahlia",
  });
  const resend = new Resend(resendKey);

  const now = Date.now();
  const summary: { reminder_24h: number; reminder_1h: number; errors: string[] } = {
    reminder_24h: 0,
    reminder_1h: 0,
    errors: [],
  };

  // 直近35日に作成された Checkout Sessions を取得 (最大100件)
  const lookbackSec = Math.floor(now / 1000) - 35 * 24 * 60 * 60;
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    created: { gte: lookbackSec },
  });

  for (const session of sessions.data) {
    if (session.payment_status !== "paid") continue;
    if (!session.customer_email) continue;

    const sessionDate = session.metadata?.sessionDate;
    if (!sessionDate) continue;

    const meta = SESSION_MAP[sessionDate];
    if (!meta) continue;

    const startMs = new Date(meta.startISO).getTime();
    const hoursUntilStart = (startMs - now) / (1000 * 60 * 60);

    // 24時間前リマインダー (23-26時間前 window で送信)
    if (
      hoursUntilStart >= 23 &&
      hoursUntilStart <= 26 &&
      session.metadata?.reminder_24h_sent !== "true"
    ) {
      try {
        const body = buildBody(meta, "24h");
        await resend.emails.send({
          from: CONTACT_FROM,
          to: session.customer_email,
          subject: body.subject,
          html: body.html,
        });
        await stripe.checkout.sessions.update(session.id, {
          metadata: { ...session.metadata, reminder_24h_sent: "true" },
        });
        summary.reminder_24h++;
      } catch (e) {
        summary.errors.push(
          `24h send failed for ${session.id}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }

    // 1時間前リマインダー (0.5-1.5時間前 window で送信)
    if (
      hoursUntilStart >= 0.5 &&
      hoursUntilStart <= 1.5 &&
      session.metadata?.reminder_1h_sent !== "true"
    ) {
      try {
        const body = buildBody(meta, "1h");
        await resend.emails.send({
          from: CONTACT_FROM,
          to: session.customer_email,
          subject: body.subject,
          html: body.html,
        });
        await stripe.checkout.sessions.update(session.id, {
          metadata: { ...session.metadata, reminder_1h_sent: "true" },
        });
        summary.reminder_1h++;
      } catch (e) {
        summary.errors.push(
          `1h send failed for ${session.id}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }

  // 管理者向け実行ログ (送信があった時のみ)
  if (summary.reminder_24h > 0 || summary.reminder_1h > 0 || summary.errors.length > 0) {
    try {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        subject: `[cron] reminders sent: 24h=${summary.reminder_24h} / 1h=${summary.reminder_1h}`,
        text: JSON.stringify(summary, null, 2),
      });
    } catch {
      // 管理者通知失敗は ignore
    }
  }

  return NextResponse.json({ ok: true, ...summary });
}
