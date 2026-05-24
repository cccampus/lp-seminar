# CCC セミナー LP — Reel 準拠 デザイン仕様 v2（ダーク↔ライト・シネマティック）

**作成日**: 2026-05-25
**対象**: `cccampus/lp-seminar`（Next.js 16 / React 19 / Tailwind v4 / Motion + GSAP + Lenis）
**原典**: Instagram @web.love.ed Reel `DYNXJWPu12T`（= Adidas × Foot Locker "Chile 20", 2020 Awwwards）
**前提資料**: [`cinematic_upgrade_roadmap.md`](cinematic_upgrade_roadmap.md) / 親 [`docs/DESIGN.md`](../../../../docs/DESIGN.md) / [`docs/RULES.md`](../../../../docs/RULES.md)

> **この仕様の位置づけ**: 前回ロードマップは Chile 20 を「light premium B2B」に翻訳する判断をしたが、
> オーナー判断で「Reel の世界観にもっと寄せる」方向に改訂。ただし**明るさも残す**（= Chile 20 自身が
> 持つダーク↔ライトのリズムを採用する）。本書はその合意用ドラフト。

---

## 1. 原典の本質（フレーム実見による再分析）

Chile 20 の設計言語（f_005 / f_009 / f_011 / f_013 / f_020 を実見）:

1. **全編がスポットライトの当たる「ステージ」** — 暗い空間に単一光源、床反射、霞。被写体（製品）が主役
2. **中央オブジェクト・ショーケース** — スクロールで1点ずつ見せる。視線が散らない
3. **巨大リピートタイポ背景** — 「CHILE20 CHILE20」を画面いっぱいにタイル（特に白シーン）
4. **製品に重なる短句のみ** — 段落でなく 1 行コピー（"Lightweight insulated padding..."）
5. **グリッチ / RGB ずれのシーン転換**
6. **ダーク↔ライトの反転リズム** — 基本ダーク、カスタマイズだけ白背景
7. **極小・統一クローム** — 左上ロゴ / 右上 CTA / 下中央 SCROLL / 脚注。全シーン同じ
8. **単色アクセント** — 赤（CCC では coral に置換）

## 2. CCC への翻訳方針（3 原則）

| # | 原典 | CCC 版 |
|---|---|---|
| A | 赤 + 青照明の単色演出 | **coral 単色**に統一。青・紫・ピンク・金は使わない（ブランド厳守） |
| B | 製品ショーケース（短句のみ） | セミナー LP は情報必須 → **「ステージ演出は保ちつつ、必要な情報は読ませる」**。短句化できる所だけ短句に |
| C | 全編ダーク | **ダーク↔ライトのリズム**（原典準拠）。ドラマ＝ダーク、読ませる＝ライト。"明るさも残す" |

### ブランド既存ルールの扱い（明示）
- DESIGN.md「dark surface はページ2回まで」→ **本仕様で上書き**。ダークを"演出の主舞台"として複数回使う。ただし無制限ではなく §4 のリズム表で配分を固定する
- それ以外（Coral/Sumi/Cream のみ・禁止色・タイポ階層・anti-slop）は**全て厳守**

---

## 3. ビジュアル言語

### 3-1. カラー（既存トークンのまま、使い方を変える）
- **Sumi ステージ**: `#1f1f1f`（surface-dark）を主舞台に。純黒 `#000` は不可
- **Cream ライトシーン**: `#faf9f5` / `#f5f1e8`。原典の「白カスタマイズ画面」に相当
- **Coral 単色光源**: `#d97757` をスポットライト / アクセント / グリッチ色に。1 シーン1 アクセントが原則
- **床反射・霞・vignette**: Hero / FinalCTA で実装済みのレイヤーを共通部品化

### 3-2. タイポグラフィ
- **巨大背景リピートタイポ（新規・本仕様の核）**: `CLAUDE CODE` / `CAMPUS` / `CCC` 等を `text-[18-26cqw]` で薄く（`opacity 0.03-0.06`）タイル配置。ダークでは cream 薄、ライトでは sumi 薄。原典の「CHILE20 タイル」に相当
- **見出し**: Noto Serif JP 600。GSAP **chars reveal（mask なし）** でせり上げ。`expo.out` / 0.9s / stagger 0.026
- **本文**: Noto Sans JP。ライトシーンでのみ通常本文を許可。ダークシーンは短句中心
- **改行ルール（厳守・再発防止）**: `word-break: keep-all` + 意図的 `<br>` のみ。**SplitText の `mask:'lines'` は折り返しを固定化して不自然な改行を生むため禁止**。語中で割れる単語は `whitespace-nowrap` で保護

### 3-3. 共通クローム（全シーン統一・原典準拠）
原典の「左上ロゴ / 右上 CTA / 下中央 SCROLL / 脚注」を CCC 化して**全セクションで共通の枠**にする:
- 左上: `CCC` ロゴ or `Vol.01 / 2026.05.31`
- 右上: `申込みを見る`（常時 CTA、現 MobileStickyCTA と統合検討）
- 下中央: `SCROLL TO EXPLORE` インジケータ（Hero に既存）
- 各シーン四隅に細い coral hairline / eyebrow

