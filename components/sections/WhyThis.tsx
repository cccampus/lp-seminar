/**
 * WhyThis（実質 WhyUs）— v3.2
 * 「教える人じゃなく使う人」を全否定 → 「使う人＋教えるプロ」両軸
 * このセミナーは「教える場」ではなく「景色を見ていただく場」
 */
import DarkSection from "@/components/ui/DarkSection";

export default function WhyThis() {
  return (
    <DarkSection
      id="why-us"
      aria-labelledby="why-us-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Why Us
        </p>
        <h2
          id="why-us-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-12"
          style={{ letterSpacing: "-0.01em" }}
        >
          なぜ、私たちが話すのか。
        </h2>

        <div className="space-y-7 text-base sm:text-lg leading-loose text-cream/85">
          <p>
            世の中の大きな AI 教室は、いろんなツールを浅く広く教えます。
            <br />
            半日で終わる研修は、明日からは何も変わりません。
          </p>

          <p>
            私たちは、毎日 Claude Code を使って自分の仕事を動かしている、
            <br />
            <strong className="text-cream">ただの経営者</strong>です。
          </p>

          <div className="border-l-2 border-coral pl-6 py-2">
            <p>
              —— 教えるプロとしての経験を持ち、
              <br />
              そして毎日 AI を使ってきた経営者として、
              <br />
              <strong className="text-coral">経営者の言葉で、経営の判断軸に乗せられる景色を、</strong>
              <br />
              <strong className="text-coral">2 時間でお見せします。</strong>
            </p>
          </div>

          <p className="pt-4 text-cream/80">
            このセミナーは「教える場」ではありません。
            <br />
            2 時間、AI が本当に仕事をする景色を、目の前で見ていただく場です。
          </p>
        </div>
      </div>
    </DarkSection>
  );
}
