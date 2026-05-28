"use client";
import { motion } from "motion/react";

/**
 * Hero Bg B — Beams Collision (光線が中央で衝突)
 * 上から下へ流れる光線+下から上へ吹き上がる光線が衝突するAceternity Pro 風
 */
const downBeams = [
  { x: 8, delay: 0, duration: 3.5, w: 2 },
  { x: 18, delay: 1.2, duration: 4, w: 1 },
  { x: 30, delay: 0.5, duration: 3, w: 3 },
  { x: 42, delay: 2.5, duration: 3.8, w: 2 },
  { x: 55, delay: 1.5, duration: 3.2, w: 1 },
  { x: 68, delay: 0.8, duration: 4.2, w: 2 },
  { x: 80, delay: 2.0, duration: 3.5, w: 3 },
  { x: 92, delay: 0.3, duration: 3.6, w: 1 },
];

const upBeams = [
  { x: 15, delay: 1.0, duration: 4, w: 2 },
  { x: 35, delay: 0, duration: 3.5, w: 1 },
  { x: 50, delay: 1.8, duration: 4.5, w: 3 },
  { x: 65, delay: 0.6, duration: 3.2, w: 2 },
  { x: 85, delay: 2.2, duration: 3.8, w: 1 },
];

const collisions = [
  { x: 30, delay: 1.5 },
  { x: 50, delay: 3 },
  { x: 70, delay: 2 },
];

export default function HeroBgB() {
  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 中央コーラル光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(217,119,87,0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* 上から下へ流れる光線 */}
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

      {/* 下から上へ吹き上がる光線 */}
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

      {/* Collision explosions (中央で爆発光) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {collisions.map((c, i) => (
          <motion.div
            key={`c${i}`}
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${c.x}%`,
              width: "120px",
              height: "120px",
              background:
                "radial-gradient(circle, rgba(250,249,245,0.9) 0%, rgba(217,119,87,0.6) 30%, transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{
              scale: [0, 2.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeOut",
              repeatDelay: 3,
            }}
          />
        ))}
      </div>

      {/* コピー周辺だけ少し落とす */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(31,24,21,0.45) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
