/**
 * BeforeRegister — 申込前に確認したい事項（透明性ブロック）
 *
 * リサーチ agent 指摘: 経営者が「事前に潰したい不安」を全部潰す。
 * チェックリスト風ではなく Anthropic 系の平叙文 + 左に短い縦 Coral 線。
 * 罫線ボックスや囲みは AI slop なので使わない。
 */

const items = [
  {
    label: "対象",
    body: "経営者・意思決定者向けに構成しています。エンジニア向けの実装詳細は扱いません。",
  },
  {
    label: "録画",
    body: "後日 7 日間限定でアーカイブ動画を配信します。当日リアルタイム参加が難しい方も申し込み可能です。",
  },
  {
    label: "質疑",
    body: "最後 15 分を Q&A の時間に充てます。事前質問は申込フォームから受け付けています。",
  },
  {
    label: "資料",
    body: "当日使用するスライドの PDF と、Claude Code 導入チェックリストを後日配布します。",
  },
  {
    label: "領収書",
    body: "法人・個人事業主の方には、申込時にご指定いただいた宛名で PDF 領収書を発行します。",
  },
];

export default function BeforeRegister() {
  return (
    <section
      id="before-register"
      aria-labelledby="before-register-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          申込前に
        </p>

        {/* 主見出し */}
        <h2
          id="before-register-heading"
          className="font-serif text-3xl sm:text-4xl font-semibold leading-tight"
        >
          先に、<span className="text-coral">お伝えしておくこと</span>
        </h2>

        <p className="mt-6 text-base leading-relaxed text-sumi/70 max-w-xl">
          後で「思っていたのと違う」とならないよう、申込前に整理してお伝えします
        </p>

        {/* === 5 平叙文 === */}
        <ul className="mt-16 space-y-8">
          {items.map((it) => (
            <li key={it.label} className="grid grid-cols-[auto_1fr] gap-x-8 items-baseline">
              {/* 左の縦 Coral 短線 + ラベル */}
              <div className="flex items-baseline gap-3">
                <span className="block h-4 w-px bg-coral self-stretch" aria-hidden />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold w-16 shrink-0">
                  {it.label}
                </span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-sumi/85">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
