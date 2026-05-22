/**
 * Plan B §2: こんな悩み、ありませんか
 *
 * Takka 指示：
 *   - 危機感を誘う（ビジュアル：sumi 寄り背景 + 大文字疑問）
 *   - 「実装する」系の硬い言葉を排除
 *   - 経営者「何から始めたらいいか分からない」「何ができるか分からない」共感
 *   - 副業臭 NG、教科書的すぎる経営課題語も避ける
 */

const pains = [
  {
    q: "何から始めたら、いいのか分からない",
    body: "周りは「もう AI 使ってる」と言うけれど、自社の何をどう変えればいいのか、入り口が見えない。",
  },
  {
    q: "AI で「何ができるのか」が分からない",
    body: "ChatGPT は触ったが、それ以上の使い方が分からない。自分の業務にどう乗せるかの当たりが付かない。",
  },
  {
    q: "現場が AI を触っているが、把握できない",
    body: "社員が ChatGPT を使い始めた。でも、組織として何が動いていて、何を採用すべきか、経営側の判断軸がない。",
  },
  {
    q: "投資すべきか、様子見すべきか、決められない",
    body: "AI 関連の予算や導入の話が回ってくるが、判断する根拠が手元にない。気づいたら 1 年遅れていた、にはなりたくない。",
  },
];

export default function PainPoints() {
  return (
    <section
      id="pain"
      aria-labelledby="pain-heading"
      className="relative w-full bg-sumi-deep text-cream overflow-hidden py-24 sm:py-32 px-6"
    >
      {/* ambient コーラル光（弱） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 92% 8%, rgba(217,119,87,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 8% 95%, rgba(184,93,64,0.14) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-6">
          こんな悩み、ありませんか
        </p>

        {/* 大見出し：危機感の主張 */}
        <h2
          id="pain-heading"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-center"
          style={{ letterSpacing: "-0.01em" }}
        >
          周りは <span className="text-coral italic">動き始めて</span> いる。<br />
          自分だけ、足元が見えない。
        </h2>
        <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/75 text-center max-w-2xl mx-auto">
          経営者・意思決定者が、いま日々抱えている 4 つの「停滞」。
          <br className="hidden sm:inline" />
          このセミナーは、その入り口を 1 回で外すために設計しています。
        </p>

        {/* === 4 つの停滞 === */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/8 border border-cream/8">
          {pains.map((p, i) => (
            <article
              key={i}
              className="relative bg-sumi-deep p-8 sm:p-10 group hover:bg-sumi-deep/80 transition-colors"
            >
              {/* 上端 coral 細線 */}
              <span className="absolute top-0 left-0 h-px w-12 bg-coral" aria-hidden />

              <p
                className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold mb-4"
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              <h3
                className="font-serif text-2xl sm:text-3xl font-semibold leading-[1.25] mb-5"
                style={{ letterSpacing: "-0.01em" }}
              >
                <span className="text-coral italic">?</span>{" "}{p.q}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-cream/70">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* 締めの 1 行 */}
        <p className="mt-16 text-center text-base sm:text-lg leading-relaxed text-cream/80 max-w-2xl mx-auto">
          「<span className="text-coral">入り口</span>」さえ掴めれば、
          <br className="hidden sm:inline" />
          後は、自分のペースで進めます。
        </p>
      </div>
    </section>
  );
}
