import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const schema = z.object({
  agreedTerms: z.literal(true, { error: "特定商取引法・返金不可条件への同意が必要です" }),
  sessionDate: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agreedTerms, sessionDate } = schema.parse(body);

    // CCC 会員の紹介Cookie を Stripe metadata に積む（webhook で member-app DB に反映）
    const cookieStore = await cookies();
    const rawRef = cookieStore.get("ccc_referral_code")?.value ?? "";
    const referralCode = /^[a-zA-Z0-9_-]{6,12}$/.test(rawRef) ? rawRef : "";

    if (!agreedTerms) {
      return NextResponse.json(
        { error: "同意が確認できませんでした" },
        { status: 400 },
      );
    }

    const apiKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID_SEMINAR;
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "https://cc-seminar.vercel.app";

    if (!apiKey || !priceId) {
      console.error("Stripe env missing", { hasKey: !!apiKey, hasPriceId: !!priceId });
      return NextResponse.json(
        { error: "決済システムが設定されていません" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: "2026-04-22.dahlia",
      maxNetworkRetries: 3,
      timeout: 20000,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/apply/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply/cancel`,
      locale: "ja",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "company",
          label: { type: "custom", custom: "会社名・屋号（任意）" },
          type: "text",
          optional: true,
        },
      ],
      custom_text: {
        submit: {
          message:
            "決済完了後、Zoom URL をご登録のメールアドレス宛にお送りします。",
        },
      },
      metadata: {
        source: "ccc-seminar",
        seminar: "CCC Seminar",
        sessionDate: sessionDate || "unspecified",
        ...(referralCode ? { referral_code: referralCode } : {}),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.issues[0]?.message || "入力に不備があります" },
        { status: 400 },
      );
    }
    console.error("Checkout API error:", e);
    return NextResponse.json(
      { error: "決済セッションの生成に失敗しました" },
      { status: 500 },
    );
  }
}
