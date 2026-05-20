# Claude Code Campus — セミナーLP (cccampus/lp-seminar)

Claude Code Campus（CCC）主催の**公開セミナー単発告知**用LP。Next.js 16 + Tailwind CSS v4 で構築。
GitHub Org `cccampus` 配下、紀洋さん（@hirochen4525）と たっかさん（@takkaver2）の共同管理。

紹介LP（cccampus/lp-intro）の兄弟リポで、スタックとブランドトークンは完全に同一。

## ステータス

**🚧 まだ「箱」の状態です**。`app/page.tsx` は仮表示のみ。各セクションはこれから実装します（CLAUDE.md の想定セクション一覧を参照）。

## 運用

- **共同管理**: 両者 GitHub Org Owner
- **デプロイ**: 紀洋さん側 Vercel アカウントで運用（たっかさん側Vercelは不使用）
- **ドメイン**: 後日割当（候補: `seminar.cccampus.jp` など）

## スタック（lp-intro と統一）

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4（CSS-first, `app/globals.css` の `@theme` で色定義）
- Motion (`motion/react`)
- Bun (package manager)

## 開発手順

```bash
bun install
bun dev
# → http://localhost:3000
```

`bun` が無ければ `pnpm install && pnpm dev` でも可。

## ディレクトリ

```
.
├── app/                    Next.js App Router (page.tsx, layout.tsx, globals.css)
├── components/sections/    Hero, Speaker 等のセクション（これから追加）
├── public/                 画像・静的資産
├── AGENTS.md               Next.js 16 の注意書き（Claude Code/AI Agent向け）
├── CLAUDE.md               Claude Code 作業ガイド
└── README.md               このファイル
```

## ブランドカラー

| Token | Hex | 用途 |
|---|---|---|
| `--color-coral` | `#d97757` | プライマリーアクセント |
| `--color-coral-light` | `#e89478` | ホバー / 強調 |
| `--color-coral-deep` | `#b85d40` | プレス / 影 |
| `--color-sumi` | `#373737` | 本文 |
| `--color-sumi-deep` | `#1f1f1f` | 見出し |
| `--color-cream` | `#faf9f5` | ベース背景 |
| `--color-cream-warm` | `#f5f1e8` | セクション背景 |

紫・青・ピンク・金は **使用禁止**。詳細は `app/globals.css` の `@theme` ブロック。

## 関連リポ

- 紹介LP（兄弟リポ）: https://github.com/cccampus/lp-intro
- スライド: https://github.com/cccampus/slides
- ドキュメント: `~/projects/02_docs/01_isshin/01_ai/community/`
