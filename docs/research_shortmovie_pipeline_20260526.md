# 講師2人 30秒ショートムービー 制作パイプライン調査

> ## ★★ 確定シナリオ（2026-05-26）：12カット / 30秒（15秒×2本連結）
> 実顔（Krea NB2＋kiyo.jpg/takka.jpg、顔同一性は検証済み）。各編に「覚醒の出会い」山場(K3/T3)。
> **世界観を分離**：Kiyo＝**経営者（店舗経営）**／Takka＝**平凡な会社員→AIクリエイター**。両者をはっきり差別化する。
> **Kiyo編＝経営者（15秒・6カット）**: K1 **紙の山に埋もれて疲弊する経営者**（集客・広告・事務に忙殺）※`kf_c1_kiyo_v1.png` を採用 / K2 やることが多すぎ手が回らない焦り / **K3 覚醒＝巨大なClaude Codeの光のモノリス出現・畏怖（山場）** ※`kf_k3_kiyo_awaken_v1` / K4 半信半疑で触り始める / K5 集客・広告・書類が次々片付く / K6 経営判断に集中できる余裕
> **Takka編＝平凡な会社員（15秒・6カット）**: T1 **ありふれたオフィスの平凡な会社員**（AIも知らない普通の日常・Kiyoの紙の山とは別の絵にする） / T2「AIで何ができるかも知らない」戸惑い / **T3 覚醒＝AIの啓示（山場）** / T4 AIで映像・LP・記事を作り始め没頭する夜 / T5 作品が受賞・メディアに / T6「作る側」に立つ自信・次世代に教える
> ※顔参照: Kiyo=kiyo.jpg / Takka=takka.jpg。kf_c1_kiyo は Kiyo K1 として確定採用。
> テロップは生成後に後乗せ。クリップは Seedance 15秒×2 → ffmpeg連結30秒。
>
> ## ★ Takka 確定方針（2026-05-26・これを採用）
> **絵コンテ駆動 × 顔参照マルチリファレンス**
> 1. **GPT Image 2 でイメージコンテ（絵コンテ）を画像生成**。講師の顔写真（`public/images/takka.jpg` / `kiyo.jpg`）をベースに各カットのキーフレームを 9:16 で作る
> 2. 絵コンテを **Seedance 2.0 のマルチリファレンス**に投入。「Takkaの顔＋Takkaの絵コンテ」「Kiyoの顔＋Kiyoの絵コンテ」を渡し、各シーンを細かいプロンプトで i2v 生成
> 3. 生成後に**テロップ**を載せて仕上げる（Claude Code で自動化、人は承認のみ）
>
> **GPT Image 2 ストーリーボードの作り方（Takka 参考画像 2026-05-26）**: 各カットを**注釈付きの多分割グリッド**で1枚に生成する。注釈レジェンド＝**赤:体/アクション動線・青:カメラ移動・緑:フレーミング/構図・橙:ライティング・黄:VFX/エネルギー・黒:レンズ/ラベル**。左に**キャラ参照1枚**＋右に**12コマのアノテーション付き絵コンテ**。これを Seedance 2.0 のマルチリファレンスに「顔写真＋絵コンテ」で投入。我々は実写の講師なので、キャラ参照=顔写真(takka.jpg/kiyo.jpg)、絵コンテはフォトリアル寄りのトーンで生成。
> - **リスク（要テスト）**: Seedance マルチリファレンスは参照同士（顔とコンテのアングル/構図）が矛盾すると破綻しやすい（NB2知見と同様）→ **まず1カットだけ生成して顔の同一性・破綻チェック**してから量産
>
> **ツール経路（Takka 指定 2026-05-26）**:
> - **GPT Image 2 → Codex CLI**（`codex exec`、キー不要・codexログイン済み）= 絵コンテ・概念静止画
> - **Nano Banana 2 → Krea API**（`api.krea.ai/generate/image/google/nano-banana-2`、要 `KREA_API_KEY`）= 顔参照の高精度・編集
> - **Seedance 2.0 → Krea API**（要 `KREA_API_KEY`）= 動画化
> - ※ この Windows セッションは `KREA_API_KEY` 未設定。Krea経路（NB2/Seedance）の実行時にキー設定が必要

