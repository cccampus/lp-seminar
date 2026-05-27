/**
 * Voices
 * PC = VoicesC (Marquee 確定済) を md: 以上で表示
 * Mobile = 5案 Switcher を md 未満で表示
 */
import { Suspense } from "react";
import { VariantSwitcher } from "@/components/ui/VariantSwitcher";
import VoicesC from "./voices/VoicesC";
import VoicesMobileA from "./voices/mobile/VoicesMobileA";
import VoicesMobileB from "./voices/mobile/VoicesMobileB";
import VoicesMobileC from "./voices/mobile/VoicesMobileC";
import VoicesMobileD from "./voices/mobile/VoicesMobileD";
import VoicesMobileE from "./voices/mobile/VoicesMobileE";

export default function Voices() {
  return (
    <>
      {/* PC: 採用済 Marquee 固定 */}
      <div className="hidden md:block">
        <VoicesC />
      </div>
      {/* Mobile: 5案 Switcher (?preview=1 で切替) */}
      <div className="md:hidden">
        <Suspense fallback={<VoicesMobileA />}>
          <VariantSwitcher
            section="Voices (Mobile)"
            variants={[
              { key: "A", label: "大引用ローテーター", node: <VoicesMobileA /> },
              { key: "B", label: "横スワイプ", node: <VoicesMobileB /> },
              { key: "C", label: "Marquee2行", node: <VoicesMobileC /> },
              { key: "D", label: "縦stack", node: <VoicesMobileD /> },
              { key: "E", label: "アコーディオン", node: <VoicesMobileE /> },
            ]}
          />
        </Suspense>
      </div>
    </>
  );
}
