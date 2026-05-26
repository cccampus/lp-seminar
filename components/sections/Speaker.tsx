import Image from "next/image";

/**
 * Speaker — v3.2（紀洋: 34歳/店舗経営、たっか: TVCM制作+大学講師）
 * 「使う側 ＋ 教えるプロ」両軸の立て付け
 */
const speakers = [
  {
    name: "陳 紀洋",
    reading: "きよう",
    photo: "/images/speakers/kiyo.jpg",
    intro: [
      "店舗経営をしている、34歳の経営者です。",
      "半年前まで AI をほとんど触っていなかった人間です。",
      "エンジニアでも、IT が得意でも、ありません。",
    ],
    body: [
      "そんな私が Claude Code に出会って6ヶ月。",
      "集客・広告運用・書類づくり・SNS、すべての仕事が変わりました。",
    ],
    role: [
      "経営者へのコーチングを何十名と。",
      "大手企業の研修講師としても、現場に立ってきました。",
      "「使ってきた経営者」と「教えるプロ」、両方の視点で、あなたの2時間を設計します。",
    ],
  },
  {
    name: "鈴木 崇哲",
    reading: "たっか",
    photo: "/images/speakers/takka.jpg",
    intro: [
      "大手企業の新規事業開発部の部長です。",
      "TVCM 制作を、長くやってきました。",
      "半年前まで、AI で何ができるかも知りませんでした。",
    ],
    body: [
      "CG 映像系の専門学校で4年、大学でも講師を務めてきました。",
      "「制作のプロ」と「教えるプロ」の経験を持ったまま、",
      "AI で動画も LP も記事も全部作る側に移ったところです。",
    ],
    role: ["その6ヶ月で何が変わったか、リアルにお話しします。"],
  },
];

export default function Speaker() {
  return (
    <section
      id="speaker"
      aria-labelledby="speaker-heading"
      className="relative w-full bg-cream text-sumi-deep py-24 sm:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
          Speakers
        </p>
        <h2
          id="speaker-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center mb-16"
          style={{ letterSpacing: "-0.01em" }}
        >
          教えるのは、
          <br />
          半年前まで AI を使えなかった2人です。
        </h2>

        <div className="space-y-16 sm:space-y-20">
          {speakers.map((s, i) => (
            <div
              key={s.name}
              className={`flex flex-col sm:flex-row gap-8 sm:gap-12 ${
                i % 2 === 0 ? "" : "sm:flex-row-reverse"
              }`}
            >
              {/* 写真 */}
              <div className="shrink-0 w-full sm:w-64">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-sumi/15">
                  <Image
                    src={s.photo}
                    alt={`${s.name}（${s.reading}）`}
                    fill
                    sizes="(min-width: 640px) 256px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 border-l-2 border-coral pl-4">
                  <p className="font-serif text-xl font-semibold">{s.name}</p>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-sumi/60 mt-1">
                    {s.reading}
                  </p>
                </div>
              </div>

              {/* 本文 */}
              <div className="flex-1 space-y-5 text-sm sm:text-base leading-loose text-sumi/85">
                <div>
                  {s.intro.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <div>
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <div className="border-t border-sumi/10 pt-5">
                  {s.role.map((p, j) => (
                    <p key={j} className="text-sumi/75">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
