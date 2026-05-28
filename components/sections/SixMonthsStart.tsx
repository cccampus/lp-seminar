"use client";

/**
 * SixMonths Variant E — TracingBeam + EditorialList (hp-ai/about Chapter 流用)
 *
 * isshin-ai.co.jp/about の Chapter NN 構造を真似る:
 *   - TracingBeam で左に「縦線+短い斜め2回」のL字パス
 *   - 各章: Chapter NN ラベル → 巨大見出し → 本文 → 末尾 line
 *   - スクロール連動で beam が描画される
 */
import Image from "next/image";
import { motion } from "motion/react";
import { TracingBeam } from "@/components/aceternity/TracingBeam";

const beforeAfter = [
  { label: "LP・SEO記事制作", before: "外注で月30万", after: "自分で1時間以内" },
  { label: "SNS動画作成・投稿", before: "外注で月10万", after: "AI補助で30分以内" },
  { label: "Google・Meta広告運用", before: "外注で月20万", after: "自分で30分以内" },
  { label: "仕訳や契約書作成", before: "外注で月10万", after: "自分で30分以内" },
];

function Chapter({ index, item }: { index: number; item: typeof beforeAfter[number] }) {
  const chars = Array.from(item.label);
  return (
    <article className="py-6 sm:py-8 first:pt-0 last:pb-0">
      <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-cream/55 mb-4">
        Change 0{index + 1}
      </p>
      <h3
        className="font-serif font-semibold text-cream"
        style={{
          fontSize: "clamp(22px, 3vw, 36px)",
          letterSpacing: "-0.015em",
          lineHeight: 1.45,
          wordBreak: "keep-all",
          lineBreak: "strict",
        }}
      >
        {chars.map((c, ci) => (
          <motion.span
            key={ci}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: ci * 0.022, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
            style={{ whiteSpace: c === " " ? "pre" : "normal" }}
          >
            {c}
          </motion.span>
        ))}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 sm:mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1"
      >
        <span className="font-serif text-sm sm:text-base text-cream/55 line-through decoration-coral/40 decoration-1 underline-offset-4">
          {item.before}
        </span>
        <span className="font-mono text-coral text-sm sm:text-base">→</span>
        <span
          className="font-serif text-base sm:text-xl font-semibold text-coral"
          style={{ letterSpacing: "-0.01em" }}
        >
          {item.after}
        </span>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-coral/70 via-coral/20 to-transparent origin-left"
      />
    </article>
  );
}

export default function SixMonthsStart() {
  return (
    <section
      id="six-months-start"
      aria-labelledby="six-months-start-heading"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate"
    >
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0 sm:hidden" aria-hidden>
        <Image src="/images/sixmonths/flood_mobile.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-0 hidden sm:block" aria-hidden>
        <Image src="/images/sixmonths/flood_pc.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(31,31,31,0.72) 0%, rgba(31,31,31,0.78) 35%, rgba(31,31,31,0.85) 65%, rgba(31,31,31,0.82) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none hidden sm:block" style={{ background: "linear-gradient(to right, rgba(31,31,31,0.96) 0%, rgba(31,31,31,0.90) 30%, rgba(31,31,31,0.66) 55%, rgba(31,31,31,0.30) 78%, rgba(31,31,31,0) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "rgba(31,31,31,0.28)" }} aria-hidden />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 30% 0%, rgba(217,119,87,0.12) 0%, transparent 60%)" }} aria-hidden />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 py-24 sm:min-h-0 sm:justify-start sm:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-3xl">
          {/* 見出し */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Change</p>
            <h2 id="six-months-start-heading" className="font-serif font-semibold leading-tight mb-10 heading-ja" style={{ fontSize: "clamp(24px, 5.8vw, 56px)", letterSpacing: "-0.01em" }}>
              半年で、毎日の仕事が、
              <br />
              ここまで変わる。
            </h2>
            <div className="prose-stub text-cream/90 text-base sm:text-lg leading-loose space-y-5">
              <p>
                ほんの半年前まで、私は AI をほとんど触っていませんでした。
                <br />
                店舗経営をしながら、「ChatGPT って便利らしいね」程度の理解。
              </p>
              <p>
                <span className="block font-serif text-2xl sm:text-4xl font-semibold text-coral leading-snug mt-2" style={{ letterSpacing: "-0.01em" }}>
                  Claude Code に出会って、
                  <br className="sm:hidden" />
                  6ヶ月。
                </span>
              </p>
            </div>
          </div>

          {/* Before / After — TracingBeam で章を貫通 (hp-ai/about 流用) */}
          <div className="mt-10 sm:mt-16">
            <TracingBeam className="pl-10 sm:pl-16">
              <div>
                {beforeAfter.map((item, i) => (
                  <Chapter key={i} index={i} item={item} />
                ))}
              </div>
            </TracingBeam>
          </div>

          {/* 締め */}
          <div className="mt-16 sm:mt-24 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
            <p>
              これは特別な才能でも、IT 知識でもありません。
              <br />
              タイミングと、やる気と、行動力。
              <br className="sm:hidden" />
              それだけです。
            </p>
            <p>
              IT 革命は 20 年超えても、
              <br className="sm:hidden" />
              今もまだ日本で広がっている最中です。
              <br />
              AI は、半年単位で景色が変わります。
              <br />
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-coral block mt-2" style={{ textShadow: "0 2px 24px rgba(31,31,31,0.85)" }}>
                これは波ではなく、津波です。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
