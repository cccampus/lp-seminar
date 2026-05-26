"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "motion/react";

/**
 * Voices — v2（参加された方の、リアルな声）
 *
 * スマホ／PC で「別の作り」にする（縮小流用ではない）。
 *   - スマホ(< md): Tinder 風スワイプ・スタック。framer-motion(`motion/react`) の drag で
 *                   前面カードを指で掴み、左右に閾値を超えてスワイプすると
 *                   そのカードが飛んで次のカードが前面に出る。AnimatePresence で出入りを管理。
 *                   下にドット、左右に戻る/進む補助ボタン。
 *                   prefers-reduced-motion 時は drag 無効＋ボタンでの簡易切替にフォールバック。
 *   - PC(>= md):   2〜3カラムの千鳥（masonry風）一覧。スワイプ無し・余白リッチな雑誌風。
 *
 * カード意匠（切り抜きレイヤー）:
 *   別背景パネル(sumi)の上に persona(背景cream一色)が乗り、頭が上の明色帯(cream-warm)に
 *   少しはみ出す切り抜き風。階層は イニシャル(架空)→年代(架空・代表)→一般化役職→コメント。
 *
 * 厳守(§0): 左アクセントライン禁止 / coral・sumi・cream のみ / 実名・社名なし /
 *           架空 persona 使用 / 装飾で解決しない（サイズ差・余白・整列・コントラストで魅せる）。
 *
 * コメント出典: ①元の声（origin/main の Voices.tsx に存在したビジネスオーナー／士業系の声）と
 *   ②受講者アンケートの匿名化済み声（docs/voices_testimonials_anon.md）の2系統を統合（差し替えではなく追加）。
 * イニシャルは架空（実在受講者の特定を避けるための代表値）。実名・社名は出さない。
 */

type Voice = {
  initial: string; // 架空イニシャル
  age: string; // 架空・代表年代
  role: string; // 一般化役職（docs の通り）
  quote: string; // 匿名コメント（docs の原文）
  persona: 1 | 2 | 3 | 4; // 架空persona画像
};

