# 引き継ぎ書: lp-seminar — cinematic 化 + 本番 / 確定（2026-05-23）

> セミナー LP（`cccampus/lp-seminar`）の作業引き継ぎ。Mac mini 等の別マシンで継続作業するための完全版。
> 前提ドキュメント: [`docs/cinematic_upgrade_roadmap.md`](cinematic_upgrade_roadmap.md)（cinematic 化の詳細設計）

最終更新: 2026-05-23

---

## 1. TLDR（30 秒で把握）

- **案件**: 2026/05/31 (日) 11:00-13:00 のオンラインセミナー Vol.1 告知 LP
- **状態**: 本番 `/` = **D (cinematic V2)** に確定済み。旧バリアント /a /b /c /d は参考用に残置
- **直近の山**: 本文コピーの整合（タイトル・日付・時間・「使う側」positioning）をほぼ 100% に。次は **画像生成（Codex GPT Image）でリッチ化**
- **未完**: セクション背景画像 / パーツ画像、申込フォーム URL（仮）、法律ページ本文（仮）、OGP/メタ
- **デプロイ**: 紀洋さん側で Vercel deploy（Takka は push まで）。push 済み → 反映待ち

---

## 2. 環境・起動

```bash
cd 04_制作/cccampus_github/lp-seminar

# このマシンは bun 未導入。npm でも動く（CLAUDE.md は bun 前提だが npm で代用可）
npm install            # 初回のみ
NEXT_TELEMETRY_DISABLED=1 npx next dev --port 3300 --hostname 127.0.0.1
# → http://127.0.0.1:3300/   ※ Node 23 + Next 16 は cold start に ~80 秒かかる（壊れていない、待てば Ready）

# 型チェック
./node_modules/.bin/tsc --noEmit

# NG ワードチェック（毎回）
grep -rE "月10万|副業|主婦|学生|Earn with|人材プール|即稼働|収益に変える" app/ components/ || echo "✓ NGワードなし"
```

**スタック**: Next.js 16 (App Router) / React 19 / Tailwind v4 / Motion v12 / Bun（または npm）

---

## 3. ルート構成（現在）

| URL | 内容 | 状態 |
|---|---|---|
| **`/`** | **本番 = D (cinematic V2)** | ★確定 |
| `/a` | editorial 純化（Hero ポートレート + Before/After） | 参考残置 |
| `/b` | 実装証拠押し（Claude Code 端末 Hero + 痛み + 価格正当化） | 参考残置 |
| `/c` | cinematic V1（HeroCinematic） | 参考残置 |
| `/d` | cinematic V2（HeroCinematicV2）= / と同一 | 参考残置 |
| `/privacy` `/terms` `/contact` | 法律ページ（**仮文言**） | 要差し替え |

右下の **VariantSwitcher**（PC のみ）で 5 つを行き来して比較可能。**本番公開前に VariantSwitcher は削除 or feature flag で隠す**こと。

---

## 4. 採用デザイン D の構造

`app/page.tsx` = 以下の構成（D を昇格）:

```
HeroCinematicV2  ← components/sections/d/HeroCinematicV2.tsx（dark stage + 文字 char reveal + parallax + glow orbs + 床反射 + GPT Image 背景）
  ↓ bridge gradient（dark→light smooth fade）
TrustStrip   — Anthropic 公式 / 採用企業（cream）
About        — なぜ今学ぶか（実例ベース: JPMorgan / Anthropic / 7年遅れ）
Outcomes     — 学べること「何のツールを使うかじゃなくて、どう使うか」
WhyThis      — 他の AI セミナーと違う 3 点
Speaker      — Kiyo / Takka（実写真 square crop + 手がけてきたもの）
Detail       — 開催情報（タイムテーブルは削除済み）
FAQ          — 6 項目アコーディオン
BeforeRegister — 申込前の透明性 5 項目
NextSession  — Vol.1 (5/31 日) + Vol.2 (6/3 火 19-21時)
FinalCTA     — 主＋副 CTA（個人 / 法人相談）
Footer       — ロゴのみ（タグライン非表示中）
VariantSwitcher + MobileStickyCTA
```

**本文セクションは全バリアント共通**（About〜Footer を再利用）。コピー修正は 1 箇所直せば全 variant に反映される。

---

## 5. 確定済みのコピー仕様（重要・崩さない）

- **正式タイトル**: 「経営者、次期リーダーのための、Claude Code 実践セミナー」
  - ⚠️「実装入門」は旧版。**「実践セミナー」が正**。「実装」という engineer 臭い語は audience 向けには使わない
- **キー positioning**: 「AI に**使われる側**から、AI を**使う側**へ」（旧「使う側→実装する側」は廃止）
- **学べることのコア**: 「**何のツールを使うかじゃなくて、どう使うか**です」
- **日時**: 5/31 **(日)** ・ 11:00–13:00 ・ **2 時間**（「90 分」は誤り、全部「2 時間」に統一済み）
- **料金**: ¥5,000 / 先着 30 名 / Zoom（URL は申込後配布）
- **次回**: Vol.2 = 6/3 (火) 19:00–21:00

### 改行・言葉のルール（Takka が繰り返し指摘）
- 難しい言葉禁止: 「輪郭」「解像度」「実装感」等 → 「手応え」「判断の感覚」「自分でできる範囲」に置換済み
- 末尾「です/ます」孤立、対比構造、短述語孤立は意味改行（`<br>`）で対応
- 詳細は slide-deck skill の `RULES.md §8` と同じ思想

