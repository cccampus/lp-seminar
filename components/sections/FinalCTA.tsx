/**
 * FinalCTA — 最後の申込導線（二段階）
 * - 主 CTA: 個人申込 ¥5,000
 * - 副 CTA: 法人 2 名以上の相談（mailto）
 *   → 「法人で参加できる」選択肢を見せるだけで価格感が変わる（リサーチ agent 指摘）
 * - Hero と対の dark セクション + ambient coral 光 + grain
 */
const GOOGLE_FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"; // 仮
const CORPORATE_MAIL = "hello@cccampus.jp";

export default function FinalCTA() {
  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="relative w-full bg-sumi-deep text-cream overflow-hidden py-32 sm:py-40 px-6"
    >
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

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
          申込
        </p>

        {/* 主見出し */}
        <h2
          id="apply-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight"
        >
          2 時間で、
          <br />
          自社の <span className="text-coral italic font-normal">次の一手</span> を持ち帰る
        </h2>

        <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/75 max-w-xl mx-auto">
          先着 30 名。
          <br className="hidden sm:block" />
          申込確認後、Zoom URL と事前資料をお送りします
        </p>

        {/* メタ情報 */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center font-mono text-xs sm:text-sm tracking-[0.15em] uppercase text-cream/80">
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">DATE</span>
            <span>2026 / 05 / 31 (日)</span>
          </div>
          <span className="hidden sm:inline text-cream/30">·</span>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">TIME</span>
            <span>11:00 – 13:00</span>
          </div>
          <span className="hidden sm:inline text-cream/30">·</span>
          <div className="flex items-baseline gap-2">
            <span className="text-coral font-semibold">PRICE</span>
            <span>¥5,000</span>
          </div>
        </div>

        {/* === 主 CTA === */}
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 px-10 py-4 bg-coral text-cream font-medium text-base rounded-full
            hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
        >
          個人で参加する
          <span className="font-mono text-xs tracking-[0.2em]">↗</span>
        </a>

        <p className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
          Google フォームでお申し込みください
        </p>

        {/* === 副 CTA — 法人2名以上 === */}
        <div className="mt-16 pt-12 border-t border-cream/10 max-w-xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
            法人で参加する
          </p>
          <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
            2 名以上での参加・社内勉強会としての共有・録画の社内配布など、
            <br className="hidden sm:block" />
            個別にご相談ください
          </p>
          <a
            href={`mailto:${CORPORATE_MAIL}?subject=CCC%20Vol.1%20%E6%B3%95%E4%BA%BA%E5%8F%82%E5%8A%A0%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87`}
            className="mt-5 inline-flex items-center gap-2 text-coral-light hover:text-coral font-medium link-underline"
          >
            {CORPORATE_MAIL}
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
