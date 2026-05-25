/**
 * Detail — 開催情報（タイムテーブル削除版）
 * Takka 指示: 当日のスケジュールは不要、開催情報のみ
 */
import DarkSection from "@/components/ui/DarkSection";

const included = [
  "アーカイブ動画（後日 7 日間視聴可）",
  "当日使用したスライドの PDF 配布",
  "Claude Code 導入チェックリスト",
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
        <h2
          id="detail-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
        >
          開催の <span className="text-coral">詳細</span>
        </h2>

        <div className="mt-16 rounded-2xl border border-cream/15 bg-cream/[0.04] p-8 sm:p-12">
          <dl className="space-y-7">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Date
              </dt>
              <dd className="font-serif text-xl font-semibold">2026 / 05 / 31 (日)</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Time
              </dt>
              <dd className="font-serif text-xl font-semibold">
                11:00 – 13:00 <span className="text-sm font-normal text-cream/65">（2 時間）</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Format
              </dt>
              <dd className="font-serif text-xl font-semibold">Online · Zoom</dd>
              <p className="mt-1.5 text-xs text-cream/55">
                Zoom URL は申込確認後に個別配布いたします
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Price
              </dt>
              <dd className="font-serif text-xl font-semibold">
                ¥5,000 <span className="text-sm font-normal text-cream/65">（税抜）</span>
              </dd>
              <p className="mt-1.5 text-xs text-cream/55">
                別途消費税を申し受けます
              </p>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                Capacity
              </dt>
              <dd className="font-serif text-xl font-semibold">先着 30 名</dd>
            </div>
          </dl>

          {/* 含まれるもの */}
          <div className="mt-10 border-t border-cream/10 pt-7">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55 mb-4">
              Included
            </p>
            <ul className="space-y-2.5 text-sm text-cream">
              {included.map((item) => (
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
