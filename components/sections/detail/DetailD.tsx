"use client";

/**
 * Detail Variant D — 大型タイポ・3段ヒーロー (劇場ポスター風 / 中央)
 * 日程巨大表示 → 形式 → 料金 を縦に大胆に積む
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function DetailD() {
  return (
    <DarkSection id="detail" bgImage="/images/backdrop/bd_b.jpg" className="py-20 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Detail</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-cream mb-10" style={{ letterSpacing: "-0.01em" }}>
          開催の詳細
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          {/* 日程ペア・特大 */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-2">Sessions</p>
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 border-y border-cream/20 py-5">
              <p className="font-serif font-semibold text-cream leading-none" style={{ fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: "-0.03em" }}>
                6/14 <span className="text-coral text-base sm:text-xl align-middle ml-1">日</span>
              </p>
              <p className="font-mono text-cream/45">·</p>
              <p className="font-serif font-semibold text-cream leading-none" style={{ fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: "-0.03em" }}>
                7/8 <span className="text-coral text-base sm:text-xl align-middle ml-1">水</span>
              </p>
            </div>
            <p className="mt-3 text-sm sm:text-base text-cream/65">
              6/14 — 11:00〜13:00  ·  7/8 — 19:00〜21:00
            </p>
          </div>

          {/* 形式 + 料金 横並び */}
          <div className="grid grid-cols-2 gap-3 border-b border-cream/20 pb-6 max-w-md mx-auto">
            <div>
              <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-1">Format</p>
              <p className="font-serif text-lg sm:text-xl font-semibold text-cream">Online (Zoom)</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-1">Price</p>
              <p className="font-serif text-lg sm:text-xl font-semibold text-cream">¥5,000 (税抜)</p>
            </div>
          </div>

          <div>
            <a href="#apply" className="inline-flex items-center gap-2 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_40px_rgba(217,119,87,0.45)]">
              お申込みへ進む
              <span className="font-mono text-xs tracking-[0.2em]">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </DarkSection>
  );
}
