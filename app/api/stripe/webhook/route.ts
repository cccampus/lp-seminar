import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

type SessionMeta = {
  label: string;
  dateText: string;
  openText: string;
  zoomUrl: string;
  zoomId: string;
  zoomPw: string;
};

function buildSessionMap(): Record<string, SessionMeta> {
  return {
    "2026-06-03": {
      label: "第1回",
      dateText: "2026年6月3日（水）19:00〜21:00",
      openText: "開場 18:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260603 || "",
      zoomId: process.env.ZOOM_ID_20260603 || "",
      zoomPw: process.env.ZOOM_PW_20260603 || "",
    },
    "2026-06-14": {
      label: "第2回",
      dateText: "2026年6月14日（日）11:00〜13:00",
      openText: "開場 10:50（開催10分前）",
      zoomUrl: process.env.ZOOM_URL_20260614 || "",
      zoomId: process.env.ZOOM_ID_20260614 || "",
      zoomPw: process.env.ZOOM_PW_20260614 || "",
    },
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || "noreply@isshin-ai.co.jp";
  const adminTo = process.env.CONTACT_TO || "noreply@isshin-gym.co.jp";

  if (!apiKey || !webhookSecret) {
    console.error("Stripe webhook env missing");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const stripe = new Stripe(apiKey, { apiVersion: "2026-04-22.dahlia" });

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "no signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e) {
    console.error("Signature verification failed:", e);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Stripe Checkout 完了情報を取り出し
  const customerEmail =
    session.customer_details?.email || session.customer_email || "";
  const customerName = session.customer_details?.name || "（未取得）";
  const customerPhone = session.customer_details?.phone || "（未取得）";
  const company =
    session.custom_fields?.find((f) => f.key === "company")?.text?.value ||
    "（未記入）";
  const amountTotal = session.amount_total
    ? `¥${session.amount_total.toLocaleString()}`
    : "（不明）";
  const paymentStatus = session.payment_status;
  const sessionId = session.id;
  const sessionDateKey = session.metadata?.sessionDate || "";

  const sessionMap = buildSessionMap();
  const meta = sessionMap[sessionDateKey];

  if (!resendKey) {
    console.error("RESEND_API_KEY missing — emails not sent");
    return NextResponse.json({ received: true, warning: "resend missing" });
  }

  const resend = new Resend(resendKey);

  // === 1. 申込者宛: 確認メール ===
  const dateText = meta?.dateText || "ご選択いただいた日程（事務局から個別連絡いたします）";
  const openText = meta?.openText || "";
  const zoomUrl = meta?.zoomUrl || "";
  const zoomId = meta?.zoomId || "";
  const zoomPw = meta?.zoomPw || "";
  const labelText = meta?.label ? `（${meta.label}）` : "";

  const customerSubject = `【ご予約完了】Claude Code 実践セミナー${labelText}`;
  const zoomBlock =
    zoomUrl && zoomId && zoomPw
      ? [
          "■ Zoom 参加情報",
          "下記URLから当日ご参加ください。",
          "",
          `URL: ${zoomUrl}`,
          `ミーティングID: ${zoomId}`,
          `パスコード: ${zoomPw}`,
        ]
      : [
          "■ Zoom 参加情報",
          "Zoom URL は開催前日までに、別途このメールアドレス宛にお送りいたします。",
        ];

  const customerBody = [
    `${customerName} 様`,
    "",
    "この度は Claude Code 実践セミナーへお申し込みいただき、誠にありがとうございます。",
    "決済が完了しましたので、ご参加が確定いたしました。",
    "",
    "当日、AI に「使われる側」ではなく「使う側」へ回るための実践的な視点を、",
    `${customerName} 様と一緒に深めていけることを楽しみにしています。`,
    "",
    "詳細は以下の内容をご確認ください。",
    "",
    "─────────────────────",
    "  ご予約内容",
    "─────────────────────",
    "セミナー: 経営者・次期リーダーのための Claude Code 実践セミナー",
    `開催日時: ${dateText}${labelText}`,
    ...(openText ? [openText] : []),
    "形式: オンライン（Zoom）",
    `お支払い金額: ${amountTotal}（税込）`,
    "─────────────────────",
    "",
    ...zoomBlock,
    "",
    "■ 返金について",
    "本セミナーはライブ配信形式の役務のため、お申込み完了後のキャンセル・返金は",
    "お受けできません（特定商取引法に基づく表記をご確認ください）。",
    "",
    "■ お問い合わせ",
    "ご質問は本メールへの返信、または noreply@isshin-ai.co.jp までお気軽にどうぞ。",
    "",
    "──",
    "CCC運営事務局",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `CCC運営事務局 <${from}>`,
      to: [customerEmail],
      replyTo: from,
      subject: customerSubject,
      text: customerBody,
    });
  } catch (e) {
    console.error("Customer email failed:", e);
  }

  // === 2. 管理者宛: 申込通知 ===
  const adminSubject = `[CCC セミナー申込] ${customerName} 様 / ${amountTotal} / ${meta?.label || "日程未確定"}`;
  const adminBody = [
    "セミナーLPから新規申込がありました。",
    "",
    `お名前: ${customerName}`,
    `会社名: ${company}`,
    `メール: ${customerEmail}`,
    `電話: ${customerPhone}`,
    `お支払い: ${amountTotal}（${paymentStatus}）`,
    `決済番号: ${sessionId}`,
    `選択日程: ${meta?.label || "未確定"} / ${dateText}`,
    "",
    ...(meta
      ? []
      : [
          "⚠️ sessionDate metadata が SESSION_MAP に未登録です。Zoom情報を手動で送付してください。",
          `   metadata.sessionDate = "${sessionDateKey}"`,
          "",
        ]),
    "Stripe ダッシュボード:",
    `https://dashboard.stripe.com/payments/${session.payment_intent}`,
    "",
    "──",
    "返信は本メールに返すと申込者に直接届きます。",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `CCC運営事務局 <${from}>`,
      to: [adminTo],
      replyTo: customerEmail,
      subject: adminSubject,
      text: adminBody,
    });
  } catch (e) {
    console.error("Admin email failed:", e);
  }

  return NextResponse.json({ received: true });
}
