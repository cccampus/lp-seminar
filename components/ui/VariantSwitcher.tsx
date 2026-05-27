"use client";

/**
 * 共通 VariantSwitcher
 * ?preview=1 の時のみ上部固定ボタンで Variant を切替表示。
 * 通常時はindex 0 を固定表示。
 */
import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";

type VariantDef = {
  key: string;
  label: string;
  node: ReactNode;
};

export function VariantSwitcher({
  section,
  variants,
}: {
  section: string;
  variants: VariantDef[];
}) {
  const sp = useSearchParams();
  const isPreview = sp.get("preview") === "1";
  const [current, setCurrent] = useState(0);

  if (!isPreview) {
    return <>{variants[0].node}</>;
  }

  return (
    <div className="relative">
      <div className="sticky top-16 z-40 flex flex-wrap items-center justify-center gap-2 bg-sumi-deep/90 backdrop-blur-md border-y border-cream/15 px-4 py-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/80 mr-2 uppercase">
          {section}
        </span>
        {variants.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setCurrent(i)}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-mono tracking-[0.1em] transition-colors ${
              current === i
                ? "bg-coral text-cream border-coral"
                : "bg-transparent text-cream/70 border-cream/30 hover:border-cream/60 hover:text-cream"
            }`}
          >
            {v.key}: {v.label}
          </button>
        ))}
      </div>
      {variants[current].node}
    </div>
  );
}
