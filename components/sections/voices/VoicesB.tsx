"use client";

/**
 * Voices Variant B — Marquee 2行逆方向
 * 22人の声を上下2行で自動横スクロール。動き・印象強い・コンパクト。
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { voices } from "./voices-data";

function VoiceCard({ v, i }: { v: typeof voices[number]; i: number }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[360px] border-l-2 border-coral/60 bg-cream/[0.05] p-5">
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2">
        Voice {String(i + 1).padStart(2, "0")}
      </p>
      <p className="font-serif text-sm sm:text-base text-cream leading-relaxed">
        「{v.quote}」
      </p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.15em] text-cream/65">
        — {v.initial} / {v.age} / {v.role}
      </p>
    </div>
  );
}

export default function VoicesB() {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(voices.length / 2);
  const row1 = voices.slice(0, half);
  const row2 = voices.slice(half);
  const r1Doubled = [...row1, ...row1];
  const r2Doubled = [...row2, ...row2];

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream" style={{ letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>
      </div>

      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {[r1Doubled, r2Doubled].map((rowData, ri) => (
          <div key={ri} className="relative w-full overflow-hidden py-3">
            <div
              className="flex w-max items-stretch gap-4"
              style={{
                animation: `vmarquee${ri === 0 ? "" : "Rev"} ${ri === 0 ? 70 : 85}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {rowData.map((v, i) => (
                <VoiceCard key={`${ri}-${i}`} v={v} i={i % half} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes vmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes vmarqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </DarkSection>
  );
}
