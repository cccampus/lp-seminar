/**
 * SixMonths — v3.2（紀洋さんストーリー・34歳/店舗経営）
 * 新ビフォアフ4項目
 * - LP・SEO記事制作 外注で月30万 → 自分で1時間以内
 * - SNS動画作成・投稿 外注で月10万 → AI補助で30分以内
 * - Google・Meta広告運用 外注で月20万 → 自分で30分以内
 * - 仕訳や契約書作成 外注で月10万 → 自分で30分以内
 */
import DarkSection from "@/components/ui/DarkSection";

const beforeAfter = [
  {
    label: "LP・SEO記事制作",
    before: "外注で月30万",
    after: "自分で1時間以内",
  },
  {
    label: "SNS動画作成・投稿",
    before: "外注で月10万",
    after: "AI補助で30分以内",
  },
  {
    label: "Google・Meta広告運用",
    before: "外注で月20万",
    after: "自分で30分以内",
  },
  {
    label: "仕訳や契約書作成",
    before: "外注で月10万",
    after: "自分で30分以内",
  },
];

export default function SixMonths() {
  return (
    <DarkSection
      id="six-months"
      aria-labelledby="six-months-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Six Months
        </p>
        <h2
          id="six-months-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-10"
          style={{ letterSpacing: "-0.01em" }}
        >
          半年で、毎日の仕事が、
          <br />
          ここまで変わる。
        </h2>

        <div className="prose-stub text-cream/85 text-base sm:text-lg leading-loose space-y-5">
          <p>
            ほんの半年前まで、私は AI をほとんど触っていませんでした。
            <br />
            店舗経営をしながら、「ChatGPT って便利らしいね」程度の理解で。
          </p>

          <p>
            <span className="text-coral font-semibold">Claude Code に出会って、6ヶ月。</span>
          </p>
        </div>

        {/* Before / After 表 */}
        <div className="mt-12 rounded-2xl border border-cream/15 bg-cream/[0.04] p-6 sm:p-10">
          <div className="space-y-6">
            {beforeAfter.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-center border-b border-cream/10 pb-6 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/80 mb-1.5">
                    {item.label}
                  </p>
                  <p className="font-serif text-base sm:text-lg text-cream/60 line-through decoration-coral/50">
                    {item.before}
                  </p>
                </div>
                <span className="font-mono text-coral text-lg sm:text-xl hidden sm:block">
                  →
                </span>
                <p className="font-serif text-lg sm:text-xl font-semibold text-cream">
                  {item.after}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-5 text-base sm:text-lg leading-loose text-cream/85">
          <p>
            これは特別な才能でも、IT 知識でもありません。
            <br />
            タイミングと、やる気と、行動力。それだけです。
          </p>
          <p>
            IT 革命は 20 年超えても、今もまだ日本で広がっている最中です。
            <br />
            AI は、半年単位で景色が変わります。
            <br />
            <span className="text-coral font-semibold">これは波ではなく、津波です。</span>
          </p>
        </div>
      </div>
    </DarkSection>
  );
}
