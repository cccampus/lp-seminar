# cccampus/lp-seminar — Claude Code 作業ガイド

Claude Code Campus 主催の**公開セミナー単発告知 LP**。本番運用中。

## URL構成 (2026-05-28 確定)

**1 main branch で 2 LP を同居運用** (`/` と `/start`)。決済・メール・リマインダーは完全に同一コードベース。

| URL | 案 | 訴求 | 対象 |
|---|---|---|---|
| https://ccc-seminar.vercel.app/ | A案 | ベネフィット型「あなたが寝ている間に、AIが社員5人分の仕事を終えている」 | 経営者ど真ん中・社員数人〜10名以上 |
| https://ccc-seminar.vercel.app/start | C案 | 物語型「半年前、私もAIを使えませんでした。いま、社員を雇わずに事業が伸びています」 | 副業・サラリーマン・AI初心者 |

両方とも SSO 認証なし (production deploy)。

## 100体実LPペルソナテスト結果 (2026-05-28)

| Segment | 体数 | A | C | Top |
|---|---|---|---|---|
| 一人法人代表 | 60 | 29 | 30 | C 僅差 (実質互角) |
| 社員数人規模 | 25 | 23 | 2 | **A圧勝 92%** |
| 10名以上 | 10 | 10 | 0 | **A完全圧勝** |
| サラリーマン副業 | 5 | 0 | 5 | **C完全圧勝** |
| **計** | **100** | **62** | **37** | **A圧勝 62%** |

C案の「社員雇わずに」「ひとり」は社員数人以上規模で**対象外シグナル**になり離脱誘発。
詳細: `docs/20260528_実LP100体比較テスト結果_v1.md` (作成予定)

## 重要事項

- たっかさん(@takkaver2)と共同管理。GitHub Org `cccampus` 配下
- main直push許容、PRレビュー必須化なし(2人運用＋非エンジニア前提)
- メタディスクリプションから **CCC 名称完全除去済**(「Claude Code 実践セミナー」軸)
- Vercel project は `cc-seminar` 1個に統一(cc-seminar-scale は A案バリアント別project、不要なので削除予定)

## スタック

Next.js 16 (App Router) / React 19 / Tailwind v4 / Motion / Bun
**Stripe SDK 22.1.1 厳密固定** (`^22.1.1` だと local/Vercel で型乖離してビルド失敗、`package.json` で caret 外す)

## 開発コマンド

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # ビルド確認
bun run zoom:setup  # Zoom Meeting 自動作成 + Vercel env 自動登録
```

## ブランド制約

- 主色: coral (`#d97757`)、墨 (`#373737`)、cream (`#faf9f5`)
- 紫・青・ピンク・金は禁止

## 採用済デザイン (2026-05-28 確定)

### Hero (FV)
- **背景**: HeroBgB (Beams、光線が上下から流れる、collision光なし、コピー周辺暗オーバーレイで可読性確保)
- **コピー A案**: HeroCopyA (「あなたが寝ている間に、AIが社員5人分の仕事を終えている」、text-shadow付き、スマホ改行は `<br className="sm:hidden">` で明示制御)
- **コピー C案**: HeroCopyC (「半年前、私もAIを使えませんでした...」、`/start` 専用)
- **共通**: HeroMetaSwitcher (罫線セパレート、現状A固定)

### セクション (PC / Mobile 別UI)
| セクション | PC採用 | Mobile採用 |
|---|---|---|
| Hero | A案 (本番) / C案 (/start) | 同左 |
| Wave | WaveE (現状リッチ) | 同左 |
| SixMonths | A案軸 (Hero との整合) / SixMonthsStart (C案軸) | 同左 |
| Cases | CasesC (Marquee 2行、motion.animate) | CasesMobileA (縦stack + 罫線 + dot) |
| Voices | VoicesC (Marquee 2行、motion.animate) | VoicesMobileD (縦stack + 展開式) |
| Speaker | 縦並びエディトリアル (大型写真左寄せ) | 写真中央揃え 256-288px大型 |
| WhyThis | A案軸 / WhyThisStart (C案軸) | 同左 |
| FinalCTA | A案軸 / FinalCTAStart (C案軸) | 同左 |

採用までは `?preview=1` の VariantSwitcher で複数案同時提示→紀洋さん判定型。詳細: `~/.claude/rules/lphp-mobile-patterns.md`

### Marquee 重要パターン
**Cases/Voices の Marquee は motion.animate で書く**。CSS keyframes だと Chrome のviewport外最適化で「セクション下までスクロールしないと動かない」現象が出る。

