"use client";
import { motion } from "motion/react";

/**
 * Hero Bg A — Aurora 系背景
 * 複数の coral 系グラデーションが緩やかに動く未来感
 * ブランド色: coral / sumi / cream のみ使用
 */
export default function HeroBgA() {
  return (
    <>
      {/* base 黒 */}
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* Aurora 1: coral 主光 (左上→右下移動) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 50% at 25% 30%, rgba(217,119,87,0.32) 0%, transparent 65%)",
            "radial-gradient(ellipse 70% 50% at 75% 70%, rgba(217,119,87,0.32) 0%, transparent 65%)",
            "radial-gradient(ellipse 70% 50% at 25% 30%, rgba(217,119,87,0.32) 0%, transparent 65%)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Aurora 2: coral-deep 補助光 (反対方向) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(184,93,64,0.22) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(184,93,64,0.22) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(184,93,64,0.22) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Aurora 3: cream 微光 (中央スロー) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 50% 35% at 50% 40%, rgba(250,249,245,0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 35% at 50% 60%, rgba(250,249,245,0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 35% at 50% 40%, rgba(250,249,245,0.06) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* 暗オーバーレイ (コピー可読性確保) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(31,31,31,0.20) 0%, rgba(31,24,21,0.55) 100%)",
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
