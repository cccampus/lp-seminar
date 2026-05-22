/**
 * TrustStrip — Hero 直下の信頼帯
 * - 経営者LPで Hero とコンテンツの間に挟む「数字＋ロゴ列」相当の役割
 * - 過去回がない単発 Vol.1 なので、CCC 自体の数値ではなく
 *   「Claude Code は Anthropic 公式の開発エージェントである」という外部ファクトを引用
 * - Coral グラデ/glow/blur NG（Anthropic / Stripe ベンチに合わせ Sumi 一色で）
 */
export default function TrustStrip() {
  const facts = [
    {
      k: "Anthropic 公式",
      v: "Claude Code は Anthropic が提供する開発エージェント",
    },
    {
      k: "$8.9B+ 規模",
      v: "Anthropic の年間収益（2026 推計、4 か月で 2.5 倍）",
    },
    {
      k: "Fortune 500 採用",
      v: "PwC・JPMorgan 他、米国大手の業務に組み込み済み",
    },
  ];

  return (
    <section
      aria-label="Claude Code に関する信頼情報"
      className="relative w-full bg-cream border-y border-sumi/12 py-10 sm:py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12">
          {facts.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 ${
                i > 0 ? "sm:border-l sm:border-sumi/12 sm:pl-12" : ""
              }`}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">
                {f.k}
              </p>
              <p className="text-sm leading-relaxed text-sumi-deep">{f.v}</p>
            </div>
          ))}
        </div>

        {/* 出典 */}
        <p className="mt-8 sm:mt-10 text-xs text-sumi/55 max-w-3xl">
          出典：Anthropic 公式発表（2026 年）、PwC / JPMorgan 公式リリース。
          本セミナーは Anthropic 公式イベントではありません — 同社の技術を独立して教える立場で構成しています。
        </p>
      </div>
    </section>
  );
}
