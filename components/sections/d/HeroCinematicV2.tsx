"use client";

/**
 * HeroCinematicV2 — Variant D 専用 Hero（depth 強化版）
 *
 * V1 (Variant C) に対する追加 depth layer:
 *  ① 多層スポット (radial 3 重)
 *  ② 2nd 背景タイポ「CAMPUS」を反対方向 parallax で重ねる
 *  ③ 背景タイポを perspective + rotateX で奥行きに倒す
 *  ④ 4 個の floating glow orbs（slow drift）
 *  ⑤ 床反射 mirror gradient（headline の影が下に伸びる）
 *  ⑥ stage haze（下端から立ち上る animated mist）
 *
 * 全て CSS + Motion v12 のみ、追加ライブラリゼロ、prefers-reduced-motion 完全対応。
 *
 * Inspired by: Adidas × Foot Locker "Chile 20" (Active Theory, 2020)
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// SplitText 登録（モジュールトップで一度だけ）。ScrollTrigger は LenisProvider 側で登録済み
gsap.registerPlugin(SplitText);

const FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"; // 仮

export default function HeroCinematicV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();

  // === スクロール parallax ===
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // 背景画像: ゆっくり下に流す（depth 感）
  const bgImageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgImageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  // 主背景タイポ（CLAUDE CODE）: 上に流す + scale
  const bgTypeY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgTypeScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  // 副背景タイポ（CAMPUS）: 反対に動かして depth 差を出す
  const bgType2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  // 床反射: ゆっくり下へ
  const floorY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // glow orbs: 速度差
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  // hero fade out on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // === Mouse parallax (PC only) ===
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  // 副 mouse parallax for orbs（より反応強い）
  const orbMX = useSpring(useMotionValue(0), { stiffness: 35, damping: 18 });
  const orbMY = useSpring(useMotionValue(0), { stiffness: 35, damping: 18 });

  useEffect(() => {
    if (prefersReduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / 40);
      mouseY.set((e.clientY - cy) / 40);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [prefersReduced, mouseX, mouseY]);

  // === 見出し: GSAP SplitText の chars reveal（mask なし = 折り返しを固定化しない） ===
  // mask:'lines' はブラウザの折り返しをそのまま行マスク化して「実践セミナ/ー」のような
  // 不自然な改行を固定化するため不使用。折り返しは markup 側の keep-all + <br> で制御する。
  useGSAP(
    () => {
      if (prefersReduced || !titleRef.current) return;
      const split = SplitText.create(titleRef.current, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.026,
        delay: 0.45,
      });
      // SplitText インスタンスは useGSAP の context が自動 revert（Strict Mode 二重実行対策）
    },
    { scope: titleRef, dependencies: [prefersReduced] },
  );

  const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[780px] overflow-hidden bg-sumi-deep text-cream isolate"
      aria-label="Hero V2 (cinematic, depth-enhanced)"
      style={{ perspective: "1500px" }}
    >
      {/* ============================================================
          LAYER -1 - 背景画像（Codex GPT Image 2 生成）
          実写風 dark stage + 中央 coral spotlight + 床反射
          slow scroll parallax + 軽い scale で depth 強化
         ============================================================ */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: bgImageY, scale: bgImageScale }
        }
        className="absolute inset-0 pointer-events-none"
      >
        <Image
          src="/images/hero/cinematic_hero_bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* ============================================================
          LAYER 0a - スポットライト 3 重 radial（強・中・弱で立体光源）
         ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 32% at 50% 38%, rgba(217,119,87,0.22) 0%, rgba(217,119,87,0.06) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(232,148,120,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ============================================================
          LAYER 1a - 巨大背景タイポ「CLAUDE CODE」（perspective tilt）
         ============================================================ */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : {
                y: bgTypeY,
                scale: bgTypeScale,
                transformStyle: "preserve-3d",
                transform: "rotateX(-10deg)",
              }
        }
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="font-mono font-bold text-cream/[0.04] tracking-tighter leading-none whitespace-nowrap text-[26vw] sm:text-[20vw] md:text-[15vw]">
          CLAUDE&nbsp;CODE
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 1b - 2nd 背景タイポ「CAMPUS」（反対 parallax + 小さめ + 薄め）
         ============================================================ */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: bgType2Y, transform: "rotateX(-6deg)" }
        }
        className="absolute inset-0 flex items-end justify-end pr-[5vw] pb-[18vh] pointer-events-none select-none"
      >
        <div className="font-mono font-bold text-coral/[0.045] tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[10vw] md:text-[8vw]">
          CAMPUS
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 2 - Floating glow orbs (4 個、別速度で漂う)
         ============================================================ */}
      <motion.div
        style={prefersReduced ? undefined : { y: orbY1 }}
        className="absolute top-[15%] left-[12%] w-[18vw] h-[18vw] max-w-[280px] max-h-[280px] rounded-full pointer-events-none"
        animate={
          prefersReduced
            ? undefined
            : { x: [0, 15, -10, 0], y: [0, -10, 8, 0] }
        }
        transition={{
          duration: 18,
          repeat: prefersReduced ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,87,0.20) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      <motion.div
        style={prefersReduced ? undefined : { y: orbY2 }}
        className="absolute top-[55%] right-[8%] w-[24vw] h-[24vw] max-w-[360px] max-h-[360px] rounded-full pointer-events-none"
        animate={
          prefersReduced
            ? undefined
            : { x: [0, -20, 10, 0], y: [0, 12, -8, 0] }
        }
        transition={{
          duration: 22,
          repeat: prefersReduced ? 0 : Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,148,120,0.16) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-[8%] right-[28%] w-[10vw] h-[10vw] max-w-[160px] max-h-[160px] rounded-full pointer-events-none"
        animate={
          prefersReduced
            ? undefined
            : { x: [0, 8, -5, 0], y: [0, -5, 4, 0] }
        }
        transition={{
          duration: 12,
          repeat: prefersReduced ? 0 : Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,87,0.28) 0%, transparent 65%)",
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[28%] w-[14vw] h-[14vw] max-w-[220px] max-h-[220px] rounded-full pointer-events-none"
        animate={
          prefersReduced
            ? undefined
            : { x: [0, -10, 6, 0], y: [0, 6, -4, 0] }
        }
        transition={{
          duration: 16,
          repeat: prefersReduced ? 0 : Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,87,0.13) 0%, transparent 70%)",
            filter: "blur(22px)",
          }}
        />
      </motion.div>

      {/* ============================================================
          LAYER 3 - Grain（紙質感）
         ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ============================================================
          UI - Top meta bar
         ============================================================ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: easeOutQuint }}
        className="absolute top-6 sm:top-8 left-0 right-0 flex justify-between items-center px-6 sm:px-10 z-30"
      >
        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-coral">
          ── 2026.05.31&nbsp;SUN / ONLINE
        </p>
        <p className="hidden sm:block font-mono text-[10px] tracking-[0.32em] uppercase text-cream/45">
          Claude Code Campus
        </p>
      </motion.div>

      {/* ============================================================
          CENTER - Main content（mouse parallax + scroll fade）
         ============================================================ */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { x: smoothX, y: smoothY, opacity: heroOpacity }
        }
        className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: easeOutQuint }}
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.48em] uppercase text-coral/85 mb-6 sm:mb-8"
        >
          公&nbsp;開&nbsp;セ&nbsp;ミ&nbsp;ナ&nbsp;ー
        </motion.p>

        {/* キャッチコピー（positioning）。keep-all + 意味の切れ目だけで改行（孤立行禁止） */}
        <h1
          ref={titleRef}
          className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl font-semibold leading-[1.16] max-w-4xl [word-break:keep-all]"
        >
          <span className="block">
            <span className="text-cream/55">使われる側</span>から、
          </span>
          <span className="block">
            <span className="text-coral italic font-normal">使う側</span>へ。
          </span>
        </h1>

        {/* 正式タイトル（小） */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: easeOutQuint }}
          className="mt-7 sm:mt-8 text-sm sm:text-base text-cream/70 [word-break:keep-all]"
        >
          経営者のための、
          <span className="text-cream/90">Claude&nbsp;Code 実践セミナー</span>
        </motion.p>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9, ease: easeOutQuint }}
          className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-cream/60"
        >
          2 時間で、AI が自社の業務に乗る景色を、お見せします。
        </motion.p>

        <motion.a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.7, ease: easeOutQuint }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 56px rgba(217,119,87,0.55)",
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 sm:mt-12 inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-coral text-cream font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase shadow-[0_12px_40px_rgba(217,119,87,0.32)]"
        >
          申込みを見る
          <span className="text-base inline-block translate-y-[-1px]">→</span>
        </motion.a>
      </motion.div>

      {/* ============================================================
          LAYER 4 - Floor reflection（headline 影を下に薄く伸ばす）
         ============================================================ */}
      <motion.div
        style={prefersReduced ? undefined : { y: floorY }}
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(217,119,87,0.04) 35%, rgba(217,119,87,0.10) 65%, rgba(31,31,31,0.95) 100%)",
          }}
        />
        {/* 床光（中央コーラル発光 → 下に向かって fade） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(217,119,87,0.22) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* ============================================================
          LAYER 5 - Stage haze（下端から立ち上る animated mist）
         ============================================================ */}
      <motion.div
        animate={
          prefersReduced
            ? undefined
            : { backgroundPosition: ["0% 100%", "0% 90%", "0% 100%"] }
        }
        transition={{
          duration: 18,
          repeat: prefersReduced ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none mix-blend-screen opacity-50"
        style={{
          background:
            "linear-gradient(to top, rgba(232,148,120,0.16) 0%, rgba(217,119,87,0.06) 30%, transparent 70%)",
          backgroundSize: "100% 200%",
        }}
      />

      {/* 下端シーム消し: Hero 最下部を完全な sumi-deep へ落として次セクションとシームレス接続
          （z-10 = bg/床より上・中央コンテンツ(z-20)/メタ(z-30) より下なので文字は隠れない） */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[20vh] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(31,31,31,0.6) 55%, var(--color-sumi-deep) 100%)",
        }}
      />

      {/* ============================================================
          UI - SCROLL TO EXPLORE
         ============================================================ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1.0 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
      >
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-cream/55">
          Scroll&nbsp;to&nbsp;Explore
        </p>
        <motion.div
          animate={prefersReduced ? { y: 0 } : { y: [0, 10, 0] }}
          transition={{
            duration: 1.8,
            repeat: prefersReduced ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="w-px h-12 bg-gradient-to-b from-cream/55 to-transparent"
        />
      </motion.div>

      {/* ============================================================
          UI - 下端メタ
         ============================================================ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-30 hidden sm:flex items-baseline gap-2.5 font-mono text-[10px] tracking-[0.26em] uppercase text-cream/45"
      >
        <span className="text-coral text-[8px] translate-y-[-1px]">●</span>
        Online&nbsp;(Zoom)&nbsp;·&nbsp;11:00 – 13:00
      </motion.div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-30 hidden sm:block font-mono text-[10px] tracking-[0.26em] uppercase text-cream/45"
      >
        ¥&nbsp;5,000&nbsp;/&nbsp;Limited&nbsp;30
      </motion.div>
    </section>
  );
}
