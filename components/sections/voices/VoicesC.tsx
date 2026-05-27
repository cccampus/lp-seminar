"use client";

/**
 * Voices (横スワイプカルーセル・採用版)
 * 紀洋さんFB 2026-05-27 反映:
 *   - 前のCases版とは違う装飾(Casesは上端dot+hairline、こちらは上下罫線+大引用符)
 *   - カード内の空白圧縮(min-h削除、padding圧縮、内側ボーダー排除)
 */
import DarkSection from "@/components/ui/DarkSection";
import { voices } from "./voices-data";

export default function VoicesC() {
  return (
    <DarkSection
      id="voices"
      aria-labelledby="voices-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 mb-10 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
        <h2
          id="voices-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream"
          style={{ letterSpacing: "-0.01em" }}
        >
          参加された方の、
          <br />
          リアルな声。
        </h2>
        <p className="mt-5 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/55">
          ← Swipe to read all {voices.length} voices →
        </p>
      </div>

      <div
        className="snap-x snap-mandatory overflow-x-auto scroll-smooth pb-6 px-6"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-4 sm:gap-5 w-max">
          {voices.map((v, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[78vw] sm:w-[420px] flex flex-col py-5 sm:py-6 px-5 sm:px-6 border-y border-coral/30 bg-cream/[0.03] relative"
            >
              {/* 大引用符 (decorative) */}
              <span
                aria-hidden
                className="absolute top-1 right-3 font-serif text-coral/25 leading-none select-none pointer-events-none"
                style={{ fontSize: "72px" }}
              >
                "
              </span>

              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2 relative z-10">
                Voice {String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
              </p>
              <p className="font-serif text-sm sm:text-base text-cream leading-relaxed relative z-10">
                {v.quote}
              </p>
              <div className="mt-3 pt-3 border-t border-cream/10 flex items-baseline gap-2 relative z-10">
                <span className="h-px w-5 bg-coral self-center" />
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-cream/70">
                  {v.initial} / {v.age} / {v.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