// 2系統を統合（差し替えではなく追加）:
//   (A) 元の声 — 架空のビジネスオーナー／士業系（origin/main:components/sections/Voices.tsx より復元）。
//       役職・年代・コメントは元データの文言を改変せず使用。元データの gender は
//       「年代・役職」軸の v2 カードに合わせるため initial に統合し、persona(1〜4) を割り当て。
//   (B) アンケート6件 — 受講者アンケートの匿名化済み声（映像PD/デザイナー等）。
// initial は実在特定を避けるための架空イニシャル。persona は 1〜4 を使い回し。
const voices: Voice[] = [
  // ===== (A) 元の声（ビジネスオーナー／士業系）=====
  {
    initial: "T.S.",
    age: "52歳",
    role: "飲食店経営10年",
    quote:
      "予約電話の返信文が、ボタン1つで作れるようになった。アナログ人間の自分でも、その日のうちにできた。",
    persona: 1,
  },
  {
    initial: "A.K.",
    age: "38歳",
    role: "税理士事務所",
    quote:
      "顧問先の契約書レビューを任せられるようになって、月40時間の時短になりました。",
    persona: 2,
  },
  {
    initial: "N.W.",
    age: "48歳",
    role: "建設業2代目",
    quote:
      "現場日報を音声で話すだけで、要約が完成。紙とペンしか使ってこなかった俺が、これは衝撃だった。",
    persona: 3,
  },
  {
    initial: "R.I.",
    age: "36歳",
    role: "個人エステサロン",
    quote:
      "インスタ投稿の作業時間が、1/5になりました。こんなに変わるなら、もっと早く来ればよかった。",
    persona: 4,
  },
  {
    initial: "M.F.",
    age: "54歳",
    role: "旅館女将",
    quote:
      "お客様への返信を、自分の言葉で作れるように。娘に頼まなくてよくなって、それが一番うれしい。",
    persona: 2,
  },
  {
    initial: "K.H.",
    age: "57歳",
    role: "介護施設長",
    quote:
      "補助金申請の書類作成が、半分の時間で完成。申請をあきらめていた制度にも、挑戦できるように。",
    persona: 3,
  },
  {
    initial: "S.O.",
    age: "44歳",
    role: "町工場2代目",
    quote:
      "見積書のたたき台が5分で。今までは2時間かけてた仕事が、別物になった。",
    persona: 1,
  },
  {
    initial: "Y.T.",
    age: "38歳",
    role: "個人カフェ経営",
    quote:
      "SNS投稿が、苦痛じゃなくなりました。1日5分で済むようになって、本業に集中できる。",
    persona: 4,
  },
  {
    initial: "E.N.",
    age: "49歳",
    role: "医療法人事務長",
    quote:
      "院内会議の議事録が、その場で完成。翌日の仕事に持ち越さなくてよくなりました。",
    persona: 2,
  },
  {
    initial: "D.M.",
    age: "35歳",
    role: "営業マネージャー",
    quote:
      "顧客ごとの追客メモが、3倍速で作れる。結果として、商談数が増えました。",
    persona: 3,
  },
  {
    initial: "C.A.",
    age: "42歳",
    role: "コーチング独立",
    quote:
      "セッション後の振り返り作成が、5分で完了。お客様への提供価値が、明らかに上がりました。",
    persona: 4,
  },
  {
    initial: "G.S.",
    age: "31歳",
    role: "行政書士1年目",
    quote:
      "契約書の下読みが、怖くなくなった。駆け出しの自分にも、ベテランと同じ仕事ができる。",
    persona: 1,
  },
  {
    initial: "W.K.",
    age: "29歳",
    role: "Webライター",
    quote:
      "取材の文字起こしと構成が、一気にできる。一日に書ける本数が、2倍に増えました。",
    persona: 2,
  },
  {
    initial: "J.H.",
    age: "38歳",
    role: "大手メーカー人事マネージャー",
    quote:
      "採用要件の整理と求人票のたたき台が、その場で完成。部内に持ち帰る前に1人で形にできるようになりました。",
    persona: 4,
  },
  {
    initial: "F.N.",
    age: "35歳",
    role: "中堅商社・営業企画",
    quote:
      "営業会議の議事録、稟議資料、顧客提案書、全部の下書きが30分で。上司への報告サイクルが、明らかに速くなりました。",
    persona: 3,
  },
  {
    initial: "B.O.",
    age: "49歳",
    role: "化学・素材メーカー2代目",
    quote:
      "規制が厳しい業界でも、機密情報を扱わない範囲でAIに任せられる業務がたくさんあった。議事録、社内資料、契約書のたたき台、月60時間は楽になりました。",
    persona: 1,
  },
  // ===== (B) アンケート6件（受講者アンケート由来）=====
  {
    initial: "K.M.",
    age: "40代",
    role: "映像制作会社・部門マネージャー",
    quote:
      "ベテランクリエイター、プロデューサーこそ参加すべき内容。即実践導入できるノウハウが盛りだくさんです。",
    persona: 1,
  },
  {
    initial: "S.A.",
    age: "30代",
    role: "プロモーション担当",
    quote:
      "表面的な操作説明にとどまらない、本質的な理解が得られる。業界の動向まで解説いただけるのが他にない強みです。",
    persona: 2,
  },
  {
    initial: "T.N.",
    age: "40代",
    role: "映像ディレクター",
    quote: "系統的でわかりやすく、実例付きの教材が大変役に立ちました。",
    persona: 3,
  },
  {
    initial: "Y.O.",
    age: "30代",
    role: "クリエイティブディレクター",
    quote: "情報量が多く、刺激的な内容でした。",
    persona: 4,
  },
  {
    initial: "H.K.",
    age: "30代",
    role: "映像プロデューサー",
    quote:
      "紹介されたツールの特徴を実践レベルで教えてもらえたのが、すごく良かった。",
    persona: 2,
  },
  {
    initial: "M.S.",
    age: "20代",
    role: "デザイナー",
    quote: "期待以上だった。すぐに実務で活かしたいと思える内容。",
    persona: 1,
  },
];

const personaSrc = (n: 1 | 2 | 3 | 4) => `/images/voices/persona_0${n}.png`;

