"use client";

/**
 * Voices Variant E — Editorial 縦長マガジン
 * 全声を縦に流す、雑誌コラム風。重厚で読ませる。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { voices } from "./voices-data";

export default function VoicesE() {
  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream" style={{ letterSpacing: "-0.01em" }}>
            参加された方の、<br />リアルな声。
          </h2>
        </div>

        <div>
          {voices.map((v, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.04 * (i % 5) }}
              className="py-7 sm:py-9 border-b border-cream/10 last:border-0"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-coral/85 mb-3">
                Voice {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-serif text-base sm:text-xl text-cream leading-relaxed">
                「{v.quote}」
              </p>
              <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-cream/55">
                — {v.initial} / {v.age} / {v.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
