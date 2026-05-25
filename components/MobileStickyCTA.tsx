"use client";

import { useEffect, useState } from "react";

/**
 * Mobile Sticky CTA — モバイル下部固定の申込導線
 *
 * 仕様（CCC DESIGN.md / リサーチ agent 推奨）:
 *   - モバイルのみ表示（md 以上で非表示）
 *   - Hero を抜けてから出現（scroll > 600px）
 *   - 終了タグ（footer）に近づくと再隠す
 *   - 上 1 行: 日時 + 価格 / 下: CTA ボタン（coral）
 *   - editorial を損なわない最小限の bg-cream + border-coral
 */

const FORM_URL = "#apply";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Hero 通過 (600px) で出現、footer 到達 (max - 200px) で隠す
      setVisible(y > 600 && y < max - 200);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      {/* 上端 coral 細線 */}
      <div className="h-px bg-coral/40" aria-hidden />
      <div className="bg-cream/95 backdrop-blur-md border-t border-sumi/10 px-4 py-3 flex items-center justify-between gap-3">
        {/* 左: 日時 + 価格 */}
        <div className="flex flex-col">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-sumi/55">
            5/31 (日) 11:00 · Zoom
          </span>
          <span className="font-serif text-base font-semibold text-sumi-deep mt-0.5">
            ¥5,000 <span className="text-xs font-normal text-sumi/55">税抜 / 先着 30 名</span>
          </span>
        </div>

        {/* 右: CTA */}
        <a
          href={FORM_URL}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-coral text-cream font-medium text-sm rounded-full
            hover:bg-coral-deep transition-colors duration-200 shadow-[0_4px_14px_rgba(217,119,87,0.35)]"
        >
          申し込む
          <span className="font-mono text-[10px] tracking-[0.2em]">↗</span>
        </a>
      </div>
    </div>
  );
}
