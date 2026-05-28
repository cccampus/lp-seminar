"use client";
import { motion } from "motion/react";

/**
 * Hero Bg B — Background Beams 系
 * 上下から斜めに光線が走る未来感、Aceternity 風自前実装
 */
const beams = [
  { x: 10, delay: 0, duration: 8 },
  { x: 25, delay: 2, duration: 10 },
  { x: 40, delay: 4, duration: 7 },
  { x: 55, delay: 1, duration: 9 },
  { x: 70, delay: 5, duration: 11 },
  { x: 85, delay: 3, duration: 8 },
];

export default function HeroBgB() {
  return (
    <>
      {/* base 黒 */}
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 中央の薄いコーラル光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(217,119,87,0.15) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Beams (斜め45°で上から下へ流れる光線) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {beams.map((beam, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${beam.x}%`,
              top: "-20%",
              width: "1px",
              height: "60vh",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(217,119,87,0.6) 50%, transparent 100%)",
              transform: "rotate(20deg)",
              transformOrigin: "top",
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["0%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 暗オーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(31,31,31,0.30) 0%, rgba(31,24,21,0.80) 100%)",
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
