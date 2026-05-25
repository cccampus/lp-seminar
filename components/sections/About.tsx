/**
 * About — なぜ今、Claude Code を学ぶ必要があるのか
 *
 * v2: Reel 準拠の「ダーク Manifesto ステージ」（reel_aligned_design_spec_v2.md §4 / RULES §4 Gold Standard）。
 * sumi ステージ + coral spotlight + 巨大背景タイポ + ドロップキャップ + glitch 見出しで、
 * 「世界で何が起きているか」の urgency をドラマで魅せる。内容（4 ファクト/引用/結論）は維持。
 */
import Image from "next/image";
import StageScene from "@/components/ui/StageScene";
import GlitchText from "@/components/ui/GlitchText";

type Fact = {
  n: string;
  title: string;
  body: React.ReactNode;
};

const facts: Fact[] = [
  {
    n: "01",
    title: "JPMorgan は、保険査定を 10 週間 → 10 日に短縮した",
    body: (
      <>
        これは「AI で業務を効率化した」という抽象的な話ではありません。
        金融最大手が、Claude を業務フローに組み込んで、
        <span className="text-coral-light font-medium">人月単位の時間を消した</span>具体例です。
        同様の動きは、PwC、Goldman Sachs でも始まっています。
      </>
    ),
  },
  {
    n: "02",
    title: "Anthropic の収益は、4 か月で 2.5 倍になった",
    body: (
      <>
        Claude Code が業務に入り始めた結果としての数字です。
        単なる AI チャットではなく、
        <span className="text-coral-light font-medium">業務に乗せるところまで</span>できる
        ツールに、企業が予算を割り振り始めた、ということ。
      </>
    ),
  },
  {
    n: "03",
    title: "日本では、まだ「ChatGPT を業務で試している」段階",
    body: (
      <>
        米国の IT 投資が日本に波及するまで、約 7 年。
        いま米国で起きている「AI を業務に乗せる動き」が、日本に届くのは数年後です。
        <span className="text-coral-light font-medium">先に判断軸を持つか、波が来てから慌てるか</span>
        — それが、5 年後のポジションを決めます。
      </>
    ),
  },
  {
    n: "04",
    title: "世界では、Claude Code を「作り込む」段階に入っている",
    body: (
      <>
        海外のエンジニアがハッカソンで優勝した「Claude Code 拡張一式」が、
        公開から数か月で GitHub の支持を一気に集めました。一過性のブームではなく、
        <span className="text-coral-light font-medium">「Claude Code を本気の道具として磨き込む」段階</span>
        に世界中の現場が入った証拠です。
      </>
    ),
  },
];

export default function About() {
  return (
    <StageScene
      id="about"
      aria-labelledby="about-heading"
      bgWord="CLAUDE CODE"
      className="py-28 sm:py-40 px-6"
    >
      <div className="max-w-3xl mx-auto">

        {/* 主見出し — glitch reveal */}
        <GlitchText
          as="h2"
          id="about-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream"
        >
          AI に「使われる側」から、
          <br />
          <span className="text-coral">「使う側」</span>へ
        </GlitchText>

        {/* manifesto リード（ドロップキャップ） */}
        <p className="mt-10 font-serif text-lg sm:text-xl leading-[1.95] text-cream/85">
          <span className="float-left mr-3 font-bold text-coral-light text-[3.2em] leading-[0.74]">
            C
          </span>
          hatGPT を業務に使い始めて、もう 2 年。多くの会社が「触ってはいる」。
          いま本当に問われているのは、
          <span className="text-coral-light font-medium">使いこなす力</span> です。
          世界では、その差がもう数字になって表れはじめています。
        </p>

        {/* === 4 つの事実 — ダーク連番 === */}
        <div className="mt-16 space-y-12 sm:space-y-14">
          {facts.map((f) => (
            <article
              key={f.n}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-3 md:gap-x-10 items-baseline"
            >
              <p
                className="font-serif text-5xl md:text-6xl font-semibold text-coral leading-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                {f.n}
              </p>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug text-cream">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-cream/70 max-w-2xl">
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 来る変化のビジュアル（引用の直前に1枚） */}
        <div className="relative mt-24 w-full aspect-[5/2] overflow-hidden rounded-sm">
          <Image
            src="/images/about/coming_wave.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(31,31,31,0.5) 0%, transparent 30%, transparent 55%, rgba(31,31,31,0.96) 100%)",
            }}
            aria-hidden
          />
        </div>

        {/* === 引用 — ドラマの中心 === */}
        <figure className="mt-12 text-center">
          <blockquote className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-cream [word-break:keep-all]">
            「これからの 1〜5 年で、
            <br />
            米国の新卒ホワイトカラー職の 50% が、
            <br />
            <span className="text-coral">職に就けない可能性がある</span>」
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-cream/55">
            Dario Amodei (Anthropic CEO) · Axios, 2025
          </figcaption>
        </figure>

        {/* === 結論 + 締めサイン === */}
        <div className="mt-24 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug text-cream [word-break:keep-all]">
            <span className="text-coral">今、判断軸を持つか</span>。
            <br />
            波が来てから、慌てるか
          </h3>
          <p className="mt-6 text-base leading-relaxed text-cream/75 max-w-xl mx-auto">
            このセミナーでは、
            <span className="text-coral-light font-medium">
              2 時間で Claude Code が業務に乗る景色
            </span>
            を経営者の言語でお見せします。
          </p>
          <div className="mt-12 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-cream/40">
            <span className="h-px w-8 bg-coral/60" aria-hidden />
            Claude Code Campus
          </div>
        </div>
      </div>
    </StageScene>
  );
}
