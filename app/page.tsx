import HeroCinematicV2 from "@/components/sections/d/HeroCinematicV2";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import Outcomes from "@/components/sections/Outcomes";
import WhyThis from "@/components/sections/WhyThis";
import Speaker from "@/components/sections/Speaker";
import Detail from "@/components/sections/Detail";
import FAQ from "@/components/sections/FAQ";
import BeforeRegister from "@/components/sections/BeforeRegister";
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
      {/* Bridge: hero (sumi-deep) → TrustStrip (cream) の dark→light を smooth fade */}
      <div
        aria-hidden
        className="h-32 sm:h-44 md:h-56 w-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-sumi-deep) 0%, var(--color-sumi-deep) 18%, rgba(31,31,31,0.85) 45%, rgba(217,119,87,0.06) 75%, var(--color-cream) 100%)",
        }}
      />
      <TrustStrip />
      <About />
      <Outcomes />
      <WhyThis />
      <Speaker />
      <Detail />
      <FAQ />
      <BeforeRegister />
      <NextSession />
      <FinalCTA />
      <Footer />
      <VariantSwitcher current="default" />
      <MobileStickyCTA />
    </>
  );
}

export const metadata = {
  title: "経営者・次期リーダーのための Claude Code 実践セミナー — Vol.1",
  description:
    "AI に使われる側から、AI を使う側へ。2026/05/31 (日) 11:00-13:00 オンライン開催 ¥5,000。経営判断にそのまま使える 2 時間。",
};
