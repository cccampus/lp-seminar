/**
 * Plan B §6: ¥5,000 は、高いか安いか
 *
 * Codex / リサーチ agent 共通指摘:
 *   - Netflix 比喩は個人 / 教材向け、editorial を損なう。NG
 *   - 機会費用フレーム「外注前の判断精度を上げる投資」が正解
 *
 * ハイエンド B2B 経営者向け価格正当化は、比喩より「機会費用 / 意思決定速度」軸で
 */

const compare = [
  {
    item: "LP 1 枚の外注見積",
    cost: "¥150,000 – ¥500,000",
    note: "制作会社の標準レンジ。リードタイム 2〜4 週間",
  },
  {
    item: "SEO 改善コンサル 1 ヶ月",
    cost: "¥200,000 – ¥500,000",
    note: "判断軸が手に入る前に、まず月額が出ていく",
  },
  {
    item: "AI 導入の意思決定が 1 ヶ月遅れる機会費用",
    cost: "概算 ¥数十万 – ¥百万円",
    note: "月次の業務時間圧縮 × 残された月数",
  },
];

export default function PriceJustification() {
  return (
    <section
      id="price"
      aria-labelledby="price-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          ¥5,000 は、高いか安いか
        </p>
        <h2
          id="price-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          2 時間で、<span className="text-coral">外注前の判断精度</span> を上げる投資
        </h2>
        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          判断の感覚が上がるだけで、後の 1 つの決定が変わります。
          それで十分に元が取れる金額に設定しています。
        </p>

        {/* 比較テーブル — 機会費用ベース */}
        <div className="mt-16 border-t border-b border-sumi/15">
          {compare.map((c, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto] gap-x-6 py-6 ${i > 0 ? "border-t border-sumi/12" : ""}`}
            >
              <div>
                <p className="font-serif text-base sm:text-lg font-semibold leading-snug">{c.item}</p>
                <p className="mt-1 text-xs sm:text-sm text-sumi/60">{c.note}</p>
              </div>
              <p className="font-serif text-base sm:text-lg font-semibold text-sumi/70 self-center text-right">
                {c.cost}
              </p>
            </div>
          ))}
        </div>

        {/* 本セミナーの価格を強調 */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
            本セミナー
          </p>
          <p
            className="font-serif font-semibold text-coral"
            style={{ fontSize: "clamp(56px, 8vw, 96px)", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            ¥5,000
          </p>
          <p className="mt-6 text-base sm:text-lg text-sumi/80 max-w-xl mx-auto leading-relaxed">
            参加後、外注 1 件を内製に置き換える判断ができれば、
            <br className="hidden sm:inline" />
            それだけでこの参加費の <span className="text-coral font-medium">数十倍</span> が回収できます。
          </p>
        </div>
      </div>
    </section>
  );
}
