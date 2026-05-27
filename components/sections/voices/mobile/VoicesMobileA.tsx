"use client";

/**
 * Voices Mobile A — 大引用ローテーター (1つを大きく中央、自動切替+矢印)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { voices } from "../voices-data";

export default function VoicesMobileA() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % voices.length), 5000);
    return () => clearInterval(t);
  }, [paused]);
  const v = voices[i];

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto text-center" onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
        <h2 className="font-serif font-semibold leading-tight text-cream mb-10 heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
            className="min-h-[220px] flex flex-col items-center justify-center"
          >
            <p className="font-serif text-base text-cream leading-relaxed body-ja">
              「{v.quote}」
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-coral" />
              <p className="font-mono text-[11px] tracking-[0.18em] text-cream/85">
                {v.initial} / {v.age} / {v.role}
              </p>
              <div className="h-px w-8 bg-coral" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-1 flex-wrap">
          {voices.map((_, j) => (
            <button
              key={j}
              type="button"
              onClick={() => setI(j)}
              aria-label={`Voice ${j + 1}`}
              className={`h-1 rounded-full transition-all ${i === j ? "bg-coral w-5" : "bg-cream/25 w-1"}`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-5">
          <button type="button" onClick={() => setI((x) => (x - 1 + voices.length) % voices.length)} className="text-cream/60 font-mono text-xs">← Prev</button>
          <span className="font-mono text-[10px] text-cream/45 tracking-[0.2em]">{String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => setI((x) => (x + 1) % voices.length)} className="text-cream/60 font-mono text-xs">Next →</button>
        </div>
      </div>
    </DarkSection>
  );
}
