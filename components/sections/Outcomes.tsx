/**
 * Outcomes (Cases)
 * PC = CasesC (Marquee 確定)
 * Mobile = CasesMobileA (縦stack + 罫線 + dot 確定) 採用
 */
import CasesC from "./cases/CasesC";
import CasesMobileA from "./cases/mobile/CasesMobileA";

export default function Outcomes() {
  return (
    <>
      <div className="hidden md:block">
        <CasesC />
      </div>
      <div className="md:hidden">
        <CasesMobileA />
      </div>
    </>
  );
}
