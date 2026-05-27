"use client";

/**
 * Cases (Marquee 横自動スクロール・採用版)
 * 紀洋さんFB 2026-05-27 反映:
 *   - 番号削除
 *   - 左線(border-l-2) のAI感削除 → 上部に細いcoralドット+ヘアラインの新装飾
 *   - 1: SNS運用代行 / 自動投稿まで
 *   - 6: 「中小企業」削除 → 「製造・建設・物流」のみ
 *   - 6〜8 内容被り解消(現場系/内勤系/フリーランス独自軸 で分離)
 */
import DarkSection from "@/components/ui/DarkSection";
import { useState } from "react";

const outcomes = [
  { title: "SNS運用代行", body: "月150投稿のSNS素案づくり〜自動投稿まで、半日 → 30分に。" },
  { title: "HP・LP制作・Webデザイン", body: "社内で作って、社内で直す。外注費が月◯万円ゼロに。" },
  { title: "士業(税理士・社労士・行政書士)", body: "契約書や規程の確認業務の8割を、AI に任せられる。" },
  { title: "営業・コンサル", body: "顧客ごとの提案資料・追客メモ・進捗管理が、その場で。" },
  { title: "飲食・サービス業オーナー", body: "予約電話の対応文、SNS発信、お客様への返信が一瞬で。" },
  // 6〜8 再整理: 現場系 / 内勤系 / 個人軸 で分離
  { title: "製造・建設・物流", body: "現場日報を音声で話すだけで要約完成。図面・写真・見積書もAI整理。" },
  { title: "バックオフィス(経理・人事・総務)", body: "請求書、議事録、社内資料の作成負荷が一気に半減。" },
  { title: "個人事業・フリーランス", body: "営業メール・提案書・経理まで一人で。事業に集中する時間が増える。" },
];

function CaseCard({ o }: { o: typeof outcomes[number] }) {
  return (
    <article className="shrink-0 w-[300px] sm:w-[380px] relative overflow-hidden">
      {/* 上端: coral dot + hairline (AI感の左border廃止) */}
      <div className="flex items-center gap-2 mb-4">
        <span className="block h-1.5 w-1.5 rounded-full bg-coral" style={{ boxShadow: "0 0 8px rgba(217,119,87,0.7)" }} />
        <span className="block h-px flex-1 bg-gradient-to-r from-coral/60 via-coral/20 to-transparent" />
      </div>
      <div className="px-1">
        <p
          className="font-serif text-lg sm:text-xl font-semibold text-cream leading-tight mb-3"
          style={{ letterSpacing: "-0.01em" }}
        >
          {o.title}
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-cream/75">
          {o.body}
        </p>
      </div>
    </article>
  );
}

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
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Cases</p>
        <h2
          id="cases-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream"
          style={{ letterSpacing: "-0.01em" }}
        >
          いま、いろんな業界で、
          <br />
          こんな景色が見え始めています。
        </h2>
        <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/80">
          あなたの業種が無くても大丈夫。
          <br className="sm:hidden" />
          当日、あなたの業種に合わせて景色をお見せします。
        </p>
      </div>

      {/* Marquee 2行 (上下逆方向) */}
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[0, 1].map((row) => (
          <div key={row} className="relative w-full overflow-hidden py-4">
            <div
              className="flex w-max items-stretch gap-8 sm:gap-10"
              style={{
                animation: `casesmarq${row === 0 ? "" : "Rev"} ${row === 0 ? 60 : 75}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {(row === 0 ? doubled.slice(0, 8) : doubled.slice(8, 16)).map((o, i) => (
                <CaseCard key={`${row}-${i}`} o={o} />
              ))}
              {(row === 0 ? doubled.slice(0, 8) : doubled.slice(8, 16)).map((o, i) => (
                <CaseCard key={`${row}-clone-${i}`} o={o} />
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
        @keyframes casesmarq {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes casesmarqRev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </DarkSection>
  );
}
