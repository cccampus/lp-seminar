"use client";

/**
 * Header — reel 風の固定ヘッダー（全ページ共通）
 *
 * - 上部固定。Hero 上では透明、スクロールで sumi 半透明 + blur に
 * - セクションへジャンプするナビ（Lenis でスムーズスクロール）
 * - 右に申込 CTA
 */

import { useState } from "react";
import { useLenis } from "lenis/react";

const NAV = [
  { label: "Change", id: "six-months" },
  { label: "Cases", id: "cases" },
  { label: "Voices", id: "voices" },
  { label: "Speakers", id: "speaker" },
  { label: "Detail", id: "detail" },
  { label: "FAQ", id: "faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis(({ scroll }: { scroll: number }) =>
    setScrolled(scroll > 80),
  );

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-sumi-deep/85 backdrop-blur-md border-b border-cream/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-[72px] sm:px-10">
        {/* 左: ブランド */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 text-[13px] sm:text-sm font-semibold tracking-[0.04em] text-cream transition-colors hover:text-coral-light"
        >
          <span className="text-coral text-[10px]">●</span>
          Claude&nbsp;Code 実践セミナー
        </a>

        {/* 中央〜右: ナビ（PC のみ） */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={goTo(n.id)}
              className="font-mono text-[13px] tracking-[0.16em] uppercase text-cream/75 transition-colors hover:text-coral-light"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* 右: 申込 CTA */}
        <a
          href="#apply"
          onClick={goTo("apply")}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-[13px] sm:text-sm font-semibold text-cream shadow-[0_8px_24px_rgba(217,119,87,0.35)] transition-transform duration-200 hover:scale-[1.04] sm:px-6"
        >
          申込
          <span className="translate-y-[-1px] text-sm">→</span>
        </a>
      </div>
    </header>
  );
}
