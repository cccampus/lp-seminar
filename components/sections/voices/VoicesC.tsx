"use client";

/**
 * Voices (Marquee 2行自動横スクロール・採用版)
 * 紀洋FB 2026-05-27 反映:
 *   - PC でもスワイプの必要なく自動で流れる Marquee 形式に変更
 *   - 装飾はVoices独自 (上下罫線 + 大引用符) でCasesと差別化
 *   - hover/touch でpause
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { motion } from "motion/react";
import { voices } from "./voices-data";

function VoiceCard({ v }: { v: typeof voices[number] }) {
  return (
    <article className="shrink-0 w-[320px] sm:w-[400px] min-h-[200px] sm:min-h-[210px] flex flex-col justify-between py-5 sm:py-6 px-5 sm:px-6 border-y border-coral/30 bg-cream/[0.03] relative overflow-hidden">
      {/* 右上の大引用符 (サイズ縮小・本文と被らないよう pr-10 で右余白確保) */}
      <span
        aria-hidden
        className="absolute top-2 right-3 font-serif text-coral/30 leading-none select-none pointer-events-none"
        style={{ fontSize: "40px" }}
      >
        "
      </span>
      <p className="font-serif text-sm sm:text-base text-cream leading-relaxed relative z-10 pr-10">
        {v.quote}
      </p>
      <div className="mt-3 pt-3 border-t border-cream/10 flex items-baseline gap-2 relative z-10">
        <span className="h-px w-5 bg-coral self-center" />
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-cream/70">
          {v.initial} / {v.age} / {v.role}
        </p>
      </div>
    </article>
  );
}

export default function VoicesC() {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(voices.length / 2);
  const row1 = voices.slice(0, half);
  const row2 = voices.slice(half);

  return (
    <DarkSection
      id="voices"
      aria-labelledby="voices-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
        <h2
          id="voices-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream"
          style={{ letterSpacing: "-0.01em" }}
        >
          参加された方の、
          <br />
          リアルな声。
        </h2>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {[row1, row2].map((rowData, ri) => {
          const doubled = [...rowData, ...rowData];
          const duration = ri === 0 ? 70 : 85;
          const xRange: [string, string] = ri === 0 ? ["0%", "-50%"] : ["-50%", "0%"];
          return (
            <div key={ri} className="relative w-full overflow-hidden py-3">
              <motion.div
                className="flex w-max items-stretch gap-5 sm:gap-6"
                style={{ willChange: "transform" }}
                animate={paused ? {} : { x: xRange }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
              >
                {doubled.map((v, i) => (
                  <VoiceCard key={`${ri}-${i}`} v={v} />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-cream/45">
        {voices.length} voices · hover to pause
      </p>

    </DarkSection>
  );
}
