import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy D — 数字型
 * 「5人分」で目を止める + 主語を「経営者のための」で明示
 */
export default function HeroCopyD() {
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
          ひとりで、
          <span className="text-coral italic font-normal">社員5人分</span>
          の仕事を。
        </span>
        <span className="block mt-2 sm:mt-3">
          経営者のための、AI 革命。
        </span>
      </RevealHeading>

      <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
        自分が止まれば事業も止まる。
        <br />
        その構造を半年で壊した実例を、2時間で。
      </p>

      <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
        * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
      </p>
    </>
  );
}
