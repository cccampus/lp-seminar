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
 * Variant D — Cinematic V2 (depth 強化版)
 *
 * /c との差分:
 *  - 多層スポット (radial 3 重)
 *  - 2nd 背景タイポ「CAMPUS」を反対方向 parallax で重ねる
 *  - 背景タイポを perspective + rotateX で奥に倒す
 *  - 4 個の floating glow orbs (slow drift)
 *  - 床反射 mirror gradient
 *  - stage haze (animated mist)
 *
 * 画像なしの CSS only で Chile 20 系の立体感を出す試作。
 * 後続: Codex GPT Image 2 で hero 用画像を生成して 3 frame に差し込み予定。
 */
export default function CinematicV2Page() {
  return (
    <>
      <HeroCinematicV2 />
      {/* === Bridge: hero (sumi-deep) → TrustStrip (cream) の dark→light を smooth fade ===
          単独 div で /d 限定。既存セクション無修正。 */}
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
      <VariantSwitcher current="d" />
      <MobileStickyCTA />
    </>
  );
}