- **作成日**: 2026-05-26
- **対象**: CCC（Claude Code Campus）セミナーLP 用 講師2人の30秒ショートストーリー
- **掛け合わせツール**: GPT Image 2（OpenAI）× Seedance 2.0（ByteDance / Dreamina）× Claude Code（オーケストレーション）
- **目的**: 最も効率的・低コストな制作パイプラインの推奨構成

---

## 3行サマリ（推奨パイプライン）

1. **GPT Image 2 で各カットのキーフレーム（始点画像）を生成** → 講師の顔の同一性を保ったまま縦動画（9:16）用に複数カット分の静止画を作る。
2. **Seedance 2.0 の image-to-video（first frame）で 1カット = 1ショットの動画を生成**し、必要なら **video-extend（last-frame チェイン）で連結**して30秒に到達させる。Seedance はマルチショット・音声同期がネイティブなので、編集工数を最小化できる。
3. **Claude Code でプロンプト生成 → 各API呼び出し → temp/ 保存 → ffmpeg 連結までをスクリプト自動化**。人間は「プロンプト承認」と「成果物チェック」だけ行う。

> 結論: **GPT Image 2（低/中画質）+ Seedance 2.0（720p）+ Claude Code 自動連結**が最安・最速。講師2人分の30秒動画 1本あたり **概算 $3〜$8 程度**（後述の試算参照）。

---

## 1. GPT Image 2 → Seedance 2.0 の現実的ワークフロー（2026年時点）

### 全体フロー

```
[脚本/絵コンテ]
   ↓ Claude Code がカット割り＆プロンプト生成
[GPT Image 2] 各カットの始点キーフレーム（9:16, 講師の顔）を生成
   ↓ (顔の同一性は同一参照画像＋プロンプト固定で担保)
[Seedance 2.0 i2v] 始点画像 + プロンプトで 1ショット動画(4〜15秒)を生成
   ↓ 30秒に足りなければ
[Seedance 2.0 Video-Extend] 直前クリップの最終フレームを起点に次セグメント生成（last-frame チェイン）
   ↓
[ffmpeg] 全クリップを連結 → 30秒の1本に
```

### 尺の作り方（30秒の刻み方）— 2案

**案A: マルチショット1回生成（最小コスト・最小工数）**
Seedance 2.0 は **1回の生成で 4〜15秒・複数ショット（自動カット割り）+ 同期音声**を出力できる（公式: multi-shot automatic storyboard、synchronized audio）。
→ 30秒は1回で出せない（**最大15秒**）ため、**15秒 × 2回**生成して ffmpeg で連結するのが最も安く単純。講師2人なら「講師A 15秒 + 講師B 15秒」で自然に30秒構成にできる。

**案B: 短尺クリップを last-frame チェインで連結（連続性重視）**
1本のカメラが流れるような連続ショートにしたい場合は、Seedance 2.0 **Video-Extend** を使う。直前クリップの最終フレームを起点に次の数秒を生成し、視覚的連続性を保ったまま 30s・60s と伸ばせる（公式機能。「chain multiple 15-second clips together」）。
→ つなぎ目は自然だが、生成回数が増えコスト増。

**推奨: 案A（15秒×2）。** 講師2人＝2シーンという構成と相性がよく、各15秒は1回のマルチショット生成で完結するため呼び出し回数・コストが最小。連続感が欲しい箇所だけ案Bを併用。

### 重要な制約・確認事項（公式裏取り済み）

| 項目 | 内容 | 信頼度 |
|---|---|---|
| Seedance 2.0 最大尺 | **4〜15秒**（30秒は1回では不可。連結が必須） | 公式（fal / seed.bytedance.com） |
| Seedance 2.0 解像度 | プラットフォームによる。**fal/Replicate は最大720p**（480p/720p）。一部サードパーティは「up to 2K」表記あり ※2K提供は要確認 | 公式（fal: "Up to 720p (HD)"）／2Kは※未確認 |
| 音声同期 | **同期音声生成がネイティブ・追加料金なし**（環境音/SE/セリフ+自動リップシンク） | 公式（fal: "Synced audio generation at no extra price"） |
| マルチショット | **1生成で複数ショット+自動カット割り**をネイティブ対応 | 公式（seed.bytedance.com） |
| image-to-video | **first frame（始点画像）対応**。**last_image（終点画像）指定も可** | 公式（Replicate: "first frame" / "specify a last frame image"） |
| 入力モダリティ | text / image / audio / video（最大12参照） | 公式（seed.bytedance.com: "unified multimodal audio-video joint generation"） |
| アスペクト比 | 21:9, 16:9, 4:3, 1:1, 3:4, **9:16**（縦動画OK） | 公式（fal） |

