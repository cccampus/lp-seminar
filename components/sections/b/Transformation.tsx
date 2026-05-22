/**
 * Plan B §3: これを学ぶと、こうなる
 * After / Benefit 統合セクション
 * 数値ベース・実装行動ベースで具体化
 */

const after = [
  {
    h: "「触れる経営者」になる",
    body: "Claude Code を自分の Mac で 1 回でも動かした体験を持つ。社員・パートナーの提案を、感覚で評価できるようになります。",
  },
  {
    h: "外注前に「内製の輪郭」が描ける",
    body: "LP 1 枚・社内ツール・業務スクリプト — 何を内製し、何を外注に残すかの判断軸を、経営者自身が持てるようになります。",
  },
  {
    h: "投資判断の速度と精度が上がる",
    body: "AI 関連の予算・人員配置・ベンダー選定に、社内に「実装感覚を持つ意思決定者」が居る状態に。決裁のリードタイムが短縮します。",
  },
];

const benefits = [
  { num: "30h→3h", label: "月次決算 集計の所要時間（事例）" },
  { num: "10x", label: "社内ツール 開発スピード（事例）" },
  { num: "¥0", label: "Claude Code Pro プランから始められる" },
];

export default function Transformation() {
  return (
    <section
      id="transformation"
      aria-labelledby="trans-heading"
      className="relative w-full bg-cream-warm text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          90 分後の、あなた
        </p>
        <h2
          id="trans-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          AI を <span className="text-coral">「使う側」</span> から、
          <br />
          <span className="text-coral">「実装する側」</span> へ
        </h2>
        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          コードは書きません。書くのは、自社業務の「判断軸」と「段取り」です
        </p>

        {/* 3 つの After */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {after.map((o, i) => (
            <article key={i} className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-xl sm:text-2xl font-semibold leading-snug">
                {o.h}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-sumi/80">{o.body}</p>
            </article>
          ))}
        </div>

        {/* 既出ベネフィット数値 */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-y-0 sm:gap-x-6 max-w-4xl mx-auto border-t border-sumi/15 pt-12">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${i > 0 ? "sm:border-l sm:border-sumi/12" : ""}`}
            >
              <p
                className="font-serif text-4xl sm:text-5xl font-semibold text-coral leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                {b.num}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-sumi/65 px-4">{b.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-sumi/50 text-center max-w-xl mx-auto">
          ※ 上記は X / 公開事例から集計した Claude Code 業務活用の代表値。当日、より詳細な事例をお見せします。
        </p>
      </div>
    </section>
  );
}
