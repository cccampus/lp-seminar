import Image from "next/image";

/**
 * Footer — スリム構成
 * - 上端 Coral 細線
 * - 中央: ロゴ + ワードマーク + eyebrow + 1行コピー
 * - 下段: リンク群 + copyright
 * - lp-intro の Footer と思想を揃える（CCC ブランド統一）
 */
export default function Footer() {
  const links = [
    { label: "プライバシー", href: "#" },
    { label: "特商法", href: "#" },
    { label: "お問い合わせ", href: "mailto:hello@cccampus.jp" },
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
        {/* ブランドエリア */}
        <div className="flex flex-col items-center gap-4 text-center">
          <a
            href="#"
            className="group relative inline-flex items-center justify-center"
            aria-label="Claude Code Campus"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(217, 119, 87, 0.55), rgba(217, 119, 87, 0) 70%)",
              }}
              aria-hidden
            />
            <Image
              src="/assets/ccc_logo_4C.png"
              alt=""
              width={144}
              height={144}
              className="relative h-12 w-12 object-contain sm:h-14 sm:w-14"
              style={{ filter: "drop-shadow(0 0 18px rgba(217, 119, 87, 0.30))" }}
            />
          </a>

          <h3
            className="font-serif text-2xl sm:text-3xl font-semibold text-cream"
            style={{ letterSpacing: "-0.01em" }}
          >
            Claude Code Campus
          </h3>

          <p className="font-mono text-[11px] sm:text-xs uppercase text-cream/55 tracking-[0.4em]">
            — Business Implementation School —
          </p>

          <p className="mt-6 max-w-[640px] text-base leading-[1.7] text-cream/75 sm:text-lg">
            あなたの組織に、Claude Code を実装する
          </p>
        </div>

        {/* 区切り */}
        <div className="my-8 h-px w-full bg-cream/10 sm:my-10" aria-hidden />

        {/* ユーティリティ行 */}
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
