"use client";

/**
 * Cases Mobile E — 2x4 grid (コンパクト網羅、一画面で全業種)
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { outcomes } from "../cases-data";

export default function CasesMobileE() {
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

        <div className="grid grid-cols-2 gap-2.5">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="relative border-t border-coral/40 bg-cream/[0.04] p-3.5 min-h-[140px] flex flex-col"
            >
              <span className="absolute -top-px left-0 h-px w-1/3 bg-coral" />
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-coral/85 mb-1.5">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-serif text-sm font-semibold text-cream leading-tight mb-2" style={{ letterSpacing: "-0.005em" }}>
                {o.title}
              </p>
              <p className="text-[11px] leading-relaxed text-cream/75 body-ja">
                {o.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
