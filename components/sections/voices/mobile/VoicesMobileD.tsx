"use client";

/**
 * Voices Mobile D — 縦stack + 展開式
 * 初期表示は 4 voices (約1画面分)、「もっと見る」で全16表示
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { voices } from "../voices-data";

const INITIAL = 4;

export default function VoicesMobileD() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? voices : voices.slice(0, INITIAL);
  const remaining = voices.length - INITIAL;

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
          <h2 className="font-serif font-semibold leading-tight text-cream heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
            参加された方の、<br />リアルな声。
          </h2>
        </div>

        <div className="divide-y divide-cream/10">
          {shown.map((v, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.03 * (i % 4) }}
              className="py-5 relative"
            >
              <span aria-hidden className="absolute top-3 right-1 font-serif text-coral/25 leading-none" style={{ fontSize: "30px" }}>"</span>
              <p className="font-serif text-sm text-cream leading-relaxed pr-8">
                {v.quote}
              </p>
              <p className="mt-2.5 font-mono text-[10px] tracking-[0.15em] text-cream/60">
                — {v.initial} / {v.age} / {v.role}
              </p>
            </motion.article>
          ))}
        </div>

        {/* もっと見る ボタン (おしゃれ) */}
        {!expanded && remaining > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-coral/40 rounded-full text-cream hover:border-coral hover:bg-coral/10 transition-all duration-300"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
                さらに <span className="text-coral font-semibold">{remaining}</span> 名の声を読む
              </span>
              <span className="text-coral text-base transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </button>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40">
              {INITIAL} / {voices.length} shown
            </p>
          </div>
        )}

        {/* 展開後の閉じるボタン (option) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  document.getElementById("voices")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/55 hover:text-coral transition-colors"
              >
                ↑ 閉じる
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DarkSection>
  );
}
