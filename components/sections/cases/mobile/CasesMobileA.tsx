"use client";

/**
 * Cases Mobile A — 縦stack + 1本貫通縦線(border) + dot + motion fade-in
 * TracingBeam は計測タイミング問題でスマホ短いビューポートで動かないことがあるため、
 * CSS 罫線 + 各カードに dot で確実に表示。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { outcomes } from "../cases-data";

export default function CasesMobileA() {
  return (
    <DarkSection id="cases" bgImage="/images/backdrop/bd_b.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3 text-center">Cases</p>
        <h2 className="font-serif font-semibold leading-tight text-center text-cream mb-5 heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、
          <br />
          こんな景色が見え始めています。
        </h2>
        <p className="text-sm leading-relaxed text-center text-cream/80 mb-10">
          あなたの業種が無くても大丈夫。
          <br />
          当日、業種に合わせて景色をお見せします。
        </p>

        {/* 8業種を縦に貫通する1本の coral 縦線 + 各 article 頭に dot */}
        <ol className="relative pl-7 border-l border-coral/40">
          {outcomes.map((o, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative py-5 first:pt-0 last:pb-0"
            >
              {/* dot (縦線上に乗る) */}
              <motion.span
                aria-hidden
                className="absolute -left-[33px] top-6 h-3 w-3 rounded-full bg-coral"
                style={{ boxShadow: "0 0 10px rgba(217,119,87,0.7), 0 0 18px rgba(217,119,87,0.4)" }}
                initial={{ scale: 0.4, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }}
              />
              <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-2">
                Case 0{i + 1}
              </p>
              <p className="font-serif text-base font-semibold text-cream leading-tight mb-2" style={{ letterSpacing: "-0.01em" }}>
                {o.title}
              </p>
              <p className="text-xs leading-relaxed text-cream/80">
                {o.body}
              </p>
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, delay: i * 0.06 + 0.25 }}
                className="mt-4 h-px bg-gradient-to-r from-coral/60 via-coral/15 to-transparent origin-left"
              />
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