```tsx
<motion.div
  style={{ willChange: "transform" }}
  animate={paused ? {} : { x: ["0%", "-50%"] }}
  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
>
```

## Zoom 連携 (Server-to-Server OAuth)

- `lib/zoom.ts` — S2S OAuth でaccess token + Meeting作成/取得API
- `scripts/zoom-setup.ts` — Meeting 作成 → Vercel env 自動登録 (`bun run zoom:setup`)
- App: Zoom Marketplace の **cc-seminar-meeting-bot** (Server-to-Server OAuth、Activate済)
- Scopes: `meeting:write/read/update:meeting:admin` 全部追加済

### env 構造
```
ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET  # S2S 認証
ZOOM_URL_20260603, ZOOM_ID_20260603, ZOOM_PW_20260603  # 第1回 6/3 水 19-21
ZOOM_URL_20260614, ZOOM_ID_20260614, ZOOM_PW_20260614  # 第2回 6/14 日 11-13
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY
CONTACT_FROM=noreply@isshin-ai.co.jp, CONTACT_TO=noreply@isshin-gym.co.jp
CRON_SECRET  # GitHub Actions ↔ Vercel 認証用 (両方に同じ値登録済み)
```

Webhook (`app/api/stripe/webhook/route.ts`) で `metadata.sessionDate` を見て該当env を引いてメール送信。未設定時は「Zoom URL は前日までに別途送付」フォールバック + 管理者通知に⚠️警告。

詳細: `~/.claude/rules/zoom-api-server-to-server.md`

## リマインダー実装 (2026-05-28〜)

### 構造
- `app/api/cron/reminders/route.ts` — Stripe API で過去35日の Checkout Sessions を取得、24h/1h前判定、Resend で送信、Stripe metadata に `reminder_24h_sent`/`reminder_1h_sent` フラグで重複防止
- `.github/workflows/reminders.yml` — GitHub Actions cron で30分ごと `curl` 叩く
- 認証: `Authorization: Bearer ${CRON_SECRET}` (Vercel env + GitHub secret 両方に同じ値登録)

### なぜ GitHub Actions cron か
**Vercel Hobby plan は cron 1日1回制限**(Pro plan で30分単位)。Hobby のままで30分間隔 cron を実現するため GitHub Actions cron 経由で `/api/cron/reminders` を叩く方式に。

### 送信タイミング (window制)
- 24時間前メール: 開催23-26h前 window
- 1時間前メール: 開催0.5-1.5h前 window

### 日程追加時の手順
**完全自動ではない**。現状 SESSION_MAP がハードコーディングされているため:
1. `bun run zoom:setup` で Zoom Meeting + Vercel env 作成 (`ZOOM_URL_YYYYMMDD` 等)
2. `app/api/cron/reminders/route.ts` の SESSION_MAP に新エントリ追加
3. `app/api/stripe/webhook/route.ts` の SESSION_MAP に新エントリ追加
4. `components/sections/FinalCTA.tsx` と `FinalCTAStart.tsx` の sessions 配列に追加
5. Vercel 再デプロイ

将来改善余地: `SEMINAR_SESSIONS_JSON` env で動的化(運用は env のみで完結)。次回追加前に検討。

## 紀洋さん指定本文 (両LP軸統一)

### A案版 (本番 `/`)
- H1: 「あなたが寝ている間に、AIが社員5人分の仕事を終えている。」
- sub: 「半年で、自分が止まっても回る事業へ。その設計図を、2時間でお見せします。」
- SixMonths: 「あなたの会社にも、半年でこの景色を。」「いま、社員を雇わずに、ひとりで社員5人分の仕事を。」
- WhyThis: 「経営の判断軸に乗せられる**設計図**を、2時間で**お渡しします**」
- FinalCTA: 「あなたの会社の**設計図**を、いま受け取る。」

### C案版 (`/start`)
- H1: 「半年前、私もAIを使えませんでした。いま、社員を雇わずに事業が伸びています。」
- sub: 「自分の手で動かしてきた経営者へ。半年で起きた変化を、2時間でお見せします。」
- SixMonths/WhyThis/FinalCTA: 物語型(現状の紀洋さん指定本文)

### 共通
- 補足: 「* Claude Codeは、ビジネス活用に特化した次世代のAI です。」(短縮版)
- Speaker: Kiyo「店舗経営からスタートした、34歳の経営者。」/ Takka「ほんの少し前まで、AI で何ができるかも知らない、…」
- CTA全部「お申込みへ進む →」 / ヘッダー「申込 →」

## お問い合わせフォーム

