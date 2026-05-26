/**
 * Wave — v3.2（旧Wave/About書き換え版）
 * 専門用語完全削除、経営者が読みやすい平易さで「波が来てる」を伝える
 */
export default function Wave() {
  return (
    <section
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6 overflow-hidden"
      aria-labelledby="wave-heading"
    >
      <div className="relative max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          The Wave
        </p>
        <h2
          id="wave-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-12"
          style={{ letterSpacing: "-0.01em" }}
        >
          いま、世界で起きていること。
        </h2>

        {/* 3つのブロック */}
        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 text-coral">
              アメリカは、もう動いています。
            </h3>
            <p className="text-base sm:text-lg leading-loose text-sumi/85">
              銀行、保険、商社といった大手企業の事務作業の
              <strong className="text-sumi-deep">半分近くが、AI に置き換わり始めました。</strong>
              <br />
              「秘書がやっていた書類づくり」「メール返信」「会議の議事録」、
              これまで人がやってきた仕事の多くを、AI が担い始めています。
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 text-coral">
              日本は、約7年遅れているといわれています。
            </h3>
            <p className="text-base sm:text-lg leading-loose text-sumi/85">
              ただ、ここ数ヶ月で、急速に動き始めました。
              <br />
              <strong className="text-sumi-deep">NEC、JR、楽天、メルカリ</strong>、
              日本の大手も一斉に、AI を業務に取り入れる発表をしています。
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 text-coral">
              波は、もうすぐそこまで来ています。
            </h3>
            <p className="text-base sm:text-lg leading-loose text-sumi/85">
              今、動き始めるか。
              <br />
              5年後に追いかけるか。
              <br />
              <strong className="text-sumi-deep">その差は、桁が違う差になります。</strong>
            </p>
          </div>
        </div>

        {/* スキップCTA */}
        <div className="mt-16 text-center">
          <a
            href="#detail"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-sumi/55 hover:text-coral transition-colors"
          >
            先に詳細だけ見る ↓
          </a>
        </div>
      </div>
    </section>
  );
}
