"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Hero Bg E — Particle Storm (大量粒子が嵐のように動く)
 * 200個の粒子、サイズ大、動きも激しく、画面を埋める
 */
export default function HeroBgE() {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      const r1 = ((i * 9301 + 49297) % 233280) / 233280;
      const r2 = ((i * 4789 + 12345) % 65536) / 65536;
      const r3 = ((i * 2654 + 7777) % 16384) / 16384;
      const r4 = ((i * 1597 + 3571) % 8192) / 8192;
      arr.push({
        x: r1 * 100,
        y: r2 * 100,
        size: 1.5 + r3 * 5,
        duration: 2 + r4 * 5,
        delay: r2 * 5,
        dx: (r3 - 0.5) * 40,
        dy: (r4 - 0.5) * 40,
      });
    }
    return arr;
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 中央コーラル巨大光 (脈動) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(217,119,87,0.55) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Particle Storm (200個粒子) */}
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
                  ? "rgba(217,119,87,1)"
                  : i % 3 === 1
                  ? "rgba(250,249,245,0.85)"
                  : "rgba(184,93,64,0.95)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 12px rgba(217,119,87,0.9)"
                  : i % 3 === 1
                  ? "0 0 8px rgba(250,249,245,0.6)"
                  : "0 0 10px rgba(184,93,64,0.7)",
            }}
            animate={{
              x: [0, p.dx, 0],
              y: [0, p.dy, 0],
              opacity: [0, 1, 0],
              scale: [0.3, 1.5, 0.3],
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

      {/* コピー周辺だけ落とす */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(31,24,21,0.50) 0%, transparent 65%)",
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
