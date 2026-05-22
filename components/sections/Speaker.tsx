import Image from "next/image";

/**
 * Speaker — Editorial Card 型に再設計
 * - Codex / リサーチ agent 両方の指摘: 肩書き / バッジ系は AI slop、
 *   「何を実装してきたか」「外部での実績」を出す
 * - 写真: square crop / Sumi 背景フレーム
 * - 円形クロップ＋グラデ縁は廃止（典型的 AI slop パターン）
 */

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
    photo: "/images/kiyo_v2.png",
    alt: "Kiyo のポートレート",
    name: "Kiyo",
    role: "経営者 × AI 実装家",
    body: (
      <>
        パーソナルジム経営から AI 実装家へ転身。集客・業務自動化・CRM 構築を
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
    photo: "/images/takka_v2.png",
    alt: "Takka のポートレート",
    name: "Takka",
    role: "クリエイティブ × AI 実装家",
    body: (
      <>
        TVCM 制作・事業開発を経て、クリエイティブと AI を実務に落とす立場に。
        動画・画像生成、LP・スライド・モック制作を Claude Code で
        <span className="font-medium">一気通貫</span>で回している。
        制作会社や代理店との折衝で消耗していた工程を、自分の手元に取り戻すための実装。
      </>
    ),
    credits: ["TVCM 制作", "事業開発", "Claude Code Campus 主宰"],
    works: [
      "クライアント LP の制作リードタイムを 1/4 に短縮",
      "スライド 140 枚を Claude Code で一括生成・更新する仕組みを構築",
      "Seedance / Kling 等の動画生成 API を業務フローに統合",
    ],
  },
];

export default function Speaker() {
  return (
    <section
      id="speaker"
      aria-labelledby="speaker-heading"
      className="relative w-full bg-cream-warm text-sumi-deep py-24 sm:py-32 px-6"
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
          話すのは、<span className="text-coral">実装してきた</span>二人
        </h2>

        <p className="mt-6 text-base leading-relaxed text-sumi/75 text-center max-w-2xl mx-auto">
          経営の視点と、現場の実装の視点 — 両側を同時に持つ二人が、対等に登壇します
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
                <div className="absolute inset-0 border border-sumi/15 bg-sumi/[0.03]" aria-hidden />
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
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55">
                    {s.role}
                  </span>
                </div>
                <h3
                  className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-sumi-deep"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.name}
                </h3>

                {/* bio */}
                <p className="mt-6 text-base leading-relaxed text-sumi max-w-2xl">
                  {s.body}
                </p>

                {/* === 実装してきたもの === */}
                <div className="mt-8 max-w-2xl">
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-4">
                    実装してきたもの
                  </p>
                  <ul className="space-y-2.5 text-sm text-sumi">
                    {s.works.map((w) => (
                      <li key={w} className="flex gap-3">
                        <span className="mt-2 h-px w-4 shrink-0 bg-coral" aria-hidden />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* === クレジット行 — 点区切り === */}
                <p className="mt-8 text-xs text-sumi/65">
                  {s.credits.map((c, i) => (
                    <span key={c}>
                      {i > 0 && <span className="text-sumi/30 mx-2">·</span>}
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
