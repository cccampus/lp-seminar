/**
 * Wave — VariantSwitcher
 * A:章+罫線 / B:大型タイポreveal / C:数字シネマ / D:USA→JAPAN map / E:現状(超リッチ677行)
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import WaveA from "./wave/WaveA";
import WaveB from "./wave/WaveB";
import WaveC from "./wave/WaveC";
import WaveD from "./wave/WaveD";
import WaveE from "./wave/WaveE";

export default function Wave() {
  return (
    <Suspense fallback={<WaveA />}>
      <VariantSwitcher
        section="Wave"
        variants={[
          { key: "A", label: "章+罫線(TracingBeam)", node: <WaveA /> },
          { key: "B", label: "大型タイポreveal", node: <WaveB /> },
          { key: "C", label: "数字シネマ", node: <WaveC /> },
          { key: "D", label: "USA→JAPAN map", node: <WaveD /> },
          { key: "E", label: "現状リッチ", node: <WaveE /> },
        ]}
      />
    </Suspense>
  );
}
