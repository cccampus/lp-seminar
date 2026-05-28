"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Hero Bg E — Sparkles 系
 * 粒子が暗背景に浮遊、AI/未来感の典型
 */
export default function HeroBgE() {
  // 粒子: 各位置/サイズ/遅延を deterministic (SSR/CSR一致)
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      // Linear Congruential pseudo-random (seed固定で SSR/CSR一致)
      const r1 = ((i * 9301 + 49297) % 233280) / 233280;
      const r2 = ((i * 4789 + 12345) % 65536) / 65536;
      const r3 = ((i * 2654 + 7777) % 16384) / 16384;
      arr.push({
        x: r1 * 100,
        y: r2 * 100,
        size: 0.8 + r3 * 2.2,
        duration: 4 + r1 * 6,
        delay: r2 * 8,
      });
    }
    return arr;
  }, []);

  return (
    <>
      {/* base 黒 */}
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 中央コーラル光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 45%, rgba(217,119,87,0.28) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* 粒子 (Sparkles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background:
                i % 3 === 0
                  ? "rgba(217,119,87,0.85)"
                  : "rgba(250,249,245,0.6)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 6px rgba(217,119,87,0.5)"
                  : "0 0 4px rgba(250,249,245,0.3)",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 暗周辺 vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 25%, rgba(31,24,21,0.75) 100%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
