import HeroCinematicV2 from "@/components/sections/d/HeroCinematicV2";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import Impact from "@/components/sections/Impact";
import Outcomes from "@/components/sections/Outcomes";
import Showcase from "@/components/sections/Showcase";
import WhyThis from "@/components/sections/WhyThis";
import Speaker from "@/components/sections/Speaker";
import Detail from "@/components/sections/Detail";
import FAQ from "@/components/sections/FAQ";
import NextSession from "@/components/sections/NextSession";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import VariantSwitcher from "@/components/VariantSwitcher";

/**
 * Claude Code Campus 第 1 回 公開セミナー LP（本番 = cinematic V2 採用）
 *
 * 最終デザイン: D (HeroCinematicV2) — dark stage + 巨大背景タイポ parallax
 *   + 文字 char reveal + glow orbs + 床反射。GPT Image 背景統合。
 * 旧バリアント /a /b /c /d は参考用に残置（VariantSwitcher で比較可）。
 */
export default function Home() {
  return (
    <>
      <HeroCinematicV2 />
      <TrustStrip />
      <About />
      <Impact />
      <Outcomes />
      <Showcase />
      <WhyThis />
      <Speaker />
      <Detail />
      <FAQ />
      <NextSession />
      <FinalCTA />
      <Footer />
      <VariantSwitcher current="default" />
      <MobileStickyCTA />
    </>
  );
}

export const metadata = {
  title: "経営者・次期リーダーのための Claude Code 実践セミナー",
  description:
    "AI に使われる側から、AI を使う側へ。2026/05/31 (日) 11:00-13:00 オンライン開催 ¥5,000。経営判断にそのまま使える 2 時間。",
};
