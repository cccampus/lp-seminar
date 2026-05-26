/**
 * WhyPaid — v3.2 新規
 * 「フィルター」「払う痛み」削除 → 「真剣な仲間と」軸
 * 「6ヶ月後のあなたを買う、最初の初期投資費用」
 */
export default function WhyPaid() {
  return (
    <section
      id="why-paid"
      aria-labelledby="why-paid-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Why Paid
        </p>
        <h2
          id="why-paid-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-12"
          style={{ letterSpacing: "-0.01em" }}
        >
          なぜ、有料なのか。
        </h2>

        <div className="space-y-7 text-base sm:text-lg leading-loose text-sumi/85">
          <p>
            無料のセミナーは、世の中にたくさんあります。
            <br />
            それでも、私たちは <strong className="text-sumi-deep">¥5,000</strong> でお願いしています。
          </p>

          <p>
            理由はシンプルです。
            <br />
            <strong className="text-sumi-deep">本気で一歩踏み出す方と、密度の濃い2時間を過ごしたい。</strong>
          </p>

          <p>
            無料の場には、いろんな目的の人が集まります。
            <br />
            有料を選んだあなたが「来てよかった」と思える時間を、
            <br />
            私たちも責任を持って作る。そのためのお支払いです。
          </p>

          <div className="border-l-2 border-coral pl-6 py-2 mt-10">
            <p className="font-serif text-lg sm:text-xl text-sumi-deep leading-relaxed">
              —— 5,000 円は、6 ヶ月後のあなたを買う、
              <br />
              <span className="text-coral font-semibold">最初の初期投資費用</span>です。
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full
              hover:bg-coral-deep transition-colors duration-200"
          >
            2時間、一緒に過ごす ↗
          </a>
        </div>
      </div>
    </section>
  );
}
