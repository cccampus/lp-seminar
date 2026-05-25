"use client";

/**
 * Header — reel 風の固定ヘッダー（全ページ共通）
 *
 * - 上部固定。Hero 上では透明、スクロールで sumi 半透明 + blur に
 * - セクションへジャンプするナビ（Lenis でスムーズスクロール）
 * - 右に申込 CTA。日付は変動しうるので出さない（Hero 上部メタは廃止）
 * reel_aligned_design_spec_v2.md §3-3（共通クローム）。
 */

import { useState } from "react";
import { useLenis } from "lenis/react";

const FORM_URL = "#apply";

const NAV = [
  { label: "なぜ今", id: "about" },
  { label: "成果物", id: "showcase" },
  { label: "講師", id: "speaker" },
  { label: "詳細", id: "detail" },
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
    if (lenis) lenis.scrollTo(el, { offset: -64 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-sumi-deep/80 backdrop-blur-md border-b border-cream/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:h-16 sm:px-10">
        {/* 左: セミナー識別（小） */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.28em] uppercase text-cream/85 transition-colors hover:text-coral-light"
        >
          <span className="text-coral text-[8px]">●</span>
          Claude&nbsp;Code 実践セミナー
        </a>

        {/* 中央〜右: ナビ（PC のみ） */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="セクション">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={goTo(n.id)}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/55 transition-colors hover:text-coral-light"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* 右: 申込 CTA */}
        <a
          href={FORM_URL}
          onClick={goTo("apply")}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-cream transition-transform duration-200 hover:scale-[1.04] sm:px-5"
        >
          申込
          <span className="translate-y-[-1px] text-xs">→</span>
        </a>
      </div>
    </header>
  );
}
