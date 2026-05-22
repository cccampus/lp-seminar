/**
 * About — なぜ今、Claude Code を学ぶ必要があるのか
 *
 * 経営者向け。AI 業界の「ラベル」より、経営者が日々向き合っている
 * 「実務の構図」から入る。Engine Shift / Industry Disrupt のような
 * 英語の章立ては AI slop 化を招くので廃止し、実例ベースに変えた。
 */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* eyebrow — 中点・em-dash囲み英文は AI slop 指紋なので簡素に */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          いま、何が起きているか
        </p>

        {/* 主見出し */}
        <h2
          id="about-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto"
        >
          AI に「使われる側」から、
          <br />
          <span className="text-coral">「使う側」</span>へ
        </h2>

        {/* リード */}
        <p className="mt-8 text-base leading-loose text-sumi/80 text-center max-w-2xl mx-auto">
          ChatGPT を業務に使い始めて、もう 2 年。
          <br />
          いま本当に問われているのは、<span className="font-medium">「使いこなす力」</span>です
        </p>

        {/* === 3 つの実務的な変化 === */}
        <div className="mt-20 space-y-14 sm:space-y-16">
          {/* item 01 — 実例ベース */}
          <article className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-3 md:gap-x-10 items-baseline">
            <p
              className="font-serif text-5xl md:text-6xl font-semibold text-coral/90 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              01
            </p>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                JPMorgan は、保険査定を 10 週間 → 10 日に短縮した
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-sumi/75 max-w-3xl">
                これは「AI で業務を効率化した」という抽象的な話ではありません。
                金融最大手が、Claude を業務フローに組み込んで、
                <span className="font-medium">人月単位の時間を消した</span>具体例です。
                同様の動きは、PwC（コンサル）、Goldman Sachs（金融）でも始まっています。
              </p>
            </div>
          </article>

          {/* item 02 */}
          <article className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-3 md:gap-x-10 items-baseline">
            <p
              className="font-serif text-5xl md:text-6xl font-semibold text-coral/90 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              02
            </p>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                Anthropic の収益は、4 か月で 2.5 倍になった
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-sumi/75 max-w-3xl">
                Claude Code が業務に入り始めた結果としての数字です。
                単なる AI チャットではなく、
                <span className="font-medium">業務に乗せるところまで</span>できる
                ツールに、企業が予算を割り振り始めた、ということ。
                同じ判断を、自社にも持ち込めるかが今の論点です。
              </p>
            </div>
          </article>

          {/* item 03 */}
          <article className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-3 md:gap-x-10 items-baseline">
            <p
              className="font-serif text-5xl md:text-6xl font-semibold text-coral/90 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              03
            </p>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                日本では、まだ「ChatGPT を業務で試している」段階
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-sumi/75 max-w-3xl">
                米国の IT 投資が日本に波及するまで、約 7 年。
                いま米国で起きている「AI を業務に乗せる動き」が、
                日本に届くのは数年後です。
                <span className="font-medium">先に判断軸を持つか、波が来てから慌てるか</span>
                — それが、5 年後のポジションを決めます。
              </p>
            </div>
          </article>
        </div>

        {/* === 引用 === */}
        <figure className="mt-24 max-w-3xl mx-auto text-center">
          <blockquote className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-sumi-deep">
            「これからの 1〜5 年で、
            <br />
            米国の新卒ホワイトカラー職の 50% が、
            <br />
            <span className="text-coral">職に就けない可能性がある</span>」
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-sumi/55">
            Dario Amodei (Anthropic CEO) · Axios, 2025
          </figcaption>
        </figure>

        {/* === 結論 === */}
        <div className="mt-24 max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
            <span className="text-coral">今、判断軸を持つか</span>。
            <br />
            波が来てから、慌てるか
          </h3>
          <p className="mt-6 text-base leading-relaxed text-sumi/75">
            このセミナーでは、<span className="font-medium">2 時間で Claude Code が業務に乗る景色</span>
            を経営者の言語でお見せします。
            実演 + 自社事例 + 経営者にとっての位置取り — 持ち帰れる感覚を、その場で。
          </p>
        </div>
      </div>
    </section>
  );
}
