/**
 * SixMonths Variant C — Anthropic / NYT Magazine 系 大型タイポ語り
 *
 * 各項目を巨大font-serifのフルワイド文章として4ブロック流す。
 * パネル・表組みなし、文章として読ませる。
 * 背景画像とグラデは A と共通維持。
 */
import Image from "next/image";

const beforeAfter = [
  { label: "LP・SEO記事制作", before: "外注で月30万", after: "自分で1時間以内" },
  { label: "SNS動画作成・投稿", before: "外注で月10万", after: "AI補助で30分以内" },
  { label: "Google・Meta広告運用", before: "外注で月20万", after: "自分で30分以内" },
  { label: "仕訳や契約書作成", before: "外注で月10万", after: "自分で30分以内" },
];

export default function SixMonthsC() {
  return (
    <section
      id="six-months"
      aria-labelledby="six-months-heading"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate"
    >
      {/* 背景画像 (A と同じ) */}
      <div className="absolute inset-0 z-0 sm:hidden" aria-hidden>
        <Image src="/images/sixmonths/flood_mobile.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-0 hidden sm:block" aria-hidden>
        <Image src="/images/sixmonths/flood_pc.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(31,31,31,0.34) 0%, rgba(31,31,31,0.30) 28%, rgba(31,31,31,0.60) 56%, rgba(31,31,31,0.66) 80%, rgba(31,31,31,0.58) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none hidden sm:block" style={{ background: "linear-gradient(to right, rgba(31,31,31,0.96) 0%, rgba(31,31,31,0.90) 30%, rgba(31,31,31,0.66) 55%, rgba(31,31,31,0.30) 78%, rgba(31,31,31,0) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "rgba(31,31,31,0.28)" }} aria-hidden />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 30% 0%, rgba(217,119,87,0.12) 0%, transparent 60%)" }} aria-hidden />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 py-24 sm:min-h-0 sm:justify-start sm:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-3xl">
          {/* 見出し (A と同じ) */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Six Months</p>
            <h2 id="six-months-heading" className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-10" style={{ letterSpacing: "-0.01em" }}>
              半年で、毎日の仕事が、
              <br />
              ここまで変わる。
            </h2>
            <div className="prose-stub text-cream/90 text-base sm:text-lg leading-loose space-y-5">
              <p>
                ほんの半年前まで、私は AI をほとんど触っていませんでした。
                <br />
                店舗経営をしながら、「ChatGPT って便利らしいね」程度の理解。
              </p>
              <p>
                <span className="block font-serif text-2xl sm:text-4xl font-semibold text-coral leading-snug mt-2" style={{ letterSpacing: "-0.01em" }}>
                  Claude Code に出会って、
                  <br className="sm:hidden" />
                  6ヶ月。
                </span>
              </p>
            </div>
          </div>

          {/* Before / After — 大型タイポ語り (Anthropic/NYT Magazine 系) */}
          <div className="mt-14 sm:mt-20 space-y-12 sm:space-y-16">
            {beforeAfter.map((item, i) => (
              <div key={i} className="relative">
                {/* 巨大背景番号（パララックス代わりの装飾、薄く） */}
                <span
                  className="absolute -top-6 sm:-top-8 -left-2 sm:-left-4 font-serif text-7xl sm:text-9xl font-bold text-coral/10 leading-none pointer-events-none select-none"
                  style={{ letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* 本文 */}
                <p
                  className="relative font-serif text-2xl sm:text-4xl font-medium text-cream leading-snug"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  <span className="text-cream">{item.label}は、</span>
                  <span className="text-cream/55">{item.before}</span>
                  <span className="text-cream">から</span>
                  <span className="text-coral font-semibold">{item.after}</span>
                  <span className="text-cream">に。</span>
                </p>
              </div>
            ))}
          </div>

          {/* 締め (A と同じ) */}
          <div className="mt-16 sm:mt-20 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
            <p>
              これは特別な才能でも、IT 知識でもありません。
              <br />
              タイミングと、やる気と、行動力。
              <br className="sm:hidden" />
              それだけです。
            </p>
            <p>
              IT 革命は 20 年超えても、
              <br className="sm:hidden" />
              今もまだ日本で広がっている最中です。
              <br />
              AI は、半年単位で景色が変わります。
              <br />
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-coral block mt-2" style={{ textShadow: "0 2px 24px rgba(31,31,31,0.85)" }}>
                これは波ではなく、津波です。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
