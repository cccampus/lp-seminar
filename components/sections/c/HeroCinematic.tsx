"use client";

/**
 * HeroCinematic — Variant C 専用 Hero
 *
 * Inspired by:
 *  - Adidas × Foot Locker "Chile 20" (Active Theory, 2020 Awwwards)
 *  - Instagram @web.love.ed Reel DYNXJWPu12T
 *
 * 設計方針:
 *  - dark stage + spotlight + 巨大背景タイポで cinematic premium
 *  - 文字 stagger reveal + blur ease で premium feel
 *  - mouse parallax は PC のみ（モバイル GPU 負荷回避）
 *  - prefers-reduced-motion で全アニメ無効化
 *  - 追加ライブラリゼロ（既存 Motion v12 のみ）
 *  - ブランド色 coral / sumi / cream 厳守
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

const FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"; // 仮

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // === スクロール parallax ===
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgTypeY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgTypeScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // === Mouse parallax (PC only) ===
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  useEffect(() => {
    if (prefersReduced) return;
    // pointer: fine = マウスデバイスのみ
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

  // タイトルを 1文字ずつ stagger するためのリスト
  const titleLine1 = ["経", "営", "者", "の", "た", "め", "の", "、"];
  const titleLine3 = ["実", "装", "入", "門", "。"];

  // 共通 ease-out-quint (Motion v12 では cubic-bezier タプル必須)
  const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[760px] overflow-hidden bg-sumi-deep text-cream isolate"
      aria-label="Hero (cinematic)"
    >
      {/* ============================================================
          LAYER 0 - スポットライト radial glow（中央 coral）
         ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(217,119,87,0.14) 0%, rgba(217,119,87,0.04) 35%, transparent 70%)",
        }}
      />

      {/* ============================================================
          LAYER 0b - 周辺 vignette（四隅を落として中央へ視線）
         ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ============================================================
          LAYER 1 - 巨大背景タイポ「CLAUDE CODE」（scroll parallax）
         ============================================================ */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: bgTypeY, scale: bgTypeScale }
        }
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="font-mono font-bold text-cream/[0.035] tracking-tighter leading-none whitespace-nowrap text-[26vw] sm:text-[20vw] md:text-[15vw]">
          CLAUDE&nbsp;CODE
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 2 - Grain（紙質感）
         ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.07]"
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
        className="absolute top-6 sm:top-8 left-0 right-0 flex justify-between items-center px-6 sm:px-10 z-20"
      >
        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-coral">
          ── Vol.&nbsp;01 / 2026.05.31
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
            : { x: smoothX, y: smoothY, opacity: heroOpacity, translateY: heroY }
        }
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* eyebrow */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: easeOutQuint }}
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.48em] uppercase text-coral/85 mb-6 sm:mb-8"
        >
          公&nbsp;開&nbsp;セ&nbsp;ミ&nbsp;ナ&nbsp;ー
        </motion.p>

        {/* === Headline 行 1: 経営者のための、=== */}
        <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl font-semibold leading-[1.12] max-w-4xl">
          <span className="block">
            {titleLine1.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={
                  prefersReduced
                    ? false
                    : { opacity: 0, y: 50, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.85 + i * 0.05,
                  duration: 0.9,
                  ease: easeOutQuint,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* === Headline 行 2: Claude Code （coral italic）=== */}
          <motion.span
            initial={
              prefersReduced
                ? false
                : { opacity: 0, y: 70, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 1.35,
              duration: 1.1,
              ease: easeOutQuint,
            }}
            className="block text-coral italic font-normal"
          >
            Claude&nbsp;Code
            {/* === Headline 行 3: 実装入門。=== */}
            <span className="text-cream not-italic font-semibold">
              {" "}
              {titleLine3.map((char, i) => (
                <motion.span
                  key={`l3-${i}`}
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, y: 50, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 1.7 + i * 0.05,
                    duration: 0.9,
                    ease: easeOutQuint,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.span>
        </h1>

        {/* === Subtitle === */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.9, ease: easeOutQuint }}
          className="mt-8 sm:mt-10 max-w-xl text-sm sm:text-base leading-relaxed text-cream/72"
        >
          AI に「使われる側」から、「使う側」へ。
          <br className="hidden sm:block" />
          2 時間で、自社業務に AI が乗る景色を見せます。
        </motion.p>

        {/* === CTA button === */}
        <motion.a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.7, ease: easeOutQuint }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 48px rgba(217,119,87,0.45)",
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 sm:mt-12 inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-coral text-cream font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase shadow-[0_10px_38px_rgba(217,119,87,0.28)]"
        >
          申込みを見る
          <span className="text-base inline-block translate-y-[-1px]">→</span>
        </motion.a>
      </motion.div>

      {/* ============================================================
          UI - SCROLL TO EXPLORE インジケータ
         ============================================================ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1.0 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-cream/45">
          Scroll&nbsp;to&nbsp;Explore
        </p>
        <motion.div
          animate={
            prefersReduced
              ? { y: 0 }
              : { y: [0, 10, 0] }
          }
          transition={{
            duration: 1.8,
            repeat: prefersReduced ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="w-px h-12 bg-gradient-to-b from-cream/45 to-transparent"
        />
      </motion.div>

      {/* ============================================================
          UI - 下端メタ（左: 開催情報 / 右: 料金）
         ============================================================ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-20 hidden sm:flex items-baseline gap-2.5 font-mono text-[10px] tracking-[0.26em] uppercase text-cream/40"
      >
        <span className="text-coral text-[8px] translate-y-[-1px]">●</span>
        Online&nbsp;(Zoom)&nbsp;·&nbsp;11:00 – 13:00
      </motion.div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-20 hidden sm:block font-mono text-[10px] tracking-[0.26em] uppercase text-cream/40"
      >
        ¥&nbsp;3,000&nbsp;/&nbsp;Limited&nbsp;30
      </motion.div>
    </section>
  );
}
