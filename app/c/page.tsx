import HeroCinematic from "@/components/sections/c/HeroCinematic";
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
 * Variant C — Cinematic 実験版
 *
 * - Hero のみ HeroCinematic に差し替え（dark stage + 巨大背景タイポ + 文字 stagger reveal）
 * - 他セクションは既存コンポーネントそのまま再利用（コードの重複なし）
 * - VariantSwitcher は意図的に非表示（/、/a、/b に影響しないよう）
 *
 * Inspired by: Adidas × Foot Locker "Chile 20" / @web.love.ed Reel
 * 詳細設計: docs/cinematic_upgrade_roadmap.md 参照
 */
export default function CinematicPage() {
  return (
    <>
      <HeroCinematic />
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
      <VariantSwitcher current="c" />
      <MobileStickyCTA />
    </>
  );
}
