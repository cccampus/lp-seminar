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

/**
 * Claude Code Campus 第 1 回 公開セミナー LP
 *
 * セクション流れ（経営者向けハイエンド B2B LP として再構成）:
 *   Hero            — 動画ループ + 日時 + 申込 CTA
 *   TrustStrip      — Anthropic 公式 / 採用企業（Hero 直下の信頼帯）
 *   About           — なぜ今学ぶか（実例ベース、英語ラベル排除）
 *   Outcomes        — 90 分後に持ち帰る 3 つのもの
 *   WhyThis         — 他の AI セミナーと違うところ
 *   Speaker         — Editorial Card 型、実装してきた事例
 *   Detail          — タイムテーブル + 開催情報
 *   FAQ             — よくある質問
 *   BeforeRegister  — 申込前の透明性 5 項目
 *   FinalCTA        — 主 CTA（個人 ¥5,000）+ 副 CTA（法人相談）
 *   Footer
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
      <FinalCTA />
      <Footer />
    </>
  );
}
