import Image from "next/image";
import DarkSection from "@/components/ui/DarkSection";

/**
 * Speaker — v3.2 コピー / cinematic V2 ダークトーン
 * 紀洋: 34歳/店舗経営、たっか: TVCM制作+大学講師
 * 「使う側 ＋ 教えるプロ」両軸
 */
const speakers = [
  {
    name: "陳 紀洋",
    reading: "きよう",
    photo: "/images/kiyo.jpg",
    role: "Speaker 01",
    intro: [
      "店舗経営をしている、34歳の経営者です。",
      "半年前まで AI をほとんど触っていなかった人間です。",
      "エンジニアでも、IT が得意でも、ありません。",
    ],
    body: [
      "そんな私が Claude Code に出会って6ヶ月。",
      "集客・広告運用・書類づくり・SNS、すべての仕事が変わりました。",
    ],
    closing: [
      "経営者へのコーチングを何十名と。",
      "大手企業の研修講師としても、現場に立ってきました。",
      "「使ってきた経営者」と「教えるプロ」、両方の視点で、あなたの2時間を設計します。",
    ],
  },
  {
    name: "鈴木 崇哲",
    reading: "たっか",
    photo: "/images/takka.jpg",
    role: "Speaker 02",
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
    closing: ["その6ヶ月で何が変わったか、リアルにお話しします。"],
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
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
          Speakers
        </p>
        <h2
          id="speaker-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-16"
          style={{ letterSpacing: "-0.01em" }}
        >
          教えるのは、
          <br />
          半年前まで AI を使えなかった2人です。
        </h2>

        <div className="space-y-20 sm:space-y-24">
          {speakers.map((s) => (
            <article
              key={s.name}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-y-8 md:gap-x-12"
            >
              {/* 写真 + 名前 */}
              <div>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-[260px] md:h-[260px] border border-cream/15 bg-cream/[0.04] overflow-hidden">
                  <Image
                    src={s.photo}
                    alt={`${s.name}(${s.reading})`}
                    fill
                    sizes="(min-width: 768px) 260px, 224px"
                    className="object-cover"
                  />
                  <span
                    className="absolute -bottom-[1px] left-0 h-px w-12 bg-coral"
                    aria-hidden
                  />
                </div>
                <div className="mt-5">
                  <p className="font-mono text-sm tracking-[0.2em] text-coral font-semibold">
                    {s.role}
                  </p>
                  <p
                    className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-cream"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {s.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55">
                    {s.reading}
                  </p>
                </div>
              </div>

              {/* 本文 */}
              <div className="space-y-6 text-base leading-loose text-cream">
                <div className="space-y-2">
                  {s.intro.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <div className="space-y-2">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <div className="border-t border-cream/10 pt-6 space-y-2 text-cream/80">
                  {s.closing.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
