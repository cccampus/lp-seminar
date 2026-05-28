"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import HeroBgA from "./HeroBgA";
import HeroBgB from "./HeroBgB";
import HeroBgC from "./HeroBgC";
import HeroBgD from "./HeroBgD";
import HeroBgE from "./HeroBgE";

const variants = [
  { key: "A", label: "Aurora", node: <HeroBgA /> },
  { key: "B", label: "Beams", node: <HeroBgB /> },
  { key: "C", label: "Spotlight", node: <HeroBgC /> },
  { key: "D", label: "Boxes", node: <HeroBgD /> },
  { key: "E", label: "Sparkles", node: <HeroBgE /> },
];

function Inner() {
  const sp = useSearchParams();
  const isPreview = sp.get("preview") === "1";
  const [current, setCurrent] = useState(0);

  if (!isPreview) {
    // 通常時は A固定 (Aurora)
    return <>{variants[0].node}</>;
  }

  return (
    <>
      {variants[current].node}
      {/* preview切替バー — z-50 で最前面、Hero以降の他Switcherと干渉しないようtop位置調整 */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center justify-center gap-2 bg-sumi-deep/90 backdrop-blur-md border border-cream/15 rounded-full px-4 py-2 shadow-2xl">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/80 mr-2">
          Hero BG
        </span>
        {variants.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setCurrent(i)}
            className={`rounded-full border px-3 py-1 text-[11px] font-mono tracking-[0.1em] transition-colors ${
              current === i
                ? "bg-coral text-cream border-coral"
                : "bg-transparent text-cream/70 border-cream/30 hover:border-cream/60 hover:text-cream"
            }`}
          >
            {v.key}: {v.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default function HeroBgSwitcher() {
  return (
    <Suspense fallback={<HeroBgA />}>
      <Inner />
    </Suspense>
  );
}
