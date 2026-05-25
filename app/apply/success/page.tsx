import Link from "next/link";

export const metadata = {
  title: "お申込み完了 — Claude Code 実践セミナー",
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-cream text-sumi-deep flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
          Confirmed
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-8">
          お申込みありがとうございます
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-sumi/80 mb-10">
          決済が完了しました。
          <br />
          ご登録のメールアドレス宛に確認メールをお送りしています。
        </p>

        <div className="rounded-2xl border border-sumi/15 bg-sumi/[0.02] p-8 sm:p-10 text-left space-y-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
              開催日時
            </p>
            <p className="font-serif text-xl font-semibold">
              2026年5月31日（日）11:00〜13:00
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
              形式
            </p>
            <p className="font-serif text-xl font-semibold">オンライン（Zoom）</p>
            <p className="mt-1.5 text-xs text-sumi/55">
              Zoom URL は開催日前日までに別途お送りします
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
              事前資料
            </p>
            <p className="text-sm text-sumi/80">
              開催前日までにメールにて配布いたします
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-sumi/65 leading-relaxed">
          ご質問は{" "}
          <a
            href="mailto:noreply@isshin-ai.co.jp"
            className="text-coral hover:underline"
          >
            noreply@isshin-ai.co.jp
          </a>{" "}
          まで
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-sumi/55 hover:text-coral"
        >
          ← トップへ戻る
        </Link>
      </div>
    </main>
  );
}
