# cccampus/lp-seminar — Claude Code 作業ガイド

Claude Code Campus 主催の**公開セミナー単発告知 LP**。同コミュニティの紹介LP（cccampus/lp-intro）と兄弟リポ。

## 重要事項

- たっかさん（@takkaver2）と共同管理。GitHub Org `cccampus` 配下
- **Vercelデプロイは紀洋さん側で実施**（たっかさんはpushまで）
- main直push許容、PRレビュー必須化なし（2人運用＋非エンジニア前提）
- まだ「箱」の状態。各セクションはこれから実装

## スタック（lp-intro と統一）

Next.js 16 (App Router) / React 19 / Tailwind v4 / Motion / Bun

Next.js 16 の breaking change については `AGENTS.md` を必ず確認。
オフラインdocs: `node_modules/next/dist/docs/`

## 開発コマンド

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # ビルド確認
```

## 主要ディレクトリ

- `app/` — page.tsx, layout.tsx, globals.css（Tailwind `@theme` 定義）
- `components/sections/` — Hero, Detail 等のセクション（**これから追加**）
- `public/` — 画像・OG画像

## ブランド制約（lp-intro と同一）

- 主色: coral (`#d97757`)、墨 (`#373737`)、cream (`#faf9f5`)
- 紫・青・ピンク・金は禁止
- 詳細は `app/globals.css` の `@theme` ブロック

## セミナーLP 想定セクション（叩き台）

```
Hero          — セミナータイトル + 日程 + 申込CTA
About         — このセミナーで何が得られるか（3-5項目）
Speaker       — 登壇者プロフィール
Detail        — タイムテーブル / 会場 or オンライン / 料金
FAQ           — よくある質問（任意）
FinalCTA      — 申込フォーム
Footer
```

cccampus/lp-intro の各セクション実装が参考になる（コピペ起点でOK）。

## NGワード（毎回grep確認）

訴求軸が B2B 経営者・意思決定者向けなので、以下のワードは混入禁止:

```
月10万|副業|主婦|学生|Earn with|人材プール|即稼働|収益に変える
```

```bash
grep -rE "月10万|副業|主婦|学生|Earn with|人材プール|即稼働|収益に変える" app/ components/ || echo "✓ NGワードなし"
```

## 関連

- 紹介LP（兄弟リポ）: https://github.com/cccampus/lp-intro
- スライド repo: https://github.com/cccampus/slides
- セミナー資料デザインガイド: `cccampus/slides` の `seminar_design.md`
- 事業ドキュメント: `~/projects/02_docs/01_isshin/01_ai/community/`
