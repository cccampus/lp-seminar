"use client";

/**
 * RevealHeading — セクション見出しの cinematic scroll reveal
 *
 * GSAP SplitText の mask reveal を、ScrollTrigger で「見出しが viewport に
 * 入った瞬間」に1回だけ発火させる再利用コンポーネント。Hero と同じ
 * 「行マスク下から chars がせり上がる」演出をページ全体で統一する。
 *
 * - 内部の coral span 等のネスト styling は SplitText が保持
 * - prefers-reduced-motion 時はそのまま表示（アニメ無効）
 * - cinematic_upgrade_roadmap.md §3 / DESIGN.md ease 思想（ease-out, 0.6-1.2s）準拠
 */

import { useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface RevealHeadingProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  /** レンダリングするタグ（既定 h2） */
  as?: ElementType;
  /** stagger 量（既定 0.02s/char） */
  stagger?: number;
}

export default function RevealHeading({
  children,
  className,
  id,
  style,
  as: Tag = "h2",
  stagger = 0.02,
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // mask:'lines' は折り返しを固定化して不自然な改行を生むため不使用（chars のみ）
      const split = SplitText.create(el, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
      // SplitText / ScrollTrigger は useGSAP の context が自動 revert
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
