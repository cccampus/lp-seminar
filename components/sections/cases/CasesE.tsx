"use client";

/**
 * Cases Variant E — 罫線 Split Table (Linear/Vercel/Stripe Pricing 風)
 * 業種 | 効果 の罫線テーブル。コンパクト・一目で網羅。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const outcomes = [
  { title: "マーケティング・SNS担当", body: "SNS投稿の素案が、月150投稿で半日 → 30分に。" },
  { title: "HP・LP制作・Webデザイン", body: "社内で作って、社内で直す。外注費が月◯万円ゼロに。" },
  { title: "士業(税理士・社労士・行政書士)", body: "契約書や規程の確認業務の8割を、AI に任せられる。" },
  { title: "営業・コンサル", body: "顧客ごとの提案資料・追客メモ・進捗管理が、その場で。" },
  { title: "飲食・サービス業オーナー", body: "予約電話の対応文、SNS発信、お客様への返信が一瞬で。" },
  { title: "製造・建設・物流(中小経営)", body: "見積書、現場日報、社内文書の作成補助。音声で要約完成。" },
  { title: "バックオフィス(経理・人事・総務)", body: "請求書、議事録、社内連絡文、社内資料が一瞬で。" },
  { title: "個人事業・フリーランス", body: "請求書、見積書、メール、商談記録、すべて補助。" },
];

export default function CasesE() {
  return (
    <DarkSection id="cases" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">Cases</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-6" style={{ letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、<br />こんな景色が見え始めています。
        </h2>
        <p className="mt-6 mb-14 text-base sm:text-lg leading-relaxed text-center text-cream/80 max-w-2xl mx-auto">
          あなたの業種が無くても大丈夫。<br className="sm:hidden" />
          当日、あなたの業種に合わせて景色をお見せします。
        </p>

        {/* テーブルヘッダー */}
        <div className="grid grid-cols-[auto_1fr_2fr] gap-4 sm:gap-8 pb-3 border-b border-cream/25">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/45">No</span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral">Industry</span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral">After Claude Code</span>
        </div>

        {/* テーブル本体 */}
        <div className="divide-y divide-cream/12">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="grid grid-cols-[auto_1fr_2fr] gap-4 sm:gap-8 py-5 sm:py-6 items-baseline"
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-coral/85">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif text-sm sm:text-lg font-semibold text-cream leading-snug" style={{ letterSpacing: "-0.01em" }}>
                {o.title}
              </p>
              <p className="font-serif text-xs sm:text-base leading-relaxed text-cream/80">
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