---

## 6. 残タスク（優先順）

### 6.1 画像生成（Codex GPT Image）— 今日の主目的、最優先
- **方針**: セクション背景テクスチャ + パーツ画像の両方（Takka 指示）
- 既存: `public/images/hero/cinematic_hero_bg.png`（D Hero 背景、GPT Image 2 生成済み、1.1MB）
- 参照スタイル: Instagram [@web.love.ed](https://www.instagram.com/web.love.ed) の cinematic 文字演出 / Adidas×FootLocker "Chile 20"
- **ワークフロー**: `codex exec` 経由 or GPT Image API。コミット `3933b99` で D Hero 背景を生成した実績あり（手順は要確認・再現）
- 候補:
  1. Hero 背景の経営者向け・editorial 版への差し替え/追加
  2. About / WhyThis / FinalCTA のセクション背景に薄い抽象テクスチャ
  3. 「AI が業務に乗る」概念ビジュアル 1-2 枚
- **注意**: 生成画像は必ず Web 用に圧縮（`sips -Z 1600 -s format jpeg -s formatOptions 85`）。PNG 巨大ファイル（過去 Takka.png が 89MB）は Vercel に上げない

### 6.2 本番公開前の必須項目
1. **申込フォーム URL 差し替え**: 全 Hero / FinalCTA / MobileStickyCTA の `FORM_URL = "https://forms.google.com/CCC-SEMINAR-VOL1"`（仮）→ 本物の Google Form URL
2. **VariantSwitcher を隠す**: `components/VariantSwitcher.tsx` を各 page から外す or 環境変数 gate
3. **OGP / メタ情報**: `app/layout.tsx` の metadata + OG 画像。SNS シェア時のタイトル・説明・画像
4. **法律ページ本文確定**: `/privacy` `/terms` `/contact`（現在 LegalPage 共通 + 仮文言。要 Takka 情報: 運営者名・所在地・キャンセルポリシー）

### 6.3 cinematic 強化（中期、roadmap 参照）
- `docs/cinematic_upgrade_roadmap.md` に Lenis + GSAP ScrollTrigger + SplitText の 5 本柱プランあり（+155KB / 2-3 週間規模）
- 今は Motion v12 のみで Hero の char reveal を実現済み。セクション見出しにも同様の reveal を展開すると統一感が出る

---

## 7. 重要ファイル

```
app/
├── page.tsx              # ★ 本番 = D 構成
├── a/page.tsx 〜 d/page.tsx  # 参考バリアント
├── privacy|terms|contact/page.tsx  # 法律ページ（仮）
├── layout.tsx            # metadata / フォント（OGP 追加はここ）
└── globals.css           # Tailwind v4 @theme（coral/sumi/cream）

components/
├── MobileStickyCTA.tsx   # モバイル下部固定 CTA
├── VariantSwitcher.tsx   # ★公開前に隠す
└── sections/
    ├── Hero.tsx          # 旧 default hero（video 版、現在 / では未使用）
    ├── TrustStrip / About / Outcomes / WhyThis / Speaker / Detail / FAQ / BeforeRegister / NextSession / FinalCTA / Footer / LegalPage  # 全 variant 共通
    ├── a/  HeroA, BeforeAfter, WhatYouLearn
    ├── b/  HeroB, PainPoints, Transformation, PriceJustification
    ├── c/  HeroCinematic
    └── d/  HeroCinematicV2   # ★本番 Hero

public/images/
├── kiyo.jpg / takka.jpg  # 講師写真（支給素材、1800x1200）
└── hero/cinematic_hero_bg.png  # D Hero 背景（GPT Image）
```

---

## 8. 関連リソース

- **設計ロードマップ**: `docs/cinematic_upgrade_roadmap.md`
- **兄弟リポ**: `cccampus/lp-intro`（紹介 LP、コンポーネント実装の参考）
- **スライド**: `cccampus/slide-seminar`（140 枚デック、別途完成）
- **参照 Reel**: [@web.love.ed](https://www.instagram.com/web.love.ed) / Reel DYNXJWPu12T / DXe3gX3sDaj（文字演出）
- **CCC ブランド**: coral `#d97757` / sumi `#373737` / cream `#faf9f5`（紫青ピンク金 禁止）
- **NG ワード**: 月10万 / 副業 / 主婦 / 学生 / Earn with / 人材プール / 即稼働 / 収益に変える

---

## 9. デプロイ運用

- **Vercel deploy は紀洋さん側**（Takka は main push まで）
- main 直 push 許容（2 人運用 + 非エンジニア前提、PR レビュー必須化なし）
- 現在の本番 URL: `https://lp-seminar-iota.vercel.app/`（push 後、紀洋さんの deploy で反映）

---

## 10. 開始時のおすすめ第一声

> lp-seminar は本番 `/` を D (cinematic V2) に確定済み。本文コピーは「実践セミナー」「使われる側→使う側」「2 時間」「5/31 日」で整合済み。次は (1) Codex GPT Image でセクション背景・パーツ画像を生成してリッチ化 (2) 申込フォーム URL 差し替え (3) VariantSwitcher を隠す (4) OGP/メタ — のどれを進めますか？画像生成が最優先タスクです。
