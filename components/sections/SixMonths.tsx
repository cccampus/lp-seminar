"use client";

/**
 * SixMonths — VariantSwitcher
 *
 * 通常時: Variant A (ログラス系エディトリアル罫線) を表示
 * ?preview=1 付き URL の時のみ A/B/C 切替ボタンを表示してデザイン比較できる。
 * 紀洋さん採用判定後、Switcher を撤去して採用案を A 固定にする想定。
 */
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SixMonthsA from "./SixMonthsA";
import SixMonthsB from "./SixMonthsB";
import SixMonthsC from "./SixMonthsC";
import SixMonthsD from "./SixMonthsD";
import SixMonthsE from "./SixMonthsE";

type Variant = "A" | "B" | "C" | "D" | "E";

const VARIANT_LABELS: Record<Variant, string> = {
  A: "A: 罫線",
  B: "B: 比較表",
  C: "C: 大型タイポ",
  D: "D: TracingBeam",
  E: "E: EditorialList",
};

export default function SixMonths() {
  const sp = useSearchParams();
  const isPreview = sp.get("preview") === "1";
  const [variant, setVariant] = useState<Variant>("A");

  if (!isPreview) {
    return <SixMonthsA />;
  }

  return (
    <div className="relative">
      {/* Variant Switcher — 上部 sticky */}
      <div className="sticky top-16 z-40 flex items-center justify-center gap-2 bg-sumi-deep/90 backdrop-blur-md border-y border-cream/15 px-4 py-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/80 mr-2">
          Preview
        </span>
        {(Object.keys(VARIANT_LABELS) as Variant[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setVariant(k)}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-mono tracking-[0.1em] transition-colors ${
              variant === k
                ? "bg-coral text-cream border-coral"
                : "bg-transparent text-cream/70 border-cream/30 hover:border-cream/60 hover:text-cream"
            }`}
          >
            {VARIANT_LABELS[k]}
          </button>
        ))}
      </div>

      {/* Variant 本体 */}
      {variant === "A" && <SixMonthsA />}
      {variant === "B" && <SixMonthsB />}
      {variant === "C" && <SixMonthsC />}
      {variant === "D" && <SixMonthsD />}
      {variant === "E" && <SixMonthsE />}
    </div>
  );
}
