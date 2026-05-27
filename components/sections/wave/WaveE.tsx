"use client";

/**
 * Wave — v7 「世界で起きていること」エディトリアル・インフォグラフィック
 *
 * 3 つの記事（① アメリカ / ② 日本 / ③ 波）を、装飾の通し軸（縦線）に頼らず、
 * 番号 01 / 02 / 03 の連続リズム・余白・サイズ差で「ひと続きの物語」として連結する。
 *
 * RULES.md §0（装飾で解決しない）に従い、v6 までの coral 縦 spine（gutter spine）を撤去。
 * 連続性は「線」ではなく以下で表現する：
 *   - 各章を貫く大型 mono 番号（01 → 02 → 03）の同一左端・同一リズム
 *   - 章ごとに番号の存在感を上げる（01 控えめ → 03 フル）＝差の拡大と一致
 *   - 余白・サイズ差・ウェイト差で段差を作る（border / shadow / card なし）
 *
 * 主役は「数字」と「画像」。スマホ 390 は縦流れ、PC 1440 は雑誌見開き風に画像を大きく使う。
 * color は coral / sumi / cream の 3 軸のみ。
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  animate,
} from "motion/react";
import DarkSection from "@/components/ui/DarkSection";
import GlitchText from "@/components/ui/GlitchText";

const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 雑誌レイアウトの画像枠。
 * 画像読み込み前は coral→sumi グラデのプレースホルダを敷くが、読み込み完了で隠す。
 * next/image の最適化が表示を阻むため unoptimized（raw 配信は正常）。
 * プレースホルダ・暗幕は画像の「上」に置かず、画像が最前面に来るよう順序を制御する。
 */
