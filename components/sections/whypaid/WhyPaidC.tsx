"use client";

/**
 * WhyPaid Variant C — マニフェスト風 (1ページ署名感、左寄せ列段)
 * 各段落を「I. II. III.」のマニフェスト形式で並べる
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";

const clauses = [
  {
    num: "I.",
    body: "無料のセミナーは、世の中にたくさんあります。それでも、私たちは ¥5,000 でお願いしています。",
  },
  {
    num: "II.",
    body: "理由はシンプルです。本気で一歩踏み出す方と、密度の濃い2時間を過ごしたい。",
  },
  {
    num: "III.",
    body: "有料を選んだあなたが「来てよかった」と思える時間を、私たちも責任を持って作る。そのためのお支払いです。",
  },
  {
    num: "IV.",
    body: "人は、手に入れる喜びよりも、失う痛みのほうを、はるかに大きく感じる(Kahneman)。いちど払った投資は、無駄にしたくなくなる。",
  },
  {
    num: "V.",
    body: "5,000円は、6ヶ月後のあなたを買う、最初の初期投資費用です。",
  },
];

export default function WhyPaidC() {
  return (
    <DarkSection id="why-paid" bgImage="/images/backdrop/bd_b.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">Why Paid · Manifesto</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-cream mb-14" style={{ letterSpacing: "-0.01em" }}>
          なぜ、有料なのか。
        </h2>

        <ol className="space-y-8 sm:space-y-10">
          {clauses.map((c, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7 items-baseline"
            >
              <span className="font-serif text-xl sm:text-3xl font-bold text-coral">{c.num}</span>
              <p className="text-base sm:text-lg leading-loose text-cream/85" style={{ letterSpacing: "0.02em" }}>
                {c.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 text-center pt-10 border-t border-cream/15">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/55 mb-3">— 署名 —</p>
          <p className="font-serif text-base sm:text-lg text-cream/80">Kiyo & Takka</p>
        </div>

        <div className="mt-14 text-center">
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3 bg-coral text-cream font-medium text-sm rounded-full hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]">
            2時間、一緒に過ごす
            <span className="font-mono text-xs tracking-[0.2em]">→</span>
          </a>
        </div>
      </div>
    </DarkSection>
  );
}
