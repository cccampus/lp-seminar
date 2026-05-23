# CCC セミナー LP — シネマティック化ロードマップ

**作成日**: 2026-05-23
**対象**: `cccampus/lp-seminar` (Next.js 16 + React 19 + Tailwind v4 + Motion + Bun)
**ゴール**: Awwwards "Honors" レベル相当の B2B premium 表現
**参照**: Instagram [@web.love.ed Reel DYNXJWPu12T](https://www.instagram.com/reel/DYNXJWPu12T/) → [前回解析レポート](\\100.64.1.134\00_inbox\insta_research_20260523\DYNXJWPu12T\analysis_report.md)

---

## 0. 大前提と注意

### 参照源の現実
Reel 内で見せられていた **Adidas × Foot Locker "Chile 20"** は **Active Theory 制作 (2020 Awwwards Site of the Month)** で **Three.js + WebGL ベースの完全カスタム**。Next.js 製ではない。1:1 再現は無謀。

### CCC LP の到達点設定
**「Vercel / Linear / Stripe Press のトーンに翻訳した B2B premium」** を目指す。経営者・意思決定者が「軽い・速い・誠実」を信頼の signal として読み取れることを最優先。

### B2B 経営者向けで「逆効果」になるもの（やらない判断）
- 3D アバター講師 (Spline)
- 派手な WebGL シェーダー演出 (Unicorn Studio 過剰使用)
- カスタムマウスカーソル (モバイル無効・PC でも演出過剰)
- 1MB 超のバンドル肥大化（モバイル CWV 悪化 = 信頼喪失）

---

## 1. エグゼクティブサマリ

### 入れるもの（5本柱）
| ライブラリ | 役割 | 追加バンドル |
|---|---|---|
| **Motion v12** (既存) | UI ステート遷移、`whileInView`、`useScroll` | 0 (既存) |
| **Lenis 1.3+** | 慣性スムーズスクロール | ~5KB |
| **GSAP 3.13+** core | タイムライン、`useGSAP` | ~70KB |
| **GSAP ScrollTrigger** | pin / scrub / batch | +25KB |
| **GSAP SplitText** | cinematic 文字 reveal (2025/4 無料化) | +15KB |
| **View Transitions API** (ネイティブ) | ページ遷移 | 0 |
| **合計追加** | | **~155KB** |

### 入れないもの
- ❌ React Three Fiber / Three.js (+600KB / モバイル GPU 重い / B2B でテック臭強すぎ)
- ❌ Spline 3D 埋め込み (テックデモ臭)
- ❌ Unicorn Studio フル埋め込み (CCC トーンに合わず)
- ❌ Locomotive Scroll (Lenis 上位互換)
- ❌ Barba.js (App Router + View Transitions でカバー)
- ❌ カスタムマウスカーソル

### 結論一行
**「Lenis + GSAP ScrollTrigger + SplitText + 既存 Motion + View Transitions API の 5 本柱で、Chile 20 の cinematic premium の 80% を 2-3 週間・追加 155KB で到達」**

---

## 2. Reel の 7 つのコツ → CCC LP への翻訳

| Reel コツ | CCC LP での実装方針 |
|---|---|
| ① 参考 URL を Claude に渡して reverse engineer | Vercel / Linear / Stripe Press の Hero を参照 → Claude に「このトーンで CCC Hero を書き直して」と指示 |
| ② dark theme + 3D product showcase | CCC は light theme (cream) なので **逆: light premium**。3D は使わず巨大タイポ + parallax で代替 |
| ③ scroll-based animation | **Lenis + GSAP ScrollTrigger pin/scrub** で全 12 セクションに統一適用 |
| ④ 前景/背景の image layer = 疑似 3D depth | Speaker / Hero / FinalCTA で実装可能。Motion `useScroll` + `useTransform` だけで OK |
| ⑤ parallax で速度差 | 同上。要素ごとに `y: [0, -100]`, `y: [0, -200]` 等で 2-3 層構成 |
| ⑥ timing 0.6-1.2s + ease-out で premium feel | Motion / GSAP のデフォルト ease を統一ルール化。`globals.css` に CSS variable 化 |
| ⑦ ワンクリックデプロイ | 既存 Vercel CI/CD で OK |

---

## 3. CCC 12 セクション別 アップグレード案（3 段階）

各セクション「小（既存 Motion のみ）」「中（Lenis + GSAP 導入後）」「フル（R3F 等、推奨せず）」

### 3-1. Hero
- **小**: 巨大背景タイポ `CLAUDE CODE` を `text-[20cqw] opacity-5` で配置 → `useScroll`+`useTransform` で `y: [0, -200]` parallax。「SCROLL TO EXPLORE」インジケータ（Motion `animate-bounce`）
- **中**: GSAP SplitText でヘッドラインを `chars` 分割 → `mask:true` で coral マスク下から ease-out reveal (`stagger: 0.04, duration: 1.2`)。背景タイポを ScrollTrigger pin + scrub で横にスライド
- **フル**: R3F coral blob → **不採用**

### 3-2. TrustStrip
- **小**: Marquee CSS `@keyframes` 無限ループ + `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` で両端 fade
- **中**: GSAP `gsap.to(".trust-strip", {x: '-50%', duration: 30, repeat: -1, ease: 'none'})`、hover で `timeScale(0.3)` でスロー化
- **フル**: 不要

### 3-3. About
- **小**: 各カードに Motion `whileInView={{opacity:1, y:0}} initial={{opacity:0, y:40}} transition={{delay: i*0.1}}`
- **中**: ScrollTrigger で 1 枚ずつ pin → 0.6s で flip card 風展開（`rotateY` + `preserve-3d`）。`scrub: 1`
- **フル**: 不要

### 3-4. Outcomes
- **小**: Before → After に Motion `layoutId` で shared element 遷移
- **中**: GSAP timeline で「Before の文字が崩れる → After の文字が組み上がる」。RGB シフトは `text-shadow: 2px 0 cyan, -2px 0 #d97757` を `animate-pulse`
- **フル**: 不要

### 3-5. WhyThis
- **小**: 比較表で該当列を `whileHover={{scale:1.02, boxShadow:'0 20px 60px -10px rgba(217,119,87,0.3)'}}`
- **中**: ScrollTrigger pin で表全体 viewport 固定 → 行ごと `chars` reveal → 該当行を coral underline (`DrawSVG`、0.8s)
- **フル**: 不要

### 3-6. Speaker (Takka / Kiyo)
- **小**: 写真に Motion `whileHover={{scale:1.04}}` + coral glow (`box-shadow`)。写真の上下 `mask-image` fade
- **中**: ScrollTrigger で 2 講師写真を「**舞台中央に寄せる**」(`x: ['-30vw', 0]` & `['30vw', 0]`)。背景に巨大タイポ `SPEAKERS` を pin + reverse scroll
- **フル**: ❌ B2B 経営者向けで 3D アバターは絶対不採用

### 3-7. Detail
- **小**: タイムテーブル行 `whileInView` 順次フェード (`stagger: 0.05`)
- **中**: 縦 coral 進行ライン（DrawSVG）を scrub で描画。時間ブロックを SplitText `words` reveal
- **フル**: 不要

### 3-8. FAQ
- **小**: `<details>` 開閉、CSS `@property` で高さ補間
- **中**: Motion `AnimatePresence` + `layout` 開閉。質問文を `SplitText words` で hover underline
- **フル**: 不要

### 3-9. BeforeRegister
- **小**: チェックリスト Motion `whileInView` 順次描画
- **中**: SVG チェックマークを `DrawSVG` 線描画 (`stagger: 0.1, duration: 0.5`)
- **フル**: 不要

### 3-10. NextSession
- **小**: カウントダウン Motion 動的更新
- **中**: ScrollTrigger pin で「日付数字が桁ごと切り替わる」slot-machine 風（`SplitText chars` + `y: -100%` 循環）
- **フル**: 不要

### 3-11. FinalCTA
- **小**: Motion `whileHover={{scale:1.05}}`, `whileTap={{scale:0.95}}`, coral glow pulse
- **中**: 「**magnetic cursor**」（GSAP で cursor 距離に応じてボタンが 0.3 倍追従）。ボタン背後に coral ripple SVG loop
- **フル**: 不要

### 3-12. Footer
- **小**: 巨大タイポ `CLAUDE CODE CAMPUS` を fixed 配置、ScrollTrigger で「画面に入った瞬間 SplitText chars でドミノ倒し reveal」
- **中**: 上記 + 各 link を hover で `mask reveal`（黒幕がスライドして coral 下線出現）
- **フル**: 不要

---

## 4. 段階別ロードマップ

### Phase 1 — 既存 Motion だけで底上げ（追加ライブラリ 0）
**所要: 3-5 人日 / 追加バンドル: 0KB**

| Day | タスク |
|---|---|
| 1 | 全 12 section に `useScroll` + `useTransform` で parallax。Hero の SCROLL インジケータ |
| 2 | TrustStrip marquee、About / Outcomes に `whileInView` stagger、FAQ `AnimatePresence` |
| 3 | Speaker hover glow、FinalCTA pulse、Footer 巨大タイポ |
| 4 | Variant A / B 微調整、モバイル動作確認 |
| 5 (予備) | Lighthouse mobile 90+、`prefers-reduced-motion` 対応 |

**Done definition**: 既存比較で「明らかにリッチだが速度落ちない」

### Phase 2 — Lenis + GSAP 統合
**所要: 7-10 人日 / 追加バンドル: ~155KB**

| Day | タスク |
|---|---|
| 1 | `bun add lenis gsap @gsap/react`。`<LenisProvider>` を `layout.tsx` に。`gsap.registerPlugin(ScrollTrigger)` モジュールトップ |
| 2 | Lenis + GSAP ticker 同期 (`lenis.on('scroll', ScrollTrigger.update)`)。`prefers-reduced-motion` 分岐 |
| 3-4 | Hero SplitText `mask` reveal、巨大背景タイポ pin + scrub |
| 5-6 | Speaker 講師寄せアニメ、Detail 進行ライン DrawSVG |
| 7 | FAQ / About / WhyThis 強化 |
| 8 | View Transitions API (`next.config viewTransition: true` + `<Link transitionTypes>`) を `/`, `/a`, `/b` 間で適用 |
| 9 | パフォーマンス + バンドル削減（GSAP プラグインを sub-route スコープに dynamic import） |
| 10 (予備) | Safari iOS / Chrome Android で微調整 |

**Done definition**: Awwwards "Honors" レベル ≒ Vercel / Linear トーン

### Phase 3 — R3F / Spline（**やらない判断がデフォルト**）
ユーザーテストで「Phase 2 後さらにリッチさが必要」が定量的に出た場合のみ。  
**Hero only** に限定して R3F coral blob（drei `<MeshDistortMaterial>`） + `dynamic({ssr:false})` でモバイル分岐。

---

## 5. Next.js 16 でハマる落とし穴 + 回避策

### 5-1. Turbopack デフォルト化 + Three.js
- 問題: `three` add-on の CommonJS が Turbopack で ESM 解決失敗
- 回避: `next.config.ts` に `transpilePackages: ['three']`。**R3F v9 = React 19 ペア**厳守

### 5-2. Lenis + `position: sticky`
- Lenis は sticky を壊さない（Locomotive と違って）。Tailwind `sticky` クラス継続使用可
- macOS Safari pre-M1 で `position: fixed` ラグ問題あり → MobileStickyCTA は `sticky` 採用

### 5-3. GSAP ScrollTrigger + React Strict Mode で 2 回実行
- 必ず `useGSAP({scope: containerRef})` でラップ、`useEffect` 不使用
- `gsap.registerPlugin(ScrollTrigger)` はモジュールトップに（コンポーネント内だと "Plugin already registered" 警告）
- 初回ロード後に `ScrollTrigger.refresh()` 1 回呼ぶ（画像 lazy load 後の位置ズレ対策）

### 5-4. View Transitions API ブラウザ対応
- Chromium / Safari 18 OK、Firefox は flag (2026/3 時点)
- 対応率 ~78% → `@supports (view-transition-name: x)` で分岐フォールバック
- Next.js 16.2 `viewTransition: true` は **experimental**、本番投入前に release notes 確認

### 5-5. Motion v12 と GSAP 同一要素併用
- 同じ DOM の transform を奪い合うと壊れる → **要素単位で担当を分ける**
- 例: カードコンテナは GSAP pin、内部 child は Motion `whileHover`

### 5-6. Hydration mismatch (`window` 参照)
- Lenis / GSAP / R3F すべて `window` 必須 → 必ず `'use client'`
- もしくは `dynamic(() => import('./Hero'), {ssr: false})` でクライアント限定

### 5-7. バンドル肥大化対策
- GSAP は `import { gsap } from 'gsap'` で core 全部入る → 明示的に `gsap/gsap-core` + plugins 個別 import
- View Transitions / Spline / R3F は `dynamic(..., {ssr:false})` でルート単位 lazy

### 5-8. モバイル GPU 負荷
- `transform: translate3d` / `will-change: transform` 使いすぎで GPU メモリ食う → **scroll-driven 要素は最大 10 個まで**目安
- `prefers-reduced-motion: reduce` で Lenis (`new Lenis({autoRaf: false})`) と GSAP (`ScrollTrigger.config({autoRefreshEvents: 'none'})`) を両方無効化分岐

### 5-9. Tailwind v4 競合
- なし。GSAP / Lenis / Motion は inline style or transform 直接書くので Tailwind class と衝突せず
- ただし Tailwind `transition-*` + Motion `transition` props 同要素は競合 → アニメ要素から Tailwind transition 系 class 外す

---

## 6. 学習リソース

### 公式・一次ソース
- [Next.js 16.2 release notes](https://nextjs.org/blog/next-16-2)
- [Next.js View Transitions config](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)
- [Next.js View Transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- [Motion v12 upgrade guide](https://motion.dev/docs/react-upgrade-guide)
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations)
- [GSAP React guide](https://gsap.com/resources/React/)
- [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- [next-view-transitions (shuding)](https://github.com/shuding/next-view-transitions)

### チュートリアル
- [Smooth Scrolling in Next.js with Lenis & GSAP (2026)](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — Lenis 1.3 + GSAP 3.12 + Next 15/16 App Router 検証済
- [Rebuild an Awwwards Landing page (Olivier Larose)](https://blog.olivierlarose.com/tutorials/awwwards-landing-page)
- [Optimizing GSAP in Next.js 15 (Thomas Augot)](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [SplitText to MorphSVG: 5 Creative Demos (Codrops 2025/5)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)

### インスピレーション（CCC トーン参考）
- [Vercel](https://vercel.com) — light premium B2B の代表
- [Linear](https://linear.app) — タイポ + minimal animation
- [Stripe Press](https://press.stripe.com) — 編集デザインの極み
- [Cursor](https://cursor.com) — AI 製品 LP のスタンダード
- [Resend](https://resend.com) — Next.js 製ハイエンド LP

---

## 7. 着手チェックリスト

### Phase 1 着手前に決めること
- [ ] **どの variant をベースに進めるか**（default / a / b）
- [ ] **対象セクションの優先順位**（Hero 単独で先行検証 → 全 12 展開、推奨）
- [ ] **モバイル / デスクトップどちらを優先するか**（CCC = モバイル優先）

### Phase 1 完了基準
- [ ] 全 12 section に Motion `whileInView` 適用済み
- [ ] Lighthouse mobile スコア 90+ 維持
- [ ] `prefers-reduced-motion` 分岐実装
- [ ] Hero に「SCROLL TO EXPLORE」インジケータ

### Phase 2 着手前に決めること
- [ ] **GSAP ライセンス確認**（2025/4 全プラグイン無料化済、商用 OK）
- [ ] **Lenis 導入位置**（`layout.tsx` でグローバル、ただし `prefers-reduced-motion` 分岐必須）
- [ ] **View Transitions API 採用範囲**（`/`, `/a`, `/b` 間限定 or 全ページ）

### Phase 2 完了基準
- [ ] Hero SplitText `mask` reveal が 1.2s で完了
- [ ] Speaker 講師寄せアニメが scroll で動作
- [ ] Lighthouse mobile スコア 85+ 維持（バンドル増加分の許容）
- [ ] Variant 切替で View Transitions が動作

---

## 8. CCC ならではの判断軸（参考にしたこと）

- **業務実装軸**（副業煽り NG）→ 派手すぎる演出は信頼喪失
- **B2B 経営者・意思決定者向け**→ 「軽い・速い・誠実」が premium signal
- **モバイル優先**→ GPU 負荷の重い WebGL は除外
- **既存 12 セクション構造を維持**→ フルリビルド禁止、追加・差し替えで対応
- **Vercel デプロイ前提**→ Cloudflare Pages 想定の案は除外

---

## 9. 関連ファイル

- `app/page.tsx` — メインエントリ（12 セクション統合）
- `app/a/page.tsx` — Variant A (editorial 純化)
- `app/b/page.tsx` — Variant B (実装証拠押し)
- `components/sections/*.tsx` — 12 セクション
- `app/globals.css` — Tailwind v4 `@theme` (coral / sumi / cream)
- `app/layout.tsx` — ルートレイアウト（Lenis Provider 追加候補）
- `next.config.ts` — `transpilePackages` / `experimental.viewTransition` 追加候補
- `CLAUDE.md` — プロジェクト固有ルール（NG ワード grep など）

---

## 10. 次のアクション提案

1. **Phase 1 着手**: Hero 単独で先行検証（1 日）→ 良ければ全 12 展開
2. **Reel 解析の追加**: @web.love.ed の他 Reel 3-5 本を同じワークフローで解析 → 共通 tips を教材化
3. **CCC 講座コンテンツ化**: 本ロードマップをベースに「Claude × cinematic LP を 1 時間で」特別講座（CCC 収益化候補）

---

**前回解析レポート**: [\\100.64.1.134\00_inbox\insta_research_20260523\DYNXJWPu12T\analysis_report.md](\\100.64.1.134\00_inbox\insta_research_20260523\DYNXJWPu12T\analysis_report.md)
