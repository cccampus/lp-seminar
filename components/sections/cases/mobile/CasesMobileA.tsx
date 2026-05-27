"use client";

/**
 * Cases Mobile A — 縦stack 1列 (シンプル、各業種を大きく)
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
        <p className="text-sm leading-relaxed text-center text-cream/80 mb-10 body-ja">
          あなたの業種が無くても大丈夫。
          <br />
          当日、あなたの業種に合わせて景色をお見せします。
        </p>

        <div className="space-y-5">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="relative pl-4 border-l-2 border-coral/50 py-2"
            >
              <span className="absolute -left-1.5 top-3 h-2.5 w-2.5 rounded-full bg-coral" style={{ boxShadow: "0 0 6px rgba(217,119,87,0.7)" }} />
              <p className="font-serif text-base font-semibold text-cream leading-tight" style={{ letterSpacing: "-0.01em" }}>
                {o.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-cream/75 body-ja">
                {o.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
