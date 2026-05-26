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

      // 常時グリッチ：「ギリギリ揺れ続ける」＝低振幅の微ジッターを切れ目なく回し続け、
      // そこへ時々（やや強い）スライス・RGBずれのバーストを重ねる。過剰にしない。
      if (loop) {
        gsap.set(el, { opacity: 1, willChange: "transform, clip-path" });

        // ① ベースの微ジッター（常時・小振幅）— 短い set を連続させ "ジャサッ" とした質感
        const base = gsap.timeline({
          repeat: -1,
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
        for (let i = 0; i < 10; i++) {
          base.set(el, {
            x: gsap.utils.random(-2.5, 2.5),
            y: gsap.utils.random(-2.5, 2.5),
            skewX: gsap.utils.random(-2, 2),
            textShadow: shadow(gsap.utils.random(0.8, 2.4)),
          });
          base.to(el, { duration: gsap.utils.random(0.05, 0.12) });
        }

        // ② たまに強めのバースト（スライス＋大きめ RGB ずれ）を重ねる
        const burst = gsap.timeline({
          repeat: -1,
          repeatDelay: 2.6,
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
        for (let i = 0; i < 6; i++) {
          burst.set(el, {
            x: gsap.utils.random(-9, 9),
            y: gsap.utils.random(-9, 9),
            skewX: gsap.utils.random(-7, 7),
            textShadow: shadow(gsap.utils.random(3, 7)),
            clipPath: `inset(${gsap.utils.random(0, 40)}% 0 ${gsap.utils.random(0, 40)}% 0)`,
          });
          burst.to(el, { duration: 0.04 });
        }
        burst.set(el, { clipPath: "inset(0% 0 0% 0)", x: 0, y: 0, skewX: 0 });
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
