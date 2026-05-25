/**
 * NextSession — 開催スケジュールの告知
 * 昼の回 (5/31 日 11-13時) / 夜の回 (6/3 火 19-21時)。
 * 「Vol.◯」表記は使わない（初開催であることを訴求しない方針）。時間帯の選択肢として見せる。
 */
import DarkSection from "@/components/ui/DarkSection";

const SESSIONS = [
  {
    date: "5/31 (日)",
    time: "11:00 – 13:00",
    status: "current",
  },
  {
    date: "6/3 (火)",
    time: "19:00 – 21:00",
    status: "next",
  },
];

export default function NextSession() {
  return (
    <DarkSection
      id="next-session"
      aria-label="開催スケジュール"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-20 sm:py-24 px-6 border-t border-cream/10"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight text-center max-w-2xl mx-auto [word-break:keep-all]">
          <span className="text-coral">順次</span>、開催枠を増やしています
        </h2>
        <p className="mt-4 text-sm sm:text-base text-cream/70 text-center max-w-xl mx-auto [word-break:keep-all]">
          ご都合に合うタイミングでお越しください
        </p>

        {/* 2 セッション横並び */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream/10 border border-cream/10">
          {SESSIONS.map((s) => (
            <div
              key={s.date}
              className={`relative p-8 sm:p-10 ${
                s.status === "current" ? "bg-cream/[0.06]" : "bg-cream/[0.03]"
              }`}
            >
              {/* coral 上端線（current 強調） */}
              {s.status === "current" && (
                <span className="absolute top-0 left-0 right-0 h-px bg-coral" aria-hidden />
              )}

              <div className="flex items-center gap-3 mb-4">
                {s.status === "current" && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-coral/80 px-2 py-0.5 border border-coral/30 rounded-full">
                    本ページの回
                  </span>
                )}
                {s.status === "next" && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-cream/55 px-2 py-0.5 border border-cream/15 rounded-full">
                    次回
                  </span>
                )}
              </div>

              <p
                className="font-serif text-3xl sm:text-4xl font-semibold leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.date}
              </p>
              <p className="mt-3 font-serif text-lg text-cream/80">{s.time}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/55">
                Online · Zoom · ¥5,000
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-cream/55 text-center">
          ※ 6/3 の回のお申込みは、5/31 の回の終了後に開始予定です。日程は変更になる可能性があります。
        </p>
      </div>
    </DarkSection>
  );
}
