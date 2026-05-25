
/**
 * Footer — スリム構成
 * - 上端 Coral 細線
 * - 中央: ロゴ + ワードマーク + eyebrow + 1行コピー
 * - 下段: リンク群 + copyright
 * - lp-intro の Footer と思想を揃える（CCC ブランド統一）
 */
export default function Footer() {
  const links = [
    { label: "特定商取引法", href: "/terms" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-sumi-deep text-cream px-6 py-10 sm:px-10 sm:py-12">
      {/* 上端 coral 線 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-coral/40" aria-hidden />

      {/* 薄い dot-grid */}
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-5xl flex-col">
        {/* ユーティリティ行（CCC ロゴのブランドエリアは削除） */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70 sm:justify-start">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="link-underline transition-colors duration-200 hover:text-coral-light focus-visible:text-coral-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="font-mono text-xs uppercase text-cream/55 tracking-[0.2em]">
            © Claude Code Campus 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
