"use client";

/**
 * TracingBeam — hp-ai 流用版 (coral / cream カラー対応)
 *
 * 章コンテナを上から下までスクロール連動で「縦線+短い斜め2回」のL字パスで描画。
 * isshin-ai.co.jp/about で採用されてる Aceternity Pro パターン。
 */
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
    const onResize = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn("relative w-full h-full", className)}>
      <div className="absolute -left-4 md:-left-12 top-3">
        {/* dot ノード (起点) */}
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          className="ml-[27px] h-4 w-4 rounded-full border border-cream/25 flex items-center justify-center"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            className="h-2 w-2 rounded-full bg-coral"
            style={{ boxShadow: "0 0 8px rgba(217,119,87,0.7)" }}
          />
        </motion.div>
        {/* SVG beam */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden
        >
          {/* 薄い背景 path */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="rgba(250,249,245,0.18)"
            strokeWidth="1"
            transition={{ duration: 10 }}
          />
          {/* gradient 進捗 path */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="1.5"
            transition={{ duration: 10 }}
            style={{ filter: "drop-shadow(0 0 4px rgba(217,119,87,0.45))" }}
          />
          <defs>
            <motion.linearGradient
              id="beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#D97757" stopOpacity="0" />
              <stop stopColor="#D97757" />
              <stop offset="0.325" stopColor="#D97757" />
              <stop offset="1" stopColor="#D97757" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