### 3-4. モーション / トランジション
- **scroll-driven が基本**（Lenis + GSAP ScrollTrigger、導入済み）
- **スポットライト parallax**: 背景画像・光・巨大タイポを 2-3 層で速度差（Hero 実装済みパターンを横展開）
- **シーン転換 = coral グリッチ**: セクション境界で軽い RGB ずれ / 走査線（原典 f_013 の翻訳。coral のみ、0.3-0.5s、過剰にしない）
- **duration 0.6-1.2s / ease-out**（原典コツ⑥ + DESIGN.md ease）
- **reduced-motion 厳守**: Lenis OFF・アニメ即時最終状態（実装済み）

---

## 4. セクション別「シーン」設計 — ダーク↔ライトのリズム

「ドラマ＝ダーク / 読ませる＝ライト」で交互させ、原典のリズムを再現。**明るさも残す**。

| # | セクション | 面 | シーン演出 |
|---|---|---|---|
| 01 | **Hero** | 🌑 Dark | 実装済。stage + coral spotlight + 巨大 CLAUDE CODE タイポ + chars reveal + 床反射 |
| 02 | TrustStrip | ◐ Bridge | dark→light の橋渡し（実装済 bridge gradient）。ロゴ marquee |
| 03 | **About**（世界で何が） | 🌑 Dark | **Manifesto ステージ**（RULES §4 Gold Standard）。巨大背景タイポ + 短い断章 + ドロップキャップ。urgency をドラマで魅せる |
| 04 | **Outcomes**（どう使うか） | ☀️ Light | **白カスタマイズ画面の翻訳**。巨大 `どう使うか` タイポを cream にタイル、中央に要点 |
| 05 | WhyThis | ◐ Light | 編集誌グリッド維持。見出し chars reveal + 連番大型 |
| 06 | **Speaker** | 🌑 Dark | **講師2名を舞台中央スポットに寄せる**（原典の製品showcase翻訳）。背景巨大 `SPEAKERS` タイポ |
| 07 | Detail（開催情報） | ☀️ Light | 情報密度優先で読みやすく。進行ラインを coral で scrub 描画 |
| 08 | FAQ | ☀️ Light | 読みやすさ優先。質問を chars reveal |
| 09 | BeforeRegister | ☀️ Light | チェックリスト順次描画 |
| 10 | NextSession | 🌑 Dark | 次回告知をステージで。日付を大型表示 |
| 11 | **FinalCTA** | 🌑 Dark | 実装済（cinematic 背景画像 + coral 光）。締めのドラマ |
| 12 | Footer | 🌑 Dark | 巨大 `CLAUDE CODE CAMPUS` タイポを SplitText ドミノ reveal |

**リズム**: 🌑→◐→🌑→☀️→☀️→🌑→☀️☀️☀️→🌑→🌑→🌑
ダークの塊（Hero/About）とライトの塊（Outcomes〜BeforeRegister）が反転し合い、Speaker と FinalCTA でドラマを締める。

---

## 5. 実装フェーズ（proof-first）

| Phase | 内容 |
|---|---|
| **P0（本書）** | 仕様合意 ← いまここ |
| **P1 共通部品** | `StageScene`（dark stage 共通枠: spotlight/床/霞/grain/巨大タイポ/クローム）と `LightScene`（cream + 巨大タイポ）をコンポーネント化。`RevealHeading`（実装済）を統合 |
| **P2 先行プルーフ** | **1 セクション（About を Manifesto ダークステージ化）**を作り込んで合意確認 |
| **P3 展開** | リズム表に沿って全 12 セクションを dark/light シーンに再スキン。coral グリッチ転換を境界に |
| **P4 仕上げ** | 共通クローム統一 / バンドル・Lighthouse / reduced-motion / 320-1440 検証 / VariantSwitcher 非表示 |

---

## 6. 既決の固定ルール（再掲・厳守）
- 色は **Coral `#d97757` / Sumi `#1f1f1f` / Cream `#faf9f5`** のみ。青紫ピンク金・純黒 禁止
- **改行は keep-all + 意図的 `<br>`**。mask:'lines' reveal 禁止。語中分割は nowrap で保護
- コピーは「使われる側→使う側」「2 時間」「5/31(日)」「¥5,000」。NG ワード grep 毎回
- 経営者・実装ディレクター向けトーン（副業/稼ぐ系 禁止、煽らない）
- AI slop 回避（RULES.md §2 チェック）

---

## 7. 未決・要オーナー判断
1. **ダーク↔ライトの配分**（§4 リズム表）でよいか。Speaker をダークステージ化は OK か
2. **巨大背景タイポ**の文言（CLAUDE CODE / CAMPUS / CCC / どう使うか …）
3. **グリッチ転換**の強さ（控えめ / しっかり）。経営者向けに過剰にならない範囲
4. **共通クローム**で右上常時 CTA を出すか（現状は Hero/Sticky のみ）
5. P2 先行プルーフの対象（About 推奨。他候補あれば）
