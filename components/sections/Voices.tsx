"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Voices — v2（参加された方の、リアルな声）
 *
 * スマホ／PC で「別の作り」にする（縮小流用ではない）。
 *   - スマホ(< md): 横スクロール・カルーセル。カードを横一列に並べ、ゆっくり自動で左へ流れ続ける。
 *                   ネイティブ横スクロール（overflow-x:auto + scroll-snap）なので指でスワイプ／
 *                   ドラッグもでき、触れている間は自動送りを一時停止、離すと再開する。
 *                   カード配列を2周分描画し、半分まで進んだら scrollLeft を巻き戻して
 *                   シームレスにループ。スクロールバーは隠す。
 *                   prefers-reduced-motion 時は自動送りを無効化（手動スワイプのみ）。
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
  // persona は配列の並び順から 1:1 で自動割当（i 番目 → persona_(i+1)）。
  // 22人ぶんの透過切り抜き画像 persona_01〜persona_22 を全員ユニークに使う。
};

// 2系統を統合（差し替えではなく追加）:
//   (A) 元の声 — 架空のビジネスオーナー／士業系（origin/main:components/sections/Voices.tsx より復元）。
//       役職・年代・コメントは元データの文言を改変せず使用。元データの gender は
//       「年代・役職」軸の v2 カードに合わせるため initial に統合。
//   (B) アンケート6件 — 受講者アンケートの匿名化済み声（映像PD/デザイナー等）。
// initial は実在特定を避けるための架空イニシャル。
// persona 画像は配列の並び順から 1:1 で自動割当（i 番目 → persona_(i+1)）。22人ユニーク。
const voices: Voice[] = [
  // ===== (A) 元の声（ビジネスオーナー／士業系）=====
  {
    initial: "T.S.",
    age: "52歳",
    role: "飲食店経営10年",
    quote:
      "予約電話の返信文が、ボタン1つで作れるようになった。アナログ人間の自分でも、その日のうちにできた。",
  },
  {
    initial: "A.K.",
    age: "38歳",
    role: "税理士事務所",
    quote:
      "顧問先の契約書レビューを任せられるようになって、月40時間の時短になりました。",
  },
  {
    initial: "N.W.",
    age: "48歳",
    role: "建設業2代目",
    quote:
      "現場日報を音声で話すだけで、要約が完成。紙とペンしか使ってこなかった俺が、これは衝撃だった。",
  },
  {
    initial: "R.I.",
    age: "36歳",
    role: "個人エステサロン",
    quote:
      "インスタ投稿の作業時間が、1/5になりました。こんなに変わるなら、もっと早く来ればよかった。",
  },
  {
    initial: "M.F.",
    age: "54歳",
    role: "旅館女将",
    quote:
      "お客様への返信を、自分の言葉で作れるように。娘に頼まなくてよくなって、それが一番うれしい。",
  },
  {
    initial: "K.H.",
    age: "57歳",
    role: "介護施設長",
    quote:
      "補助金申請の書類作成が、半分の時間で完成。申請をあきらめていた制度にも、挑戦できるように。",
  },
  {
    initial: "S.O.",
    age: "44歳",
    role: "町工場2代目",
    quote:
      "見積書のたたき台が5分で。今までは2時間かけてた仕事が、別物になった。",
  },
  {
    initial: "Y.T.",
    age: "38歳",
    role: "個人カフェ経営",
    quote:
      "SNS投稿が、苦痛じゃなくなりました。1日5分で済むようになって、本業に集中できる。",
  },
  {
    initial: "E.N.",
    age: "49歳",
    role: "医療法人事務長",
    quote:
      "院内会議の議事録が、その場で完成。翌日の仕事に持ち越さなくてよくなりました。",
  },
  {
    initial: "D.M.",
    age: "35歳",
    role: "営業マネージャー",
    quote:
      "顧客ごとの追客メモが、3倍速で作れる。結果として、商談数が増えました。",
  },
  {
    initial: "C.A.",
    age: "42歳",
    role: "コーチング独立",
    quote:
      "セッション後の振り返り作成が、5分で完了。お客様への提供価値が、明らかに上がりました。",
  },
  {
    initial: "G.S.",
    age: "31歳",
    role: "行政書士1年目",
    quote:
      "契約書の下読みが、怖くなくなった。駆け出しの自分にも、ベテランと同じ仕事ができる。",
  },
  {
    initial: "W.K.",
    age: "29歳",
    role: "Webライター",
    quote:
      "取材の文字起こしと構成が、一気にできる。一日に書ける本数が、2倍に増えました。",
  },
  {
    initial: "J.H.",
    age: "38歳",
    role: "大手メーカー人事マネージャー",
    quote:
      "採用要件の整理と求人票のたたき台が、その場で完成。部内に持ち帰る前に1人で形にできるようになりました。",
  },
  {
    initial: "F.N.",
    age: "35歳",
    role: "中堅商社・営業企画",
    quote:
      "営業会議の議事録、稟議資料、顧客提案書、全部の下書きが30分で。上司への報告サイクルが、明らかに速くなりました。",
  },
  {
    initial: "B.O.",
    age: "49歳",
    role: "化学・素材メーカー2代目",
    quote:
      "規制が厳しい業界でも、機密情報を扱わない範囲でAIに任せられる業務がたくさんあった。議事録、社内資料、契約書のたたき台、月60時間は楽になりました。",
  },
  // ===== (B) アンケート6件（受講者アンケート由来）=====
  {
    initial: "K.M.",
    age: "40代",
    role: "映像制作会社・部門マネージャー",
    quote:
      "ベテランクリエイター、プロデューサーこそ参加すべき内容。即実践導入できるノウハウが盛りだくさんです。",
  },
  {
    initial: "S.A.",
    age: "30代",
    role: "プロモーション担当",
    quote:
      "表面的な操作説明にとどまらない、本質的な理解が得られる。業界の動向まで解説いただけるのが他にない強みです。",
  },
  {
    initial: "T.N.",
    age: "40代",
    role: "映像ディレクター",
    quote: "系統的でわかりやすく、実例付きの教材が大変役に立ちました。",
  },
  {
    initial: "Y.O.",
    age: "30代",
    role: "クリエイティブディレクター",
    quote: "情報量が多く、刺激的な内容でした。",
  },
  {
    initial: "H.K.",
    age: "30代",
    role: "映像プロデューサー",
    quote:
      "紹介されたツールの特徴を実践レベルで教えてもらえたのが、すごく良かった。",
  },
  {
    initial: "M.S.",
    age: "20代",
    role: "デザイナー",
    quote: "期待以上だった。すぐに実務で活かしたいと思える内容。",
  },
];

