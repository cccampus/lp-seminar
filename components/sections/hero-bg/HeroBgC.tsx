"use client";
import { motion } from "motion/react";

/**
 * Hero Bg C — Spotlight 系
 * 中央巨大スポットライトが脈動、暗背景でコピーが浮き上がる
 */
export default function HeroBgC() {
  return (
    <>
      {/* base ほぼ黒 */}
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* Spotlight main: 中央巨大コーラル光が脈動 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.85, 1, 0.85],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(217,119,87,0.45) 0%, rgba(217,119,87,0.10) 35%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Spotlight cone: 上から斜めの光柱 (Aceternity Spotlight 風) */}
      <motion.div
        className="absolute -top-40 left-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          transform: "translateX(-50%) rotate(-15deg)",
          background:
            "radial-gradient(ellipse 50% 50% at center, rgba(250,249,245,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* 周辺暗 vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(31,24,21,0.85) 100%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
