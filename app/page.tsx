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
  title: "Claude Code 実践セミナー — 半年で、仕事がここまで変わる",
  description:
    "経営者・次期リーダーのための Claude Code 実践セミナー。半年前まで AI を使えなかった2人が、AI で業務がどう変わったかを2時間で実演します。2026/6/3(水) 19:00・6/14(日) 11:00 オンライン開催 / セミナー1回 ¥5,500(税込)。",
};
