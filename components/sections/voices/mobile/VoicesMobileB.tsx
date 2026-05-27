"use client";

/**
 * Voices Mobile B — 横snap カルーセル (1枚フォーカス、スワイプ進む)
 */
import DarkSection from "@/components/ui/DarkSection";
import { voices } from "../voices-data";

export default function VoicesMobileB() {
  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 overflow-x-hidden">
      <div className="max-w-md mx-auto px-5 mb-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
        <h2 className="font-serif font-semibold leading-tight text-cream heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/45">
          ← Swipe to read all {voices.length} →
        </p>
      </div>

      <div className="snap-x snap-mandatory overflow-x-auto scroll-smooth pb-6 px-5" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-3 w-max">
          {voices.map((v, i) => (
            <article key={i} className="snap-center shrink-0 w-[80vw] min-h-[210px] flex flex-col justify-between py-5 px-5 border-y border-coral/30 bg-cream/[0.03] relative overflow-hidden">
              <span aria-hidden className="absolute top-2 right-3 font-serif text-coral/30 leading-none select-none pointer-events-none" style={{ fontSize: "40px" }}>"</span>
              <p className="font-serif text-sm text-cream leading-relaxed pr-10 body-ja">
                {v.quote}
              </p>
              <div className="mt-3 pt-3 border-t border-cream/10 flex items-baseline gap-2">
                <span className="h-px w-5 bg-coral self-center" />
                <p className="font-mono text-[10px] tracking-[0.15em] text-cream/70">
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
