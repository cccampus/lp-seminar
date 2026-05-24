/**
 * DarkSection — content セクション用の軽量ダーク枠
 *
 * StageScene（Hero/About/Showcase 用のフル舞台）より控えめ。
 * sumi-deep + 上部の淡い coral スポット + grain のみ（floor・巨大タイポ無し）。
 * 全セクションをダーク統一する際、情報密度の高いセクションを「舞台の余韻」程度に
 * 暗転させるための共通枠。reel_aligned_design_spec_v2.md（全面ダーク化）。
 */

import Image from "next/image";
import type { ReactNode } from "react";

interface DarkSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  spotX?: number;
  /** 背景に敷く cinematic テクスチャ画像（任意）。低 opacity + 暗幕で可読性確保 */
  bgImage?: string;
  /** 背景画像の opacity（既定 0.3） */
  bgOpacity?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export default function DarkSection({
  children,
  className = "",
  id,
  spotX = 50,
  bgImage,
  bgOpacity = 0.3,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: DarkSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full overflow-hidden bg-sumi-deep text-cream isolate ${className}`}
    >
      {/* 背景 cinematic 画像（任意） */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: bgOpacity }}
            aria-hidden
          >
            <Image src={bgImage} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          {/* 可読性のための暗幕 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(31,31,31,0.88) 0%, rgba(31,31,31,0.66) 50%, rgba(31,31,31,0.9) 100%)",
            }}
            aria-hidden
          />
        </>
      )}

      {/* 上部の淡い coral スポット */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${spotX}% 0%, rgba(217,119,87,0.12) 0%, transparent 60%)`,
        }}
        aria-hidden
      />
      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
