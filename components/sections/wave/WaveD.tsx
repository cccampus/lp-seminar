"use client";

/**
 * Wave Variant D — USA → JAPAN マップ概念 (地理的視覚化)
 * 左にUSA「もう動いている」、右にJAPAN「7年遅れ」、中央に矢印
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function WaveD() {
  return (
    <DarkSection id="wave" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">The Wave</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-16" style={{ letterSpacing: "-0.01em" }}>
          いま、世界で起きていること。
        </h2>

        {/* USA → JAPAN 2 panel */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-10 gap-x-6 items-center">
          {/* USA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right border-l-2 border-coral md:border-l-0 md:border-r-2 pl-5 md:pr-7 md:pl-0"
          >
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral/85 mb-3">USA · NOW</p>
            <p
              className="font-serif font-bold text-cream leading-tight mb-2"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}
            >
              もう動いている。
            </p>
            <p className="text-sm sm:text-base text-cream/75 leading-relaxed">
              銀行・保険・商社、事務作業 <span className="text-coral font-semibold">約50%</span> がAIに置き換わり始めた。
            </p>
          </motion.div>

          {/* 矢印 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="hidden md:block">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <path d="M5 30 Q40 5 75 30" stroke="var(--color-coral)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M75 30 l-10 -4 l3 4 l-3 4 z" fill="var(--color-coral)" />
              </svg>
            </div>
            <div className="md:hidden text-coral text-3xl rotate-90">→</div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-cream/55 mt-2 whitespace-nowrap">7年遅れ</p>
          </motion.div>

          {/* JAPAN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left border-l-2 border-coral pl-5 md:pl-7"
          >
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral/85 mb-3">JAPAN · NOW</p>
            <p
              className="font-serif font-bold text-cream leading-tight mb-2"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}
            >
              ここ数ヶ月で動き出した。
            </p>
            <p className="text-sm sm:text-base text-cream/75 leading-relaxed">
              <span className="text-coral font-semibold">NEC・JR・楽天・メルカリ</span> 大手も一斉に AI 業務導入を発表。
            </p>
          </motion.div>
        </div>

        {/* 結論 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center font-serif text-2xl sm:text-4xl font-bold text-cream leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          今動くか、5年後追いかけるか。
          <br />
          その差は、<span className="text-coral">桁が違う</span>。
        </motion.p>
      </div>
    </DarkSection>
  );
}
