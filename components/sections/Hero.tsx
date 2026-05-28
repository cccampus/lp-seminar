import HeroMetaSwitcher from "@/components/sections/hero-meta/HeroMetaSwitcher";
import HeroCopyC from "@/components/sections/hero-copy/HeroCopyC";
import HeroBgSwitcher from "@/components/sections/hero-bg/HeroBgSwitcher";

/**
 * Hero — v3.3 コピー C案 + 背景 VariantSwitcher (?preview=1 で5案切替)
 */
const APPLY_HREF = "#apply";
const DETAIL_HREF = "#detail";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-sumi-deep text-cream py-20 sm:py-24">
      {/* === 背景 VariantSwitcher (?preview=1 で5案切替、通常時は A=Aurora 固定) === */}
      <HeroBgSwitcher />

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

        {/* 主タイトル + サブコピー + 補足 — C案採用 */}
        <HeroCopyC />

        {/* メタ情報 */}
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
