import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy C — 物語改良型 (現コピー残しつつベネフィット具体化)
 * 「AIで仕事をしている」を「社員を雇わずに事業が伸びている」に具体化
 */
export default function HeroCopyC() {
  return (
    <>
      <RevealHeading
        as="h1"
        stagger={0.026}
        className="font-serif font-semibold leading-[1.5] sm:leading-[1.35] mx-auto heading-ja"
        style={{
          fontSize: "clamp(20px, 5.4vw, 56px)",
          letterSpacing: "0em",
          textShadow:
            "0 2px 12px rgba(31,24,21,0.85), 0 0 30px rgba(31,24,21,0.6)",
        }}
      >
        <span className="block">
          半年前、私もAIを
          <br className="sm:hidden" />
          使えませんでした。
        </span>
        <span className="block mt-2 sm:mt-3">
          いま、
          <br className="sm:hidden" />
          <span className="text-coral italic font-normal">社員を雇わずに</span>
          <br className="sm:hidden" />
          <span className="text-coral italic font-normal">事業が伸びています</span>
          。
        </span>
      </RevealHeading>

      <p
        className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/90"
        style={{ textShadow: "0 1px 8px rgba(31,24,21,0.85)" }}
      >
        自分の手で動かしてきた経営者へ。
        <br />
        半年で起きた変化を、
        <br className="sm:hidden" />
        2時間でお見せします。
      </p>

      <p
        className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/70"
        style={{ textShadow: "0 1px 6px rgba(31,24,21,0.85)" }}
      >
        * Claude Codeは、ビジネス活用に特化した次世代のAI です。
      </p>
    </>
  );
}