export default function Voices() {
  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="relative w-full overflow-hidden bg-sumi-deep py-24 text-cream sm:py-32"
    >
      {/* 見出し */}
      <div className="mb-12 px-6 sm:mb-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-coral">
            Voices
          </p>
          <h2
            id="voices-heading"
            className="text-center font-serif text-3xl font-semibold leading-tight sm:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            参加された方の、
            <br />
            リアルな声。
          </h2>
        </div>
      </div>

      {/* スマホ: Tinder 風スワイプ・スタック */}
      <div className="md:hidden">
        <SwipeDeck voices={voices} />
      </div>

      {/* PC: 千鳥 masonry 雑誌スプレッド */}
      <div className="hidden px-6 md:block">
        <div className="mx-auto max-w-6xl [column-count:2] [column-gap:2rem] lg:[column-count:3]">
          {voices.map((v, i) => (
            <div key={i} className="mb-8 break-inside-avoid">
              <MagazineCard voice={v} index={i} feature={i === 0 || i === 4} />
            </div>
          ))}
        </div>
      </div>

      {/* 注釈 */}
      <p className="mt-12 px-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
        * 受講者アンケートより。お名前・社名は伏せ、人物はイメージです。
      </p>
    </section>
  );
}

/* =================================================================
   スマホ用: Tinder 風スワイプ・スタック
   - 前面カードを drag。x の絶対値が閾値超 or 速度超で「飛ばして」次へ。
   - 背面に次カードがちらりと見えるよう、奥行きを scale/translateY で表現。
   - reduced-motion 時は drag 無効、左右ボタンで切替。
   ================================================================= */
const SWIPE_THRESHOLD = 90; // px
const SWIPE_VELOCITY = 450; // px/s

