import Image from "next/image";

/**
 * Speaker — Editorial Card 型に再設計
 * - Codex / リサーチ agent 両方の指摘: 肩書き / バッジ系は AI slop、
 *   「何を実装してきたか」「外部での実績」を出す
 * - 写真: square crop / Sumi 背景フレーム
 * - 円形クロップ＋グラデ縁は廃止（典型的 AI slop パターン）
 */
import DarkSection from "@/components/ui/DarkSection";

type Speaker = {
  photo: string;
  alt: string;
  name: string;
  role: string;
  body: React.ReactNode;
  /** 外部での実績クレジット行 — メディア名・社名・登壇等 */
  credits: string[];
  /** 教える領域ではなく、実装してきた事例 */
  works: string[];
};

const speakers: Speaker[] = [
  {
    photo: "/images/kiyo.jpg",
    alt: "Kiyo のポートレート",
    name: "Kiyo",
    role: "経営者 × AI 実践家",
    body: (
      <>
        パーソナルジム経営から AI 実践家へ転身。集客・業務自動化・CRM 構築を
        <span className="font-medium">経営者目線</span>で設計してきた。
        現場で人を雇い、回し、辞めさせる側を経験した上での「人と AI の両立」を、
        理屈ではなく実体験ベースで伝える。
      </>
    ),
    credits: ["パーソナルジム経営", "AI 業務自動化設計", "Claude Code Campus 共同講師"],
    works: [
      "ジム経営の予約・問合せ・契約フローを Claude で全自動化",
      "中小企業向けの Claude Code 導入を経営判断レベルで伴走",
      "CRM・LINE 接客導線を Claude × n8n で内製化",
    ],
  },
  {
    photo: "/images/takka.jpg",
    alt: "Takka のポートレート",
    name: "Takka",
    role: "AI アーティスト 兼 実業家",
    body: (
      <>
        大手上場企業を経て、AI 企業の役員を経験。現在は
        <span className="font-medium">クリエイティブと AI を実務に落とす</span>立場に。
        デジタルハリウッドで講師を務め、AI アーティストとしてコンテスト受賞歴も。
        昨年はニュース番組にも出演。動画・画像生成から LP・スライド・モック制作までを
        Claude Code で一気通貫で回している。
      </>
    ),
    credits: [
      "大手上場企業 出身",
      "AI 企業 役員経験",
      "デジタルハリウッド 講師",
      "AIアート コンテスト受賞",
    ],
    works: [
      "クライアント LP の制作リードタイムを 1/4 に短縮",
      "スライド 140 枚を Claude Code で一括生成・更新する仕組みを構築",
      "動画・画像生成 API を業務フローに統合し、制作を内製化",
    ],
  },
];

export default function Speaker() {
  return (
    <DarkSection
      id="speaker"
      aria-labelledby="speaker-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          話す人
        </p>

        {/* 主見出し */}
        <h2
          id="speaker-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
        >
          話すのは、<span className="text-coral">実践してきた</span>二人
        </h2>

        <p className="mt-6 text-base leading-relaxed text-cream/75 text-center max-w-2xl mx-auto">
          経営の視点と、現場で手を動かす視点 — 両側を同時に持つ二人が、対等に登壇します
        </p>

        {/* === 2 講師: editorial 縦組み === */}
        <div className="mt-20 space-y-20 sm:space-y-24">
          {speakers.map((s, idx) => (
            <article
              key={s.name}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-y-8 md:gap-x-12 items-start"
            >
              {/* === 写真 — square crop / Sumi 細枠 === */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-[260px] md:h-[260px] mx-auto md:mx-0">
                <div className="absolute inset-0 border border-cream/15 bg-cream/[0.04]" aria-hidden />
                <Image
                  src={s.photo}
                  alt={s.alt}
                  width={500}
                  height={500}
                  sizes="(min-width: 768px) 260px, 224px"
                  className="relative block h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Coral アクセント: 左下に短い線のみ（リサーチagent指摘の AI slop 回避） */}
                <span
                  className="absolute -bottom-[1px] left-0 h-px w-12 bg-coral"
                  aria-hidden
                />
              </div>

              {/* === 本文 === */}
              <div>
                {/* 番号 + 名前 — editorial */}
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-sm tracking-[0.2em] text-coral font-semibold"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55">
                    {s.role}
                  </span>
                </div>
                <h3
                  className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-cream"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.name}
                </h3>

                {/* bio */}
                <p className="mt-6 text-base leading-relaxed text-cream max-w-2xl">
                  {s.body}
                </p>

                {/* === 実装してきたもの === */}
                <div className="mt-8 max-w-2xl">
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55 mb-4">
                    手がけてきたもの
                  </p>
                  <ul className="space-y-2.5 text-sm text-cream">
                    {s.works.map((w) => (
                      <li key={w} className="flex gap-3.5">
                        <span
                          className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-coral"
                          aria-hidden
                        />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* === クレジット行 — 点区切り === */}
                <p className="mt-8 text-xs text-cream/65">
                  {s.credits.map((c, i) => (
                    <span key={c}>
                      {i > 0 && <span className="text-cream/30 mx-2">·</span>}
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
