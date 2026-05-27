"use client";

/**
 * Cases Variant D — Focus Cards (hover で他がblur、Apple/Tesla風)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";
import { motion } from "motion/react";

const outcomes = [
  { title: "マーケティング・SNS担当", body: "SNS投稿の素案づくりが、月150投稿で半日 → 30分に。" },
  { title: "HP・LP制作・Webデザイン", body: "社内で作って、社内で直す。外注費が月◯万円ゼロに。" },
  { title: "士業", body: "契約書や規程の確認業務の8割を、AI に任せられる。" },
  { title: "営業・コンサル", body: "顧客ごとの提案資料・追客メモ・進捗管理が、その場で。" },
  { title: "飲食・サービス業", body: "予約電話の対応文、SNS発信、お客様への返信が一瞬で。" },
  { title: "製造・建設・物流", body: "見積書、現場日報、社内文書の作成補助。音声で要約。" },
  { title: "バックオフィス", body: "請求書、議事録、社内連絡文、社内資料が一瞬で。" },
  { title: "個人事業・フリーランス", body: "請求書、見積書、メール、商談記録、すべて補助。" },
];

export default function CasesD() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <DarkSection id="cases" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">Cases</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-6" style={{ letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、<br />こんな景色が見え始めています。
        </h2>
        <p className="mt-6 mb-14 text-base sm:text-lg leading-relaxed text-center text-cream/80 max-w-2xl mx-auto">
          あなたの業種が無くても大丈夫。当日、あなたの業種に合わせて景色をお見せします。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative aspect-[5/4] border border-cream/15 bg-cream/[0.04] p-6 flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-500 ${
                hovered !== null && hovered !== i ? "opacity-30 blur-sm scale-[0.98]" : "opacity-100"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-coral/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-serif text-lg sm:text-xl font-semibold text-cream leading-tight" style={{ letterSpacing: "-0.01em" }}>
                {o.title}
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cream/75">
                {o.body}
              </p>
            </motion.div>
          ))}
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