> **注意**: 公式 BytePlus ModelArk ドキュメント（docs.byteplus.com）は JS レンダリングのため WebFetch で本文取得できず（空応答）。解像度の「2K対応」可否は**ネイティブ最大は720p（fal/Replicate基準）と判断**し、2K表記はサードパーティ情報のため ※未確認 とする。実利用前に使用プラットフォームの解像度上限を要確認。

---

## 2. API料金比較（公式裏取り）

### GPT Image 2（OpenAI）

**トークン課金**（公式 openai.com/api/pricing）:

| モデル | 画像入力 | キャッシュ入力 | 画像出力 |
|---|---|---|---|
| **gpt-image-2** | $8.00 / 1M tok | $2.00 / 1M tok | **$30.00 / 1M tok** |
| gpt-image-1.5 | $8.00 / 1M | $2.00 / 1M | $32.00 / 1M |
| gpt-image-1-mini | $2.50 / 1M | $0.25 / 1M | $8.00 / 1M |

**1枚あたり実効コスト**（画質×解像度別。出力トークンから換算）:

| 画質 | 1024×1024（正方） | 1024×1536 / 1536×1024（縦/横） |
|---|---|---|
| Low | **$0.005** | **$0.005** |
| Medium | $0.053 | $0.041 |
| High | $0.211 | $0.165 |

- 縦動画（9:16）の始点画像は **1024×1536（縦）** を使う。
- **最安は Low ($0.005/枚)**。ただし顔の同一性・破綻リスクを考えると、**講師の顔が映る重要カットは Medium ($0.041)**、背景・引きカットは Low で十分。

> 信頼度: トークン単価は**公式**（openai.com/api/pricing で gpt-image-2 を確認）。per-image 換算値はサードパーティ計算機（costgoat）由来で**公式トークン式と整合**。正確な見積りは OpenAI 公式の画像生成カリキュレータ（platform.openai.com）で確定すること。
> 注意: 旧 **gpt-image-1 は 2026-10-23 に廃止予定**。新規実装は **gpt-image-2**（現行フラッグシップ）を使う。

### Seedance 2.0（ByteDance）

**トークン課金式**（OpenRouter 経由・公式式）:
```
tokens = (出力動画の高さ × 幅 × 尺(秒) × 24fps) / 1024
単価 = $7 / 1M tokens（"from $7/M tokens"）
```

**この式で実効コストを計算**（検証済み）:

| 解像度 | 1秒あたり | 5秒 | 15秒 |
|---|---|---|---|
| **480p (854×480)** | 約 **$0.067/s** | $0.34 | $1.01 |
| **720p (1280×720)** | 約 **$0.151/s** | $0.76 | $2.27 |

> 計算根拠（720p/5s）: (1280×720×5×24)/1024 = 108,000 tok × $7/1M = **$0.756**。
> サードパーティ（NxCode 等）の「720p ≈ $0.15/s、Pro 5秒 = $0.15〜$0.76」表記とも整合。
> **音声同期は追加料金なし**（公式）。

- 提供チャネル: **BytePlus ModelArk（国際）/ Volcengine（中国）** が公式。**fal.ai / Replicate / OpenRouter** がOpenAI互換の使いやすいAPIを提供（※サードパーティ経由は上乗せの可能性あり、実価格は各社ページ要確認）。
- Dreamina（消費者向けWeb UI）は**公式APIなし**。プログラム自動化には BytePlus か fal/Replicate を使う。

