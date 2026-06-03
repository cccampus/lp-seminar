/**
 * HeroMeta Variant D — アイコン + 罫線水平 (Stripe/Vercel pricing 風)
 * 各情報の左にアイコン (SVG)、横並び。
 */
export default function HeroMetaD() {
  return (
    <div className="mt-10 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-8">
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="5" width="18" height="16" rx="1" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Date</span>
          <span className="text-sm sm:text-base text-cream font-semibold leading-tight">
            6/14 (日) · 7/8 (水)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="2" y="6" width="16" height="12" rx="1" />
          <path d="M18 10l4-2v8l-4-2z" />
        </svg>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Format</span>
          <span className="text-sm sm:text-base text-cream font-semibold leading-tight">
            オンライン (Zoom)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 2v20M17 5H9a3 3 0 000 6h6a3 3 0 010 6H7" />
        </svg>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/85">Price</span>
          <span className="text-sm sm:text-base text-cream font-semibold leading-tight">
            ¥5,000 (税抜)
          </span>
        </div>
      </div>
    </div>
  );
}
