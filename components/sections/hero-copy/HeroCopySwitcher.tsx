"use client";

import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import HeroCopyA from "./HeroCopyA";
import HeroCopyB from "./HeroCopyB";
import HeroCopyC from "./HeroCopyC";
import HeroCopyD from "./HeroCopyD";
import HeroCopyE from "./HeroCopyE";

/**
 * HeroCopySwitcher — ?preview=1 時のみ5案切替UIを表示。
 * 通常時は A案を固定表示。
 *
 * 採用後は HeroCopyAdopted を直import し、本ファイルと不採用案ファイルは削除する。
 */
export default function HeroCopySwitcher() {
  return (
    <Suspense fallback={<HeroCopyA />}>
      <VariantSwitcher
        section="Hero Copy"
        variants={[
          { key: "A", label: "ベネフィット型", node: <HeroCopyA /> },
          { key: "B", label: "恐怖型", node: <HeroCopyB /> },
          { key: "C", label: "物語改良型", node: <HeroCopyC /> },
          { key: "D", label: "数字型", node: <HeroCopyD /> },
          { key: "E", label: "質問型", node: <HeroCopyE /> },
        ]}
      />
    </Suspense>
  );
}
