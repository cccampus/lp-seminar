/**
 * Claude Code Campus セミナー LP — エントリ
 *
 * これは「箱」の状態です。たっかさん側で各セクションを実装してください。
 * デザイントークン（coral / 墨 / cream）は app/globals.css の @theme ブロックで定義済み。
 * 詳細は CLAUDE.md / AGENTS.md を参照。
 */
export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-sumi-deep/50">
        Claude Code Campus
      </p>
      <h1 className="mt-4 text-3xl font-medium text-sumi-deep sm:text-4xl">
        セミナー LP（準備中）
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-sumi-deep/70">
        ここにセミナーの内容・登壇者・タイムテーブル・申込フォームを並べていきます。
        <br />
        実装は <code className="font-mono">components/sections/</code> 配下にセクション単位で追加してください。
      </p>
    </main>
  );
}
