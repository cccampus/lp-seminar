import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import HeroMetaA from "./HeroMetaA";
import HeroMetaB from "./HeroMetaB";
import HeroMetaC from "./HeroMetaC";
import HeroMetaD from "./HeroMetaD";
import HeroMetaE from "./HeroMetaE";

export default function HeroMetaSwitcher() {
  return (
    <Suspense fallback={<HeroMetaA />}>
      <VariantSwitcher
        section="Hero Meta"
        variants={[
          { key: "A", label: "罫線セパレート", node: <HeroMetaA /> },
          { key: "B", label: "縦並び大型", node: <HeroMetaB /> },
          { key: "C", label: "統合バー1段", node: <HeroMetaC /> },
          { key: "D", label: "アイコン+罫線", node: <HeroMetaD /> },
          { key: "E", label: "現状(角丸カード)", node: <HeroMetaE /> },
        ]}
      />
    </Suspense>
  );
}
