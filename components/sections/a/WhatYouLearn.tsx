/**
 * Plan A §3: 本セミナーで学べる内容
 *
 * コアメッセージ: 「何のツールを使うかじゃなくて、どう使うかです」
 * 経営者目線の「何が分かるか」3 つ
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
    b: "セミナー資料 + Claude Code 導入チェックリストを後日配布。社内の担当者と話す時に、そのまま渡せる形で。",
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

        {/* === コアメッセージ：ツール論ではなく、使い方論 === */}
        <h2
          id="learn-heading"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-center max-w-4xl mx-auto"
          style={{ letterSpacing: "-0.01em" }}
        >
          何の<span className="text-sumi/50">ツールを使うか</span>じゃなくて、
          <br />
          <span className="text-coral">どう使うか</span> です。
        </h2>
        <p className="mt-8 text-base sm:text-lg leading-relaxed text-sumi/75 text-center max-w-2xl mx-auto">
          ツール紹介で 2 時間使うことはしません。
          <br className="hidden sm:inline" />
          「自社の業務に、AI をどう乗せるか」 — その判断軸を持ち帰っていただきます。
        </p>

        {/* 3 つの学べる内容 */}
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
      </div>
    </section>
  );
}
