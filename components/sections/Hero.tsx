import Image from "next/image";
import RevealHeading from "@/components/ui/RevealHeading";
import HeroMetaSwitcher from "@/components/sections/hero-meta/HeroMetaSwitcher";

/**
 * Hero — v3.2 コピー / cinematic V2 ダークステージ
 * - 案A: 6ヶ月変化軸
 * - 「半年前、私もAIを使えませんでした。いま、AI で仕事をしています」
 * - cinematic_hero_bg.png (gpt-image-2 生成のダークステージ) を背景に統合
 */
const APPLY_HREF = "#apply";
const DETAIL_HREF = "#detail";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-sumi-deep text-cream py-20 sm:py-24">
      {/* === cinematic 背景画像 (ダークステージ) === */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/images/hero/cinematic_hero_bg.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-70"
        />
      </div>

      {/* === 暗グラデオーバーレイ === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(31,31,31,0.35) 0%, rgba(31,24,21,0.92) 100%)",
        }}
        aria-hidden
      />

      {/* === コーラル スポット === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 32% at 50% 38%, rgba(217,119,87,0.22) 0%, transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 15% 80%, rgba(184,93,64,0.14) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* === Grain === */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      {/* === Bottom seam (次セクションへ繋ぐダークフェード) === */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(31,31,31,0.6) 55%, var(--color-sumi-deep) 100%)",
        }}
        aria-hidden
      />

      {/* === Content === */}
      <div className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* eyebrow */}
        <p className="font-mono text-sm sm:text-base tracking-[0.3em] uppercase text-coral/90 mb-8">
          Claude Code 実践セミナー
        </p>

        {/* 主タイトル */}
        <RevealHeading
          as="h1"
          stagger={0.026}
          className="font-serif font-semibold leading-[1.5] sm:leading-[1.35] mx-auto heading-ja"
          style={{
            fontSize: "clamp(20px, 5.4vw, 56px)",
            letterSpacing: "0em",
          }}
        >
          <span className="block">
            半年前、私もAIを
            <br className="sm:hidden" />
            使えませんでした。
          </span>
          <span className="block mt-2 sm:mt-3">
            いま、
            <span className="text-coral italic font-normal">
              AIで仕事をしています
            </span>
            。
          </span>
        </RevealHeading>

        {/* サブコピー */}
        <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
          たった6ヶ月で、毎日の仕事がここまでラクになる。
          <br />
          その景色を、2時間でお見せします。
        </p>

        {/* Claude Code 補足説明 */}
        <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
          * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
        </p>

        {/* メタ情報 — VariantSwitcher (?preview=1 で 5案切替) */}
        <HeroMetaSwitcher />

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={APPLY_HREF}
            className="inline-flex items-center gap-3 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_40px_rgba(217,119,87,0.45)]"
          >
            お申込みへ進む
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
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
