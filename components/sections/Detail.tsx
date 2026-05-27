/**
 * Detail — VariantSwitcher (?preview=1)
 * A:罫線インフォボード / B:チケット風 / C:タイポ縦並びミニマル / D:大型タイポ3段 / E:現状
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import DetailA from "./detail/DetailA";
import DetailB from "./detail/DetailB";
import DetailC from "./detail/DetailC";
import DetailD from "./detail/DetailD";
import DetailE from "./detail/DetailE";

export default function Detail() {
  return (
    <Suspense fallback={<DetailA />}>
      <VariantSwitcher
        section="Detail"
        variants={[
          { key: "A", label: "罫線インフォボード", node: <DetailA /> },
          { key: "B", label: "チケット風", node: <DetailB /> },
          { key: "C", label: "タイポ縦並びミニマル", node: <DetailC /> },
          { key: "D", label: "大型タイポ3段", node: <DetailD /> },
          { key: "E", label: "現状", node: <DetailE /> },
        ]}
      />
    </Suspense>
  );
}
