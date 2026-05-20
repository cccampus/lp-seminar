import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

/**
 * Claude Code Campus 第 1 回 公開セミナー LP
 *
 * 構成:
 *   Hero      — 動画ループ + 日時 + 申込CTA（Google Form）
 *   About     — なぜ今 Claude Code を学ぶか（公知データ + Amodei 引用）
 *   （以降の Speaker / Detail / FAQ / FinalCTA は今後追加）
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
