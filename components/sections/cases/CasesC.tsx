"use client";

/**
 * Cases Variant C — Marquee 横自動スクロール
 * 8業種を横にループ流す。動き・ニュースティッカー風・コンパクト。
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";

const outcomes = [
  { title: "マーケティング・SNS担当", body: "SNS投稿の素案づくりが、月150投稿で半日 → 30分に。" },
  { title: "HP・LP制作・Webデザイン", body: "社内で作って、社内で直す。外注費が月◯万円ゼロに。" },
  { title: "士業(税理士・社労士・行政書士)", body: "契約書や規程の確認業務の8割を、AI に任せられる。" },
  { title: "営業・コンサル", body: "顧客ごとの提案資料・追客メモ・進捗管理が、その場で。" },
  { title: "飲食・サービス業オーナー", body: "予約電話の対応文、SNS発信、お客様への返信が一瞬で。" },
  { title: "製造・建設・物流", body: "見積書、現場日報、社内文書の作成補助。音声で要約完成。" },
  { title: "バックオフィス", body: "請求書、議事録、社内連絡文、社内資料が一瞬で。" },
  { title: "個人事業・フリーランス", body: "請求書、見積書、メール、商談記録、すべて補助。" },
];

export default function CasesC() {
  const [paused, setPaused] = useState(false);
  const doubled = [...outcomes, ...outcomes];
  return (
    <DarkSection
      id="cases"
      aria-labelledby="cases-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 mb-14">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">Cases</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-6" style={{ letterSpacing: "-0.01em" }}>
          いま、いろんな業界で、<br />こんな景色が見え始めています。
        </h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-center text-cream/80">
          あなたの業種が無くても大丈夫。<br className="sm:hidden" />当日、あなたの業種に合わせて景色をお見せします。
        </p>
      </div>

      {/* Marquee 2行 (上下逆方向で流す) */}
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[0, 1].map((row) => (
          <div key={row} className="relative w-full overflow-hidden py-3">
            <div
              className="flex w-max items-stretch gap-4"
              style={{
                animation: `marquee${row === 0 ? "" : "Rev"} ${row === 0 ? 55 : 65}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {doubled.slice(row === 0 ? 0 : 4, row === 0 ? doubled.length - 4 : doubled.length).map((o, i) => (
                <div
                  key={`${row}-${i}`}
                  className="shrink-0 w-[280px] sm:w-[360px] border-l-2 border-coral/60 bg-cream/[0.05] p-5 sm:p-6"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-2">
                    {String((i % 8) + 1).padStart(2, "0")}
                  </p>
                  <p className="font-serif text-base sm:text-lg font-semibold text-cream leading-tight" style={{ letterSpacing: "-0.01em" }}>
                    {o.title}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-cream/75">
                    {o.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-14 sm:mt-16 flex flex-col items-center gap-3">
        <a href="#apply" className="inline-flex items-center gap-2 px-8 py-3.5 bg-coral text-cream font-medium text-sm sm:text-base rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
          お申込みへ進む
          <span className="font-mono text-xs tracking-[0.2em]">→</span>
        </a>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </DarkSection>
  );
}
