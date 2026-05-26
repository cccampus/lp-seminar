/**
 * Detail — v3.2（5/31 + 6/3 複数日程、セミナー1回 ¥5,500 明示、Included から実装系削除）
 */
import DarkSection from "@/components/ui/DarkSection";

const sessions = [
  {
    label: "第1回",
    date: "2026 / 05 / 31 (日)",
    time: "11:00 – 13:00",
  },
  {
    label: "第2回",
    date: "2026 / 06 / 03 (火)",
    time: "19:00 – 21:00",
  },
];

const seeOnDay = [
  "AI が業務に乗る景色（実画面）",
  "あなたの業種への応用イメージ",
  "明日触ってみたくなる、最初の一歩",
];

export default function Detail() {
  return (
    <DarkSection
      id="detail"
      aria-labelledby="detail-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
          Detail
        </p>
        <h2
          id="detail-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center mb-16"
          style={{ letterSpacing: "-0.01em" }}
        >
          開催の <span className="text-coral">詳細</span>
        </h2>

        <div className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-8 sm:p-12">
          {/* 複数日程 */}
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-4">
              Date · 複数日程あり
            </p>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-cream/10 last:border-0"
                >
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-cream/55">
                    {s.label}
                  </p>
                  <p className="font-serif text-lg sm:text-xl font-semibold">
                    {s.date} <span className="text-cream/65 font-normal">/ {s.time}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-cream/55">ご都合の良い回をお選びください</p>
          </div>

          <dl className="space-y-7">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                開場
              </dt>
              <dd className="font-serif text-lg font-semibold">開始10分前</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Format
              </dt>
              <dd className="font-serif text-xl font-semibold">オンライン（Zoom）</dd>
              <p className="mt-1.5 text-xs text-cream/55">
                Zoom URL は申込確認後、自動でお送りいたします
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Price
              </dt>
              <dd className="font-serif text-xl font-semibold">
                セミナー1回 ¥5,000{" "}
                <span className="text-sm font-normal text-cream/65">（税抜）</span>
              </dd>
              <p className="mt-1.5 text-xs text-cream/55">
                別途消費税を申し受けます。¥5,500（税込・1 回完結）
              </p>
            </div>
          </dl>

          {/* 当日見せるもの */}
          <div className="mt-10 border-t border-cream/10 pt-7">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55 mb-4">
              When You're There
            </p>
            <ul className="space-y-2.5 text-sm text-cream">
              {seeOnDay.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-coral" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DarkSection>
  );
}
