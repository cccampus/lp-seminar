"use client";
import { motion } from "motion/react";

/**
 * Hero Bg A — Aurora Storm (激しい色彩変化)
 * 3層の巨大グラデが速く動き回り、色のコントラストMAX
 */
export default function HeroBgA() {
  return (
    <>
      <div className="absolute inset-0 bg-sumi-deep" aria-hidden />

      {/* Aurora 1: 巨大 coral グロー、速く大きく動く */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 90% 80% at 10% 20%, rgba(217,119,87,0.75) 0%, transparent 55%)",
            "radial-gradient(ellipse 90% 80% at 90% 80%, rgba(217,119,87,0.75) 0%, transparent 55%)",
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(217,119,87,0.75) 0%, transparent 55%)",
            "radial-gradient(ellipse 90% 80% at 10% 20%, rgba(217,119,87,0.75) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Aurora 2: coral-deep 補助光、反対方向に速く */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 70% at 90% 30%, rgba(184,93,64,0.65) 0%, transparent 55%)",
            "radial-gradient(ellipse 80% 70% at 30% 70%, rgba(184,93,64,0.65) 0%, transparent 55%)",
            "radial-gradient(ellipse 80% 70% at 70% 50%, rgba(184,93,64,0.65) 0%, transparent 55%)",
            "radial-gradient(ellipse 80% 70% at 90% 30%, rgba(184,93,64,0.65) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Aurora 3: cream ハイライト、激しくぱっと動く */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 40% 30%, rgba(250,249,245,0.20) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 50% at 80% 70%, rgba(250,249,245,0.20) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(250,249,245,0.20) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 50% at 40% 30%, rgba(250,249,245,0.20) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* 中央コピー周辺だけ暗く落とす (可読性確保) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(31,24,21,0.55) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Grain 強化 */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
    </>
  );
}