function SwipeDeck({ voices }: { voices: Voice[] }) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // フライアウト方向（-1=左, 1=右）。AnimatePresence の exit に渡す。
  const [exitDir, setExitDir] = useState(0);
  const total = voices.length;

  const advance = useCallback(
    (dir: number) => {
      setExitDir(dir);
      setIndex((prev) => (prev + 1) % total);
    },
    [total]
  );

  const goBack = useCallback(
    (dir: number) => {
      setExitDir(dir);
      setIndex((prev) => (prev - 1 + total) % total);
    },
    [total]
  );

  const onDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      const flung =
        Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
        Math.abs(info.velocity.x) > SWIPE_VELOCITY;
      if (!flung) return;
      advance(info.offset.x < 0 ? -1 : 1);
    },
    [advance]
  );

  // 前面 + 背面2枚を重ねて表示（スタック感）。
  const stack = [0, 1, 2].map((d) => voices[(index + d) % total]);
  const current = stack[0];

  return (
    <div className="px-[7vw]">
      <p
        className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-cream/45"
        aria-hidden
      >
        {prefersReduced ? "← 切り替え →" : "← スワイプ →"}
      </p>

      {/* スタック領域。背面カードは静的に重ねる。 */}
      <div className="relative mx-auto h-[480px] max-w-[400px]">
        {/* 背面（奥から手前へ） */}
        {stack
          .slice(1)
          .reverse()
          .map((v, ri) => {
            // ri: 0 が一番奥(d=2), 1 が d=1
            const depth = ri === 0 ? 2 : 1;
            return (
              <div
                key={`bg-${v.initial}-${depth}`}
                aria-hidden
                className="absolute inset-0"
                style={{
                  transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`,
                  opacity: depth === 2 ? 0.5 : 0.75,
                  zIndex: 10 - depth,
                }}
              >
                <Card voice={v} dimmed />
              </div>
            );
          })}

        {/* 前面（操作対象） */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`${index}-${current.initial}`}
            className="absolute inset-0 z-20"
            style={{ zIndex: 20 }}
            drag={prefersReduced ? false : "x"}
            dragSnapToOrigin
            dragElastic={0.5}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={prefersReduced ? undefined : onDragEnd}
            whileTap={prefersReduced ? undefined : { cursor: "grabbing" }}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { scale: 0.96, y: 14, opacity: 0.6 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { scale: 1, y: 0, opacity: 1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    x: exitDir < 0 ? -520 : 520,
                    rotate: exitDir < 0 ? -16 : 16,
                    opacity: 0,
                    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <Card voice={current} grabbable={!prefersReduced} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 補助操作: 戻る / ドット / 進む */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => goBack(-1)}
          aria-label="前の声へ"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream/55 transition-colors hover:text-coral focus-visible:text-coral"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex max-w-[220px] flex-wrap items-center justify-center gap-1.5" aria-hidden>
          {voices.map((_, i) => (
            <span
              key={i}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === index ? "w-5 bg-coral" : "w-1.5 bg-cream/25")
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => advance(1)}
          aria-label="次の声へ"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream/55 transition-colors hover:text-coral focus-visible:text-coral"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 進捗テキスト（番号） */}
      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-cream/35">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------
   スマホ用カード本体（切り抜きレイヤー意匠）
   - パネル全体は sumi。上に cream-warm の明色帯。
   - persona は明色帯の上に乗り、頭が帯の上端へわずかにはみ出す。
   - 文字階層: イニシャル → 年代 → 一般化役職 → コメント。
   ----------------------------------------------------------------- */
function Card({
  voice,
  dimmed = false,
  grabbable = false,
}: {
  voice: Voice;
  dimmed?: boolean;
  grabbable?: boolean;
}) {
  return (
    <article
      className={
        "relative flex h-full select-none flex-col overflow-hidden rounded-[30px] bg-sumi shadow-[0_30px_70px_-24px_rgba(0,0,0,0.65)] " +
        (grabbable ? "cursor-grab" : "")
      }
    >
      {/* 上部・明色帯。頭がここに乗り、わずかに上端へはみ出す（切り抜き風）。 */}
      <div className="relative h-[230px] shrink-0 overflow-visible bg-cream-warm">
        <div className="absolute inset-x-0 bottom-0 top-[-26px] overflow-hidden">
          <Image
            src={personaSrc(voice.persona)}
            alt=""
            aria-hidden
            width={561}
            height={701}
            draggable={false}
            className="absolute bottom-0 left-1/2 h-[300px] w-auto -translate-x-1/2 object-contain object-bottom"
            priority={!dimmed}
          />
        </div>
      </div>

      {/* 下部・sumi エリア（プロフィール＋コメント） */}
      <div className="relative flex flex-1 flex-col px-7 pb-8 pt-6">
        <p className="font-serif text-2xl font-semibold leading-none text-cream">
          {voice.initial}
        </p>
        <p className="mt-2 text-xs text-cream/55">
          {voice.age}・{voice.role}
        </p>
        <blockquote className="mt-5 font-serif text-[17px] leading-[1.9] text-cream/95">
          「{voice.quote}」
        </blockquote>
      </div>
    </article>
  );
}

/* -----------------------------------------------------------------
   PC用カード（雑誌スプレッド・千鳥）
   - feature はパネルを大きく、人物を大きく見せる。
   - スマホの使い回しではなく、サイズ差と縦組み余白で別レイアウトにする。
   ----------------------------------------------------------------- */
function MagazineCard({
  voice,
  index,
  feature,
}: {
  voice: Voice;
  index: number;
  feature: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[28px] bg-sumi transition-transform duration-300 ease-out hover:-translate-y-1">
      {/* 上部・明色帯（切り抜き人物） */}
      <div
        className={
          "relative shrink-0 overflow-visible bg-cream-warm " +
          (feature ? "h-[290px]" : "h-[210px]")
        }
      >
        <div className="absolute inset-x-0 bottom-0 top-[-28px] overflow-hidden">
          <Image
            src={personaSrc(voice.persona)}
            alt=""
            aria-hidden
            width={561}
            height={701}
            draggable={false}
            className={
              "absolute bottom-0 left-1/2 w-auto -translate-x-1/2 object-contain object-bottom " +
              (feature ? "h-[360px]" : "h-[270px]")
            }
          />
        </div>
        <span className="absolute right-5 top-4 z-10 font-mono text-[11px] tracking-[0.2em] text-sumi/35">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* 下部・sumi エリア */}
      <div className="relative px-7 pb-8 pt-6">
        <p
          className={
            "font-serif font-semibold leading-none text-cream " +
            (feature ? "text-3xl" : "text-2xl")
          }
        >
          {voice.initial}
        </p>
        <p className="mt-2 text-xs text-cream/55">
          {voice.age}・{voice.role}
        </p>
        <blockquote
          className={
            "mt-5 font-serif leading-[1.9] text-cream/95 " +
            (feature ? "text-lg" : "text-base")
          }
        >
          「{voice.quote}」
        </blockquote>
      </div>
    </article>
  );
}
