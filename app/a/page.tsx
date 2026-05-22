import HeroA from "@/components/sections/a/HeroA";
import BeforeAfter from "@/components/sections/a/BeforeAfter";
import WhatYouLearn from "@/components/sections/a/WhatYouLearn";
import Speaker from "@/components/sections/Speaker";
import NextSession from "@/components/sections/NextSession";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import VariantSwitcher from "@/components/VariantSwitcher";

/**
 * 案 A — B2B 直球（editorial 純化）
 *
 * Codex / リサーチ agent 推奨構成:
 *   Hero       — 講師ポートレート + 日時/料金（C 型 + 軽い D 型）
 *   BeforeAfter — 経営判断の「見え方」が変わる対比（実証言ナシ案を回避）
 *   WhatYouLearn — 学べる 3 つ + 当日タイムテーブル
 *   Speaker    — 講師 2 名（既存再利用、実装してきた事例）
 *   FinalCTA   — 主＋副 CTA
 *   Footer
 */
export default function PlanA() {
  return (
    <>
      <HeroA />
      <BeforeAfter />
      <WhatYouLearn />
      <Speaker />
      <NextSession />
      <FinalCTA />
      <Footer />
      <VariantSwitcher current="a" />
      <MobileStickyCTA />
    </>
  );
}

export const metadata = {
  title: "経営者・次期リーダーのための Claude Code 実践セミナー — Vol.1",
  description:
    "2026/05/31 (日) 11:00-13:00 オンライン開催。AI に使われる側から、AI を使う側へ。経営判断にそのまま使える 2 時間。",
};