// 配列 index（0始まり）→ persona_01〜persona_22 を 1:1 で割当。
const personaSrc = (index: number) =>
  `/images/voices/persona_${String((index % 22) + 1).padStart(2, "0")}.png`;

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

      {/* スマホ: 横スクロール・自動カルーセル */}
      <div className="md:hidden">
        <MarqueeCarousel voices={voices} />
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
   スマホ用: 横スクロール・自動カルーセル（マーキー）
   - カードを横一列に並べ、requestAnimationFrame で scrollLeft を毎フレーム
     ごく僅かに加算して、ゆっくり左へ自動で流し続ける。
   - 中身はネイティブ横スクロール（overflow-x:auto + scroll-snap）なので、
     指でスワイプ／ドラッグもできる。変な掴み挙動は一切無し（素直な横スクロール）。
   - 触れている／ホバー中（pointerdown/touchstart/mouseenter）は自動送りを一時停止し、
     離す（pointerup/touchend/mouseleave）と再開する。
   - voices を2周ぶん描画し、1周ぶん（前半）を超えたら scrollLeft を巻き戻して
     シームレスにループ（カードが飛んで見えない）。
   - prefers-reduced-motion 時は自動送りを無効化（手動スワイプのみ）。
   - スクロールバーは .voices-swipe（globals.css）で非表示。
   ================================================================= */
const AUTO_SPEED_PX_PER_SEC = 28; // 自動送り速度。1カード(約300px)を約10秒で通過する穏やかな速さ。

