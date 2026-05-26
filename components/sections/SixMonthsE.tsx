"use client";

/**
 * SixMonths Variant E — EditorialList (スキル「自前最強」黄金パターン)
 *
 * 各行に:
 *  - 巨大背景番号（パララックス + 透明度変化）
 *  - 左に縦の glow line（ビューポート侵入時に伸びる）
 *  - 見出しを文字単位 stagger reveal（blur + y + opacity）
 *  - 末尾に gold(coral) line のドロー
 */
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const beforeAfter = [
  { label: "LP・SEO記事制作", before: "外注で月30万", after: "自分で1時間以内" },
  { label: "SNS動画作成・投稿", before: "外注で月10万", after: "AI補助で30分以内" },
  { label: "Google・Meta広告運用", before: "外注で月20万", after: "自分で30分以内" },
  { label: "仕訳や契約書作成", before: "外注で月10万", after: "自分で30分以内" },
];

function EditorialRow({ index, item }: { index: number; item: typeof beforeAfter[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.2"],
  });
  // 巨大番号 parallax (上→下にゆっくり)
  const numberY = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.18, 0.06]);
  // glow line height
  const lineHeight = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);
  // 終端 coral line draw
  const endLineWidth = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "100%"]);

  // 文字単位 stagger reveal 用に label/after を char split
  const splitChars = (s: string) => Array.from(s);

  const chars = splitChars(item.label);

  return (
    <div ref={ref} className="relative pl-12 sm:pl-20 py-10 sm:py-14">
      {/* 巨大背景番号 (parallax) */}
      <motion.span
        aria-hidden
        className="absolute right-2 sm:right-6 top-0 font-serif font-bold text-coral select-none pointer-events-none leading-none"
        style={{
          y: numberY,
          opacity: numberOpacity,
          fontSize: "clamp(120px, 22vw, 280px)",
          letterSpacing: "-0.05em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* 左 glow line track */}
      <div className="absolute left-3 sm:left-6 top-4 bottom-4 w-px bg-cream/12" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute left-3 sm:left-6 top-4 w-px"
        style={{
          height: lineHeight,
          background: "linear-gradient(to bottom, var(--color-coral) 0%, rgba(217,119,87,0.2) 100%)",
          boxShadow: "0 0 8px rgba(217,119,87,0.55)",
        }}
      />

      {/* 番号 (small) + ラベル文字stagger */}
      <p className="font-mono text-[10px] sm:text-xs tracking-[0.32em] uppercase text-coral/85 mb-3">
        {`0${index + 1}` /* 視認性のため番号小型も併記 */}
      </p>
      <h3
        className="font-serif text-2xl sm:text-4xl font-semibold leading-snug text-cream"
        style={{ letterSpacing: "-0.015em" }}
      >
        {chars.map((c, j) => (
          <motion.span
            key={j}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.05 + j * 0.025, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </h3>

      {/* Before → After */}
      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-serif text-base sm:text-lg text-cream/55 line-through decoration-coral/40 decoration-1 underline-offset-4">
          {item.before}
        </span>
        <span className="font-mono text-coral text-base sm:text-lg">→</span>
        <span
          className="font-serif text-lg sm:text-2xl font-semibold text-coral"
          style={{ letterSpacing: "-0.01em" }}
        >
          {item.after}
        </span>
      </div>

      {/* 終端 coral line draw */}
      <motion.div
        aria-hidden
        className="mt-6 h-px bg-coral origin-left"
        style={{ width: endLineWidth, boxShadow: "0 0 6px rgba(217,119,87,0.5)" }}
      />
    </div>
  );
}

export default function SixMonthsE() {
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

          {/* Before / After — EditorialList */}
          <div className="mt-10 sm:mt-16">
            {beforeAfter.map((item, i) => (
              <EditorialRow key={i} index={i} item={item} />
            ))}
          </div>

          {/* 締め */}
          <div className="mt-12 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
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
