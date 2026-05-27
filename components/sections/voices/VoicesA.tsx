"use client";

/**
 * Voices Variant A — 大引用ローテーター
 * 中央に1つを大きく見せ、自動切替+矢印。Anthropic/Linear系・信頼形成に強い。
 */
import DarkSection from "@/components/ui/DarkSection";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { voices } from "./voices-data";

export default function VoicesA() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % voices.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const v = voices[i];

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream mb-14" style={{ letterSpacing: "-0.01em" }}>
          参加された方の、<br />リアルな声。
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[260px] sm:min-h-[300px] flex flex-col items-center justify-center"
          >
            <p
              className="font-serif font-medium text-cream leading-snug max-w-3xl"
              style={{ fontSize: "clamp(20px, 3vw, 36px)", letterSpacing: "-0.01em" }}
            >
              「{v.quote}」
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-coral" />
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-cream/85">
                {v.initial} / {v.age} / {v.role}
              </p>
              <div className="h-px w-12 bg-coral" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 進捗ドット */}
        <div className="mt-12 flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto">
          {voices.map((_, j) => (
            <button
              key={j}
              type="button"
              onClick={() => setI(j)}
              aria-label={`Voice ${j + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === j ? "bg-coral w-8" : "bg-cream/25 w-1.5 hover:bg-cream/45"}`}
            />
          ))}
        </div>

        {/* 矢印 */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setI((x) => (x - 1 + voices.length) % voices.length)}
            className="text-cream/60 hover:text-coral font-mono text-sm transition-colors"
            aria-label="前へ"
          >
            ← Prev
          </button>
          <span className="font-mono text-xs text-cream/45 tracking-[0.2em]">
            {String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setI((x) => (x + 1) % voices.length)}
            className="text-cream/60 hover:text-coral font-mono text-sm transition-colors"
            aria-label="次へ"
          >
            Next →
          </button>
        </div>
      </div>
    </DarkSection>
  );
}
