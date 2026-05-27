/**
 * Voices — VariantSwitcher
 * A:大引用ローテーター / B:Marquee2行 / C:横スワイプカルーセル / D:Bento不均等 / E:Editorial縦長
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import VoicesA from "./voices/VoicesA";
import VoicesB from "./voices/VoicesB";
import VoicesC from "./voices/VoicesC";
import VoicesD from "./voices/VoicesD";
import VoicesE from "./voices/VoicesE";

export default function Voices() {
  return (
    <Suspense fallback={<VoicesA />}>
      <VariantSwitcher
        section="Voices"
        variants={[
          { key: "A", label: "大引用ローテーター", node: <VoicesA /> },
          { key: "B", label: "Marquee 2行", node: <VoicesB /> },
          { key: "C", label: "横スワイプ", node: <VoicesC /> },
          { key: "D", label: "Bento不均等", node: <VoicesD /> },
          { key: "E", label: "Editorial縦長", node: <VoicesE /> },
        ]}
      />
    </Suspense>
  );
}
