/**
 * About — なぜ今、Claude Code を学ぶ必要があるのか
 * 経営者・意思決定者向け。公知の AI 業界データ・発言を引用しつつ訴求。
 */
export default function About() {
  return (
    <section className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          — Why now —
        </p>

        {/* 主見出し */}
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center max-w-3xl mx-auto">
          AI を <span className="text-coral">「使う側」</span> から、
          <br />
          <span className="text-coral">「実装する側」</span> へ。
        </h2>

        {/* リード */}
        <p className="mt-8 text-base leading-loose text-sumi/80 text-center max-w-2xl mx-auto">
          ChatGPT を業務に使い始めて、もう 2 年。<br />
          <span className="font-medium">いま、本当に問われているのは「実装力」です。</span>
        </p>

        {/* === 3 つの "Why now" === */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* item 01 */}
          <div className="flex flex-col">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-coral mb-3">
              01 · The Engine Shift
            </p>
            <h3 className="font-serif text-xl font-semibold mb-3 leading-snug">
              Anthropic の売上は<br />
              <span className="text-coral">4ヶ月で 2.5 倍</span>。
            </h3>
            <p className="text-sm leading-relaxed text-sumi/70">
              ARR は $44B 規模に到達。粗利は 38% から 70% へ。
              この急成長の原動力こそ <span className="font-medium">Claude Code</span> — 開発者向けではなく、<br />
              <span className="font-medium">業務に AI を実装するための「ハーネス」</span>です。
            </p>
          </div>

          {/* item 02 */}
          <div className="flex flex-col">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-coral mb-3">
              02 · Industry Disrupt
            </p>
            <h3 className="font-serif text-xl font-semibold mb-3 leading-snug">
              金融・コンサル・法律で<br />
              <span className="text-coral">既に始まっている</span>。
            </h3>
            <p className="text-sm leading-relaxed text-sumi/70">
              PwC は 3 万人を Claude で再教育。JPMorgan は AI で <span className="font-medium">保険査定を 10 週間→10 日</span> に。
              米国のホワイトカラー業務の 50%は、1〜5 年で「AI で済む」可能性 — Anthropic CEO Dario Amodei の発言です。
            </p>
          </div>

          {/* item 03 */}
          <div className="flex flex-col">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-coral mb-3">
              03 · Japan Lag
            </p>
            <h3 className="font-serif text-xl font-semibold mb-3 leading-snug">
              IT は米国から日本に<br />
              <span className="text-coral">約 7 年遅れ</span>で来る。
            </h3>
            <p className="text-sm leading-relaxed text-sumi/70">
              いま米国で起きている AI 実装の波が、日本に届くのは数年後。
              <span className="font-medium">今このタイミングで学ぶか、波が来てから慌てるか</span>。
              この差が、5 年後の自分・自社のポジションを決めます。
            </p>
          </div>
        </div>

        {/* === 引用 === */}
        <figure className="mt-24 max-w-3xl mx-auto text-center">
          <blockquote className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-sumi-deep">
            「これからの 1〜5 年で、<br />
            米国の新卒ホワイトカラー職の 50% が、<br />
            <span className="text-coral">職に就けない可能性がある</span>」
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-sumi/55">
            — Dario Amodei (Anthropic CEO) / Axios, 2025
          </figcaption>
        </figure>

        {/* === 結論 === */}
        <div className="mt-24 max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
            <span className="text-coral">今、学ぶか</span>。
            <br />
            それとも、波が来てから慌てるか。
          </h3>
          <p className="mt-6 text-base leading-relaxed text-sumi/75">
            このセミナーでは、<span className="font-medium">2 時間で Claude Code が業務に乗る景色</span>をお見せします。
            実演 + 自社事例 + 経営者にとっての位置取り — 経営判断に必要な解像度をその場で手に入れていただきます。
          </p>
        </div>
      </div>
    </section>
  );
}
