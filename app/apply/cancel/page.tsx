import Link from "next/link";

export const metadata = {
  title: "決済キャンセル — Claude Code 実践セミナー",
};

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-cream text-sumi-deep flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-sumi/55 mb-6">
          Cancelled
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-8">
          決済はキャンセルされました
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-sumi/80 mb-12">
          お申込みは完了していません。
          <br />
          再度お試しいただく場合は、下のボタンからどうぞ。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#apply"
            className="inline-flex items-center gap-3 px-9 py-4 bg-coral text-cream font-medium text-base rounded-full
              hover:bg-coral-deep transition-colors duration-200 shadow-[0_12px_36px_rgba(217,119,87,0.4)]"
          >
            もう一度申し込む
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-sumi/55 hover:text-coral"
          >
            ← トップへ戻る
          </Link>
        </div>

        <p className="mt-12 text-sm text-sumi/65 leading-relaxed">
          ご不明点は{" "}
          <a
            href="mailto:noreply@isshin-ai.co.jp"
            className="text-coral hover:underline"
          >
            noreply@isshin-ai.co.jp
          </a>{" "}
          までお気軽にどうぞ
        </p>
      </div>
    </main>
  );
}
