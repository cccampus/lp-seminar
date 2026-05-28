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
          <span className="text-coral italic font-normal">
            社員を雇わずに
            <br className="sm:hidden" />
            事業が伸びています
          </span>
          。
        </span>
      </RevealHeading>

      <p className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/80">
        自分の手で動かしてきた経営者へ。
        <br />
        半年で起きた変化を、
        <br className="sm:hidden" />
        2時間でお見せします。
      </p>

      <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-cream/55">
        * Claude Codeは、ビジネス活用に特化した次世代のAI です。
      </p>
    </>
  );
}
