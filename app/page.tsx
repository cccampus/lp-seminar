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

/**
 * Claude Code Campus 公開セミナー LP（本番）
 *
 * デザイン: dark cinematic（reel 準拠）。HeroCinematicV2 + 全セクションダークステージ。
 * 比較バリアント（旧 /a /b /c /d + VariantSwitcher）は `variants` ブランチに分離。
 * main は共有用のクリーンな本番のみ。
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
      <MobileStickyCTA />
    </>
  );
}

export const metadata = {
  title: "経営者・次期リーダーのための Claude Code 実践セミナー",
  description:
    "AI に使われる側から、AI を使う側へ。2026/05/31 (日) 11:00-13:00 オンライン開催 ¥5,000。経営判断にそのまま使える 2 時間。",
};