> 信頼度: トークン式と$7/M単価は OpenRouter（準公式アグリゲータ・実課金ベース）。秒単価はこの式から算出（**信頼度高**）。公式 BytePlus 価格ページは取得不可のため、最終発注前に docs.byteplus.com で要確認。

### 最安構成の結論

- **解像度**: 始点画像 = GPT Image 2 **Low/Medium（1024×1536 縦）**、動画 = Seedance **720p**（480pはLPの見栄えで非推奨だが、コスト最優先なら480pで約半額）。
- **尺の刻み**: **15秒 × 2本**（講師A/B）でマルチショット1回ずつ → ffmpeg連結。チェイン多用は避ける（呼び出し回数=コスト）。
- **音声**: Seedance のネイティブ同期音声を使えば**追加コスト0**でBGM/SE/セリフが付く（別途ElevenLabs等を使わなくてよい＝最安）。

---

## 3. Claude Code を使った自動化（実例・勘所）

### 参考実装: `claude-code-video-toolkit`（digitalsamba / GitHub）

Claude Code を「ディレクター」として、画像生成→動画生成→連結を自律実行する構成が実在する。

- **構成**: `.claude/skills/` に各APIのスキルを置く（flux2=画像、ltx2=動画i2v、ffmpeg=連結、elevenlabs=音声 等）。Claude Code がそれらを呼び分ける。
- **ライフサイクル管理**: planning → assets → review → audio → editing → rendering → complete のフェーズを `project.json` で追跡。各プロジェクトの `CLAUDE.md` がセッション再開時の文脈を与える（**CCCの既存運用と相性◎**）。
- **連結**: 個別クリップを Python ツール（例 `*.py`）で生成 → **ffmpeg の concat で最終連結**（concatファイルにクリップパスを列挙 → `ffmpeg -f concat`）。

### CCC向けの自動化スクリプト設計（勘所）

```
lp-seminar/tools/shortmovie/
├── gen_keyframes.py   # GPT Image 2 (v1/images/generations) を叩いて temp/ に始点画像保存
├── gen_clips.py       # Seedance 2.0 (submit→poll→download) で i2v 動画生成
├── concat.py          # ffmpeg -f concat で15秒×2を30秒に連結
└── prompts.yaml       # カット別プロンプト（Claude Code が生成・編集）
```

**勘所（lessons.md の教訓を反映）**:
1. **Seedance API は submit→poll→download の非同期**（30〜120秒/本）。スクリプトはポーリング必須。Claude Code に「完了待ちで sleep ループせず、ジョブIDを保存して後でpoll」させる。
2. **生成画像/動画は必ず `temp/` に保存** → ユーザー確認後に assets へ（CCC安全ルール／lessons.md準拠。本番へ直接投入しない）。
3. **顔の同一性**: GPT Image 2 で講師の参照写真を image input に渡し、全カットで同一参照＋プロンプト固定。アングルが矛盾する参照を同時に渡さない（NB2の教訓と同様）。
4. **APIキー**は `.env` 管理。Claude Code はキー値を会話に出さない。
5. **コスト上限ガード**: スクリプトに「1実行あたり最大生成回数」を入れ、暴走課金を防ぐ。
6. ffmpeg連結時は**メディア上書き禁止**。出力は `c01_v1.mp4` → 連結結果は別名（`shortmovie_v1.mp4`）。

> 信頼度: 自動化アーキテクチャはサードパーティ実装（GitHub）由来。Claude Code が REST API を直接叩ける点・ffmpeg concat の手法は一般的で確実。※具体スクリプトはCCC側で新規実装が必要。

---

## 4. 30秒に必要な素材量とコスト試算

### 素材量の目安（講師2人・30秒・案A: 15秒×2）

| 項目 | 数量 | 備考 |
|---|---|---|
| キーフレーム（始点画像） | **2〜4枚** | 講師A始点1 + 講師B始点1（最小）。各シーンにカット感を足すなら+各1枚 |
| Seedance i2v 呼び出し | **2回**（各15秒） | マルチショットで各15秒を1回生成。1回で複数ショート内カット込み |
| ffmpeg 連結 | 1回 | 2クリップ→30秒1本 |
| 音声 | 0回（追加） | Seedanceネイティブ同期音声でカバー |

