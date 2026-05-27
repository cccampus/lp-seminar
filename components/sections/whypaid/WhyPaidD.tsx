"use client";

/**
 * WhyPaid Variant D — 罫線箱 (シンプル罫線 + 引用ブロック、Editorial)
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function WhyPaidD() {
  return (
    <DarkSection id="why-paid" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Why Paid</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream mb-12" style={{ letterSpacing: "-0.01em" }}>
          なぜ、有料なのか。
        </h2>

        <div className="space-y-6 text-base sm:text-lg leading-loose text-cream/85 border-t border-cream/20 pt-10">
          <p>
            無料のセミナーは、世の中にたくさんあります。
            それでも、私たちは <strong className="text-coral font-semibold">¥5,000</strong> でお願いしています。
          </p>
          <p>
            理由はシンプルです。<strong className="text-cream font-semibold">本気で一歩踏み出す方と、密度の濃い2時間を過ごしたい。</strong>
          </p>
        </div>

        {/* 罫線 quote box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="my-14 sm:my-20 border-y border-coral/40 py-10 sm:py-14"
        >
          <p
            className="font-serif font-medium text-cream leading-snug text-center"
            style={{ fontSize: "clamp(20px, 3vw, 36px)", letterSpacing: "-0.015em" }}
          >
            人は、手に入れる喜びよりも、
            <br className="hidden sm:block" />
            失う痛みのほうを、はるかに大きく感じる。
          </p>
          <p className="mt-6 text-center font-mono text-[11px] tracking-[0.25em] uppercase text-cream/55">
            — Daniel Kahneman
          </p>
        </motion.div>

        <p className="text-base sm:text-lg leading-loose text-cream/85">
          いちど払った投資は、無駄にしたくなくなる。
          <span className="text-coral">その「損したくない」気持ちが、人を本気にさせる。</span>
        </p>

        <div className="mt-16 text-center border-t border-cream/20 pt-12">
          <p className="font-serif text-2xl sm:text-4xl font-semibold text-cream leading-snug" style={{ letterSpacing: "-0.02em" }}>
            5,000円は、6ヶ月後のあなたを買う。
          </p>
          <p className="mt-4 font-serif text-lg sm:text-2xl text-cream/70">
            <span className="text-coral font-semibold">最初の初期投資費用</span>です。
          </p>
        </div>

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
