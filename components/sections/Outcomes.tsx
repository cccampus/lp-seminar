/**
 * Outcomes (Cases) — VariantSwitcher
 * ?preview=1 で 5案切替: A:罫線table / B:Marquee / C:Bento / D:FocusCards / E:TracingBeam
 * 通常時は A (罫線table) を表示。
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import CasesA from "./cases/CasesA";
import CasesB from "./cases/CasesB";
import CasesC from "./cases/CasesC";
import CasesD from "./cases/CasesD";
import CasesE from "./cases/CasesE";

export default function Outcomes() {
  return (
    <Suspense fallback={<CasesE />}>
      <VariantSwitcher
        section="Cases"
        variants={[
          { key: "A", label: "罫線テーブル", node: <CasesE /> },
          { key: "B", label: "Marquee横流し", node: <CasesC /> },
          { key: "C", label: "Bento不均等", node: <CasesB /> },
          { key: "D", label: "Focus Cards", node: <CasesD /> },
          { key: "E", label: "TracingBeam縦", node: <CasesA /> },
        ]}
      />
    </Suspense>
  );
}
