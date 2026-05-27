"use client";

/**
 * Cases Mobile A — 縦stack + TracingBeam (8業種を1本の貫通縦線で繋ぐ)
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { TracingBeam } from "@/components/aceternity/TracingBeam";
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

        <div className="relative pl-8">
          <TracingBeam>
            <div>
              {outcomes.map((o, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="py-5 first:pt-0 last:pb-0"
              >
                <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-2">
                  Case 0{i + 1}
                </p>
                <p className="font-serif text-base font-semibold text-cream leading-tight mb-2" style={{ letterSpacing: "-0.01em" }}>
                  {o.title}
                </p>
                <p className="text-xs leading-relaxed text-cream/80">
                  {o.body}
                </p>
                <div className="mt-4 h-px bg-gradient-to-r from-coral/60 via-coral/15 to-transparent" />
              </motion.article>
              ))}
            </div>
          </TracingBeam>
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
