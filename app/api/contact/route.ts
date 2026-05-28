import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || "noreply@isshin-ai.co.jp";
  const adminTo = process.env.CONTACT_TO || "noreply@isshin-gym.co.jp";

  if (!resendKey) {
    console.error("RESEND_API_KEY missing");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "お名前・メール・お問い合わせ内容は必須です" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "メールアドレスの形式が正しくありません" },
      { status: 400 },
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "お問い合わせ内容は5000文字以内でお願いします" },
      { status: 400 },
    );
  }

  const resend = new Resend(resendKey);

  // === 1. 管理者宛: 問い合わせ通知 (Stripe webhook と同フォーマット) ===
  const adminSubject = `[CCC お問い合わせ] ${name} 様${subject ? ` / ${subject}` : ""}`;
  const adminBody = [
    "セミナーLPからお問い合わせがありました。",
    "",
    `お名前: ${name}`,
    `メール: ${email}`,
    ...(subject ? [`件名: ${subject}`] : []),
    "",
    "■ お問い合わせ内容",
    "─────────────────────",
    message,
    "─────────────────────",
    "",
    "──",
    "返信は本メールに返すとお問い合わせ者に直接届きます。",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `CCC運営事務局 <${from}>`,
      to: [adminTo],
      replyTo: email,
      subject: adminSubject,
      text: adminBody,
    });
  } catch (e) {
    console.error("Admin email failed:", e);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }

  // === 2. 問い合わせ者宛: 自動応答 ===
  const userSubject = "【お問い合わせ受付】Claude Code 実践セミナー";
  const userBody = [
    `${name} 様`,
    "",
    "Claude Code 実践セミナーへのお問い合わせ、ありがとうございます。",
    "下記の内容で受け付けいたしました。",
    "",
    "通常2営業日以内にご返信いたします。",
    "",
    "─────────────────────",
    "  受付内容",
    "─────────────────────",
    ...(subject ? [`件名: ${subject}`, ""] : []),
    message,
    "─────────────────────",
    "",
    "今しばらくお待ちください。",
    "",
    "──",
    "CCC運営事務局",
  ].join("\n");

  try {
    await resend.emails.send({
      from: `CCC運営事務局 <${from}>`,
      to: [email],
      replyTo: from,
      subject: userSubject,
      text: userBody,
    });
  } catch (e) {
    console.error("User auto-reply failed:", e);
    // 管理者通知は成功してるので、自動応答失敗でも ok 返す
  }

  return NextResponse.json({ ok: true });
}
