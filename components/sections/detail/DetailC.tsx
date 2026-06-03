"use client";

/**
 * Detail Variant C — タイポ縦並びミニマル (中央寄せ)
 * 日程・形式・料金 を均等な縦リズム + 罫線で淡々と並べる、Linear設定ページ風
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const rows = [
  { label: "Date", value: "6/14 (日) 11:00–13:00  ·  7/8 (水) 19:00–21:00" },
  { label: "Format", value: "Online (Zoom)" },
  { label: "Price", value: "¥5,000 (税抜) / セミナー1回完結" },
  { label: "Open", value: "開始10分前" },
];

export default function DetailC() {
  return (
    <DarkSection id="detail" bgImage="/images/backdrop/bd_b.jpg" className="py-20 sm:py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Detail</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-cream mb-10" style={{ letterSpacing: "-0.01em" }}>
          開催の詳細
        </h2>

        <div className="divide-y divide-cream/15 border-y border-cream/20">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="py-5 sm:py-6"
            >
              <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-1.5">
                {r.label}
              </p>
              <p className="font-serif text-base sm:text-lg font-semibold text-cream" style={{ letterSpacing: "-0.005em" }}>
                {r.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <a href="#apply" className="inline-flex items-center gap-2 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_40px_rgba(217,119,87,0.45)]">
            お申込みへ進む
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
