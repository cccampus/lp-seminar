"use client";
import { motion } from "motion/react";

/**
 * Hero Bg B — Beams (光線が流れる、衝突なし、コピー可読性重視)
 * 上下から光線が流れるダイナミック演出。本数を抑えてコピーを邪魔しない。
 */
const downBeams = [
  { x: 8, delay: 0, duration: 3.5, w: 2 },
  { x: 25, delay: 1.2, duration: 4, w: 1 },
  { x: 50, delay: 0.5, duration: 3, w: 2 },
  { x: 75, delay: 2.0, duration: 4.2, w: 1 },
  { x: 92, delay: 0.3, duration: 3.6, w: 2 },
];

const upBeams = [
  { x: 18, delay: 1.0, duration: 4, w: 1 },
  { x: 60, delay: 0, duration: 3.5, w: 2 },
  { x: 85, delay: 2.2, duration: 3.8, w: 1 },
];

export default function HeroBgB() {
  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 中央コーラル光 (薄め) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(217,119,87,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* 上から下へ流れる光線 (5本) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {downBeams.map((beam, i) => (
          <motion.div
            key={`d${i}`}
            className="absolute"
            style={{
              left: `${beam.x}%`,
              top: "-30%",
              width: `${beam.w}px`,
              height: "80vh",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(217,119,87,0.9) 30%, rgba(250,249,245,0.95) 50%, rgba(217,119,87,0.9) 70%, transparent 100%)",
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px rgba(217,119,87,0.7)",
            }}
            animate={{
              y: ["0%", "180%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
            }}
          />
        ))}
      </div>

      {/* 下から上へ吹き上がる光線 (3本) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {upBeams.map((beam, i) => (
          <motion.div
            key={`u${i}`}
            className="absolute"
            style={{
              left: `${beam.x}%`,
              bottom: "-30%",
              width: `${beam.w}px`,
              height: "80vh",
              background:
                "linear-gradient(to top, transparent 0%, rgba(184,93,64,0.8) 30%, rgba(250,249,245,0.95) 50%, rgba(184,93,64,0.8) 70%, transparent 100%)",
              filter: "blur(0.5px)",
              boxShadow: "0 0 6px rgba(184,93,64,0.6)",
            }}
            animate={{
              y: ["0%", "-180%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
            }}
          />
        ))}
      </div>

      {/* コピー周辺を暗く落とす (可読性最優先で強化) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(31,24,21,0.75) 0%, rgba(31,24,21,0.35) 60%, transparent 80%)",
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
