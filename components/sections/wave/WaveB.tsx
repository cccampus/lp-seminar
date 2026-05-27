"use client";

/**
 * Wave Variant B — 大型タイポreveal (Apple keynote風)
 * 各メッセージを巨大font-serifで1ブロックずつドラマチックに表示
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const messages = [
  { line: "アメリカは、もう動いている。", note: "大手企業の事務作業 約50% がAIに" },
  { line: "日本は、約7年遅れ。", note: "NEC・JR・楽天・メルカリも一斉に動き出した" },
  { line: "この差は、もう取り返せない。", note: "今動くか、5年後追いかけるか。差は桁違いに。" },
];

export default function WaveB() {
  return (
    <DarkSection id="wave" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">The Wave</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-center text-cream mb-20" style={{ letterSpacing: "-0.01em" }}>
          いま、世界で起きていること。
        </h2>

        <div className="space-y-20 sm:space-y-28">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p
                className="font-serif font-bold text-cream leading-tight"
                style={{ fontSize: "clamp(32px, 6vw, 80px)", letterSpacing: "-0.02em" }}
              >
                {m.line}
              </p>
              <p className="mt-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-coral/85">
                — {m.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
