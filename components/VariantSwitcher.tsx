/**
 * VariantSwitcher — 3 バージョン間の入口リンク（PC 右下に小さく固定 / モバイルは下端の上）
 *
 * 関係者の A/B 比較用。本番公開時は削除 or feature flag で隠す。
 */

type Variant = "default" | "a" | "b";

const variants: { key: Variant; label: string; href: string }[] = [
  { key: "default", label: "Default", href: "/" },
  { key: "a", label: "A · editorial", href: "/a" },
  { key: "b", label: "B · 実装証拠", href: "/b" },
];

export default function VariantSwitcher({ current }: { current: Variant }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden md:flex flex-col gap-1 items-end pointer-events-none"
      aria-label="LP バージョン切替（関係者用）"
    >
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-sumi/45 pointer-events-none">
        Variant
      </p>
      <div className="flex gap-1 pointer-events-auto">
        {variants.map((v) => {
          const active = v.key === current;
          return (
            <a
              key={v.key}
              href={v.href}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border rounded-full transition-colors duration-200 ${
                active
                  ? "bg-coral text-cream border-coral"
                  : "bg-cream/80 text-sumi/65 border-sumi/15 hover:text-coral hover:border-coral/40"
              }`}
            >
              {v.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
