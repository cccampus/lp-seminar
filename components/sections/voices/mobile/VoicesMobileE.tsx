"use client";

/**
 * Voices Mobile E — アコーディオン (イニシャル+業種タップで quote 開く)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { voices } from "../voices-data";

export default function VoicesMobileE() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
          <h2 className="font-serif font-semibold leading-tight text-cream heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
            参加された方の、<br />リアルな声。
          </h2>
        </div>

        <ul className="divide-y divide-cream/15 border-y border-cream/20">
          {voices.map((v, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left py-3.5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-coral/85 shrink-0 w-12">{v.initial}</span>
                  <span className="flex-1 font-mono text-[11px] tracking-[0.1em] text-cream/80 leading-tight">
                    {v.age} · {v.role}
                  </span>
                  <span className={`text-coral text-lg transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <p className="text-sm leading-relaxed text-cream/90 pb-5 pl-3 border-l-2 border-coral/40 body-ja">
                    {v.quote}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </DarkSection>
  );
}