function MarqueeCarousel({ voices }: { voices: Voice[] }) {
  const prefersReduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  // 内部で小数の現在位置を保持する。scrollLeft の getter は整数に丸められるため、
  // 毎フレーム scrollLeft を読み戻すと 1px 未満の加算が消えて前進できない。
  // そこで位置は posRef（float）で持ち、scrollLeft へは書き込むだけにする。
  const posRef = useRef(0);
  // 自分の書き込みで発火した scroll イベントを、ユーザー操作と区別するためのフラグ。
  const selfScrollRef = useRef(false);

  useEffect(() => {
    if (prefersReduced) return; // 自動送りなし（手動スワイプのみ）
    const el = scrollerRef.current;
    if (!el) return;

    posRef.current = el.scrollLeft;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && el.scrollWidth > el.clientWidth) {
        // 前半（voices 1周ぶん）の幅を超えたら、その幅だけ巻き戻して継ぎ目を消す。
        const half = el.scrollWidth / 2;
        let next = posRef.current + AUTO_SPEED_PX_PER_SEC * dt;
        if (next >= half) next -= half;
        posRef.current = next;
        selfScrollRef.current = true;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  // 触れている間は止める。
  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };
  // ユーザーの手動スクロール時は posRef を実値に同期し、継ぎ目を越えたら巻き戻す。
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    if (selfScrollRef.current) {
      // 自動送りによる scroll。位置同期は不要。
      selfScrollRef.current = false;
      return;
    }
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
    posRef.current = el.scrollLeft;
  };

  // 2周ぶん描画してシームレスにループさせる。
  const loop = [...voices, ...voices];

  return (
    <div>
      <p
        className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-cream/45"
        aria-hidden
      >
        ← スワイプ →
      </p>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onMouseEnter={pause}
        onMouseLeave={resume}
        className="voices-swipe flex gap-5 overflow-x-auto px-[7vw] pb-2"
        role="list"
        aria-label="参加された方の声"
      >
        {loop.map((v, i) => {
          const vi = i % voices.length;
          return (
            <div
              key={i}
              role="listitem"
              aria-hidden={i >= voices.length ? true : undefined}
              className="h-[480px] w-[80vw] max-w-[340px] shrink-0"
            >
              <Card voice={v} voiceIndex={vi} priority={i < 2} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
   スマホ用カード本体（切り抜きレイヤー意匠）
   - カードは sumi パネル。上部に cream-warm の明色帯（人物が乗る座面）。
   - 透過 persona は明色帯の上に立ち、頭が帯の上端＝sumi 地へ少しはみ出す
     （切り抜きを活かしたレイヤー感）。背景が無いので人物の輪郭がそのまま出る。
   - 文字階層: イニシャル → 年代・役職 → コメント。
   ----------------------------------------------------------------- */
function Card({
  voice,
  voiceIndex,
  priority = false,
}: {
  voice: Voice;
  voiceIndex: number;
  priority?: boolean;
}) {
  return (
    <article className="relative flex h-full select-none flex-col overflow-hidden rounded-[30px] bg-sumi shadow-[0_30px_70px_-24px_rgba(0,0,0,0.65)]">
      {/* 上部・明色帯（人物の座面）。帯自体は overflow-hidden で角丸内に収める。 */}
      <div className="relative h-[224px] shrink-0">
        <div className="absolute inset-x-0 bottom-0 top-7 overflow-hidden rounded-b-[18px] bg-cream-warm" />
        {/* 透過人物。帯の上端（top-7 の上の sumi 地）へ頭が飛び出すレイヤー。 */}
        <Image
          src={personaSrc(voiceIndex)}
          alt=""
          aria-hidden
          width={464}
          height={576}
          draggable={false}
          className="pointer-events-none absolute bottom-0 left-1/2 h-[244px] w-auto -translate-x-1/2 object-contain object-bottom"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
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
      {/* 上部・明色帯（人物の座面）。透過人物の頭が帯の上端＝sumi 地へ飛び出す。 */}
      <div
        className={
          "relative shrink-0 " + (feature ? "h-[284px]" : "h-[204px]")
        }
      >
        <div className="absolute inset-x-0 bottom-0 top-8 rounded-b-[16px] bg-cream-warm" />
        <Image
          src={personaSrc(index)}
          alt=""
          aria-hidden
          width={464}
          height={576}
          draggable={false}
          className={
            "pointer-events-none absolute bottom-0 left-1/2 w-auto -translate-x-1/2 object-contain object-bottom " +
            (feature ? "h-[300px]" : "h-[222px]")
          }
        />
        <span className="absolute right-5 top-4 z-10 font-mono text-[11px] tracking-[0.2em] text-cream/40">
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
