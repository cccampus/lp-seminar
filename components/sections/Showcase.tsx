"use client";

/**
 * Showcase — Claude Code が「業務でつくるもの」を暗いステージに showcase
 *
 * Chile 20 の「3着のジャケットを舞台中央にスポットで並べ、スクロールで1点ずつ見せる」
 * を CCC に直訳。主役 = 成果物（LP / スライド / 業務自動化）。reel_aligned_design_spec_v2.md。
 *
 * - StageScene（ダーク枠）の上に、各成果物を大きくスポット展示
 * - reel 風に文字は最小（番号 + 短いラベル + 1 行）
 * - スクロールで 1 点ずつ reveal（motion whileInView / reduced-motion 対応）
 * - 画像は将来 Takka の実成果物スクショに差し替え（現状は cinematic プレースホルダ）
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import GlitchText from "@/components/ui/GlitchText";
import StageScene from "@/components/ui/StageScene";

type Item = {
  n: string;
  src: string;
  alt: string;
  label: string;
  line: string;
  /** 経営者向けの用途（codex 助言: 何に使えるかを一行で） */
  use: string;
};

const ITEMS: Item[] = [
  {
    n: "01",
    src: "/images/showcase/lp.jpg",
    alt: "Claude Code で制作した Web/LP のイメージ",
    label: "Web・LP 制作",
    line: "クライアント LP の制作リードタイムを 1/4 に。",
    use: "営業・集客に、そのまま出せる",
  },
  {
    n: "02",
    src: "/images/showcase/slides.jpg",
    alt: "Claude Code で生成したスライドのイメージ",
    label: "スライド・資料",
    line: "140 枚のデッキを、一括で生成・更新する。",
    use: "経営会議・提案に、そのまま使える",
  },
  {
    n: "03",
    src: "/images/showcase/automation.jpg",
    alt: "Claude Code で構築した業務自動化のイメージ",
    label: "業務自動化",
    line: "予約・問合せ・契約フローを、自動で回す。",
    use: "現場に、そのまま実装できる",
  },
];

const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** 成果物 1 点。スクロール parallax（画像が背景より速く動く＝奥行き）+ reveal */
function ShowcaseItem({ it }: { it: Item }) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1.0, ease: easeOutQuint }}
      className="relative"
    >
      {/* 主役画像 — 全縁を闇へ溶かし（箱に見せない）、画像は parallax で奥行き */}
      <div
        className="relative mx-auto w-full max-w-3xl aspect-[3/2] overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 82% 86% at 50% 44%, #000 48%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 82% 86% at 50% 44%, #000 48%, transparent 100%)",
        }}
      >
        <motion.div
          style={prefersReduced ? undefined : { y: imgY }}
          className="absolute inset-[-8%]"
        >
          <Image
            src={it.src}
            alt={it.alt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(31,31,31,0.9) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* ラベル（reel の製品プレート相当・最小文字） */}
      <div className="mt-6 flex items-baseline justify-center gap-5">
        <span
          className="font-serif text-4xl sm:text-5xl font-semibold text-coral leading-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          {it.n}
        </span>
        <div className="text-left">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/55">
            {it.label}
          </p>
          <p className="mt-2 font-serif text-lg sm:text-2xl text-cream leading-snug [word-break:keep-all]">
            {it.line}
          </p>
          <p className="mt-2.5 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-coral-light">
            <span className="h-[5px] w-[5px] rounded-full bg-coral" aria-hidden />
            {it.use}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Showcase() {
  return (
    <StageScene
      id="showcase"
      aria-labelledby="showcase-heading"
      bgWord="OUTPUT"
      className="py-28 sm:py-40 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <GlitchText
          as="h2"
          id="showcase-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream"
        >
          学ぶのは、
          <span className="text-coral">業務でつくる</span>ための使い方
        </GlitchText>
        <p className="mt-6 text-sm sm:text-base leading-relaxed text-cream/65 text-center max-w-xl mx-auto">
          講師二人が、実際に Claude Code で手元に取り戻してきたもの。
        </p>

        {/* === 成果物 showcase === */}
        <div className="mt-20 space-y-24 sm:space-y-32">
          {ITEMS.map((it) => (
            <ShowcaseItem key={it.n} it={it} />
          ))}
        </div>

        <p className="mt-24 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-cream/40">
          ── これを、自社の業務で。
        </p>
      </div>
    </StageScene>
  );
}
