"use client";

/**
 * FinalCTA — v3.2
 * - 日程選択ラジオ（6/3 と 6/14）
 * - 同意チェック（特商法・返金不可）
 * - 法人参加削除、先着30名削除
 * - セミナー1回 ¥5,500 明示
 */
import Image from "next/image";
import { useState } from "react";

type Session = {
  id: string;
  label: string;
  date: string;
  time: string;
};

const sessions: Session[] = [
  {
    id: "2026-06-03",
    label: "第1回",
    date: "2026年6月3日（水）",
    time: "19:00 – 21:00",
  },
  {
    id: "2026-06-14",
    label: "第2回",
    date: "2026年6月14日（日）",
    time: "11:00 – 13:00",
  },
];

export default function FinalCTAStart() {
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0].id);
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
        body: JSON.stringify({ agreedTerms: true, sessionDate: selectedSession }),
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
      aria-labelledby="apply-start-heading"
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
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(31,31,31,0.65) 0%, rgba(31,31,31,0.25) 60%, transparent 100%)",
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
          id="apply-start-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          半年後の<span className="text-coral italic font-normal">景色</span>を、
          <br />
          いま選ぶ。
        </h2>

        <p className="mt-8 text-base sm:text-lg leading-relaxed text-cream/75 max-w-xl mx-auto">
          決済完了後、Zoom URL をご登録メールへお送りします
        </p>

        {/* === 日程選択ラジオ === */}
        <div className="mt-12 max-w-xl mx-auto text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-4">
            ご希望の日程をお選びください
          </p>
          <div className="space-y-3">
            {sessions.map((s) => (
              <label
                key={s.id}
                htmlFor={`session-${s.id}`}
                className={`flex items-center gap-4 cursor-pointer rounded-lg border p-4 transition-colors ${
                  selectedSession === s.id
                    ? "border-coral bg-coral/8"
                    : "border-cream/15 hover:border-cream/30"
                }`}
              >
                <input
                  id={`session-${s.id}`}
                  type="radio"
                  name="session"
                  value={s.id}
                  checked={selectedSession === s.id}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="h-5 w-5 shrink-0 appearance-none rounded-full border-2 border-cream/40 checked:border-coral relative
                    checked:after:content-[''] checked:after:absolute checked:after:inset-[3px] checked:after:rounded-full checked:after:bg-coral"
                />
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral/80">
                    {s.label}
                  </p>
                  <p className="mt-1 font-serif text-base sm:text-lg font-semibold text-cream">
                    {s.date} <span className="text-cream/65 font-normal">/ {s.time}</span>
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* === 同意チェック === */}
        <div className="mt-10 max-w-xl mx-auto">
          <label
            htmlFor="agree-terms"
            className="flex items-start gap-3 text-left cursor-pointer"
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

        {error && (
          <p className="mt-5 text-sm text-coral-light max-w-xl mx-auto">{error}</p>
        )}

        {/* === 主 CTA === */}
        <button
          type="button"
          onClick={handleApply}
          disabled={submitting || !agreed}
          className={`mt-8 inline-flex items-center gap-3 px-10 py-4 font-medium text-base rounded-full
            transition-all duration-200
            ${
              agreed && !submitting
                ? "bg-coral text-cream hover:bg-coral-deep shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
                : "bg-coral/40 text-cream/60 cursor-not-allowed"
            }`}
        >
          {submitting ? "決済画面へ移動中…" : "お申込みへ進む"}
          <span className="font-mono text-xs tracking-[0.2em]">→</span>
        </button>

        <p className="mt-5 text-xs sm:text-sm text-cream/55">
          お席に制限はありません。一人でも多くの方と、密度の濃い2時間を。
        </p>
      </div>
    </section>
  );
}
