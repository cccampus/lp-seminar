"use client";

/**
 * Wave Variant A — 章 (01/02/03) + 罫線 Editorial
 * シンプルなNYT Magazine風、3章構成で「世界の状況→日本の遅れ→もう取り返せない」を語る
 */
import DarkSection from "@/components/ui/DarkSection";
import { motion } from "motion/react";
import { TracingBeam } from "@/components/aceternity/TracingBeam";

const chapters = [
  {
    eyebrow: "01 — アメリカ",
    title: "アメリカは、もう動いている。",
    body: "銀行・保険・商社といった大手企業の事務作業の半分近くが、AI に置き換わり始めました。秘書がやっていた書類づくり、メール返信、会議の議事録 ─ これまで人がやってきた仕事の多くを、AI が担い始めています。",
    accent: "約50%",
    accentLabel: "大手企業の事務作業を、AI が代替し始めた割合",
  },
  {
    eyebrow: "02 — 日本",
    title: "日本は、約7年遅れ。",
    body: "ここ数ヶ月で、急速に動き始めています。NEC、JR、楽天、メルカリ──大手も一斉に AI を業務に取り入れる発表を相次いでしています。",
    accent: "7年",
    accentLabel: "日本が米国に対して遅れている年数",
  },
  {
    eyebrow: "03 — その差",
    title: "この差は、もう取り返せない。",
    body: "波は、もうすぐそこまで来ています。今 動き始めるか、5年後に追いかけるか。その差は、桁が違う差になります。",
    accent: "5年",
    accentLabel: "追いつく猶予",
  },
];

export default function WaveA() {
  return (
    <DarkSection id="wave" bgImage="/images/backdrop/bd_a.jpg" className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">The Wave</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-16" style={{ letterSpacing: "-0.01em" }}>
          いま、世界で起きていること。
        </h2>

        <TracingBeam className="pl-10 sm:pl-16">
          <div className="space-y-12 sm:space-y-16">
            {chapters.map((c, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
              >
                <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-coral/85 mb-3">
                  {c.eyebrow}
                </p>
                <h3 className="font-serif text-xl sm:text-3xl font-semibold text-cream leading-snug mb-4" style={{ letterSpacing: "-0.015em" }}>
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-cream/80 mb-6">
                  {c.body}
                </p>
                {c.accent && (
                  <div className="flex items-baseline gap-4 border-t border-coral/30 pt-4">
                    <span className="font-serif text-3xl sm:text-5xl font-bold text-coral" style={{ letterSpacing: "-0.02em" }}>
                      {c.accent}
                    </span>
                    <span className="text-xs sm:text-sm text-cream/55">{c.accentLabel}</span>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </TracingBeam>
      </div>
    </DarkSection>
  );
}
