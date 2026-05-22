/**
 * Plan A §3: 本セミナーで学べる内容
 * 経営者目線の「何が分かるか」3 つ + 当日 90 分の流れを 1 文で
 */

const learnings = [
  {
    n: "01",
    h: "Claude Code に「任せる業務」と「残す業務」の線引き",
    b: "経営者の言語で、AI に振れる業務範囲を整理します。曖昧な「導入検討」から、具体的な判断軸へ。",
  },
  {
    n: "02",
    h: "外注 vs 内製、コスト構造の組み替え方",
    b: "いま外注している領域のうち、Claude Code で内製化できる範囲を見極める方法。月◯万円規模の判断を、その場で。",
  },
  {
    n: "03",
    h: "実装担当・外部パートナーに渡せる「判断用ノート」",
    b: "セミナー資料 + 導入チェックリストを後日配布。社内の担当者と話す時に、そのまま渡せる形でお持ち帰りいただきます。",
  },
];

export default function WhatYouLearn() {
  return (
    <section
      id="learn"
      aria-labelledby="learn-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          本セミナーで学べること
        </p>
        <h2
          id="learn-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          90 分後、<span className="text-coral">3 つのもの</span>を持ち帰ります
        </h2>
        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          抽象的な「学び」ではなく、経営判断にそのまま使える「線引き」と「数字」を
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {learnings.map((o) => (
            <article key={o.n} className="flex flex-col">
              <p
                className="font-serif text-6xl sm:text-7xl font-semibold text-coral/85 leading-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                {o.n}
              </p>
              <h3 className="mt-6 font-serif text-xl sm:text-2xl font-semibold leading-snug">
                {o.h}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-sumi/80">{o.b}</p>
            </article>
          ))}
        </div>

        {/* 当日の流れ — 簡易タイムテーブル */}
        <div className="mt-24 max-w-3xl mx-auto border-t border-sumi/15 pt-12">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-6 text-center">
            当日の流れ
          </p>
          <ol className="space-y-3 text-sm sm:text-base">
            {[
              ["11:00", "オープニング — なぜ今 Claude Code か"],
              ["11:15", "Claude Code 全体像 — 経営者の言語で"],
              ["11:30", "実演 — LP・スライド・モック・業務自動化"],
              ["12:15", "経営者の判断軸 — 任せる線引き / 内製 vs 外注"],
              ["12:40", "Q&A — 事前質問 + 当日疑問"],
              ["12:55", "クローズ — 次の一歩"],
            ].map(([t, body]) => (
              <li key={t} className="grid grid-cols-[80px_1fr] gap-x-6 items-baseline border-b border-sumi/8 pb-3">
                <span className="font-mono text-sm text-coral font-semibold tracking-[0.1em]">{t}</span>
                <span className="text-sumi/85 leading-relaxed">{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
