import HeroB from "@/components/sections/b/HeroB";
import PainPoints from "@/components/sections/b/PainPoints";
import Transformation from "@/components/sections/b/Transformation";
import Speaker from "@/components/sections/Speaker";
import PriceJustification from "@/components/sections/b/PriceJustification";
import NextSession from "@/components/sections/NextSession";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import VariantSwitcher from "@/components/VariantSwitcher";

/**
 * 案 B — 痛み → 変化 → 価値（実装証拠押し）
 *
 * Codex / リサーチ agent 推奨構成:
 *   Hero            — Claude Code 端末 + 講師サムネ（D 型）
 *   PainPoints      — 経営課題の言語で 4 つ（煽り口調 / NG ワード回避）
 *   Transformation  — 2 時間後の「触れる経営者」へ + ベネフィット数値
 *   Speaker         — 講師 2 名
 *   PriceJustification — Netflix 比喩 NG。「外注前の判断精度を上げる投資」フレーム
 *   FinalCTA        — 主＋副 CTA
 *   Footer
 */
export default function PlanB() {
  return (
    <>
      <HeroB />
      <PainPoints />
      <Transformation />
      <Speaker />
      <PriceJustification />
      <NextSession />
      <FinalCTA />
      <Footer />
      <VariantSwitcher current="b" />
      <MobileStickyCTA />
    </>
  );
}

export const metadata = {
  title: "経営者・次期リーダーのための Claude Code 実践セミナー — Vol.1",
  description:
    "「AI 活用が現場任せ」「試作が外注前提」「AI を触ったことがない」— その停滞点を、2 時間で外す。2026/05/31 オンライン開催 ¥5,000。",
};
