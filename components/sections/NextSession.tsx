/**
 * NextSession — 次回開催の告知
 * Vol.1 (5/31 日) の後、Vol.2 (6/3 火 19-21時) があることを伝える
 * editorial / 軽い帯型で前回セクションと衝突しない見せ方
 */

const SESSIONS = [
  {
    label: "Vol.1",
    date: "5/31 (日)",
    time: "11:00 – 13:00",
    status: "current",
  },
  {
    label: "Vol.2",
    date: "6/3 (火)",
    time: "19:00 – 21:00",
    status: "next",
  },
];

export default function NextSession() {
  return (
    <section
      id="next-session"
      aria-label="開催スケジュール"
      className="relative w-full bg-cream text-sumi-deep py-20 sm:py-24 px-6 border-t border-sumi/10"
    >
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral text-center mb-4">
          開催スケジュール
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight text-center max-w-2xl mx-auto">
          月 <span className="text-coral">複数回</span>、開催しています
        </h2>
        <p className="mt-4 text-sm sm:text-base text-sumi/70 text-center max-w-xl mx-auto">
          ご都合に合うタイミングでお越しください
        </p>

        {/* 2 セッション横並び */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-sumi/10 border border-sumi/10">
          {SESSIONS.map((s) => (
            <div
              key={s.label}
              className={`relative p-8 sm:p-10 ${
                s.status === "current" ? "bg-cream-warm" : "bg-cream"
              }`}
            >
              {/* coral 上端線（current 強調） */}
              {s.status === "current" && (
                <span className="absolute top-0 left-0 right-0 h-px bg-coral" aria-hidden />
              )}

              <div className="flex items-center gap-3 mb-4">
                <p
                  className={`font-mono text-[10px] tracking-[0.4em] uppercase font-semibold ${
                    s.status === "current" ? "text-coral" : "text-sumi/55"
                  }`}
                >
                  {s.label}
                </p>
                {s.status === "current" && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-coral/80 px-2 py-0.5 border border-coral/30 rounded-full">
                    本ページの回
                  </span>
                )}
                {s.status === "next" && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-sumi/55 px-2 py-0.5 border border-sumi/15 rounded-full">
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
              <p className="mt-3 font-serif text-lg text-sumi/80">{s.time}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.3em] uppercase text-sumi/55">
                Online · Zoom · ¥5,000
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-sumi/55 text-center">
          ※ Vol.2 のお申込みは Vol.1 終了後に開始予定。日程変更の可能性があります。
        </p>
      </div>
    </section>
  );
}
