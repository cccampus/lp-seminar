"use client";

/**
 * SixMonths Variant D — TracingBeam系 Story スクロール演出
 *
 * 左に縦のbeam、スクロール進捗で発光しながら伸びる。
 * 各項目に dot ノードがあり、ビューポート侵入時に発光→拡大。
 * Anthropic/Linear/Vercel系の「読み物として上から下に流す」軸。
 */
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const beforeAfter = [
  { label: "LP・SEO記事制作", before: "外注で月30万", after: "自分で1時間以内" },
  { label: "SNS動画作成・投稿", before: "外注で月10万", after: "AI補助で30分以内" },
  { label: "Google・Meta広告運用", before: "外注で月20万", after: "自分で30分以内" },
  { label: "仕訳や契約書作成", before: "外注で月10万", after: "自分で30分以内" },
];

export default function SixMonthsD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.6", "end 0.4"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.6 });
  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const beamGlow = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 0.6]);

  return (
    <section
      id="six-months"
      aria-labelledby="six-months-heading"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate"
    >
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0 sm:hidden" aria-hidden>
        <Image src="/images/sixmonths/flood_mobile.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-0 hidden sm:block" aria-hidden>
        <Image src="/images/sixmonths/flood_pc.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(31,31,31,0.34) 0%, rgba(31,31,31,0.30) 28%, rgba(31,31,31,0.60) 56%, rgba(31,31,31,0.66) 80%, rgba(31,31,31,0.58) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none hidden sm:block" style={{ background: "linear-gradient(to right, rgba(31,31,31,0.96) 0%, rgba(31,31,31,0.90) 30%, rgba(31,31,31,0.66) 55%, rgba(31,31,31,0.30) 78%, rgba(31,31,31,0) 100%)" }} aria-hidden />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "rgba(31,31,31,0.28)" }} aria-hidden />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 30% 0%, rgba(217,119,87,0.12) 0%, transparent 60%)" }} aria-hidden />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 py-24 sm:min-h-0 sm:justify-start sm:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-3xl">
          {/* 見出し */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Six Months</p>
            <h2 id="six-months-heading" className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-10" style={{ letterSpacing: "-0.01em" }}>
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

          {/* Before / After — TracingBeam */}
          <div ref={containerRef} className="relative mt-14 sm:mt-20 pl-10 sm:pl-14">
            {/* Beam track (背景の薄い縦線) */}
            <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-px bg-cream/15" aria-hidden />
            {/* Beam progress (スクロール連動で伸びる発光線) */}
            <motion.div
              aria-hidden
              className="absolute left-3 sm:left-5 top-2 w-px"
              style={{
                height: beamHeight,
                background: "linear-gradient(to bottom, transparent 0%, var(--color-coral) 25%, var(--color-coral) 100%)",
                boxShadow: "0 0 12px rgba(217,119,87,0.65), 0 0 24px rgba(217,119,87,0.35)",
                opacity: beamGlow,
              }}
            />

            <ul className="space-y-12 sm:space-y-16">
              {beforeAfter.map((item, i) => (
                <motion.li
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                >
                  {/* Dot ノード */}
                  <motion.span
                    aria-hidden
                    className="absolute -left-[42px] sm:-left-[54px] top-1.5 h-3 w-3 rounded-full bg-coral"
                    style={{ boxShadow: "0 0 10px rgba(217,119,87,0.7), 0 0 20px rgba(217,119,87,0.4)" }}
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 + 0.15 }}
                  />
                  {/* ラベル */}
                  <p
                    className="font-mono text-[10px] sm:text-xs tracking-[0.32em] uppercase text-coral/85 mb-3"
                  >
                    {String(i + 1).padStart(2, "0")} — {item.label}
                  </p>
                  {/* Before → After */}
                  <p
                    className="font-serif text-xl sm:text-3xl font-semibold leading-snug text-cream"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    <span className="text-cream/55 line-through decoration-coral/40 decoration-1 underline-offset-4 mr-3">
                      {item.before}
                    </span>
                    <span className="inline-block text-coral mx-1">→</span>
                    <span className="text-cream">{item.after}</span>
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 締め */}
          <div className="mt-16 sm:mt-20 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
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
