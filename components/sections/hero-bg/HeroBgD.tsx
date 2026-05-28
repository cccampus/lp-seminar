"use client";
import { motion } from "motion/react";

/**
 * Hero Bg D — Boxes グリッド系
 * 幾何学グリッド + 走るコーラル光、コード/未来感
 */
export default function HeroBgD() {
  return (
    <>
      {/* base 黒 */}
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* Grid pattern (SVG) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,249,245,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(250,249,245,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* 走るコーラル光 (Grid 上を斜めに横切る) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 30% 25% at 0% 30%, rgba(217,119,87,0.40) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 25% at 100% 70%, rgba(217,119,87,0.40) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 25% at 0% 30%, rgba(217,119,87,0.40) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      {/* 中央スポット光 (コピー周辺) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 50% 45%, rgba(217,119,87,0.20) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* 暗周辺 vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 25%, rgba(31,24,21,0.78) 100%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
