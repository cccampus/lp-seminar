"use client";

/**
 * Impact — 「使う側に回った経営者 vs 見ているだけの経営者」の対比
 *
 * About（世界が動いている）の直後に、人の対比でstakesを情緒的に示す。
 * Krea(gpt-image-2)生成の対比画像（右=coralスポットの自信ある経営者 / 左=影で躊躇）。
 * reel の「暗いステージに被写体」を人物で。codex 助言 #2（Before/After 経営インパクト）。
 * 文字は最小・短句のみ（reel 流）。
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import GlitchText from "@/components/ui/GlitchText";

const easeOutQuint: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Impact() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate"
    >
      {/* 対比画像（ステージそのもの） */}
      <div className="relative w-full aspect-[3/2] sm:aspect-[2/1] max-h-[80vh] overflow-hidden">
        <Image
          src="/images/impact/exec_contrast_v2.jpg"
          alt="Claude Code を使う側に回った経営者と、見ているだけの経営者の対比"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        {/* 上下を sumi に馴染ませる */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,31,31,0.6) 0%, transparent 25%, transparent 60%, rgba(31,31,31,0.95) 100%)",
          }}
          aria-hidden
        />
        {/* 左右ラベル（reel の製品プレート相当・最小） */}
        <p className="absolute left-[6%] bottom-[14%] font-mono text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-cream/45">
          見ているだけ
        </p>
        <p className="absolute right-[8%] bottom-[20%] font-mono text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-coral">
          使う側
        </p>
      </div>

      {/* コピー（最小） */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pb-28 sm:pb-40 -mt-10 sm:-mt-16">
        <GlitchText
          as="h2"
          id="impact-heading"
          loop
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream"
        >
          差は、もう
          <br className="sm:hidden" />
          <span className="text-coral">開きはじめている</span>。
        </GlitchText>
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: easeOutQuint }}
          className="mt-8 text-base sm:text-lg leading-relaxed text-cream/70 [word-break:keep-all]"
        >
          AI を<span className="text-cream">動かす側</span>に回った経営者から、
          <br className="hidden sm:block" />
          意思決定の速さも、打ち手の幅も、変わっていく。
        </motion.p>
      </div>
    </section>
  );
}
