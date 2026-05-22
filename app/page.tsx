import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import Outcomes from "@/components/sections/Outcomes";
import WhyThis from "@/components/sections/WhyThis";
import Speaker from "@/components/sections/Speaker";
import Detail from "@/components/sections/Detail";
import FAQ from "@/components/sections/FAQ";
import BeforeRegister from "@/components/sections/BeforeRegister";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import NextSession from "@/components/sections/NextSession";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import VariantSwitcher from "@/components/VariantSwitcher";

/**
 * Claude Code Campus 第 1 回 公開セミナー LP（デフォルト版）
 *
 * 別バージョン:
 *   /a — editorial 純化版（Hero + Before/After + 学べる）
 *   /b — 実装証拠押し版（Claude Code 端末 + 痛み + 価格正当化）
 */
export default function Home() {
  return (
    <>
      <Hero />
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
