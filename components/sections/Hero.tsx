/**
 * Hero — トップビュー
 * - 背景: 動画ループ（Seedance で後日生成、cinematic 引き）
 * - 上に grain + 暗黒オーバーレイで読みやすさ確保
 * - 中央: 初回セミナーの位置づけ + タイトル + 日時 + フォーム CTA
 */
const GOOGLE_FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"; // 仮 — 確定したら差し替え

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-sumi-deep text-cream">
      {/* === BG video ループ === */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        autoPlay
        loop
        muted
        playsInline
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero-loop.mp4" type="video/mp4" />
        <source src="/video/hero-loop.webm" type="video/webm" />
      </video>

      {/* === 暗グラデオーバーレイ（動画の上から読みやすく） === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,24,21,0.35) 0%, rgba(31,24,21,0.85) 100%)",
        }}
      />

      {/* === Grain（紙質感） === */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* === Content === */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        {/* eyebrow / Vol タグ */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
          — Claude Code Campus · 第 1 回 公開セミナー —
        </p>

        {/* 主タイトル */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight max-w-3xl">
          経営者のための、
          <br />
          <span className="text-coral italic font-normal">Claude Code</span>
          {" "}実装入門。
        </h1>

        {/* サブコピー */}
        <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-cream/75">
          AI を「使う側」から、「実装する側」へ。
          <br className="hidden sm:block" />
          2 時間で、自社業務に AI が乗る景色を見せます。
        </p>

        {/* メタ情報（日時 / 場所 / 料金） */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-9 items-center font-mono text-xs sm:text-sm tracking-[0.15em] uppercase text-cream/85">
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">DATE</span>
            <span>2026 / 05 / 31 (土)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">TIME</span>
            <span>11:00 – 13:00</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">FORMAT</span>
            <span>Online (Zoom)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">PRICE</span>
            <span>¥5,000</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full
            hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
        >
          申し込む
          <span className="font-mono text-xs tracking-[0.2em]">↗</span>
        </a>

        {/* hint */}
        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40">
          Google フォームでお申し込みください
        </p>
      </div>

      {/* === 下端: スクロールヒント === */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/40 flex flex-col items-center gap-2">
        <span>scroll</span>
        <span className="w-px h-10 bg-cream/30" />
      </div>
    </section>
  );
}
