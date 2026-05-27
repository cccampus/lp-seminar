"use client";

/**
 * WhyPaid Variant B — Split (左:理由 / 右:カーネマン引用)
 * Linear/Stripe Pricing 風2カラム
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function WhyPaidB() {
  return (
    <DarkSection id="why-paid" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Why Paid</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream mb-14" style={{ letterSpacing: "-0.01em" }}>
          なぜ、有料なのか。
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* 左: 理由本文 */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-base sm:text-lg leading-loose text-cream/85"
          >
            <p>
              無料のセミナーは、世の中にたくさんあります。
              それでも、私たちは <strong className="text-coral font-semibold">¥5,000</strong> でお願いしています。
            </p>
            <p>
              理由はシンプルです。
              <br />
              <strong className="text-cream font-semibold">本気で一歩踏み出す方と、密度の濃い2時間を過ごしたい。</strong>
            </p>
            <p>
              有料を選んだあなたが「来てよかった」と思える時間を、私たちも責任を持って作る。そのためのお支払いです。
            </p>
            <p className="pt-6 border-t border-cream/15">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-cream leading-relaxed">
                5,000円は、6ヶ月後のあなたを買う<br className="hidden sm:block" />
                <span className="text-coral">最初の初期投資費用</span>です。
              </span>
            </p>
          </motion.div>

          {/* 右: カーネマン引用 (sticky風カード) */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:sticky lg:top-24 border-l-2 border-coral/60 pl-6 sm:pl-8 py-2"
          >
            <span className="block font-serif text-coral opacity-30 leading-none mb-2" style={{ fontSize: "clamp(60px, 9vw, 100px)" }}>
              "
            </span>
            <p className="font-serif text-lg sm:text-2xl font-medium text-cream/90 leading-snug">
              人は、手に入れる喜びよりも、失う痛みのほうを、はるかに大きく感じる。
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-cream/55">
              — Daniel Kahneman / 行動経済学者
            </p>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              いちど払った投資は、無駄にしたくなくなる。<span className="text-coral">その「損したくない」気持ちが、人を本気にさせる。</span>
            </p>
          </motion.aside>
        </div>

        <div className="mt-16 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            2時間、一緒に過ごす
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
