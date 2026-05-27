/**
 * WhyPaid — VariantSwitcher
 * A:大引用center / B:Split理由+引用 / C:マニフェスト / D:罫線box / E:現状
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import WhyPaidA from "./whypaid/WhyPaidA";
import WhyPaidB from "./whypaid/WhyPaidB";
import WhyPaidC from "./whypaid/WhyPaidC";
import WhyPaidD from "./whypaid/WhyPaidD";
import WhyPaidE from "./whypaid/WhyPaidE";

export default function WhyPaid() {
  return (
    <Suspense fallback={<WhyPaidA />}>
      <VariantSwitcher
        section="Why Paid"
        variants={[
          { key: "A", label: "大引用center", node: <WhyPaidA /> },
          { key: "B", label: "Split理由+引用", node: <WhyPaidB /> },
          { key: "C", label: "マニフェスト", node: <WhyPaidC /> },
          { key: "D", label: "罫線box", node: <WhyPaidD /> },
          { key: "E", label: "現状", node: <WhyPaidE /> },
        ]}
      />
    </Suspense>
  );
}
