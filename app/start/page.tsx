import HeroStart from "@/components/sections/HeroStart";
import Wave from "@/components/sections/Wave";
import SixMonthsStart from "@/components/sections/SixMonthsStart";
import Outcomes from "@/components/sections/Outcomes";
import Voices from "@/components/sections/Voices";
import Speaker from "@/components/sections/Speaker";
import WhyThisStart from "@/components/sections/WhyThisStart";
import WhyPaid from "@/components/sections/WhyPaid";
import Detail from "@/components/sections/Detail";
import FAQ from "@/components/sections/FAQ";
import FinalCTAStart from "@/components/sections/FinalCTAStart";
import Footer from "@/components/sections/Footer";

/**
 * Claude Code 実践セミナー LP — Start版 (C案・物語型)
 * 副業・サラリーマン・これから始める人 向け
 * 「半年前、私もAIを使えませんでした」の共感ストーリー軸
 * デフォルト(/) はA案・ベネフィット型
 */
export default function StartPage() {
  return (
    <>
      <HeroStart />
      <Wave />
      <SixMonthsStart />
      <Outcomes />
      <Voices />
      <Speaker />
      <WhyThisStart />
      <WhyPaid />
      <Detail />
      <FAQ />
      <FinalCTAStart />
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Claude Code 実践セミナー — 半年前、私もAIを使えませんでした。",
  description:
    "AIをこれから始める方・副業や独立を視野に動き出したい方へ。半年前まで AI を使えなかった2人が、AI で仕事がどう変わったかを実演を交えてお話しします。オンライン開催。",
  openGraph: {
    title: "Claude Code 実践セミナー — 半年前、私もAIを使えませんでした。",
    description:
      "AIをこれから始める方・副業や独立を視野に動き出したい方へ。半年前まで AI を使えなかった2人が、AI で仕事がどう変わったかを実演を交えてお話しします。オンライン開催。",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Claude Code 実践セミナー — 半年前、私もAIを使えませんでした。",
    description:
      "AIをこれから始める方・副業や独立を視野に動き出したい方へ。半年前まで AI を使えなかった2人が、AI で仕事がどう変わったかを実演を交えてお話しします。オンライン開催。",
  },
};