- `app/contact/page.tsx` — フォームUI (name / email / 件名 / 本文、LegalPage ベース)
- `app/api/contact/route.ts` — Resend で2通送信:
  - **管理者通知**: 件名 `[CCC お問い合わせ] {名前} 様 / {件名}`、from `CCC運営事務局 <noreply@isshin-ai.co.jp>`、to `CONTACT_TO`、replyTo に問い合わせ者の email (返信が直接届く)
  - **自動応答**: 件名 `【お問い合わせ受付】Claude Code 実践セミナー`、問い合わせ者宛、受付完了通知
- Stripe webhook と同じフォーマット (rules/`isshin-ai-mail-pattern.md` 準拠)
- バリデーション: 必須3項目 + メールアドレス正規表現 + 5000文字制限

## ダッシュボード (/dashboard)

- **`app/dashboard/page.tsx`** — Server Component で Stripe API 直叩き、KPI 4枠 (売上合計 / 申込数 / 第1回 / 第2回) + 1顧客1行リスト
- **`proxy.ts`** — `/dashboard/*` と `/api/dashboard/*` を Basic Auth で保護、admin (kiyotakka) と guest (guest) の 2ロール
- ゲストはメアドマスク表示 (例: `ma***@odschool.jp`)、ヘッダーに `Guest View` バッジ
- **返金済み非表示**: `stripe.checkout.sessions.list({ expand: ["data.payment_intent.latest_charge"] })` で取得 → `latest_charge.refunded || amount_refunded > 0` を skip
- env: `DASHBOARD_USER` `DASHBOARD_PASS` `DASHBOARD_GUEST_USER` `DASHBOARD_GUEST_PASS`
- proxy → Server Component の role 受け渡し: `NextResponse.next({ request: { headers: fwd }})` で `x-dashboard-role` ヘッダー流す → page で `headers()` から読む

## Metadata (OG / Twitter) 管理

- `app/layout.tsx` = **A案軸のデフォルト** (本番 `/` 用) を title / description / openGraph / twitter 全て含める
- `app/start/page.tsx` = **C案軸で完全上書き**。Next.js の metadata は page.tsx で title/description だけ書いても **openGraph / twitter は layout.tsx を継承**してしまうため、両方明示する必要あり (LINE/X シェア時の OG が間違って表示される事故防止)
- **日付・価格は metadata に入れない**。「2026/6/3 19:00」「¥5,500」を入れるとセミナー日程変更で毎回 metadata 触る必要が出る → ターゲット軸の汎用表現で固定

## NGワード (毎回grep確認)

```bash
grep -rE "月10万|副業|主婦|学生|Earn with|人材プール|即稼働|収益に変える" app/ components/ || echo "✓ NGワードなし"
```

## 関連

- 紹介LP兄弟リポ: https://github.com/cccampus/lp-intro
- スライド repo: https://github.com/cccampus/slides
- 事業ドキュメント: `~/projects/02_docs/01_isshin/01_ai/community/`
- LP/HP標準パターン: `~/.claude/rules/lphp-mobile-patterns.md`
- Zoom API パターン: `~/.claude/rules/zoom-api-server-to-server.md`
- 日本語折返し・Stripe SDK等のNext.js quirks: `~/.claude/rules/nextjs-frontend-quirks.md`
- Vercel Hobby cron制約 + GitHub Actions代替: `~/.claude/rules/vercel-cli-multi-account.md`

## 進捗

- 2026-05-30: ヘッダー/CTAボタンが申込セクションへ飛ばない不具合を修正。原因2つ — (1)Lenis root有効でネイティブ`#hash`アンカーが飛ばない→`LenisProvider`に`AnchorScroll`(全アンカーを`lenis.scrollTo`委譲)追加 (2)`/start`の`FinalCTAStart` idが`apply-start`で共通Headerの`#apply`と不一致→`apply`に統一。詳細パターンは`~/.claude/rules/nextjs-frontend-quirks.md`「Lenis有効時...飛ばない」
- 2026-05-28: 同居化(`/`=A案/`/start`=C案) + リマインダー実装(GitHub Actions cron) + 実LP100体テスト完了(A圧勝62%) + Marquee motion化(viewport外最適化対策) + Stripe SDK バージョン厳密固定
- 2026-05-27: PC全セクション採用確定 + Mobile別UI Switcher経由で採用確定 + Zoom S2S OAuth統合 + Stripe日程別routing + metadata からCCC名称除去
- 2026-05-26: v3.2 100体ペルソナテスト合格(61%→70%)、Stripe本番モード化、本番デプロイ完了
