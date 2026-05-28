import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy E — 質問型 (痛み直撃)
 * 経営者の最も痛い問い「あなた依存」を直接投げる
 */
export default function HeroCopyE() {
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
          あなたの会社、あと何年、
        </span>
        <span className="block mt-2 sm:mt-3">
          <span className="text-coral italic font-normal">あなた依存</span>
          で回しますか?
        </span>
      </RevealHeading>

      <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
        半年で、自分の手から離れても回る事業へ。
        <br />
        経営者のための AI セミナー、2時間。
      </p>

      <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
        * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
      </p>
    </>
  );
}
