/**
 * TrustStrip — 「世界での位置づけ」信頼セクション（ダーク・シネマティック版）
 * - 全面ダーク統一に合わせ sumi ステージ化。可読性のため文字・余白を大きく
 * - 外部ファクト（Anthropic 公式 / 収益規模 / Fortune 500 採用）を大きな数字で見せる
 * - 背景に enterprise の cinematic 画像（Krea gpt-image-2）を低 opacity で敷く
 */
import Image from "next/image";

const FACTS = [
  {
    fig: "Anthropic 公式",
    body: "Claude Code は、Anthropic が提供する開発エージェント。",
  },
  {
    fig: "$8.9B+",
    body: "Anthropic の年間収益（2026 推計・4 か月で 2.5 倍）。",
  },
  {
    fig: "Fortune 500",
    body: "PwC・JPMorgan 他、米国大手の業務に組み込み済み。",
  },
];

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
        <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-coral text-center mb-14 sm:mb-16">
          世界での、位置づけ
        </p>

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
            </div>
          ))}
        </div>

        {/* 出典 */}
        <p className="mt-16 text-sm leading-relaxed text-cream/45 max-w-3xl mx-auto text-center sm:text-left">
          出典：Anthropic 公式発表（2026 年）、PwC / JPMorgan 公式リリース。
          本セミナーは Anthropic 公式イベントではありません — 同社の技術を独立して教える立場で構成しています。
        </p>
      </div>
    </section>
  );
}