function MagazineImage({
  src,
  ratioClass,
  sizes,
}: {
  src: string;
  ratioClass: string;
  sizes: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative w-full ${ratioClass} overflow-hidden rounded-md isolate bg-sumi-deep`}
      aria-hidden
    >
      {/* プレースホルダ：読み込み完了でフェードアウト（"IMAGE" ラベルは置かない＝透け防止） */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          background:
            "linear-gradient(135deg, rgba(217,119,87,0.55) 0%, rgba(184,93,64,0.35) 40%, rgba(31,31,31,0.95) 100%)",
        }}
      />

      {/* 実画像（最前面・unoptimized で確実に表示） */}
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className="object-cover z-10 transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />

      {/* 下部の暗幕（画像の上・文字との馴染み / PC の余韻） */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(31,31,31,0.55) 100%)",
        }}
      />
    </div>
  );
}

/**
 * ParallaxLayer — スクロール量に応じて内部レイヤーを縦に少しずらし、奥行きを出す。
 *
 * §0 を守りつつ「立体感」を足すための最小実装。装飾を増やさず、既存要素の動きだけで奥行きを作る。
 *
 * 重要（③ の繋ぎ目維持）：
 *   - 親に overflow-hidden を敷き、ずれは内部レイヤーに閉じ込める（隣接セクションへ滲ませない）。
 *   - 背景画像は scale を少し上げて、translate しても枠に隙間が出ないようにする。
 *   - reduced-motion 時は動かさない（y=0）。
 */
function ParallaxLayer({
  range,
  scale = 1,
  className,
  children,
}: {
  /** スクロール 0→1 に対する [開始px, 終了px] の縦移動量。背景は大きめ・前景は控えめ */
  range: [number, number];
  /** 背景レイヤーのはみ出し防止に少し拡大（前景は 1 のまま） */
  scale?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // セクションがビューを通過する間（下から入って上へ抜ける）でスクロール進捗を取る
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : range,
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="will-change-transform h-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 章番号：通し軸（縦線）の代わりに「連続する大型 mono 番号」で物語を繋ぐ。
 * 同一左端・同一リズムで 01 → 02 → 03 が積み上がり、下の章ほど coral を強める。
 * 線・ドット・カードを一切使わず、サイズ差・ウェイト・余白だけで連続性を出す（§0）。
 */
function ChapterHead({
  no,
  label,
  active,
}: {
  no: string;
  label: string;
  active: 1 | 2 | 3;
}) {
  const numColor =
    active === 3 ? "text-coral" : active === 2 ? "text-coral/75" : "text-coral/50";
  const labelColor = active === 3 ? "text-cream/70" : "text-cream/45";

  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span
        className={`font-mono font-semibold leading-none ${numColor} text-[2.25rem] sm:text-[3rem]`}
        style={{ letterSpacing: "-0.04em" }}
      >
        {no}
      </span>
      <span
        className={`font-mono text-[10px] tracking-[0.35em] uppercase ${labelColor}`}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * SplitFlap — 空港の発車標 / パタパタ時計（split-flap）の 1 桁ユニット。
 *
 * §0（装飾で解決しない）に従い、線・箱・発光を足さない。動かすのは「数字そのもの」だけ。
 *
 * ■ 本物の split-flap 機構（ユーザー要望の核）
 *   数字を上半分カード / 下半分カードに水平分割。桁が切り替わるとき：
 *     1. 上半分（current の上半分）が上端の水平軸を支点に手前(下)へ rotateX 0→-90 で倒れ込む
 *     2. その奥に next の上半分が見える
 *     3. 続けて next の下半分カードが上から rotateX 90→0 で落ちてくる
 *   → 空港の発車標どおり「上半分がパタンと倒れ、奥から次が現れる」。
 *
 * ■ "77" 重複の防止（旧バグ）
 *   静止層は常に：上半分＝next、下半分＝current。
 *   倒れるフラップ層は前面で current の上半分のみ。
 *   どの瞬間も「画面に見える数字」は最大 2 桁（遷移中の current→next）で、
 *   同じ桁が 2 つ並ぶことは構造上ない。遷移完了後は両半分とも同じ桁＝1 桁表示。
 *
 * 速度：ステップ間隔を配列 stepDelays で持ち、後半ほど短く（加速）。最後は 7 で停止。
 * reduced-motion：即 7 を静止表示（フリップなし）。
 */
function StaticHalves({ top, bottom }: { top: number; bottom: number }) {
  // 静止層：上半分・下半分を独立に描画（遷移中は上=next, 下=prev で別値を取りうる）
  // 数字グリフ .splitflap-d を子に置き、clip/オフセットは CSS に閉じ込める
  return (
    <>
      <span className="splitflap-half splitflap-top">
        <span className="splitflap-d">{top}</span>
      </span>
      <span className="splitflap-half splitflap-bottom">
        <span className="splitflap-d">{bottom}</span>
      </span>
    </>
  );
}

function SplitFlap({
  sequence,
  stepDelays,
  className,
}: {
  sequence: number[];
  /** sequence の各めくり間隔(ms)。後半を短くして加速させる。長さ >= sequence.length-1 */
  stepDelays: number[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const prefersReduced = useReducedMotion();
  const last = sequence[sequence.length - 1];

  // 現在「確定表示」している桁 index（遷移完了後の値）
  const [index, setIndex] = useState(0);
  // 遷移アニメ中フラグ（true の間だけフラップ層を描画）
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setIndex(sequence.length - 1);
      return;
    }
    let cancelled = false;
    let step = 0;
    const timers: number[] = [];

    const advance = () => {
      if (cancelled || step >= sequence.length - 1) return;
      step += 1;
      // フラップ開始：静止層は即 next に切替（上半分＝next が奥に見える）。
      // フラップ層が current の上半分を手前へ倒す。
      setIndex(step);
      setFlipping(true);
      // フラップ落下が終わったら層を畳む（≒CSS の flip duration と整合）
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setFlipping(false);
        }, 240),
      );
      // 次のめくりまでの間隔（後半ほど短い＝加速）
      const delay = stepDelays[step - 1] ?? stepDelays[stepDelays.length - 1];
      timers.push(window.setTimeout(advance, delay));
    };

    // ビューインから最初の 1 枚目を見せて、少し待ってめくり始める
    timers.push(window.setTimeout(advance, 300));
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [inView, prefersReduced, sequence, stepDelays]);

  const current = sequence[index];
  const prev = sequence[Math.max(0, index - 1)];

  return (
    <span
      ref={ref}
      className={`splitflap-unit ${className ?? ""}`}
      aria-label={`${last}`}
      role="img"
    >
      {prefersReduced ? (
        // reduced-motion: フリップせず 7 を静止表示（上下とも last）
        <StaticHalves top={last} bottom={last} />
      ) : flipping ? (
        // ── 遷移中 ──
        // 静止層: 上半分=current(next／奥に見える)、下半分=prev(まだ古い数字が残る)
        // フラップ層: ①prev上半分が手前へ倒れる ②current下半分が落ちてくる
        <>
          <StaticHalves top={current} bottom={prev} />
          {/* 倒れるフラップ：prev の「上半分」を継ぎ目軸で手前(下)へ rotateX 0→-90 */}
          <motion.span
            key={`top-${index}`}
            className="splitflap-half splitflap-top splitflap-flap-front"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.13, ease: "easeIn" }}
          >
            <span className="splitflap-d">{prev}</span>
          </motion.span>
          {/* 落ちてくるフラップ：current の「下半分」を継ぎ目軸で rotateX 90→0（上半分が倒れた後に落下） */}
          <motion.span
            key={`bot-${index}`}
            className="splitflap-half splitflap-bottom splitflap-flap-back"
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.13 }}
          >
            <span className="splitflap-d">{current}</span>
          </motion.span>
        </>
      ) : (
        // 静止：上下とも current（＝1 桁表示）
        <StaticHalves top={current} bottom={current} />
      )}
    </span>
  );
}

/** スクロールで見えたら 0 → end にカウントアップ。reduced-motion は即 end。 */
function CountUp({ end }: { end: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplay(end);
      return;
    }
    const controls = animate(mv, end, { duration: 1.4, ease: easeOutQuint });
    return () => controls.stop();
  }, [inView, end, prefersReduced, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/**
 * 「先行者 vs 周回遅れ」の対比チャート。
 * スクロールインで coral 実線が左下→右上に描かれ（pathLength 0→1）、
 * cream 破線が出遅れて緩やかに描かれる。差が開く様子をアニメで見せる。
 */
function DivergeChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const prefersReduced = useReducedMotion();
  const animateNow = inView && !prefersReduced;

  // reduced-motion / 未表示時は最初から完成形（pathLength=1）で見せる
  const drawn = prefersReduced ? { pathLength: 1 } : { pathLength: inView ? 1 : 0 };

  // 中間データポイント (drama用)
  const accelPoints = [
    { x: 60, y: 126 },
    { x: 120, y: 116 },
    { x: 180, y: 78 },
    { x: 240, y: 38 },
  ];

  return (
    <div className="relative w-full">
      <svg
        ref={ref}
        viewBox="0 0 300 160"
        className="w-full h-auto"
        role="img"
        aria-label="今動く人は先行者として上昇し、待つ人は大きく出遅れる対比"
      >
        <defs>
          <linearGradient id="coralArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97757" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#d97757" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
          </linearGradient>
          <filter id="coralGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 背景グリッド */}
        {[60, 120, 180, 240].map((x) => (
          <line key={`v${x}`} x1={x} y1="12" x2={x} y2="138" stroke="rgba(250,249,245,0.06)" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}
        {[36, 72, 108].map((y) => (
          <line key={`h${y}`} x1="8" y1={y} x2="292" y2={y} stroke="rgba(250,249,245,0.06)" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}

        {/* 基準軸 */}
        <line x1="8" y1="138" x2="292" y2="138" stroke="rgba(250,249,245,0.22)" strokeWidth="1" />
        <line x1="8" y1="12" x2="8" y2="138" stroke="rgba(250,249,245,0.22)" strokeWidth="1" />

        {/* coral線下のエリアフィル */}
        <motion.path
          d="M8 130 C 110 124, 190 70, 292 14 L 292 138 L 8 138 Z"
          fill="url(#coralArea)"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={animateNow ? { duration: 1.0, delay: 1.0 } : { duration: 0 }}
        />

        {/* 待つ人：低空飛行（cream 破線・出遅れて描かれる） */}
        <motion.path
          d="M8 130 C 90 128, 180 126, 292 120"
          fill="none"
          stroke="rgba(250,249,245,0.35)"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={drawn}
          transition={
            animateNow
              ? { duration: 1.1, delay: 0.5, ease: "easeInOut" }
              : { duration: 0 }
          }
        />

        {/* 今動く人：急上昇 (glow filter付き) */}
        <motion.path
          d="M8 130 C 110 124, 190 70, 292 14"
          fill="none"
          stroke="#d97757"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#coralGlow)"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={drawn}
          transition={animateNow ? { duration: 1.3, ease: easeOutQuint } : { duration: 0 }}
        />

        {/* 中間データポイント (順次pop) */}
        {accelPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill="#d97757"
            initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
            animate={
              prefersReduced
                ? { opacity: 1, scale: 1 }
                : { opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }
            }
            transition={animateNow ? { duration: 0.3, delay: 0.7 + i * 0.15 } : { duration: 0 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* 今動く人の終点ドット (glow + pulse halo) */}
        <motion.circle
          cx="292"
          cy="14"
          r="6"
          fill="#d97757"
          filter="url(#coralGlow)"
          initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
          animate={
            prefersReduced
              ? { opacity: 1, scale: 1 }
              : { opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }
          }
          transition={animateNow ? { duration: 0.5, delay: 1.4, ease: "backOut" } : { duration: 0 }}
          style={{ transformOrigin: "292px 14px" }}
        />
        {animateNow && (
          <motion.circle
            cx="292" cy="14" r="6"
            fill="none" stroke="#d97757" strokeWidth="1.5"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0.6, 0], scale: [1, 2.8] }}
            transition={{ duration: 1.8, delay: 1.6, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: "292px 14px" }}
          />
        )}
        {/* 待つ人の終点ドット */}
        <circle cx="292" cy="120" r="4" fill="rgba(250,249,245,0.45)" />
        {/* 起点 NOW マーカー */}
        <circle cx="8" cy="130" r="3.5" fill="rgba(250,249,245,0.7)" />

        {/* svg内ラベル */}
        <motion.text
          x="285" y="155" fontSize="6" fontFamily="ui-monospace, monospace"
          fill="rgba(250,249,245,0.65)" textAnchor="end" letterSpacing="0.15em"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={animateNow ? { duration: 0.5, delay: 1.5 } : { duration: 0 }}
        >
          OUTPACED
        </motion.text>
        <motion.text
          x="285" y="9" fontSize="7" fontFamily="ui-monospace, monospace"
          fill="#d97757" textAnchor="end" letterSpacing="0.15em" fontWeight="bold"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={animateNow ? { duration: 0.5, delay: 1.5 } : { duration: 0 }}
        >
          ACCELERATED
        </motion.text>
      </svg>
      {/* 軸ラベル */}
      <div className="flex justify-between items-baseline mt-2">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/55">
          NOW · いま
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral/85 font-semibold">
          +5 YEARS
        </span>
      </div>
    </div>
  );
}

export default function WaveE() {
  const prefersReduced = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.8, ease: easeOutQuint, delay },
  });

  return (
    <DarkSection
      id="wave"
      aria-labelledby="wave-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 px-6 lg:px-12"
    >
      {/* スマホ/タブレットは narrow column、PC1440 は雑誌見開き幅まで開く */}
      <div className="max-w-2xl lg:max-w-6xl mx-auto">
        {/* セクション見出し */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          The Wave
        </p>
        <h2
          id="wave-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-cream mb-14 sm:mb-20 lg:mb-28"
          style={{ letterSpacing: "-0.01em" }}
        >
          いま、世界で
          <br className="sm:hidden" />
          起きていること。
        </h2>

        {/*
          記事スタック：装飾の縦軸を撤去。番号 01→02→03 の連続リズムで物語を繋ぐ。
          スマホは縦流れ / PC は画像を大きく使う雑誌見開き風（横並び）。
        */}
        <div className="flex flex-col gap-20 sm:gap-24 lg:gap-32">
          {/* ① アメリカ：約50% */}
          <motion.article {...reveal()}>
            <ChapterHead no="01" label="USA" active={1} />

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-cream mb-6 lg:mb-10">
              アメリカは、もう動いている。
            </h3>

            {/* スマホ縦 / PC 横（画像を大きく、左に） */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-14">
              <div className="lg:w-[55%] shrink-0">
                <MagazineImage
                  src="/images/wave/usa.jpg"
                  ratioClass="aspect-[16/10] lg:aspect-[3/2]"
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </div>
              <div className="lg:flex-1 min-w-0">
                {/* 主役の数字（スクロールで 0→50 にカウントアップ） */}
                <div className="flex items-end">
                  <span
                    className="font-mono font-semibold text-coral leading-[0.85] text-[5rem] sm:text-[6rem] lg:text-[9rem]"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    <span className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3.5rem] align-top mr-1 text-coral/70">
                      約
                    </span>
                    <CountUp end={50} />
                    <span className="text-[2.5rem] sm:text-[3.25rem] lg:text-[4.5rem]">
                      %
                    </span>
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base lg:text-lg text-cream/60 mt-4 leading-relaxed">
                  大手企業の事務作業の
                  <span className="text-cream/85">半分近く</span>
                  が、
                  <br className="sm:hidden" />
                  AI に置き換わり始めた。
                </p>
                <p className="text-[13px] sm:text-sm lg:text-base leading-relaxed text-cream/45 mt-5">
                  「書類づくり」「メール返信」「議事録」——
                  <br className="sm:hidden" />
                  人がやってきた仕事の多くを、AI が担い始めている。
                </p>
              </div>
            </div>
          </motion.article>

          {/* ② 日本：7年遅れ */}
          <motion.article {...reveal()}>
            <ChapterHead no="02" label="JAPAN" active={2} />

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-cream mb-6 lg:mb-10">
              日本は、約7年遅れ。
            </h3>

            {/* PC は画像を右に置いて 01 とリズムを変える（雑誌見開きの左右振り） */}
            <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-6 lg:gap-14">
              <div className="lg:w-[55%] shrink-0">
                <MagazineImage
                  src="/images/wave/japan.jpg"
                  ratioClass="aspect-[16/10] lg:aspect-[3/2]"
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </div>
              <div className="lg:flex-1 min-w-0">
                {/* 主役の数字：split-flap（フリップ時計）で 7 までパラパラめくれて停止 */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono font-semibold text-coral leading-[0.85] text-[5rem] sm:text-[6rem] lg:text-[9rem]"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    <CountUp end={7} />
                  </span>
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-coral/80 pb-2">
                    年
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 pb-3 ml-1">
                    behind
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base lg:text-lg text-cream/60 mt-4 leading-relaxed">
                  ——ただ、ここ数ヶ月で
                  <span className="text-cream/85">急速に動き始めた。</span>
                </p>

                {/*
                  企業チップ（ロゴにしない＝テキストのみ）。§0 に従い、装飾でなく
                  タイポグラフィ / 余白 / サイズで可読性を上げる：
                    - 文字を大きく（base→lg）・cream をしっかり不透明に（高コントラスト）
                    - 余白を広く（px/py 増）・チップ間 gap を広げて整列
                */}
                {/* 企業ロスター - リッチ化版: dot + 企業名 + 業種 + 順次pop in */}
                <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-coral/85 mt-7 mb-3">
                  Recent AI Adopters in Japan
                </p>
                <ul
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5"
                  aria-label="AI 導入を発表した日本企業"
                >
                  {[
                    { name: "NEC", sector: "Tech" },
                    { name: "JR", sector: "Transit" },
                    { name: "楽天", sector: "E-commerce" },
                    { name: "メルカリ", sector: "Marketplace" },
                  ].map((c, i) => (
                    <motion.li
                      key={c.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                      className="relative group border border-cream/15 hover:border-coral/60 bg-cream/[0.03] hover:bg-cream/[0.06] px-4 py-3 sm:px-5 sm:py-4 transition-colors duration-300"
                    >
                      {/* 上端 coral hairline + dot */}
                      <span className="absolute -top-px left-0 h-px w-1/3 bg-coral/70 group-hover:w-full transition-all duration-500" aria-hidden />
                      <span
                        className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-coral"
                        style={{ boxShadow: "0 0 6px rgba(217,119,87,0.7)" }}
                        aria-hidden
                      />
                      <p className="font-serif text-lg sm:text-xl font-bold text-cream leading-none tracking-wide" style={{ letterSpacing: "-0.005em" }}>
                        {c.name}
                      </p>
                      <p className="mt-1.5 font-mono text-[9px] tracking-[0.25em] uppercase text-cream/55">
                        {c.sector}
                      </p>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-[13px] sm:text-sm lg:text-base leading-relaxed text-cream/55">
                  大手も一斉に、AI を業務に取り入れる発表が相次いでいる。
                </p>
              </div>
            </div>
          </motion.article>

          {/*
            ③ 波：先行者 vs 周回遅れ の対比。
            パララックスで奥行きを出すが、article を overflow-hidden で囲い、
            ずれは内部レイヤーに閉じ込める（隣接セクションへ滲ませない＝境界はパキッと維持）。
          */}
          <motion.article {...reveal()} className="relative overflow-hidden">
            <ChapterHead no="03" label="NOW" active={3} />

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-cream mb-6 lg:mb-10">
              この差は、もう取り返せない。
            </h3>

            {/* スマホ縦 / PC 横（画像 + アニメーションチャート） */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-14 mb-8 lg:mb-12">
              {/* 背景レイヤー：画像をゆっくり（大きめにずらす／scale で枠から隙間を出さない） */}
              <ParallaxLayer
                range={[-26, 26]}
                scale={1.2}
                className="lg:w-[55%] shrink-0 overflow-hidden rounded-md"
              >
                <MagazineImage
                  src="/images/wave/wave.jpg"
                  ratioClass="aspect-[16/10] lg:aspect-[3/2]"
                  sizes="(min-width: 1024px) 700px, 100vw"
                />
              </ParallaxLayer>

              {/* 前景レイヤー：数字/チャートを速め（小さめにずらす）＝奥行きの対比 */}
              <ParallaxLayer range={[14, -14]} className="lg:flex-1 min-w-0">
                <DivergeChart />
              </ParallaxLayer>
            </div>

            {/* 結果を対置：今動く人 → 先行者 / 待つ人 → 周回遅れ */}
            <div className="grid grid-cols-1 gap-3 lg:max-w-3xl">
              {/* 今動く人（coral 強調） */}
              <div className="flex items-center gap-4 border border-coral/40 rounded-lg p-4 sm:p-5">
                <span className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-coral shrink-0 w-24 sm:w-28">
                  今、動く人
                </span>
                <span className="h-px flex-1 bg-coral/30" aria-hidden />
                <span className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-cream shrink-0">
                  先行者になる
                </span>
              </div>
              {/* 待つ人（くすませる） */}
              <div className="flex items-center gap-4 border border-cream/10 rounded-lg p-4 sm:p-5">
                <span className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-cream/50 shrink-0 w-24 sm:w-28">
                  5年、待つ人
                </span>
                <span className="h-px flex-1 bg-cream/10" aria-hidden />
                <span className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-cream/45 shrink-0">
                  周回遅れになる
                </span>
              </div>
            </div>

            {/* 結論：差は取り返せない */}
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mt-6">
              <span className="font-serif text-sm sm:text-base lg:text-lg text-cream/55 shrink-0">
                その差は、もう
              </span>
              <GlitchText
                as="span"
                loop
                className="inline-block font-serif font-semibold text-coral leading-none text-[2.25rem] sm:text-[3rem] lg:text-[4rem]"
                style={{ letterSpacing: "-0.02em" }}
              >
                取り返せない
              </GlitchText>
            </div>
          </motion.article>
        </div>

        {/* 詳細リンク */}
        <div className="mt-16 sm:mt-20 lg:mt-28 text-center">
          <a
            href="#detail"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/55 hover:text-coral transition-colors"
          >
            先に詳細だけ見る ↓
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
