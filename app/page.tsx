import Hero from "@/components/sections/Hero";
import Wave from "@/components/sections/Wave";
import SixMonths from "@/components/sections/SixMonths";
import Outcomes from "@/components/sections/Outcomes";
import Voices from "@/components/sections/Voices";
import Speaker from "@/components/sections/Speaker";
import WhyThis from "@/components/sections/WhyThis";
import WhyPaid from "@/components/sections/WhyPaid";
import Detail from "@/components/sections/Detail";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

/**
 * Claude Code 実践セミナー LP（v3.2）
 *
 * 100体ペルソナテスト経て v3.2 確定版。
 * 紀洋さんFB全反映：店舗経営/34歳/ビフォアフ4項目/教える+使う両軸/「見せる」軸/複数日程
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Wave />
      <SixMonths />
      <Outcomes />
      <Voices />
      <Speaker />
      <WhyThis />
      <WhyPaid />
      <Detail />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Claude Code 実践セミナー — 自分が止まっても回る事業へ、半年で。",
  description:
    "経営者のための Claude Code 実践セミナー。社員を増やさずに事業を伸ばす設計図を、AI を毎日使う経営者が実演を交えてお見せします。オンライン開催。",
};
