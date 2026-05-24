# CCC セミナー 告知動画 絵コンテ（v1）

**用途**: SNS / LP 埋め込み用の告知動画（縦 9:16・1080×1920 想定、約 25–30 秒）
**世界観**: LP と同一のダーク・シネマティック（Chile 20 翻訳）。Coral / Sumi / Cream のみ
**作成**: 2026-05-25 / フレームは Krea gpt-image-2 で生成（縦 1024×1536）

> ナレーション/BGM は控えめ。文字は最小・大きく。各カットは 0.6–1.2s の ease-out で。
> NG: 数字の煽り・カウントダウン・青/紫、にぎやかな効果音。静かな緊張感で。

---

## ショットリスト

| # | 尺 | 画 | オンスクリーン文字 | 転換 |
|---|----|----|----|----|
| 01 | 0–3s | 暗転 → 空のダークステージに coral スポットが**灯る**（床反射・霞） | （なし→）`使われる側から、` | 黒からフェードイン |
| 02 | 3–5s | 同ステージ、光が強まる。中央へ寄る | `使う側へ。` | 文字 SplitText 風せり上がり |
| 03 | 5–9s | 企業の摩天楼/世界が動く（TrustStrip 背景系） | `世界は、もう動いている` / 小さく `Anthropic・Fortune 500` | coral グリッチ |
| 04 | 9–13s | **経営者の対比**（右=スポットで自信／左=影で落ちぶれ） | `見ているだけか、使う側か` | 暗転グリッチ |
| 05 | 13–17s | **成果物ショーケース**（laptop / スライド / 自動化が点灯） | `2 時間で、業務でつくる` | 1点ずつ点灯 |
| 06 | 17–20s | 講師2名がステージ中央へ寄る（シルエット可） | `実践してきた二人と` | スポット移動 |
| 07 | 20–23s | 開催情報のステージ | `2026.05.31 SUN ・ 2 時間 ・ ¥5,000` | フェード |
| 08 | 23–27s | coral の**入場ゲート**（光の扉が開く） | `席を確保する →` | 光が満ちて締め |

**締めロゴ**: 末尾 1–2s に `Claude Code Campus` ワードマーク（coral/cream）。

---

## フレーム生成プロンプト（gpt-image-2 / 縦 1024×1536）

共通サフィックス: `vertical cinematic film still, deep charcoal sumi-black stage, single warm coral spotlight, volumetric haze, glossy floor reflection, premium editorial, charcoal and coral only, NOT colorful, no blue no cyan no purple no gold, no text no logos no people（人物カットを除く）`

- **01**: empty dark stage, a coral spotlight igniting from above onto the floor
- **03**: towering corporate skyscrapers from below bathed in coral light（enterprise）
- **04**: two executives — right confident in coral spotlight, far-left dejected in shadow（人物可）
- **05**: a laptop + floating slide panels + glowing automation network showcased on stage
- **06**: two executive silhouettes converging toward center spotlight（人物シルエット）
- **08**: a doorway of warm coral light opening at center of a dark stage, inviting entry

> サンプル生成済み: `01`(sb_01) / `05`(sb_02) / `08`(sb_03)。残り（03/04/06）も同手順で生成可能。

---

## 編集メモ
- 04→05 の「停滞→生成」転換が山。グリッチ（coral のみ）でドラマを作る
- 文字は LP と同じ keep-all・意味改行。孤立行禁止
- 書き出し: 9:16（SNS）と 1:1（一部 SNS）の2版。LP 埋め込みは LP の Hero 内ではなく別枠（DESIGN: Hero 自動再生動画は禁止）
- 音: 環境音＋低い pad 程度。ナレーションは入れるなら 1–2 文のみ
