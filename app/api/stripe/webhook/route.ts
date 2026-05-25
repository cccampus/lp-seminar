import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

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

  if (!resendKey) {
    console.error("RESEND_API_KEY missing — emails not sent");
    return NextResponse.json({ received: true, warning: "resend missing" });
  }

  const resend = new Resend(resendKey);

  // === 1. 申込者宛: 確認メール ===
  const customerSubject = "【ご予約完了】Claude Code 実践セミナー Vol.1";
  const customerBody = [
    `${customerName} 様`,
    "",
    "この度はClaude Code 実践セミナーへお申し込みいただき、誠にありがとうございます。",
    "決済が完了し、お席を確保いたしました。",
    "",
    "─────────────────────",
    "  ご予約内容",
    "─────────────────────",
    "セミナー: 経営者・次期リーダーのための Claude Code 実践セミナー",
    "開催日時: 2026年5月31日（日）11:00〜13:00",
    "形式: オンライン（Zoom）",
    `お支払い金額: ${amountTotal}（税込）`,
    `決済番号: ${sessionId}`,
    "─────────────────────",
    "",
    "■ 当日のご参加について",
    "Zoom URL と事前資料は、開催日前日までに本メールアドレス宛にお送りいたします。",
    "",
    "■ 返金について",
    "本セミナーはライブ配信形式の役務のため、お申込み完了後のキャンセル・返金は",
    "お受けできません（特定商取引法に基づく表記をご確認ください）。",
    "",
    "■ お問い合わせ",
    "ご質問は本メールへの返信、または noreply@isshin-ai.co.jp までお気軽にどうぞ。",
    "",
    "当日お会いできることを楽しみにしております。",
    "",
    "──",
    "Claude Code Campus 運営事務局",
    "株式会社ISSHIN",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `Claude Code Campus <${from}>`,
      to: [customerEmail],
      replyTo: from,
      subject: customerSubject,
      text: customerBody,
    });
  } catch (e) {
    console.error("Customer email failed:", e);
  }

  // === 2. 管理者宛: 申込通知 ===
  const adminSubject = `[CCC セミナー申込] ${customerName} 様 / ${amountTotal}`;
  const adminBody = [
    "セミナーLPから新規申込がありました。",
    "",
    `お名前: ${customerName}`,
    `会社名: ${company}`,
    `メール: ${customerEmail}`,
    `電話: ${customerPhone}`,
    `お支払い: ${amountTotal}（${paymentStatus}）`,
    `決済番号: ${sessionId}`,
    "",
    "Stripe ダッシュボード:",
    `https://dashboard.stripe.com/payments/${session.payment_intent}`,
    "",
    "──",
    "返信は本メールに返すと申込者に直接届きます。",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `CCC Seminar <${from}>`,
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
