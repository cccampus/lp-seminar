"use client";

/**
 * WhyPaid Variant A — 大引用 center (NYT / Anthropic 引用ページ風)
 * カーネマン引用を巨大に中央へ、前後に短い導入と結論
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function WhyPaidA() {
  return (
    <DarkSection id="why-paid" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">Why Paid</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-16" style={{ letterSpacing: "-0.01em" }}>
          なぜ、有料なのか。
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base sm:text-lg text-cream/85 leading-loose text-center max-w-2xl mx-auto mb-20"
        >
          無料のセミナーは、世の中にたくさんあります。
          <br />
          それでも、私たちは <strong className="text-coral font-semibold">¥5,000</strong> でお願いしています。
        </motion.p>

        {/* 巨大引用 */}
        <motion.blockquote
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center my-20"
        >
          <span className="block font-serif text-coral opacity-40 leading-none mb-2" style={{ fontSize: "clamp(80px, 14vw, 180px)" }}>
            "
          </span>
          <p
            className="font-serif font-medium text-cream leading-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 60px)", letterSpacing: "-0.02em" }}
          >
            人は、手に入れる喜びよりも、
            <br />
            失う痛みのほうを、
            <br />
            はるかに大きく感じる。
          </p>
          <footer className="mt-8 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-cream/60">
            — Daniel Kahneman
          </footer>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-serif text-2xl sm:text-4xl font-semibold text-cream leading-snug mt-20"
          style={{ letterSpacing: "-0.02em" }}
        >
          5,000円は、
          <br className="sm:hidden" />
          <span className="text-coral">6ヶ月後のあなた</span>を買う。
        </motion.p>

        <div className="mt-14 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            2時間、一緒に過ごす
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
