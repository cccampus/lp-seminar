/**
 * Hero — v3.2（紀洋さんFB全反映版）
 * - 案A：6ヶ月変化軸
 * - 「半年前、私もAIを使えませんでした。いま、AI で仕事をしています」
 * - Claude Code 補足説明1行
 */
const APPLY_HREF = "#apply";
const DETAIL_HREF = "#detail";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-sumi-deep text-cream py-20 sm:py-24">
      {/* === 暗グラデオーバーレイ === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(55,55,55,0.4) 0%, rgba(31,24,21,0.95) 100%)",
        }}
      />

      {/* === ambient コーラル光 === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 80% 20%, rgba(217,119,87,0.18) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 15% 80%, rgba(184,93,64,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* === Grain === */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* === Content === */}
      <div className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* 主タイトル */}
        <h1
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.01em" }}
        >
          半年前、
          <br className="sm:hidden" />
          私も AI を使えませんでした。
          <br />
          いま、
          <br className="sm:hidden" />
          <span className="text-coral italic font-normal">AI で仕事をしています</span>。
        </h1>

        {/* サブコピー */}
        <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-cream/80">
          たった6ヶ月で、毎日の仕事がここまでラクになる。
          <br className="hidden sm:block" />
          その景色を、2時間でお見せします。
        </p>

        {/* Claude Code 補足説明 */}
        <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
          * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
        </p>

        {/* メタ情報 */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-7 items-center font-mono text-xs sm:text-sm tracking-[0.15em] uppercase text-cream/85">
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">DATE</span>
            <span>2026 / 05 / 31 (日) · 6 / 3 (火)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">FORMAT</span>
            <span>Online (Zoom)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">PRICE</span>
            <span>¥5,000（税抜）</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={APPLY_HREF}
            className="inline-flex items-center gap-3 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
          >
            セミナー1回 ¥5,500（税込）で申し込む
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
          <a
            href={DETAIL_HREF}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/55 hover:text-coral transition-colors"
          >
            先に詳細だけ見る ↓
          </a>
        </div>
      </div>
    </section>
  );
}
