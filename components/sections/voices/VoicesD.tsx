"use client";

/**
 * Voices Variant D — Bento 不均等
 * 大1+小複数の重み付きグリッド。動き少なめ・読ませる。
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { voices } from "./voices-data";

export default function VoicesD() {
  // 12個に絞って配置（Bentoでは多すぎると崩れる）
  const display = voices.slice(0, 12);

  return (
    <DarkSection id="voices" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Voices</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream" style={{ letterSpacing: "-0.01em" }}>
            参加された方の、<br />リアルな声。
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 auto-rows-[180px] gap-3 sm:gap-4">
          {display.map((v, i) => {
            // sizing pattern: 0=大(2x2) / 1,3,5,7,9=普通(2x1) / others=小(1x1)
            const big = i === 0;
            const wide = [1, 4, 7, 10].includes(i);
            const span = big
              ? "col-span-2 row-span-2 sm:col-span-3 sm:row-span-2"
              : wide
              ? "col-span-2 sm:col-span-3"
              : "col-span-1 sm:col-span-2";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className={`relative ${span} border-l-2 border-coral/50 bg-cream/[0.04] p-5 sm:p-6 flex flex-col justify-between overflow-hidden`}
              >
                <p className={`font-serif text-cream leading-relaxed ${big ? "text-lg sm:text-2xl" : "text-xs sm:text-sm"}`}>
                  「{v.quote}」
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.15em] text-cream/65">
                  {v.initial} / {v.age} / {v.role}
                </p>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-cream/55">
          他 {voices.length - display.length} 名の声も当日ご紹介します
        </p>
      </div>
    </DarkSection>
  );
}
