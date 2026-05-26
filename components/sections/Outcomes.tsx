/**
 * Outcomes — v3.2 コピー / cinematic V2 ダークトーン
 * 業種別8枠 + 「業種なくても大丈夫」H3 前面化
 */
import DarkSection from "@/components/ui/DarkSection";

const outcomes = [
  {
    title: "マーケティング・SNS担当",
    body: "SNS投稿の素案づくりが、月150投稿で半日 → 30分に。",
  },
  {
    title: "HP・LP制作・Webデザイン",
    body: "社内で作って、社内で直す。外注費が月◯万円ゼロに。",
  },
  {
    title: "士業（税理士・社労士・行政書士）",
    body: "契約書や規程の確認業務の8割を、AI に任せられる。",
  },
  {
    title: "営業・コンサル",
    body: "顧客ごとの提案資料・追客メモ・進捗管理が、その場で。",
  },
  {
    title: "飲食・サービス業オーナー",
    body: "予約電話の対応文、SNS発信、お客様への返信が一瞬で。",
  },
  {
    title: "製造・建設・物流(中小経営)",
    body: (
      <>
        見積書、現場日報、社内文書の作成補助。
        <br />
        音声で話すだけで、要約が完成。
      </>
    ),
  },
  {
    title: "バックオフィス(経理・人事・総務)",
    body: "請求書、議事録、社内連絡文、社内資料が一瞬で。",
  },
  {
    title: "個人事業・フリーランス",
    body: "請求書、見積書、メール、商談記録、すべて補助。",
  },
];

export default function Outcomes() {
  return (
    <DarkSection
      id="cases"
      aria-labelledby="cases-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
          Cases
        </p>
        <h2
          id="cases-heading"
          className="font-serif text-xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-6"
          style={{ letterSpacing: "-0.01em" }}
        >
          いま、いろんな業界で、
          <br />
          こんな景色が見え始めています。
        </h2>

        {/* H3: 業種無くても大丈夫 — 大きく前面化 */}
        <div className="max-w-2xl mx-auto mt-10 mb-16 rounded-2xl border border-coral/40 bg-coral/[0.08] p-6 sm:p-8 text-center">
          <p className="font-serif text-lg sm:text-xl font-semibold leading-relaxed text-cream">
            ここにあなたの業種が無くても大丈夫。
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-cream/75">
            当日、あなたの業種に合わせて、
            <br className="sm:hidden" />
            実際の画面で景色をお見せします。
          </p>
        </div>

        {/* 業種別カード 8種 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="rounded-xl border border-cream/15 bg-cream/[0.04] p-6 sm:p-7"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-coral font-semibold mb-3">
                {o.title}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-cream/85">
                {o.body}
              </p>
            </div>
          ))}
        </div>

        {/* 中盤 CTA */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
          >
            セミナー1回 ¥5,500(税込)で申し込む
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
          <a
            href="#faq"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/55 hover:text-coral"
          >
            自分の業種、応用できるか確認する ↓
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
