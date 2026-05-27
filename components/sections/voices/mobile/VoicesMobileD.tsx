"use client";

/**
 * Voices Mobile D — 縦stack (全声を縦に流す)
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { voices } from "../voices-data";

export default function VoicesMobileD() {
  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-20 px-5">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">Voices</p>
          <h2 className="font-serif font-semibold leading-tight text-cream heading-ja" style={{ fontSize: "clamp(22px, 6vw, 36px)", letterSpacing: "-0.01em" }}>
            参加された方の、<br />リアルな声。
          </h2>
        </div>

        <div className="divide-y divide-cream/10">
          {voices.map((v, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.03 * (i % 4) }}
              className="py-5 relative"
            >
              <span aria-hidden className="absolute top-3 right-1 font-serif text-coral/25 leading-none" style={{ fontSize: "30px" }}>"</span>
              <p className="font-serif text-sm text-cream leading-relaxed pr-8 body-ja">
                {v.quote}
              </p>
              <p className="mt-2.5 font-mono text-[10px] tracking-[0.15em] text-cream/60">
                — {v.initial} / {v.age} / {v.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
