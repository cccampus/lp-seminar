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
  title: "経営者のための Claude Code 実践セミナー",
  description:
    "半年前、私もAIを使えませんでした。いま、AIで仕事をしています。たった6ヶ月で毎日の仕事がここまでラクになる。その景色を、2時間でお見せします。2026/05/31・06/03 オンライン開催 セミナー1回 ¥5,500（税込）。",
};
