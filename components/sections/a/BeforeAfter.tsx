/**
 * Plan A §2: Before/After 概念対比
 * Codex 推奨: 実証言ナシのリスク回避、経営者の「判断の見え方」を before/after で
 */

const beforeItems = [
  "AI 活用は、社員個々の試行錯誤に任せている",
  "サービス開発・運用は、外部パートナー前提",
  "AI 投資判断の材料が、社内に乏しい",
];

const afterItems = [
  "小さな業務は、自分の手で検証・実装できる",
  "外注前に「自分でできる範囲」が、自分で描ける",
  "意思決定の速度と、AI 投資の精度が一段階上がる",
];

export default function BeforeAfter() {
  return (
    <section
      id="before-after"
      aria-labelledby="ba-heading"
      className="relative w-full bg-cream-warm text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          参加前と、参加後
        </p>
        <h2
          id="ba-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          経営判断の <span className="text-coral">見え方</span> が変わる
        </h2>
        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          2 時間で、自社業務に AI が乗る景色を見せます。<br className="hidden sm:inline" />
          判断の感覚を、その場で持ち帰っていただきます。
        </p>

        {/* === Before / After 対比 === */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-sumi/10 border border-sumi/10">
          {/* Before */}
          <div className="bg-cream-warm p-8 sm:p-12">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-3">
              Before
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-8 leading-snug">
              参加前 — いま、抱えている景色
            </h3>
            <ul className="space-y-5">
              {beforeItems.map((it) => (
                <li key={it} className="flex gap-3 text-sm sm:text-base leading-relaxed text-sumi/75">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-sumi/30" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After — Coral アクセント */}
          <div className="relative bg-cream p-8 sm:p-12">
            {/* 上端 coral 細線 */}
            <span className="absolute top-0 left-0 right-0 h-px bg-coral/60" aria-hidden />
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold mb-3">
              After
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-8 leading-snug">
              参加後 — 見える、新しい <span className="text-coral">景色</span>
            </h3>
            <ul className="space-y-5">
              {afterItems.map((it) => (
                <li key={it} className="flex gap-3 text-sm sm:text-base leading-relaxed text-sumi-deep font-medium">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-coral" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
