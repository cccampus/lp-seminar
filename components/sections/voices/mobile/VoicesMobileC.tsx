"use client";

/**
 * Voices Mobile C — Marquee 2行逆方向 (PC版継承)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { voices } from "../voices-data";

function VoiceCard({ v }: { v: typeof voices[number] }) {
  return (
    <article className="shrink-0 w-[280px] min-h-[180px] flex flex-col justify-between py-4 px-4 border-y border-coral/30 bg-cream/[0.03] relative overflow-hidden">
      <span aria-hidden className="absolute top-2 right-3 font-serif text-coral/30 leading-none select-none pointer-events-none" style={{ fontSize: "36px" }}>"</span>
      <p className="font-serif text-sm text-cream leading-relaxed pr-8 body-ja">
        {v.quote}
      </p>
      <div className="mt-3 pt-3 border-t border-cream/10 flex items-baseline gap-2">
        <span className="h-px w-5 bg-coral self-center" />
        <p className="font-mono text-[10px] tracking-[0.15em] text-cream/70">
          {v.initial} / {v.age} / {v.role}
        </p>
      </div>
    </article>
  );
}

export default function VoicesMobileC() {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(voices.length / 2);
  const row1 = voices.slice(0, half);
  const row2 = voices.slice(half);

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 overflow-x-hidden">
      <div className="max-w-md mx-auto px-5 mb-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
        <h2 className="font-serif font-semibold leading-tight text-cream heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>
      </div>

      <div onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
        {[row1, row2].map((rowData, ri) => {
          const doubled = [...rowData, ...rowData];
          return (
            <div key={ri} className="relative w-full overflow-hidden py-2">
              <div
                className="flex w-max items-stretch gap-3"
                style={{
                  animation: `vmmarq${ri === 0 ? "" : "Rev"} ${ri === 0 ? 60 : 75}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                {doubled.map((v, i) => (
                  <VoiceCard key={`${ri}-${i}`} v={v} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes vmmarq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes vmmarqRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </DarkSection>
  );
}
