/**
 * Detail — v5（開催の詳細：静かな高級感への格上げ / RULES.md §0 厳守）
 *
 * 方針:
 *   v4 の「サイズ差・コントラスト・余白で階層を作る」骨格は維持。
 *   そこに "クワイエット・ラグジュアリー"（Anthropic / Linear / Stripe 系）の
 *   奥行きと品格を、装飾の足し算ではなく "素材と質" で与える。
 *
 *   1. 背景の奥行き — DarkSection の cinematic backdrop を活かしつつ、
 *      コンテンツ層に「ごく淡いコーラルのアンビエント光」を1点だけ忍ばせ、
 *      上下に締まる多層グラデで「のっぺり」を解消（発光の塊にはしない）。
 *   2. タイポの品格 — palt/kern/hanging-punctuation/keep-all を全面付与。
 *      日付の級数をわずかに鎮め、料金（基準 clamp(2.5rem,13vw,4.5rem)）を
 *      主役として正しく立たせる。セリフの行間・字間・たっぷりの余白でリズム。
 *   3. ディテール — 区切りは極細 hairline（cream/10）まで。コーラルは
 *      "点"（ラベル・曜日・CTA・リストの罫）だけで効かせる。
 */
import DarkSection from "@/components/ui/DarkSection";

const sessions = [
  {
    label: "第1回",
    day: "05 / 31",
    weekday: "日",
    time: "11:00 – 13:00",
  },
  {
    label: "第2回",
    day: "06 / 03",
    weekday: "火",
    time: "19:00 – 21:00",
  },
];

const seeOnDay = [
  "AI が業務に乗る景色（実画面）",
  "あなたの業種への応用イメージ",
  "明日触ってみたくなる、最初の一歩",
];

// 日本語タイポの品格（palt/kern + 行末約物のぶら下げ + 単語途中改行の抑止）
const refined: React.CSSProperties = {
  fontFeatureSettings: '"palt" 1, "kern" 1',
  hangingPunctuation: "allow-end",
  wordBreak: "keep-all",
};

export default function Detail() {
  return (
    <DarkSection
      id="detail"
      aria-labelledby="detail-heading"
      bgImage="/images/backdrop/bd_b.jpg"
      bgOpacity={0.26}
      spotX={50}
      className="py-28 sm:py-40 px-6"
    >
      {/* 料金ブロックの奥に忍ばせる、ごく淡いコーラルのアンビエント光。
          奥行きを与えるためだけの "光" で、輪郭のある発光の塊にはしない。 */}
      <div
        className="absolute inset-x-0 bottom-0 top-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 42% at 50% 62%, rgba(217,119,87,0.10) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* 上下を締める多層グラデ。中央を澄ませ、端を沈めて「のっぺり」を解消。 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.55) 0%, transparent 22%, transparent 80%, rgba(20,20,20,0.6) 100%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto" style={refined}>
        <p className="font-mono text-[10px] tracking-[0.42em] uppercase text-coral mb-5 text-center">
          Detail
        </p>
        <h2
          id="detail-heading"
          className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.08] text-center mb-24 sm:mb-32"
          style={{ ...refined, letterSpacing: "-0.02em" }}
        >
          開催の <span className="text-coral">詳細</span>
        </h2>

        {/* === キー情報：日程（特大の日付。ただし料金を主役にするため一段鎮める） === */}
        <p className="font-mono text-[11px] tracking-[0.34em] uppercase text-coral/90 font-medium mb-10 text-center">
          Date — ご都合の良い回をお選びください
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {sessions.map((s, i) => (
            <div
              key={s.label}
              className={`py-9 sm:py-12 text-center ${
                i === 0
                  ? "border-b sm:border-b-0 sm:border-r border-cream/10"
                  : ""
              }`}
            >
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-cream/45 mb-4">
                {s.label}
              </p>
              <p
                className="font-serif font-medium leading-none text-cream text-[clamp(2.75rem,14vw,4.75rem)]"
                style={{ letterSpacing: "-0.025em" }}
              >
                {s.day}
                <span className="ml-3 align-top text-[0.34em] tracking-normal text-coral font-normal">
                  {s.weekday}
                </span>
              </p>
              <p className="mt-6 font-serif text-lg sm:text-xl text-cream/75 tracking-wide">
                {s.time}
              </p>
            </div>
          ))}
        </div>

        {/* === キー情報：料金（このセクションの主役。級数を最大に取る） === */}
        <div className="mt-20 sm:mt-28 border-t border-cream/10 pt-20 sm:pt-28 text-center">
          <p className="font-mono text-[11px] tracking-[0.34em] uppercase text-coral/90 font-medium mb-8">
            Price — セミナー1回 完結
          </p>
          <p className="leading-none text-cream">
            <span className="font-serif text-3xl sm:text-4xl align-top mr-1.5 text-cream/65">
              ¥
            </span>
            <span
              className="font-serif font-semibold text-[clamp(2.5rem,13vw,4.5rem)]"
              style={{ letterSpacing: "-0.035em" }}
            >
              5,000
            </span>
            <span className="ml-3.5 font-serif text-xl sm:text-2xl text-cream/50 font-normal align-baseline">
              税抜
            </span>
          </p>
          <p className="mt-8 text-sm sm:text-base text-cream/55 tracking-wide">
            別途消費税を申し受けます ・{" "}
            <span className="text-cream/80 font-medium">
              ¥5,500（税込・1 回完結）
            </span>
          </p>
        </div>

        {/* === 主 CTA：上品で確かな存在感（coral 主ボタン、控えめな影まで） === */}
        <div className="mt-16 sm:mt-20 text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-3 px-12 py-5 font-medium text-lg rounded-full
              bg-coral text-cream hover:bg-coral-deep transition-colors duration-200
              shadow-[0_14px_40px_-12px_rgba(217,119,87,0.55)]"
          >
            この回に申し込む
            <span className="font-mono text-sm tracking-[0.2em]">↓</span>
          </a>
        </div>

        {/* === 補助情報：形式・開場（沈めて配置） === */}
        <dl className="mt-24 sm:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-px border-t border-cream/10 pt-16 sm:pt-20">
          <div className="sm:pr-12">
            <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/90 font-medium mb-3">
              Format
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-medium text-cream/95">
              オンライン（Zoom）
            </dd>
            <p className="mt-3 text-sm text-cream/50 leading-relaxed">
              Zoom URL は申込確認後、自動でお送りいたします
            </p>
          </div>
          <div className="mt-12 sm:mt-0 sm:pl-12 sm:border-l border-cream/10">
            <dt className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/90 font-medium mb-3">
              開場
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-medium text-cream/95">
              開始10分前
            </dd>
            <p className="mt-3 text-sm text-cream/50 leading-relaxed">
              開始時刻にはお席にお着きください
            </p>
          </div>
        </dl>

        {/* === 当日見せるもの === */}
        <div className="mt-20 border-t border-cream/10 pt-14">
          <p className="font-mono text-[10px] tracking-[0.42em] uppercase text-cream/45 mb-7">
            When You&apos;re There
          </p>
          <ul className="space-y-4 text-base text-cream/90">
            {seeOnDay.map((item) => (
              <li key={item} className="flex gap-4">
                <span
                  className="mt-3 h-px w-5 shrink-0 bg-coral/80"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DarkSection>
  );
}
