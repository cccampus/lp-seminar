/**
 * FinalCTA — 最後の申込導線（二段階）
 * - 主 CTA: 個人申込 ¥5,000
 * - 副 CTA: 法人 2 名以上の相談（mailto）
 *   → 「法人で参加できる」選択肢を見せるだけで価格感が変わる（リサーチ agent 指摘）
 * - Hero と対の dark セクション + cinematic 背景画像 + ambient coral 光 + grain
 */
import Image from "next/image";

const GOOGLE_FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"; // 仮
const CORPORATE_MAIL = "hello@cccampus.jp";

export default function FinalCTA() {
  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="relative w-full bg-sumi-deep text-cream overflow-hidden py-32 sm:py-40 px-6"
    >
      {/* cinematic 背景画像（Krea Flux 1.1 Pro 生成 / 右上 coral spotlight + 床反射）
          Hero と対の dark stage。sumi-deep 上に opacity で馴染ませる */}
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden>
        <Image
          src="/images/finalcta/cinematic_cta_bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* コントラスト確保: 中央を僅かに沈める overlay（テキスト可読性） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,31,31,0.55) 0%, rgba(31,31,31,0.15) 60%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ambient コーラル光（左下のみ — 右上は背景画像の spotlight に委ねる） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
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

        {/* メタ情報 — 小さい coral ラベル + 大きな serif 値で可読性UP */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-cream/12">
          {[
            { k: "DATE", v: "2026.05.31", sub: "日" },
            { k: "TIME", v: "11:00–13:00", sub: "2時間" },
            { k: "PRICE", v: "¥5,000", sub: "税込" },
          ].map((m) => (
            <div key={m.k} className="py-5 sm:py-0 sm:px-6 flex flex-col items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold">
                {m.k}
              </span>
              <span
                className="font-serif text-2xl sm:text-3xl font-semibold text-cream leading-none [word-break:keep-all]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {m.v}
                <span className="ml-1.5 align-baseline text-base font-normal text-cream/50">
                  （{m.sub}）
                </span>
              </span>
            </div>
          ))}
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
            href={`mailto:${CORPORATE_MAIL}?subject=CCC%20%E3%82%BB%E3%83%9F%E3%83%8A%E3%83%BC%20%E6%B3%95%E4%BA%BA%E5%8F%82%E5%8A%A0%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87`}
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
