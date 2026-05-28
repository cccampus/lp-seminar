/**
 * Stripe 本番モード商品セットアップ
 *
 * 使い方:
 *   set -a; source ~/projects/02_docs/01_isshin/00_api/cccampus/.env; set +a
 *   bun scripts/setup-stripe.ts
 *
 * 作成される商品:
 *   - CCC Seminar Vol.1 / ¥5,000 税抜 / 消費税自動加算（Stripe Tax設定済の場合）
 *     → 税込み総額 ¥5,500 を顧客から徴収
 *
 * 出力: STRIPE_PRICE_ID_SEMINAR=price_xxxxx
 *       これを .env.local と Vercel env vars に設定すること
 */

import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  console.error("STRIPE_SECRET_KEY missing");
  process.exit(1);
}

if (!apiKey.startsWith("sk_live_")) {
  console.warn(
    `⚠️  Warning: STRIPE_SECRET_KEY is not a live mode key (prefix: ${apiKey.slice(0, 8)})`,
  );
  console.warn("    This script is intended for LIVE mode setup. Continue? (Ctrl+C to abort, Enter to proceed)");
  await new Promise((resolve) => process.stdin.once("data", resolve));
}

// Stripe SDK の型は最新版を期待するが、本番動作は固定版を維持
// @ts-expect-error apiVersion 文字列リテラル型が SDK 更新で狭くなったため、ランタイム動作優先で抑止
const stripe = new Stripe(apiKey, { apiVersion: "2026-04-22.dahlia" });

async function main() {
  console.log("📦 Creating product: CCC Seminar Vol.1...");

  const product = await stripe.products.create({
    name: "Claude Code 実践セミナー Vol.1",
    description:
      "経営者・次期リーダーのための Claude Code 実践セミナー。2026年5月31日（日）11:00〜13:00 オンライン開催。",
    metadata: {
      seminar_code: "ccc-seminar-vol1",
      date: "2026-05-31",
    },
    tax_code: "txcd_10000000", // General - Services
  });
  console.log(`✅ Product created: ${product.id}`);

  console.log("💰 Creating price: ¥5,500 (内税 = 税抜¥5,000 + 消費税¥500)...");

  // 単純運用: 内税¥5,500 で固定。Stripe Tax は使わない（設定不要・即動く）
  // LP表示: 「¥5,000（税抜）+ 消費税」/ Stripe Checkout: 「合計 ¥5,500」
  const price = await stripe.prices.create({
    product: product.id,
    currency: "jpy",
    unit_amount: 5500,
    tax_behavior: "inclusive", // 内税
    metadata: {
      display: "¥5,000 (税抜) + 消費税 = ¥5,500",
    },
  });
  console.log(`✅ Price created: ${price.id}`);

  console.log("");
  console.log("─────────────────────────────────────");
  console.log("🎉 セットアップ完了。以下の値を控えてください:");
  console.log("─────────────────────────────────────");
  console.log(`STRIPE_PRICE_ID_SEMINAR=${price.id}`);
  console.log("");
  console.log("次のステップ:");
  console.log("1. .env.local に上記を追記");
  console.log("2. Vercel env vars にも投入");
  console.log("   echo \"" + price.id + "\" | vercel env add STRIPE_PRICE_ID_SEMINAR production");
}

main().catch((e) => {
  console.error("❌ Setup failed:", e);
  process.exit(1);
});
