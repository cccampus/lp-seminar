import RevealHeading from "@/components/ui/RevealHeading";

/**
 * HeroCopy A — ベネフィット型 (経営者の未来提示)
 * 経営者最大の悩み「自分が止まると事業も止まる」を逆転させる未来像を提示
 * スマホ改行は <br className="sm:hidden" /> で明示制御、可読性確保のため text-shadow 追加
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
          textShadow:
            "0 2px 12px rgba(31,24,21,0.85), 0 0 30px rgba(31,24,21,0.6)",
        }}
      >
        <span className="block">
          あなたが寝ている間に、
        </span>
        <span className="block mt-2 sm:mt-3">
          AIが
          <br className="sm:hidden" />
          <span className="text-coral italic font-normal">社員5人分の仕事</span>
          <br className="sm:hidden" />
          を終えている。
        </span>
      </RevealHeading>

      <p
        className="mt-8 max-w-xl text-sm sm:text-lg leading-relaxed text-cream/90"
        style={{ textShadow: "0 1px 8px rgba(31,24,21,0.85)" }}
      >
        半年で、自分が止まっても回る事業へ。
        <br />
        その設計図を、
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
