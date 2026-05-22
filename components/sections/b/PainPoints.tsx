/**
 * Plan B §2: こんな悩みありませんか？
 * Codex 強い注意：個人向け教材の煽り口調 NG。経営課題の言語に寄せる。
 * CCC NG ワード（CLAUDE.md 参照）は絶対回避。
 */

const pains = [
  {
    q: "「AI で業務が変わる」と聞くが、何から始めればいいか分からない",
    body: "メディアは「AI が変える」と煽るが、自社の業務に落とした時の輪郭が見えない。判断材料が、まだ社内に蓄積されていない。",
  },
  {
    q: "AI 活用が、社員個々の試行錯誤になっている",
    body: "現場が ChatGPT を触っているが、組織として何が業務に乗っているか、誰も把握できていない。属人化のリスクと、ROI 不明のまま時間が過ぎていく。",
  },
  {
    q: "サービス改修・試作が、外部パートナー前提になっている",
    body: "LP 1 枚、社内ツール 1 個、業務フロー自動化、すべて外注。月◯十万円 / リードタイム 2〜4 週間。経営者として「内製の選択肢」を持ちたいが、判断材料がない。",
  },
  {
    q: "意思決定者として、「実装の感覚」が掴めていない",
    body: "AI 投資の議論は社内で進むが、自分が触ったことがないので、社員や外部パートナーの提案を評価する基準が持てない。経営判断の精度が、外部の言葉に依存している。",
  },
];

export default function PainPoints() {
  return (
    <section
      id="pain"
      aria-labelledby="pain-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          こんな状況、ありませんか
        </p>
        <h2
          id="pain-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          AI 活用は進んでいる。でも、<span className="text-coral">経営者の手応えが薄い</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          経営者・意思決定者 30 名以上の声を集約して、共通する 4 つの「停滞点」を整理しました
        </p>

        <div className="mt-20 space-y-12 sm:space-y-14">
          {pains.map((p, i) => (
            <article key={i} className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 items-start">
              <p
                className="font-serif text-4xl sm:text-5xl font-semibold text-coral/85 leading-none pt-1"
                style={{ letterSpacing: "-0.04em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold leading-snug">
                  {p.q}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-sumi/75 max-w-2xl">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
