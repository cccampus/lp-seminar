/**
 * HeroMeta Variant C — 統合バー (1段細長く)
 * Date · Format · Price を1段で繋ぐ、Apple/Tesla製品ページ風。
 */
export default function HeroMetaC() {
  return (
    <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-3 border border-coral/30 bg-cream/[0.03] backdrop-blur-sm px-6 sm:px-8 py-3.5 rounded-full">
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Date</span>
        <span className="text-sm sm:text-base text-cream font-semibold whitespace-nowrap">
          6/3 (水) · 6/14 (日)
        </span>
      </span>
      <span className="text-cream/25">·</span>
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Format</span>
        <span className="text-sm sm:text-base text-cream font-semibold whitespace-nowrap">オンライン (Zoom)</span>
      </span>
      <span className="text-cream/25">·</span>
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Price</span>
        <span className="text-sm sm:text-base text-cream font-semibold whitespace-nowrap">¥5,000 (税抜)</span>
      </span>
    </div>
  );
}
