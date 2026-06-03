/**
 * HeroMeta Variant B — 大型タイポ縦並び
 * 3項目を縦に大胆に積む、editorial磁石風。
 */
export default function HeroMetaB() {
  return (
    <div className="mt-12 w-full max-w-md mx-auto space-y-5">
      <div className="flex items-baseline justify-between border-b border-cream/15 pb-3">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral/85">Date</span>
        <span className="font-serif text-xl sm:text-2xl text-cream font-semibold" style={{ letterSpacing: "-0.01em" }}>
          6/14<span className="text-cream/60 text-base">(日)</span> · 7/8<span className="text-cream/60 text-base">(水)</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between border-b border-cream/15 pb-3">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral/85">Format</span>
        <span className="font-serif text-xl sm:text-2xl text-cream font-semibold">
          オンライン<span className="text-cream/60 text-base">(Zoom)</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-coral/85">Price</span>
        <span className="font-serif text-xl sm:text-2xl text-cream font-semibold">
          ¥5,000<span className="text-cream/60 text-base">(税抜)</span>
        </span>
      </div>
    </div>
  );
}
