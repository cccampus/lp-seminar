/**
 * WhyPaid — v3.2 コピー / cinematic V2 ダークトーン
 * 「真剣な仲間と」軸、「6ヶ月後のあなたを買う、最初の初期投資費用」
 */
import DarkSection from "@/components/ui/DarkSection";

export default function WhyPaidE() {
  return (
    <DarkSection
      id="why-paid"
      aria-labelledby="why-paid-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Why Paid
        </p>
        <h2
          id="why-paid-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream mb-12"
          style={{ letterSpacing: "-0.01em" }}
        >
          なぜ、有料なのか。
        </h2>

        <div className="space-y-7 text-base sm:text-lg leading-loose text-cream/85">
          <p>
            無料のセミナーは、世の中にたくさんあります。
            <br />
            それでも、私たちは{" "}
            <strong className="text-cream font-semibold">¥5,000</strong>{" "}
            でお願いしています。
          </p>

          <p>
            理由はシンプルです。
            <br />
            <strong className="text-cream font-semibold">
              本気で一歩踏み出す方と、密度の濃い2時間を過ごしたい。
            </strong>
          </p>

          <p>
            無料の場には、いろんな目的の人が集まります。
            <br />
            有料を選んだあなたが「来てよかった」と思える時間を、
            <br />
            私たちも責任を持って作る。そのためのお支払いです。
          </p>

          <blockquote className="mt-16 sm:mt-20">
            <p
              className="font-serif italic text-xl sm:text-3xl font-medium text-cream/90 leading-relaxed"
              style={{ letterSpacing: "-0.01em" }}
            >
              “人は、手に入れる喜びよりも、
              <br className="hidden sm:block" />
              失う痛みのほうを、はるかに大きく感じる。”
            </p>
            <footer className="mt-5 text-sm sm:text-base text-cream/55">
              — ダニエル・カーネマン
              <span className="text-cream/40">（行動経済学者・ノーベル経済学賞）</span>
            </footer>
            <p className="mt-6 text-sm sm:text-base text-cream/70 leading-loose">
              だから、いちど払った投資は、無駄にしたくなくなる。
              <br className="hidden sm:block" />
              <span className="text-coral">その「損をしたくない」気持ちが、人を本気にさせる。</span>
            </p>
          </blockquote>

          <div className="mt-16 sm:mt-24 text-center">
            <p
              className="font-serif text-2xl sm:text-4xl font-semibold text-cream leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              5,000 円は、
              <br className="sm:hidden" />
              6 ヶ月後のあなたを買う。
            </p>
            <p className="mt-6 font-serif text-lg sm:text-2xl text-cream/70 leading-relaxed">
              <span className="text-coral font-semibold">最初の初期投資費用</span>です。
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
          >
            2時間、一緒に過ごす ↗
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
