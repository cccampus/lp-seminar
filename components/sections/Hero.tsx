import HeroMetaSwitcher from "@/components/sections/hero-meta/HeroMetaSwitcher";
import HeroCopyA from "@/components/sections/hero-copy/HeroCopyA";
import HeroBgB from "@/components/sections/hero-bg/HeroBgB";

/**
 * Hero — A案バリアント版 (feat/hero-copy-a-variant 専用)
 * - Bg: B案 Beams (main と同じ)
 * - Copy: A案 ベネフィット型 (「あなたが寝ている間に、AIが社員5人分の仕事を終えている」)
 * 本番 (main) は C案コピー。こちらは別alias (cc-seminar-scale.vercel.app) で運用
 */
const APPLY_HREF = "#apply";
const DETAIL_HREF = "#detail";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-sumi-deep text-cream py-20 sm:py-24">
      {/* === 背景 (B案 Beams 採用) === */}
      <HeroBgB />

      {/* === Bottom seam === */}
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
        <p className="font-mono text-sm sm:text-base tracking-[0.3em] uppercase text-coral/90 mb-8">
          Claude Code 実践セミナー
        </p>

        {/* A案 コピー */}
        <HeroCopyA />

        <HeroMetaSwitcher />

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
