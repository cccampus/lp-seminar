/**
 * Outcomes — 2 時間後に持ち帰るもの
 * Stripe Sessions 方式: "After this 90min, you will be able to..." の3点 Outcome
 * 経営者は「思想」ではなく「判断の手応え」を持ち帰りたい
 */
import DarkSection from "@/components/ui/DarkSection";
import RevealHeading from "@/components/ui/RevealHeading";

type Outcome = {
  k: string;
  title: string;
  body: React.ReactNode;
};

const outcomes: Outcome[] = [
  {
    k: "判断",
    title: "Claude Code に何を任せ、何を任せないかの線引き",
    body: (
      <>
        経営者として「自社のどの業務に AI を入れ、どこは人間で残すか」を
        その場で言語化できるようになります。曖昧な「導入検討」から、
        <span className="font-medium">具体的な判断軸</span>へ。
      </>
    ),
  },
  {
    k: "見積",
    title: "外注 vs 内製 — どちらが安いかの感覚",
    body: (
      <>
        いま外注している領域のうち、Claude Code で内製した方が
        早く・安くなるものを見極められます。
        <span className="font-medium">月◯万円規模の判断</span>を持ち帰れます。
      </>
    ),
  },
  {
    k: "段取り",
    title: "実装担当に渡せる「判断用ノート」",
    body: (
      <>
        当日資料 + 導入チェックリストを後日配布。
        社内の担当者・外部のパートナーと話す時に、
        <span className="font-medium">そのまま渡せる形</span>でお持ち帰りいただけます。
      </>
    ),
  },
];

export default function Outcomes() {
  return (
    <DarkSection
      id="outcomes"
      aria-labelledby="outcomes-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          本セミナーで学べること
        </p>

        {/* === コアメッセージ === */}
        <RevealHeading
          as="h2"
          id="outcomes-heading"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-center max-w-4xl mx-auto"
          style={{ letterSpacing: "-0.01em" }}
        >
          何の<span className="text-cream/50">ツールを使うか</span>じゃなくて、
          <br />
          <span className="text-coral">どう使うか</span> です。
        </RevealHeading>

        <p className="mt-8 text-base leading-relaxed text-cream/75 text-center max-w-2xl mx-auto">
          ツール紹介で 2 時間使うことはしません。
          <br className="hidden sm:block" />
          「自社の業務に、AI をどう乗せるか」 — その判断軸を持ち帰っていただきます。
        </p>

        {/* 3 outcomes — アイコンなし、番号 + 見出し + 本文 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {outcomes.map((o, i) => (
            <article key={i} className="flex flex-col">
              {/* 番号 — large display */}
              <p
                className="font-serif text-6xl sm:text-7xl font-semibold text-coral/85 leading-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              {/* タグ */}
              <p className="mt-5 font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55">
                {o.k}
              </p>

              {/* 見出し */}
              <h3 className="mt-3 font-serif text-xl sm:text-2xl font-semibold leading-snug">
                {o.title}
              </h3>

              {/* 本文 */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/80">
                {o.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
