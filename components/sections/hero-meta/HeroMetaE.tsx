/**
 * HeroMeta Variant E — 現状(rounded border カード3つ)
 */
export default function HeroMetaE() {
  return (
    <div className="mt-10 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-cream/15 rounded-2xl border border-cream/15 bg-cream/[0.04] overflow-hidden">
      <div className="flex flex-col items-center gap-1.5 px-5 py-5">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral">Date</span>
        <span className="flex items-center gap-3 text-base sm:text-lg text-cream font-semibold">
          <span className="whitespace-nowrap">6/3<span className="text-cream/60 text-sm">(水)</span></span>
          <span className="text-cream/25 font-normal">/</span>
          <span className="whitespace-nowrap">6/14<span className="text-cream/60 text-sm">(日)</span></span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5 px-5 py-5">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral">Format</span>
        <span className="text-base sm:text-lg text-cream font-semibold">
          オンライン<span className="text-cream/60 text-sm">(Zoom)</span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5 px-5 py-5">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral">Price</span>
        <span className="text-base sm:text-lg text-cream font-semibold">
          ¥5,000<span className="text-cream/60 text-sm">(税抜)</span>
        </span>
      </div>
    </div>
  );
}
