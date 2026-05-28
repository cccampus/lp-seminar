"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Hero Bg D — Code Matrix (コード行が流れる + 3D風グリッド)
 * 縦方向にコード/数字が流れる、Matrix風だが coral 色
 */
const codeLines = [
  "claude code --feature",
  "git commit -m fix",
  "AI agent launched",
  "5x productivity",
  "npm run deploy",
  "while(true) { code; }",
  "model: claude-opus",
  "tokens generated",
  "process.exit(0)",
  "function nextStep()",
  "const result = await",
  "if(future) { go(); }",
];

export default function HeroBgD() {
  const columns = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const r = ((i * 9301 + 49297) % 233280) / 233280;
      const r2 = ((i * 4789 + 12345) % 65536) / 65536;
      arr.push({
        x: 4 + i * 7,
        delay: r * 6,
        duration: 8 + r2 * 6,
        line: codeLines[i % codeLines.length],
      });
    }
    return arr;
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* 3D風 grid pattern (透視) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,119,87,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,87,0.55) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 60%, black 10%, transparent 75%)",
          transform: "perspective(800px) rotateX(45deg)",
          transformOrigin: "center bottom",
        }}
        aria-hidden
      />

      {/* Code rain (Matrix風コード行が流れる) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {columns.map((col, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[10px] sm:text-[11px] whitespace-nowrap"
            style={{
              left: `${col.x}%`,
              top: "-15%",
              color: i % 4 === 0 ? "rgba(217,119,87,0.85)" : "rgba(217,119,87,0.55)",
              textShadow: "0 0 6px rgba(217,119,87,0.7)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
            animate={{
              y: ["0%", "120vh"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: col.duration,
              delay: col.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.05, 0.95, 1],
            }}
          >
            {col.line}
          </motion.div>
        ))}
      </div>

      {/* 中央コーラル巨大光 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(217,119,87,0.45) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* 周辺暗 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(31,24,21,0.85) 100%)",
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
