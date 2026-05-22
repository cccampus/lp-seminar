/**
 * Detail — 開催詳細
 * - 左カラム: タイムテーブル（縦タイムライン）
 * - 右カラム: 開催情報カード（日時・形式・料金・含まれるもの）
 * - Zoom URL は申込後配布
 */

type TimelineItem = {
  time: string;
  title: string;
  body: string;
};

const timeline: TimelineItem[] = [
  {
    time: "11:00",
    title: "オープニング",
    body: "なぜ今 Claude Code か。経営者が押さえるべき業界の現在地を 15 分で。",
  },
  {
    time: "11:15",
    title: "実演 — 業務に AI が乗る景色",
    body: "実際の案件で動かしている Claude Code を画面共有。LP・スライド・モック・自動化の流れを目の前で。",
  },
  {
    time: "12:00",
    title: "経営者にとっての位置取り",
    body: "導入の段取り、社内への落とし方、外注 vs 内製の判断軸を整理。",
  },
  {
    time: "12:30",
    title: "Q&A",
    body: "事前質問 + その場での疑問にお答えします。",
  },
  {
    time: "13:00",
    title: "クローズ",
    body: "次の一歩としてのカリキュラム案内（任意）。",
  },
];

const included = [
  "アーカイブ動画（後日 7 日間視聴可）",
  "当日使用したスライドの PDF 配布",
  "Claude Code 導入チェックリスト",
];

export default function Detail() {
  return (
    <section
      id="detail"
      aria-labelledby="detail-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          — Detail —
        </p>

        {/* 主見出し */}
        <h2
          id="detail-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
        >
          当日の <span className="text-coral">2 時間</span>
        </h2>

        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-2xl mx-auto">
          実演 + 解説 + 質疑応答。
          <br className="hidden sm:block" />
          経営判断に必要な解像度をその場で持ち帰っていただきます
        </p>

        {/* 2 カラム */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          {/* === 左: タイムテーブル === */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-8">
              Timetable
            </p>

            <ol className="relative border-l border-coral/30 pl-8 space-y-10">
              {timeline.map((item, i) => (
                <li key={i} className="relative">
                  {/* 時刻マーカー */}
                  <span
                    className="absolute -left-[37px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral ring-4 ring-cream"
                    aria-hidden
                  />
                  <p className="font-mono text-sm tracking-[0.15em] text-coral font-semibold">
                    {item.time}
                  </p>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sumi/75">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* === 右: 開催情報カード === */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="rounded-2xl border border-sumi/15 bg-cream-warm p-8 sm:p-10">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-6">
                Event Info
              </p>

              <dl className="space-y-6">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                    Date
                  </dt>
                  <dd className="font-serif text-xl font-semibold">
                    2026 / 05 / 31 (土)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                    Time
                  </dt>
                  <dd className="font-serif text-xl font-semibold">
                    11:00 – 13:00 <span className="text-sm font-normal text-sumi/65">（120 分）</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                    Format
                  </dt>
                  <dd className="font-serif text-xl font-semibold">Online · Zoom</dd>
                  <p className="mt-1.5 text-xs text-sumi/55">
                    Zoom URL は申込確認後に個別配布いたします
                  </p>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                    Price
                  </dt>
                  <dd className="font-serif text-xl font-semibold">
                    ¥5,000 <span className="text-sm font-normal text-sumi/65">（税込）</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
                    Capacity
                  </dt>
                  <dd className="font-serif text-xl font-semibold">先着 30 名</dd>
                </div>
              </dl>

              {/* 含まれるもの */}
              <div className="mt-8 border-t border-sumi/10 pt-6">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-4">
                  Included
                </p>
                <ul className="space-y-2.5 text-sm text-sumi">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-coral" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
