/**
 * SixMonths Variant B — Linear / Vercel 系 split table
 *
 * 4項目を「Before / After」の2列対比表として1枚に。
 * パネル・カード廃止、罫線のみで階層。
 * 背景画像とグラデは A と共通維持。
 */
import Image from "next/image";

const beforeAfter = [
  { label: "LP・SEO記事制作", before: "外注で月30万", after: "自分で1時間以内" },
  { label: "SNS動画作成・投稿", before: "外注で月10万", after: "AI補助で30分以内" },
  { label: "Google・Meta広告運用", before: "外注で月20万", after: "自分で30分以内" },
  { label: "仕訳や契約書作成", before: "外注で月10万", after: "自分で30分以内" },
];

export default function SixMonthsB() {
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
        <div className="mx-auto w-full max-w-3xl sm:max-w-3xl lg:max-w-4xl">
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

          {/* Before / After — split table (Linear/Vercel系) */}
          <div className="mt-14 sm:mt-20">
            {/* 表ヘッダー */}
            <div className="hidden sm:grid grid-cols-[1.2fr_1fr_1fr] gap-x-10 pb-4 border-b border-cream/25">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-cream/45"></span>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-cream/45">Before</span>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral">After</span>
            </div>
            {/* 表本体 */}
            <div className="divide-y divide-cream/15">
              {beforeAfter.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 sm:grid-cols-[1.2fr_1fr_1fr] gap-x-6 sm:gap-x-10 gap-y-2 py-6 sm:py-7 items-baseline"
                >
                  <p
                    className="col-span-2 sm:col-span-1 font-serif text-lg sm:text-xl font-semibold text-cream"
                    style={{ letterSpacing: "-0.005em" }}
                  >
                    {item.label}
                  </p>
                  <p className="font-serif text-sm sm:text-base text-cream/55 line-through decoration-coral/40 decoration-1 underline-offset-4">
                    {item.before}
                  </p>
                  <p className="font-serif text-base sm:text-xl font-semibold text-coral" style={{ letterSpacing: "-0.01em" }}>
                    {item.after}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 締め (A と同じ) */}
          <div className="mt-12 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
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
