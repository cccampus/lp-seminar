/**
 * TrustStrip — 「世界での位置づけ」信頼セクション（ダーク・シネマティック版）
 * - 全面ダーク統一に合わせ sumi ステージ化。可読性のため文字・余白を大きく
 * - 外部ファクト（Anthropic 公式 / 収益規模 / Fortune 500 採用）を大きな数字で見せる
 * - 背景に enterprise の cinematic 画像（Krea gpt-image-2）を低 opacity で敷く
 */
import Image from "next/image";

const FACTS: { fig: string; body: string; chart?: boolean }[] = [
  {
    fig: "Anthropic 公式",
    body: "Claude Code は、Anthropic が提供する開発エージェント。",
  },
  {
    fig: "$8.9B+",
    body: "Anthropic の年間収益（2026 推計・4 か月で 2.5 倍）。",
    chart: true,
  },
  {
    fig: "Fortune 500",
    body: "PwC・JPMorgan 他、米国大手の業務に組み込み済み。",
  },
];

/** 収益 2.5 倍の成長を示す coral のミニ・データビズ（画像でなく code 製＝正確・鮮明） */
function GrowthChart() {
  return (
    <svg
      viewBox="0 0 200 64"
      className="mt-1 h-12 w-full max-w-[200px] mx-auto sm:mx-0"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ts-grow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97757" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 面 */}
      <path
        d="M4 54 L68 48 L130 28 L196 8 L196 64 L4 64 Z"
        fill="url(#ts-grow)"
      />
      {/* 線 */}
      <path
        d="M4 54 L68 48 L130 28 L196 8"
        fill="none"
        stroke="#d97757"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 終点 */}
      <circle cx="196" cy="8" r="3.5" fill="#e89478" />
    </svg>
  );
}

export default function TrustStrip() {
  return (
    <section
      aria-label="Claude Code に関する信頼情報"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate py-24 sm:py-32 px-6"
    >
      {/* 背景: enterprise cinematic（もう少し見せる） */}
      <div className="absolute inset-0 pointer-events-none opacity-55" aria-hidden>
        <Image
          src="/images/trust/enterprise_bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* コントラスト確保の暗幕（画像が見える程度に薄め） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,31,31,0.82) 0%, rgba(31,31,31,0.5) 50%, rgba(31,31,31,0.85) 100%)",
        }}
        aria-hidden
      />
      {/* 上部 coral スポット */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(217,119,87,0.14) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight text-center text-cream mb-12 sm:mb-16 [word-break:keep-all]">
          世界での、<span className="text-coral">位置づけ</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10">
          {FACTS.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col gap-4 text-center sm:text-left ${
                i > 0 ? "sm:border-l sm:border-cream/12 sm:pl-10" : ""
              }`}
            >
              <p
                className="font-serif text-3xl sm:text-4xl font-semibold text-coral leading-none [word-break:keep-all]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {f.fig}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-cream/85 [word-break:keep-all]">
                {f.body}
              </p>
              {f.chart && <GrowthChart />}
            </div>
          ))}
        </div>

        {/* 導入・関連企業（cream ワードマーク。公式ロゴ素材があれば差し替え可） */}
        <div className="mt-16 sm:mt-20 border-t border-cream/10 pt-12">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/40 text-center mb-8">
            業務への組み込みが進む企業
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {["Anthropic", "PwC", "J.P. Morgan", "Goldman Sachs"].map((n) => (
              <span
                key={n}
                className="font-serif text-xl sm:text-2xl text-cream/65 transition-colors duration-200 hover:text-cream/90"
                style={{ letterSpacing: "0.01em" }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* 出典 */}
        <p className="mt-14 text-sm leading-relaxed text-cream/45 max-w-3xl mx-auto text-center sm:text-left">
          出典：Anthropic 公式発表（2026 年）、PwC / JPMorgan 公式リリース。
          本セミナーは Anthropic 公式イベントではありません — 同社の技術を独立して教える立場で構成しています。
        </p>
      </div>
    </section>
  );
}
