"use client";

/**
 * Detail Variant B — チケット風 (1枚の券面)
 * Apple Wallet / Eventbrite風、左に日程・右に詳細、点線で切り取り感
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

export default function DetailB() {
  return (
    <DarkSection id="detail" bgImage="/images/backdrop/bd_b.jpg" className="py-20 sm:py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Detail</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-cream mb-10" style={{ letterSpacing: "-0.01em" }}>
          開催の詳細
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto"
        >
          {[
            { day: "7/8", weekday: "水", time: "19:00 – 21:00" },
            { day: "7/26", weekday: "日", time: "11:00 – 13:00" },
          ].map((t, i) => (
            <div key={i} className="relative bg-cream/[0.04] border border-cream/15 overflow-hidden">
              {/* ticket notch */}
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sumi-deep" aria-hidden />
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sumi-deep" aria-hidden />
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-6 py-7">
                <div className="text-left border-r border-cream/15 pr-4">
                  <p className="font-serif font-bold text-cream leading-none" style={{ fontSize: "44px", letterSpacing: "-0.04em" }}>
                    {t.day}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-coral">{t.weekday}</p>
                </div>
                <div className="text-left">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85 mb-1">Time</p>
                  <p className="font-serif text-base font-semibold text-cream">{t.time}</p>
                  <p className="mt-2 text-xs text-cream/60">Online · Zoom · ¥5,000(税抜)</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 当日見せるもの — chip風 (DetailA流用) */}
        <div className="mt-10">
          <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mb-4">When You're There</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              "AIが業務に乗る景色 (実画面)",
              "あなたの業種への応用イメージ",
              "Q&A 時間あり (ライブのみ)",
              "明日触りたくなる、最初の一歩",
            ].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 text-xs sm:text-sm text-cream/85">
                <span className="h-1 w-1 rounded-full bg-coral" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <a href="#apply" className="inline-flex items-center gap-2 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_40px_rgba(217,119,87,0.45)]">
            お申込みへ進む
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>

        {/* 日程合わない場合の対応 (機会損失防止 + ライブ優先設計) */}
        <div className="mt-14 max-w-2xl mx-auto px-6 py-6 border-t border-cream/10">
          <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/75 mb-3">
            If Schedule Doesn't Fit
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-cream/65">
            上記の日程がご都合つかない場合、月2-3回ペースで日程を順次追加していきます。
            <br />
            アーカイブ視聴 (限定URL / 7日間) でのご参加も個別にご相談いただけますので、
            <a href="/contact" className="text-coral/85 hover:text-coral underline underline-offset-2 mx-1">
              お問い合わせ
            </a>
            よりご連絡ください。
          </p>
        </div>
      </div>
    </DarkSection>
  );
}
