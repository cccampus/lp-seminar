/**
 * LegalPage — プライバシー / 特商法 / お問い合わせ の共通レイアウト
 * 文言はスタブ（仮）。本番公開前に法務確認・差し替え必要。
 */

type Props = {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export default function LegalPage({ title, updatedAt, children }: Props) {
  return (
    <main className="min-h-screen bg-cream text-sumi-deep">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        {/* 戻るリンク */}
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-sumi/55 hover:text-coral mb-12"
        >
          ← セミナー LP へ戻る
        </a>

        {/* eyebrow + title */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
          Legal
        </p>
        <h1
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </h1>
        {updatedAt && (
          <p className="mt-4 font-mono text-xs tracking-[0.15em] uppercase text-sumi/55">
            最終更新: {updatedAt}
          </p>
        )}

        {/* 本文 */}
        <div className="mt-16 prose-stub">{children}</div>
      </div>
    </main>
  );
}
