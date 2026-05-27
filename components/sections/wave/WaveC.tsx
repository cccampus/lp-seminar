"use client";

/**
 * Wave Variant C — 数字シネマ (Stripe Atlas / Bloomberg風)
 * 巨大な数字を中央に、その下にコンテキスト本文。データ感・説得力。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const stats = [
  {
    big: "約50%",
    title: "アメリカは、もう動いている。",
    body: "大手企業の事務作業の半分近くが AI に置き換わり始めた。秘書がやっていた書類づくり、メール返信、議事録。",
  },
  {
    big: "7年",
    title: "日本は、それだけ遅れている。",
    body: "ここ数ヶ月で急速に動き始めた。NEC、JR、楽天、メルカリ ─ 大手も一斉に。",
  },
  {
    big: "桁違い",
    title: "5年後、追いかけるのは至難。",
    body: "今動き始めるか、5年後に追いかけるか。その差は、桁が違う差になります。",
  },
];

export default function WaveC() {
  return (
    <DarkSection id="wave" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">The Wave · By the Numbers</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-center text-cream mb-16" style={{ letterSpacing: "-0.01em" }}>
          いま、世界で起きていること。
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-2"
            >
              <p
                className="font-serif font-bold text-coral leading-none mb-4"
                style={{ fontSize: "clamp(64px, 11vw, 144px)", letterSpacing: "-0.04em" }}
              >
                {s.big}
              </p>
              <p className="font-serif text-base sm:text-lg font-semibold text-cream leading-tight mb-3">
                {s.title}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-cream/70">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
