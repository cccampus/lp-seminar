/**
 * WhyThis — このセミナーが、ほかの AI セミナーと違う理由
 * 「もう一個の AI ウェビナー」から脱却するためのセクション
 * - 番号 + 見出し + 本文（アイコン NG、リサーチ agent 指摘の AI slop 回避）
 * - 行長を意図的にばらす（短/中/長の混在）
 */
import DarkSection from "@/components/ui/DarkSection";
import RevealHeading from "@/components/ui/RevealHeading";

const reasons = [
  {
    n: "01",
    title: "経営者向けに、翻訳されている",
    body: "「Claude Code とは何か」ではなく、「自社にとって何ができ、何を判断すべきか」に絞って構成しています。エンジニア向けセミナーで使われる用語は、すべて経営判断の言語に置き換えてお話しします。",
  },
  {
    n: "02",
    title: "実践してきた二人が、対等に登壇する",
    body: "TVCM 制作出身の Takka と、パーソナルジム経営から AI 実践家に転身した Kiyo。「教える人 / 補助の人」の構図ではありません。経営者の視点と、現場で手を動かす視点を、両側から同時にお見せします。",
  },
  {
    n: "03",
    title: "宿題ではなく、判断材料として持ち帰る",
    body: "Claude Code を「自分で動かしてください」とは言いません。社内の担当者・外部のパートナーに渡す前に、経営者が判断するための「手応え」を、当日 2 時間で形にしてお返しします。",
  },
];

export default function WhyThis() {
  return (
    <DarkSection
      id="why-this"
      aria-labelledby="whythis-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* 主見出し */}
        <RevealHeading
          as="h2"
          id="whythis-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
        >
          ほかの AI セミナーと、
          <br />
          <span className="text-coral">違うところ</span>
        </RevealHeading>

        {/* 3 reasons — 縦並びのエディトリアル */}
        <div className="mt-20 space-y-16 sm:space-y-20">
          {reasons.map((r) => (
            <article
              key={r.n}
              className="grid grid-cols-[auto_1fr] gap-x-8 sm:gap-x-12 items-start"
            >
              {/* 番号 — 大きく */}
              <p
                className="font-serif text-5xl sm:text-7xl font-semibold text-coral leading-none pt-1"
                style={{ letterSpacing: "-0.04em" }}
              >
                {r.n}
              </p>

              <div>
                <h3 className="font-serif text-xl sm:text-3xl font-semibold leading-snug">
                  {r.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/80 max-w-2xl">
                  {r.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
