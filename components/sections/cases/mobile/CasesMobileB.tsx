"use client";

/**
 * Cases Mobile B — 横snap カルーセル (1枚フォーカス、スワイプで進む)
 */
import DarkSection from "@/components/ui/DarkSection";
import { outcomes } from "../cases-data";

export default function CasesMobileB() {
  return (
    <DarkSection id="cases" bgImage="/images/backdrop/bd_b.jpg" className="py-20 overflow-x-hidden">
      <div className="max-w-md mx-auto px-5 mb-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Cases</p>
        <h2 className="font-serif font-semibold leading-tight text-cream mb-5 heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、
          <br />
          こんな景色が見え始めています。
        </h2>
        <p className="text-sm leading-relaxed text-cream/80 body-ja">
          あなたの業種が無くても大丈夫。
          <br />
          当日、業種に合わせて景色をお見せします。
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/45">
          ← Swipe →
        </p>
      </div>

      <div className="snap-x snap-mandatory overflow-x-auto scroll-smooth pb-6 px-5" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-3 w-max">
          {outcomes.map((o, i) => (
            <article key={i} className="snap-center shrink-0 w-[78vw] border-y border-coral/30 bg-cream/[0.04] p-5 flex flex-col min-h-[170px]">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2">
                {String(i + 1).padStart(2, "0")} / {String(outcomes.length).padStart(2, "0")}
              </p>
              <p className="font-serif text-lg font-semibold text-cream leading-tight mb-3" style={{ letterSpacing: "-0.01em" }}>
                {o.title}
              </p>
              <p className="text-sm leading-relaxed text-cream/80 body-ja">
                {o.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 mt-10 text-center">
        <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
          お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
        </a>
      </div>
    </DarkSection>
  );
}
