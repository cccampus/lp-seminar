"use client";

/**
 * Cases Mobile C — アコーディオン (業種名タップで本文展開、コンパクト)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { outcomes } from "../cases-data";

export default function CasesMobileC() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <DarkSection id="cases" bgImage="/images/backdrop/bd_b.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3 text-center">Cases</p>
        <h2 className="font-serif font-semibold leading-tight text-center text-cream mb-5 heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、
          <br />
          こんな景色が見え始めています。
        </h2>
        <p className="text-sm leading-relaxed text-center text-cream/80 mb-8 body-ja">
          業種が無くても大丈夫。当日、業種に合わせてお見せします。
        </p>

        <ul className="divide-y divide-cream/15 border-y border-cream/20">
          {outcomes.map((o, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-4 flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-coral/85">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-serif text-base font-semibold text-cream" style={{ letterSpacing: "-0.005em" }}>{o.title}</span>
                  <span className={`text-coral text-lg transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <p className="text-sm leading-relaxed text-cream/85 pb-5 pl-8 body-ja">
                    {o.body}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
