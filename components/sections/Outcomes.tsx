/**
 * Outcomes (Cases)
 * PC = CasesC (Marquee 確定済) を md: 以上で表示
 * Mobile = 5案 Switcher を md 未満で表示 (?preview=1 でA〜E切替)
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import CasesC from "./cases/CasesC";
import CasesMobileA from "./cases/mobile/CasesMobileA";
import CasesMobileB from "./cases/mobile/CasesMobileB";
import CasesMobileC from "./cases/mobile/CasesMobileC";
import CasesMobileD from "./cases/mobile/CasesMobileD";
import CasesMobileE from "./cases/mobile/CasesMobileE";

export default function Outcomes() {
  return (
    <>
      {/* PC: 採用済 Marquee 固定 */}
      <div className="hidden md:block">
        <CasesC />
      </div>
      {/* Mobile: 5案 Switcher (?preview=1 で切替) */}
      <div className="md:hidden">
        <Suspense fallback={<CasesMobileA />}>
          <VariantSwitcher
            section="Cases (Mobile)"
            variants={[
              { key: "A", label: "縦stack", node: <CasesMobileA /> },
              { key: "B", label: "横スワイプ", node: <CasesMobileB /> },
              { key: "C", label: "アコーディオン", node: <CasesMobileC /> },
              { key: "D", label: "タブ切替", node: <CasesMobileD /> },
              { key: "E", label: "2x4 grid", node: <CasesMobileE /> },
            ]}
          />
        </Suspense>
      </div>
    </>
  );
}
