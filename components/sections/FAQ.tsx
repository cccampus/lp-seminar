/**
 * FAQ — よくある質問
 * - <details> + <summary> でアコーディオン（JS 不要、a11y 良好）
 * - 質問は経営者・意思決定者目線で 6 項目
 */

type Item = { q: string; a: React.ReactNode };

const faqs: Item[] = [
  {
    q: "プログラミングの経験がなくても参加できますか？",
    a: (
      <>
        はい。本セミナーは <span className="font-medium">経営者・意思決定者向け</span> に
        構成しています。コードを書く時間ではなく、Claude Code で
        <span className="font-medium">何ができるか・自社で何が変わるか</span>
        を判断するための時間です。
      </>
    ),
  },
  {
    q: "自社の業務に応用できるか不安です。",
    a: (
      <>
        当日は複数業種の実例（マーケ・営業・バックオフィス）を交えて実演します。
        Q&A では <span className="font-medium">事前にお寄せいただいた業務</span>
        への適用イメージもお返しします。
      </>
    ),
  },
  {
    q: "Zoom の URL はいつ届きますか？",
    a: (
      <>
        申込確認後、開催前日までに登録いただいたメールアドレス宛にお送りします。
        前日 18:00 を過ぎても届かない場合は、お問い合わせ先までご連絡ください。
      </>
    ),
  },
  {
    q: "当日参加できない場合、アーカイブは見られますか？",
    a: (
      <>
        参加者全員に、後日 <span className="font-medium">7 日間限定</span>
        でアーカイブ動画を配信いたします。当日リアルタイム参加が難しい方も
        申し込みいただけます。
      </>
    ),
  },
  {
    q: "領収書は発行できますか？",
    a: (
      <>
        はい。法人・個人事業主の方には、申込時にご指定いただいた宛名で
        PDF 形式の領収書を発行いたします。
      </>
    ),
  },
  {
    q: "Claude Code Campus のコース受講と何が違いますか？",
    a: (
      <>
        本セミナーは <span className="font-medium">2 時間の入口</span>
        です。深く使いこなしたい方向けには、別途
        <span className="font-medium">本コース</span>（カリキュラム形式）
        をご用意しています。セミナー末尾でご案内します。
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full bg-cream-warm text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          — FAQ —
        </p>

        {/* 主見出し */}
        <h2
          id="faq-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
        >
          よくある<span className="text-coral">ご質問</span>
        </h2>

        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-xl mx-auto">
          ここにない疑問は、申込フォームの「事前質問」欄からどうぞ
        </p>

        {/* リスト */}
        <ul className="mt-16 divide-y divide-sumi/15 border-t border-b border-sumi/15">
          {faqs.map((f, i) => (
            <li key={i}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-start gap-6 list-none">
                  <span className="font-mono text-sm tracking-[0.15em] text-coral font-semibold pt-1 shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold leading-snug flex-1">
                    {f.q}
                  </h3>
                  <span
                    className="ml-2 mt-1.5 text-coral font-mono text-xl shrink-0 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="mt-4 pl-14 pr-8 text-sm sm:text-base leading-relaxed text-sumi/85">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
