/**
 * StageScene — ダーク「ステージ」シーンの共通枠（Chile 20 翻訳の中核）
 *
 * sumi-deep の空間に coral スポットライト・巨大背景リピートタイポ・床反射・
 * grain・vignette を重ね、被写体（中の children）が舞台中央に立つ印象を作る。
 * Hero(D) の最背面レイヤー群を再利用可能化したもの。reel_aligned_design_spec_v2.md §3-1/3-2。
 *
 * 静的レイヤーのみ（hooks 無し）。中に client コンポーネント（GlitchText 等）を置ける。
 */

import type { ReactNode } from "react";

interface StageSceneProps {
  children: ReactNode;
  /** 巨大背景リピートタイポの語（例: "CLAUDE CODE"）。省略で非表示 */
  bgWord?: string;
  /** spotlight の水平位置（%）。既定 50（中央） */
  spotX?: number;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

export default function StageScene({
  children,
  bgWord,
  spotX = 50,
  className = "",
  id,
  "aria-labelledby": ariaLabelledby,
}: StageSceneProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full overflow-hidden bg-sumi-deep text-cream isolate ${className}`}
    >
      {/* スポットライト 3 重 radial（強・中・vignette） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 38% at ${spotX}% 22%, rgba(217,119,87,0.20) 0%, rgba(217,119,87,0.05) 45%, transparent 72%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse 80% 60% at ${spotX}% 30%, rgba(232,148,120,0.07) 0%, transparent 60%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 120% at 50% 45%, transparent 48%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden
      />

      {/* 巨大背景リピートタイポ */}
      {bgWord && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <div className="font-mono font-bold text-cream/[0.04] tracking-tighter leading-none whitespace-nowrap text-[26vw] sm:text-[20vw] md:text-[16vw]">
            {bgWord}
          </div>
        </div>
      )}

      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      {/* 床反射（下端の coral 発光） */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[32vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(217,119,87,0.05) 60%, rgba(217,119,87,0.10) 100%)",
        }}
        aria-hidden
      />

      {/* content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
