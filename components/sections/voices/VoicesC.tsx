"use client";

/**
 * Voices Variant C — 横スワイプカルーセル (snap-x)
 * 仕様書通り。1〜1.5枚見え、スワイプ・ホイール対応。
 */
import DarkSection from "@/components/ui/DarkSection";
import { voices } from "./voices-data";

export default function VoicesC() {
  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream" style={{ letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>
        <p className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/55">
          ← Swipe to read all {voices.length} voices →
        </p>
      </div>

      <div className="snap-x snap-mandatory overflow-x-auto scroll-smooth pb-6 px-6"
        style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-5 sm:gap-7 w-max">
          {voices.map((v, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[85vw] sm:w-[480px] border-l-2 border-coral/60 bg-cream/[0.05] p-7 sm:p-9 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85 mb-3">
                  Voice {String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
                </p>
                <p className="font-serif text-base sm:text-lg text-cream leading-relaxed">
                  「{v.quote}」
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-coral" />
                <p className="font-mono text-[11px] tracking-[0.15em] text-cream/75">
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
