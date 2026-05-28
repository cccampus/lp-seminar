import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy B — 恐怖型 (小坂さんFB直球)
 * 3年後の格差を提示してFOMO刺激
 */
export default function HeroCopyB() {
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
          3年後、AIを
          <span className="text-coral italic font-normal">使う経営者</span>
          と、
        </span>
        <span className="block mt-2 sm:mt-3">
          <span className="text-coral italic font-normal">使われる経営者</span>
          に分かれる。
        </span>
      </RevealHeading>

      <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
        いま動いている経営者だけが、
        <br />
        半年後に景色が変わる側にいる。
      </p>

      <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
        * Claude Code は、ChatGPT より仕事向けに進化した次世代の AI です。
      </p>
    </>
  );
}
