/**
 * WhyThis（実質 WhyUs）— v3.2
 * 「教える人じゃなく使う人」を全否定 → 「使う人＋教えるプロ」両軸
 * このセミナーは「教える場」ではなく「景色を見ていただく場」
 */
import DarkSection from "@/components/ui/DarkSection";

export default function WhyThisStart() {
  return (
    <DarkSection
      id="why-us-start"
      aria-labelledby="why-us-start-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Why Us
        </p>
        <h2
          id="why-us-start-heading"
          className="font-serif font-semibold leading-tight mb-12 heading-ja"
          style={{ fontSize: "clamp(24px, 5.8vw, 56px)", letterSpacing: "-0.01em" }}
        >
          なぜ、私たちが話すのか。
        </h2>

        <div className="space-y-7 text-base sm:text-lg leading-loose text-cream/85">
          <p>
            世の中の大きな AI 教室は、
            <br className="sm:hidden" />
            いろんなツールを浅く広く教えます。
            <br />
            半日で終わる研修は、
            <br className="sm:hidden" />
            明日からは何も変わりません。
          </p>

          <p>
            私たちは、毎日 Claude Code を使って
            <span className="whitespace-nowrap">自分の仕事を動かしている、</span>
            <br />
            <strong className="text-cream">ただの経営者</strong>です。
          </p>

          <div className="my-14 sm:my-20 text-center">
            <p className="font-serif text-lg sm:text-xl leading-relaxed text-cream/70">
              教えるプロとしての経験を持ち、
              <br />
              そして毎日 AI を使ってきた
              <br className="sm:hidden" />
              経営者として。
            </p>
            <p
              className="mt-6 font-serif text-xl sm:text-3xl font-semibold leading-snug text-cream"
              style={{ letterSpacing: "-0.01em" }}
            >
              経営者の言葉で、
              <br />
              経営の判断軸に乗せられる景色を、
              <br />
              <span className="text-coral">2 時間で</span>お見せします。
            </p>
          </div>

          <p className="pt-4 text-cream/80">
            このセミナーは「教える場」ではありません。
            <br />
            2 時間、AI が本当に仕事をする景色を、
            <span className="whitespace-nowrap">目の前で見ていただく場です。</span>
          </p>
        </div>
      </div>
    </DarkSection>
  );
}
