"use client";

/**
 * Cases Variant B — Bento Grid 不均等
 * 8業種を重み付き不均等グリッドで配置。「業種なくても大丈夫」を中央セルに大胆配置。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const cells = [
  // [colSpan, rowSpan, title, body]
  { c: 2, r: 1, title: "マーケティング・SNS担当", body: "SNS投稿の素案づくりが、月150投稿で半日 → 30分に。" },
  { c: 1, r: 1, title: "HP・LP制作", body: "社内で作って、社内で直す。" },
  { c: 1, r: 1, title: "士業", body: "契約書や規程の確認業務の8割を、AI に。" },
  // 中央に強調メッセージ (col-span-2, row-span-1)
  {
    c: 2,
    r: 1,
    title: "あなたの業種が無くても大丈夫",
    body: "当日、あなたの業種に合わせて実際の画面で景色をお見せします。",
    accent: true,
  },
  { c: 1, r: 1, title: "営業・コンサル", body: "顧客ごとの提案資料がその場で。" },
  { c: 1, r: 1, title: "飲食・サービス", body: "予約電話の対応文、SNS発信が一瞬で。" },
  { c: 2, r: 1, title: "製造・建設・物流", body: "見積書、現場日報、音声で話すだけで要約完成。" },
  { c: 1, r: 1, title: "バックオフィス", body: "請求書、議事録、社内資料が一瞬で。" },
  { c: 1, r: 1, title: "個人事業・フリーランス", body: "請求書、見積書、メール全部補助。" },
];

export default function CasesB() {
  return (
    <DarkSection
      id="cases"
      aria-labelledby="cases-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">Cases</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-12" style={{ letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、<br />こんな景色が見え始めています。
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {cells.map((cell, i) => {
            const span =
              cell.c === 2 ? "col-span-2" : "col-span-1";
            const isAccent = cell.accent;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`relative ${span} flex flex-col justify-end p-5 sm:p-6 overflow-hidden ${
                  isAccent
                    ? "bg-coral text-cream"
                    : "border-l-2 border-coral/50 bg-cream/[0.04]"
                }`}
              >
                {!isAccent && (
                  <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                )}
                <p
                  className={`font-serif font-semibold leading-tight ${
                    isAccent ? "text-base sm:text-xl text-cream" : "text-base sm:text-lg text-cream"
                  }`}
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {cell.title}
                </p>
                <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isAccent ? "text-cream/95" : "text-cream/70"}`}>
                  {cell.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <a href="#apply" className="inline-flex items-center gap-2 px-8 py-3.5 bg-coral text-cream font-medium text-sm sm:text-base rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            お申込みへ進む
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
