import Image from "next/image";

/**
 * Plan A Hero — 講師 2 名のポートレート（信頼）を主軸 + 横に Claude Code 画面風の細い装飾
 * 編集スタンス：editorial、静かな高級感、coral アクセント最小限
 */
const FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1";

export default function HeroA() {
  return (
    <section className="relative w-full min-h-[760px] bg-cream text-sumi-deep overflow-hidden px-6 py-20 sm:py-24">
      {/* 微 ambient コーラル光（弱め） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 92% 8%, rgba(217,119,87,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 45% at 8% 95%, rgba(184,93,64,0.10) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* === 左カラム: コピー === */}
        <div>
          {/* eyebrow */}
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
            Vol.1 · 公開セミナー
          </p>

          {/* 主タイトル */}
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15]"
            style={{ letterSpacing: "-0.01em" }}
          >
            経営者、<br className="hidden sm:inline" />
            次期リーダーのための、
            <br />
            <span className="text-coral italic font-normal">Claude Code</span> 実践セミナー
          </h1>

          {/* サブコピー */}
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-sumi/80 max-w-xl">
            AI を「使う側」から、「実装する側」へ。
            <br />
            2 時間で、自社業務に AI が乗る景色を見せます。
          </p>

          {/* 日時・形式・料金 */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-2xl">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">DATE</span>
              <span className="font-serif text-base font-semibold">5/31 (土)</span>
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

          {/* Zoom 補足 */}
          <p className="mt-4 text-xs text-sumi/55">
            Zoom URL は申込確認後、開催前日までに個別配布いたします
          </p>

          {/* CTA */}
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

        {/* === 右カラム: 講師 2 名 + Claude Code 画面装飾 === */}
        <div className="relative">
          {/* Claude Code ターミナル風装飾（背景） */}
          <div
            className="absolute -top-4 -right-4 w-56 sm:w-64 h-40 sm:h-44 rounded-lg overflow-hidden border border-sumi/15 bg-sumi-deep/95 hidden md:block"
            style={{ transform: "rotate(2deg)" }}
            aria-hidden
          >
            {/* mac terminal window dots */}
            <div className="flex gap-1.5 px-3 py-2 border-b border-cream/10">
              <span className="block w-2.5 h-2.5 rounded-full bg-coral/70" />
              <span className="block w-2.5 h-2.5 rounded-full bg-cream/30" />
              <span className="block w-2.5 h-2.5 rounded-full bg-cream/30" />
            </div>
            {/* fake code lines */}
            <div className="px-3 py-2 font-mono text-[9px] leading-relaxed text-cream/65">
              <p><span className="text-coral">$</span> claude</p>
              <p className="text-cream/45">{">"} 月次決算 PDF を作成して</p>
              <p className="text-cream/45 mt-1">⏺ Reading 6 systems...</p>
              <p className="text-cream/45">⏺ Generating report...</p>
              <p className="text-cream/45">⏺ Done in 12 seconds <span className="text-coral">✓</span></p>
            </div>
          </div>

          {/* 講師 2 名のポートレート — square crop 重ね */}
          <div className="relative grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0 md:ml-12 mt-12 md:mt-0">
            <div className="relative">
              <div className="aspect-square overflow-hidden border border-sumi/15 bg-sumi/[0.03]">
                <Image
                  src="/images/kiyo_v2.png"
                  alt="講師 Kiyo"
                  width={500}
                  height={500}
                  sizes="(min-width: 768px) 240px, 50vw"
                  className="block h-full w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-sumi/65">Speaker</p>
              <p className="font-serif text-lg font-semibold mt-1">Kiyo</p>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden border border-sumi/15 bg-sumi/[0.03]">
                <Image
                  src="/images/takka_v2.png"
                  alt="講師 Takka"
                  width={500}
                  height={500}
                  sizes="(min-width: 768px) 240px, 50vw"
                  className="block h-full w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-sumi/65">Speaker</p>
              <p className="font-serif text-lg font-semibold mt-1">Takka</p>
            </div>
            {/* Coral 細線アクセント */}
            <span className="absolute -bottom-3 left-0 h-px w-16 bg-coral" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
