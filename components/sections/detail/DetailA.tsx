"use client";

/**
 * Detail Variant A — 1段の罫線インフォボード (中央寄せ、空白圧縮)
 * 日程2つ・形式・料金 を4セル + 罫線で1枚にまとめる。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function DetailA() {
  return (
    <DarkSection id="detail" bgImage="/images/backdrop/bd_b.jpg" className="py-20 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Detail</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-cream mb-10" style={{ letterSpacing: "-0.01em" }}>
          開催の詳細
        </h2>

        {/* 4セル 罫線 grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 border-y border-cream/20 divide-x divide-cream/15"
        >
          {[
            { label: "Date 1", value: "6/14 (日)", sub: "11:00 – 13:00" },
            { label: "Date 2", value: "7/8 (水)", sub: "19:00 – 21:00" },
            { label: "Format", value: "Online", sub: "Zoom" },
            { label: "Price", value: "¥5,000", sub: "(税抜)" },
          ].map((c, i) => (
            <div key={i} className="py-7 sm:py-9 px-3 flex flex-col items-center justify-center">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85 mb-2">{c.label}</p>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-cream leading-tight" style={{ letterSpacing: "-0.01em" }}>
                {c.value}
              </p>
              <p className="mt-1 text-xs text-cream/60">{c.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* 当日見せるもの・コンパクト */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {["AIが業務に乗る景色 (実画面)", "あなたの業種への応用イメージ", "明日触りたくなる、最初の一歩"].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 text-xs sm:text-sm text-cream/85">
              <span className="h-1 w-1 rounded-full bg-coral" /> {t}
            </span>
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
