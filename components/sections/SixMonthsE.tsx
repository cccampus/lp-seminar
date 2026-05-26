"use client";

/**
 * SixMonths Variant E — EditorialList (黄金パターン)
 *
 * 4項目を貫く幾何学SVG beam:
 *   左→右→左→右と直角に折れながら下る zigzag path。
 *   スクロール進捗で stroke-dashoffset を 0 まで描く。
 *   各 dot は path の折れノード位置に絶対配置。
 *
 * 行ごとに:
 *   - 背景巨大番号（parallax）
 *   - 番号ラベル + 文字単位 stagger reveal 見出し
 *   - Before → After
 *   - 終端 coral line draw
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

/**
 * Zigzag SVG Beam — 4ノード分の直角折れ path
 * viewBox: 0..60 (横) × 0..ROW*4 (縦)
 * dot 位置: 左ノード=x12, 右ノード=x48
 * dot Y座標: 行ごとに ROW * i + DOT_OFFSET
 */
const ROW = 130;           // 1項目の行高 (px)
const DOT_X_LEFT = 12;
const DOT_X_RIGHT = 48;
const DOT_OFFSET = 36;     // 行頭からdotまでのオフセット
const VBW = 60;
const VBH = ROW * 4;

// 4ノードを左→右→左→右の順でジグザグ繋ぐ
function buildPath(): string {
  const segs: string[] = [];
  segs.push(`M ${DOT_X_LEFT} 0`); // start
  for (let i = 0; i < 4; i++) {
    const y = ROW * i + DOT_OFFSET;
    const x = i % 2 === 0 ? DOT_X_LEFT : DOT_X_RIGHT;
    const prevX = i % 2 === 0 ? DOT_X_LEFT : DOT_X_RIGHT;
    if (i === 0) {
      segs.push(`L ${x} ${y}`);
    } else {
      segs.push(`L ${prevX} ${y}`);
    }
  }
  // end: 最終ノードから下に余韻
  const lastX = (4 - 1) % 2 === 0 ? DOT_X_LEFT : DOT_X_RIGHT;
  // 修正: 上のループは隣接ノード間の水平→垂直の折れを正しく作るため書き直し
  segs.length = 0;
  segs.push(`M ${DOT_X_LEFT} 0`);
  for (let i = 0; i < 4; i++) {
    const y = ROW * i + DOT_OFFSET;
    const xCurr = i % 2 === 0 ? DOT_X_LEFT : DOT_X_RIGHT;
    if (i > 0) {
      const xPrev = (i - 1) % 2 === 0 ? DOT_X_LEFT : DOT_X_RIGHT;
      // 縦方向にi-1のdot から現在のy まで降りる
      segs.push(`L ${xPrev} ${y}`);
      // 横方向に xPrev → xCurr へ
      segs.push(`L ${xCurr} ${y}`);
    } else {
      // i=0 はそのまま下に降りる
      segs.push(`L ${xCurr} ${y}`);
    }
  }
  // 末尾dot から下に余韻
  segs.push(`L ${lastX} ${VBH}`);
  return segs.join(" ");
}

const PATH_D = buildPath();

function EditorialRow({
  index,
  item,
  rowHeight,
}: {
  index: number;
  item: typeof beforeAfter[number];
  rowHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.2"],
  });
  // 巨大背景番号 parallax
  const numberY = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.18, 0.06]);
  // 終端 coral line draw
  const endLineWidth = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "100%"]);

  const chars = Array.from(item.label);
  const dotOnLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: rowHeight }}
    >
      {/* 背景番号 (parallax) */}
      <motion.span
        aria-hidden
        className="absolute right-2 sm:right-6 top-0 font-serif font-bold text-coral select-none pointer-events-none leading-none"
        style={{
          y: numberY,
          opacity: numberOpacity,
          fontSize: "clamp(72px, 14vw, 180px)",
          letterSpacing: "-0.05em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* dot ノード (zigzag path の折れ角に対応) */}
      <motion.span
        aria-hidden
        className="absolute h-2.5 w-2.5 rounded-full bg-coral z-10"
        style={{
          left: dotOnLeft ? "8px" : "44px",
          top: `${DOT_OFFSET - 5}px`,
          boxShadow: "0 0 8px rgba(217,119,87,0.7), 0 0 16px rgba(217,119,87,0.35)",
        }}
        initial={{ scale: 0.5, opacity: 0.3 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45, delay: 0.1 }}
      />

      {/* 本文ブロック (SVG 幅の右側に配置) */}
      <div className="pl-16 sm:pl-20">
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-coral/85 mb-2">
          {`0${index + 1}`}
        </p>
        <h3
          className="font-serif text-xl sm:text-3xl font-semibold leading-snug text-cream"
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
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </h3>
        <div className="mt-3 sm:mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
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
        </div>
        <motion.div
          aria-hidden
          className="mt-4 sm:mt-5 h-px bg-coral origin-left"
          style={{ width: endLineWidth, boxShadow: "0 0 6px rgba(217,119,87,0.5)" }}
        />
      </div>
    </div>
  );
}

export default function SixMonthsE() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: listProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.25"],
  });
  // SVG path 描画進捗 (stroke-dashoffset を 1 → 0 に)
  // pathLength="1" 指定で扱う
  const dashOffset = useTransform(listProgress, [0, 1], [1, 0]);

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

          {/* Before / After — Zigzag Beam EditorialList */}
          <div ref={listRef} className="relative mt-10 sm:mt-16">
            {/* SVG zigzag beam — 4ノード貫通 */}
            <svg
              aria-hidden
              className="absolute left-0 top-0 pointer-events-none"
              width={VBW}
              height={ROW * 4}
              viewBox={`0 0 ${VBW} ${VBH}`}
              preserveAspectRatio="none"
              style={{ width: VBW, height: ROW * 4 }}
            >
              {/* 薄い背景 track */}
              <path
                d={PATH_D}
                fill="none"
                stroke="rgba(250,249,245,0.12)"
                strokeWidth="1.4"
              />
              {/* progress (scroll連動で描画) */}
              <motion.path
                d={PATH_D}
                fill="none"
                stroke="var(--color-coral)"
                strokeWidth="1.6"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: dashOffset,
                  filter: "drop-shadow(0 0 4px rgba(217,119,87,0.55))",
                }}
              />
            </svg>

            {/* 4項目 */}
            {beforeAfter.map((item, i) => (
              <EditorialRow key={i} index={i} item={item} rowHeight={ROW} />
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
