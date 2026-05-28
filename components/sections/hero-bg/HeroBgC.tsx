"use client";
import { motion } from "motion/react";

/**
 * Hero Bg C — Massive Spotlight (巨大光が回転+脈動)
 * 中央の巨大スポットライトが激しく脈動、複数光柱が回転
 */
export default function HeroBgC() {
  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* Spotlight main: 巨大コーラル光が激しく脈動 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.7, 1.0, 0.7],
          scale: [1, 1.18, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(217,119,87,0.85) 0%, rgba(217,119,87,0.30) 25%, rgba(184,93,64,0.15) 50%, transparent 75%)",
        }}
        aria-hidden
      />

      {/* 回転する光柱1 */}
      <motion.div
        className="absolute -top-32 left-1/2 w-[1200px] h-[1400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at center, rgba(250,249,245,0.18) 0%, transparent 65%)",
          filter: "blur(50px)",
          transformOrigin: "center",
        }}
        animate={{
          rotate: [0, 360],
          x: "-50%",
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        aria-hidden
      />

      {/* 回転する光柱2 (逆回転) */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] pointer-events-none rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(217,119,87,0.20) 20%, transparent 40%, rgba(250,249,245,0.10) 60%, transparent 80%, rgba(217,119,87,0.15) 100%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden
      />

      {/* 周辺暗 vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(31,24,21,0.92) 100%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
