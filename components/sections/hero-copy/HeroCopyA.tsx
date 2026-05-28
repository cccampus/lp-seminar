import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy A — ベネフィット型 (経営者の未来提示)
 * 経営者最大の悩み「自分が止まると事業も止まる」を逆転させる未来像を提示
 */
export default function HeroCopyA() {
  return (
    <>
      <RevealHeading
        as="h1"
        stagger={0.026}
        className="font-serif font-semibold leading-[1.5] sm:leading-[1.35] mx-auto heading-ja"
        style={{
          fontSize: "clamp(20px, 5.4vw, 56px)",
          letterSpacing: "0em",
        }}
      >
        <span className="block">
          あなたが寝ている間に、
        </span>
        <span className="block mt-2 sm:mt-3">
          AIが
          <span className="text-coral italic font-normal">
            社員5人分の仕事
          </span>
          を終えている。
        </span>
      </RevealHeading>

      <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
        半年で、自分が止まっても回る事業へ。
        <br />
        その設計図を、2時間でお見せします。
      </p>

      <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
        * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
      </p>
    </>
  );
}
