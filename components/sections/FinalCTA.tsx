"use client";

/**
 * FinalCTA — 最後の申込導線（Stripe Checkout 連携）
 * - 申込ボタン → 同意チェック必須 → POST /api/checkout → Stripe Checkout へ
 * - 副 CTA: 法人 2 名以上の相談（mailto）
 * - Hero と対の dark セクション + cinematic 背景画像 + ambient coral 光 + grain
 */
import Image from "next/image";
import { useState } from "react";

const CORPORATE_MAIL = "noreply@isshin-ai.co.jp";

export default function FinalCTA() {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    setError(null);
    if (!agreed) {
      setError("特定商取引法・返金不可条件への同意が必要です");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agreedTerms: true }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "決済セッションの生成に失敗しました");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      setSubmitting(false);
    }
  }

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="relative w-full bg-sumi-deep text-cream overflow-hidden py-32 sm:py-40 px-6"
    >
      {/* cinematic 背景画像 */}
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden>
        <Image
          src="/images/finalcta/cinematic_cta_bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,31,31,0.55) 0%, rgba(31,31,31,0.15) 60%, transparent 100%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 38% at 8% 95%, rgba(184,93,64,0.18) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2
          id="apply-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight"
        >
          2 時間で、
          <br />
          自社の <span className="text-coral italic font-normal">次の一手</span> を持ち帰る
        </h2>

        <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/75 max-w-xl mx-auto">
          先着 30 名。
          <br className="hidden sm:block" />
          決済完了後、Zoom URL と事前資料をご登録メールへお送りします
        </p>

        {/* メタ情報 */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-cream/12">
          {[
            { k: "DATE", v: "2026.05.31", sub: "日" },
            { k: "TIME", v: "11:00–13:00", sub: "2時間" },
            { k: "PRICE", v: "¥5,000", sub: "税抜・別途消費税" },
          ].map((m) => (
            <div key={m.k} className="py-5 sm:py-0 sm:px-6 flex flex-col items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral font-semibold">
                {m.k}
              </span>
              <span
                className="font-serif text-2xl sm:text-3xl font-semibold text-cream leading-none [word-break:keep-all]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {m.v}
                <span className="ml-1.5 align-baseline text-base font-normal text-cream/50">
                  （{m.sub}）
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* === 同意チェック === */}
        <div className="mt-14 max-w-xl mx-auto">
          <label
            htmlFor="agree-terms"
            className="flex items-start gap-3 text-left cursor-pointer group"
          >
            <input
              id="agree-terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setError(null);
              }}
              className="mt-1 h-5 w-5 shrink-0 appearance-none rounded border-2 border-cream/40 bg-transparent
                checked:bg-coral checked:border-coral
                focus-visible:ring-2 focus-visible:ring-coral-light focus-visible:ring-offset-2 focus-visible:ring-offset-sumi-deep
                relative cursor-pointer
                checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex
                checked:after:items-center checked:after:justify-center checked:after:text-cream checked:after:text-sm checked:after:font-bold"
            />
            <span className="text-sm text-cream/85 leading-relaxed">
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral-light underline underline-offset-2"
              >
                特定商取引法に基づく表記
              </a>
              {" "}を確認し、
              <strong className="text-cream font-semibold">
                返金不可・キャンセル不可
              </strong>
              の条件に同意します
            </span>
          </label>
        </div>

        {/* エラー表示 */}
        {error && (
          <p className="mt-5 text-sm text-coral-light max-w-xl mx-auto">
            {error}
          </p>
        )}

        {/* === 主 CTA === */}
        <button
          type="button"
          onClick={handleApply}
          disabled={submitting}
          className="mt-8 inline-flex items-center gap-3 px-10 py-4 bg-coral text-cream font-medium text-base rounded-full
            hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "決済画面へ移動中…" : "申し込む"}
          <span className="font-mono text-xs tracking-[0.2em]">↗</span>
        </button>

        <p className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
          Stripe 安全決済 · クレジットカード対応
        </p>

        {/* === 副 CTA — 法人2名以上 === */}
        <div className="mt-16 pt-12 border-t border-cream/10 max-w-xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
            法人で参加する
          </p>
          <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
            2 名以上での参加・社内勉強会としての共有・録画の社内配布など、
            <br className="hidden sm:block" />
            個別にご相談ください
          </p>
          <a
            href={`mailto:${CORPORATE_MAIL}?subject=CCC%20%E3%82%BB%E3%83%9F%E3%83%8A%E3%83%BC%20%E6%B3%95%E4%BA%BA%E5%8F%82%E5%8A%A0%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87`}
            className="mt-5 inline-flex items-center gap-2 text-coral-light hover:text-coral font-medium link-underline"
          >
            {CORPORATE_MAIL}
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