### コスト試算（1本=30秒、講師2人）

**最安構成（画像Low + 720p動画）**:
| 工程 | 単価 | 数量 | 小計 |
|---|---|---|---|
| GPT Image 2 始点画像（Low, 1024×1536） | $0.005 | 2枚 | $0.01 |
| Seedance 2.0 720p i2v | $0.151/s × 15s = $2.27 | 2本 | $4.54 |
| ffmpeg連結 | $0（ローカル） | 1 | $0 |
| **合計** | | | **約 $4.5** |

**バランス構成（画像Medium 4枚 + 720p動画）**:
| 工程 | 単価 | 数量 | 小計 |
|---|---|---|---|
| GPT Image 2 始点画像（Medium, 縦） | $0.041 | 4枚 | $0.16 |
| Seedance 2.0 720p i2v 15s | $2.27 | 2本 | $4.54 |
| **合計** | | | **約 $4.7** |

**超最安（480p動画）**: 動画 $1.01×2 = $2.02 + 画像 $0.01 ≒ **約 $2.0**（ただしLP掲載品質としては720p推奨）。

> 注: 試行錯誤（リテイク）を見込み、**実運用では上記の2〜3倍（$10〜$15/本）**を予算化するのが現実的。Seedanceは1本$2前後のため、満足いくまで作り直しても安価。

### 推奨: コスト×品質の最適点

- **LP本番**: GPT Image 2 **Medium（顔カット）/ Low（背景）** + Seedance **720p / 15秒×2** + ネイティブ音声 = **1本 約$4.7、リテイク込みで$10前後**。
- リテイクは Seedance 側を回す（画像は安いので使い回し可）。

---

## 出典（信頼度明記）

**公式**
- OpenAI API Pricing（gpt-image-2 トークン単価）: https://openai.com/api/pricing/ ／ https://developers.openai.com/api/docs/pricing
- GPT Image 2 モデル仕様: https://developers.openai.com/api/docs/models/gpt-image-2
- Seedance 2.0 公式（ByteDance Seed・マルチモーダル/マルチショット）: https://seed.bytedance.com/en/seedance2_0
- Seedance 2.0 on fal（解像度720p・尺4〜15秒・音声同期無料・アスペクト比）: https://fal.ai/seedance-2.0
- Seedance 2.0 on Replicate（first/last frame i2v）: https://replicate.com/bytedance/seedance-2.0
- BytePlus ModelArk 価格/APIリファレンス（※WebFetch取得不可・本文未確認）: https://docs.byteplus.com/en/docs/ModelArk/1544106 ／ https://docs.byteplus.com/en/docs/ModelArk/1520757

**準公式**
- OpenRouter Seedance 2.0（トークン式 (H×W×尺×24)/1024・$7/M tokens）: https://openrouter.ai/bytedance/seedance-2.0

**サードパーティ（※価格・仕様は要公式裏取り）**
- GPT Image 2 per-image 換算（公式トークン式と整合）: https://costgoat.com/pricing/openai-images
- Seedance 2.0 API ガイド（秒単価の目安）※未確認: https://www.nxcode.io/resources/news/seedance-2-0-api-guide-pricing-setup-2026
- Seedance 2.0 Video-Extend（last-frame チェインで30s+）: https://wavespeed.ai/models/bytedance/seedance-2.0/video-extend ／ https://www.opus.pro/blog/extend-edit-existing-videos-seedance
- Claude Code 動画自動化トーキット（アーキテクチャ参考）: https://github.com/digitalsamba/claude-code-video-toolkit

---

## 未確認・要フォロー事項

1. **Seedance 2.0 のネイティブ2K提供可否** — fal/Replicateは720p上限。2K表記はサードパーティのみ。BytePlus公式ページ取得不可のため未確定。実発注前に使用プラットフォームで要確認。
2. **BytePlus 公式の正確な秒単価** — ドキュメントがJSレンダリングで取得できず。OpenRouterのトークン式で代替算出（信頼度高だが公式値の最終確認推奨）。
3. **講師2人の顔の同一性** — GPT Image 2 の image input での顔保持精度は実テスト必須（lessons.md: AI生成顔の破綻チェック5項目を適用）。
