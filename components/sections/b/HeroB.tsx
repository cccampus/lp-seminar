import Image from "next/image";

/**
 * Plan B Hero — Claude Code 端末画面を主役（実装証拠押し）
 * Sumi BG + grain で editorial を保ったまま実物感を出す
 */
const FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1";

export default function HeroB() {
  return (
    <section className="relative w-full min-h-[760px] bg-sumi-deep text-cream overflow-hidden px-6 py-20 sm:py-24">
      {/* ambient コーラル光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 92% 8%, rgba(217,119,87,0.22) 0%, transparent 60%), " +
            "radial-gradient(ellipse 45% 38% at 8% 95%, rgba(184,93,64,0.18) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* === 左：コピー === */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
            公開セミナー
          </p>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15]"
            style={{ letterSpacing: "-0.01em" }}
          >
            経営者、<br className="hidden sm:inline" />
            次期リーダーのための、
            <br />
            <span className="text-coral italic font-normal">Claude Code</span> 実践セミナー
          </h1>

          <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/80 max-w-xl">
            AI に「使われる側」から、「使う側」へ。
            <br />
            2 時間で、自社業務に AI が乗る景色を見せます。
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-2xl">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">DATE</span>
              <span className="font-serif text-base font-semibold">5/31 (日)</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">TIME</span>
              <span className="font-serif text-base font-semibold">11:00–13:00</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">FORMAT</span>
              <span className="font-serif text-base font-semibold">Online · Zoom</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">PRICE</span>
              <span className="font-serif text-base font-semibold">¥5,000</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-cream/55">
            Zoom URL は申込確認後、開催前日までに個別配布いたします
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
          >
            申し込む
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
        </div>

        {/* === 右：Claude Code 端末（D 型 — 実装証拠）+ 講師ミニサムネ === */}
        <div className="relative mt-12 lg:mt-0">
          {/* メイン端末画面 */}
          <div className="relative rounded-xl overflow-hidden border border-cream/15 bg-cream/[0.04] backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            {/* mac window dots */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-cream/10 bg-sumi/40">
              <span className="block w-3 h-3 rounded-full bg-coral/70" />
              <span className="block w-3 h-3 rounded-full bg-cream/30" />
              <span className="block w-3 h-3 rounded-full bg-cream/30" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.15em] uppercase text-cream/45">
                claude code · 経営者の Mac
              </span>
            </div>
            {/* fake terminal content */}
            <div className="px-5 py-4 font-mono text-xs leading-relaxed text-cream/80 min-h-[280px]">
              <p>
                <span className="text-coral">$</span> claude
              </p>
              <p className="text-cream/55 mt-2">{">"} 月次決算の PDF、各部門から集めて作って</p>
              <p className="text-cream/65 mt-3">⏺ <span className="text-cream/45">Reading 6 systems...</span></p>
              <p className="text-cream/65">⏺ <span className="text-cream/45">Cross-checking entries...</span></p>
              <p className="text-cream/65">⏺ <span className="text-cream/45">Generating report...</span></p>
              <p className="text-cream mt-2">
                ⏺ Done. <span className="text-coral">/Users/keiei/monthly-report.pdf</span>
              </p>
              <p className="text-cream/50 mt-1">  経過時間: <span className="text-coral">12 秒</span>（従来: 30 時間）</p>

              <p className="mt-5">
                <span className="text-coral">$</span> claude
              </p>
              <p className="text-cream/55 mt-2">{">"} このセミナーの LP、もう 1 案 作って</p>
              <p className="text-cream/65 mt-3">⏺ <span className="text-cream/45">Generating Plan B...</span></p>
              <p className="text-cream mt-2">⏺ <span className="text-coral">完了 ✓</span></p>
            </div>
          </div>

          {/* 講師 2 名サムネ — 端末の下に小さく */}
          <div className="mt-6 flex gap-4 justify-center lg:justify-start">
            {[{ src: "/images/kiyo.jpg", name: "Kiyo" }, { src: "/images/takka.jpg", name: "Takka" }].map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="relative w-12 h-12 overflow-hidden rounded-full border border-cream/20">
                  <Image src={s.src} alt={s.name} width={500} height={500} className="block h-full w-full object-cover" priority />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-cream/55">講師</p>
                  <p className="font-serif text-sm font-semibold">{s.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
