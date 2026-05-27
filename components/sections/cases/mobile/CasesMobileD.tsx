"use client";

/**
 * Cases Mobile D — タブ切替 (8業種から1選択、選択した業種だけ大型表示)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { outcomes } from "../cases-data";

export default function CasesMobileD() {
  const [active, setActive] = useState(0);
  const cur = outcomes[active];

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
          業種が無くても大丈夫。<br />当日、業種に合わせてお見せします。
        </p>

        {/* タブバー (横スクロール) */}
        <div className="overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-2 w-max">
            {outcomes.map((o, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono tracking-[0.1em] border transition-colors ${
                  i === active ? "bg-coral text-cream border-coral" : "bg-transparent text-cream/70 border-cream/30"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* 選択業種の本文 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.4 }}
            className="border-y border-coral/30 bg-cream/[0.04] p-5 min-h-[180px] flex flex-col justify-center"
          >
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2">
              Case {String(active + 1).padStart(2, "0")}
            </p>
            <p className="font-serif text-xl font-semibold text-cream leading-tight mb-3" style={{ letterSpacing: "-0.01em" }}>
              {cur.title}
            </p>
            <p className="text-sm leading-relaxed text-cream/85 body-ja">
              {cur.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
