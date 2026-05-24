"use client";

/**
 * GlitchText — シーン境界/見出しの「しっかり」グリッチ reveal
 *
 * Chile 20 の RGB ずれ/データモッシュ転換を CCC ブランドで翻訳。
 * 禁止色（青・シアン）を使わず coral + cream のみで RGB-shift 風を表現:
 *  - textShadow を coral / cream に左右オフセット（RGB split の代替）
 *  - clip-path inset でスライス（datamosh の代替）
 *  - x / skewX の高速ジッター
 * スクロールインで 1 回だけ ~0.5s バーストしてから settle。
 * prefers-reduced-motion 時はアニメ無し。
 *
 * reel_aligned_design_spec_v2.md §3-4。
 */

import {
  useRef,
  type ReactNode,
  type ElementType,
  type CSSProperties,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  style?: CSSProperties;
  /** true で「常時グリッチ」（約3.5秒ごとに短いグリッチを繰り返す）。既定は1回のみ */
  loop?: boolean;
}

export default function GlitchText({
  children,
  className,
  id,
  as: Tag = "h2",
  style,
  loop = false,
}: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const shadow = (x: number) =>
        `${x}px 0 #d97757, ${-x}px 0 rgba(250,249,245,0.45)`;

      // 常時グリッチ（周期的に短くフリッカー）
      if (loop) {
        gsap.set(el, { opacity: 1 });
        const lt = gsap.timeline({
          repeat: -1,
          repeatDelay: 3.2,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
        for (let i = 0; i < 6; i++) {
          lt.set(el, {
            x: gsap.utils.random(-5, 5),
            skewX: gsap.utils.random(-6, 6),
            textShadow: shadow(gsap.utils.random(2, 5)),
            clipPath: `inset(${gsap.utils.random(0, 35)}% 0 ${gsap.utils.random(0, 35)}% 0)`,
          });
          lt.to(el, { duration: 0.05 });
        }
        lt.to(el, {
          x: 0,
          skewX: 0,
          textShadow: shadow(0),
          clipPath: "inset(0% 0 0% 0)",
          duration: 0.18,
          ease: "power2.out",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });

      gsap.set(el, { opacity: 0 });
      tl.to(el, { opacity: 1, duration: 0.08 });

      // glitch burst（離散ステップでジッター）
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        tl.set(el, {
          x: gsap.utils.random(-6, 6),
          skewX: gsap.utils.random(-8, 8),
          textShadow: shadow(gsap.utils.random(2, 6)),
          clipPath: `inset(${gsap.utils.random(0, 45)}% 0 ${gsap.utils.random(0, 45)}% 0)`,
        });
        tl.to(el, { duration: 0.045 });
      }

      // settle
      tl.to(el, {
        x: 0,
        skewX: 0,
        textShadow: shadow(0),
        clipPath: "inset(0% 0 0% 0)",
        duration: 0.2,
        ease: "power2.out",
      });
      tl.set(el, { clearProps: "textShadow,clipPath,transform" });
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${className ?? ""} [word-break:keep-all]`}
      style={style}
    >
      {children}
    </Tag>
  );
}
