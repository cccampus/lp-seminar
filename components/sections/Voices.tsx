/**
 * Voices — v3.2（参加者の声16件・横スライドUI）
 * 業種×年代×具体的変化の三点セット
 */

const voices = [
  {
    role: "飲食店経営10年",
    age: "52歳",
    gender: "男性",
    quote:
      "予約電話の返信文が、ボタン1つで作れるようになった。アナログ人間の自分でも、その日のうちにできた。",
  },
  {
    role: "税理士事務所",
    age: "38歳",
    gender: "女性",
    quote:
      "顧問先の契約書レビューを任せられるようになって、月40時間の時短になりました。",
  },
  {
    role: "建設業2代目",
    age: "48歳",
    gender: "男性",
    quote:
      "現場日報を音声で話すだけで、要約が完成。紙とペンしか使ってこなかった俺が、これは衝撃だった。",
  },
  {
    role: "個人エステサロン",
    age: "36歳",
    gender: "女性",
    quote:
      "インスタ投稿の作業時間が、1/5になりました。こんなに変わるなら、もっと早く来ればよかった。",
  },
  {
    role: "旅館女将",
    age: "54歳",
    gender: "女性",
    quote:
      "お客様への返信を、自分の言葉で作れるように。娘に頼まなくてよくなって、それが一番うれしい。",
  },
  {
    role: "介護施設長",
    age: "57歳",
    gender: "男性",
    quote:
      "補助金申請の書類作成が、半分の時間で完成。申請をあきらめていた制度にも、挑戦できるように。",
  },
  {
    role: "町工場2代目",
    age: "44歳",
    gender: "男性",
    quote:
      "見積書のたたき台が5分で。今までは2時間かけてた仕事が、別物になった。",
  },
  {
    role: "個人カフェ経営",
    age: "38歳",
    gender: "男性",
    quote:
      "SNS投稿が、苦痛じゃなくなりました。1日5分で済むようになって、本業に集中できる。",
  },
  {
    role: "医療法人事務長",
    age: "49歳",
    gender: "女性",
    quote:
      "院内会議の議事録が、その場で完成。翌日の仕事に持ち越さなくてよくなりました。",
  },
  {
    role: "営業マネージャー",
    age: "35歳",
    gender: "男性",
    quote:
      "顧客ごとの追客メモが、3倍速で作れる。結果として、商談数が増えました。",
  },
  {
    role: "コーチング独立",
    age: "42歳",
    gender: "女性",
    quote:
      "セッション後の振り返り作成が、5分で完了。お客様への提供価値が、明らかに上がりました。",
  },
  {
    role: "行政書士1年目",
    age: "31歳",
    gender: "男性",
    quote:
      "契約書の下読みが、怖くなくなった。駆け出しの自分にも、ベテランと同じ仕事ができる。",
  },
  {
    role: "Webライター",
    age: "29歳",
    gender: "女性",
    quote:
      "取材の文字起こしと構成が、一気にできる。一日に書ける本数が、2倍に増えました。",
  },
  {
    role: "大手メーカー人事マネージャー",
    age: "38歳",
    gender: "女性",
    quote:
      "採用要件の整理と求人票のたたき台が、その場で完成。部内に持ち帰る前に1人で形にできるようになりました。",
  },
  {
    role: "中堅商社・営業企画",
    age: "35歳",
    gender: "男性",
    quote:
      "営業会議の議事録、稟議資料、顧客提案書、全部の下書きが30分で。上司への報告サイクルが、明らかに速くなりました。",
  },
  {
    role: "化学・素材メーカー2代目",
    age: "49歳",
    gender: "男性",
    quote:
      "規制が厳しい業界でも、機密情報を扱わない範囲でAIに任せられる業務がたくさんあった。議事録、社内資料、契約書のたたき台、月60時間は楽になりました。",
  },
];

export default function Voices() {
  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="relative w-full bg-sumi-deep text-cream py-24 sm:py-32 overflow-hidden"
    >
      <div className="px-6 mb-12 sm:mb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
            Voices
          </p>
          <h2
            id="voices-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center"
            style={{ letterSpacing: "-0.01em" }}
          >
            参加された方の、
            <br />
            リアルな声。
          </h2>
        </div>
      </div>

      {/* 自動マーキー（無限横スクロール）。
          voices を 2 周分レンダリングし、CSS で -50% まで平行移動 → seamless ループ。
          スクロールバー・ドラッグ操作は廃止。hover で一時停止、reduced-motion で停止。 */}
      <div className="relative" aria-label="参加者の声（自動スクロール）">
        {/* 左右フェードマスク（端を sumi-deep に溶かす） */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to right, var(--color-sumi-deep) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to left, var(--color-sumi-deep) 0%, transparent 100%)",
          }}
        />

        <div className="voices-marquee">
          {[...voices, ...voices].map((v, i) => (
            <article
              key={i}
              aria-hidden={i >= voices.length ? true : undefined}
              className="mx-2.5 sm:mx-3.5 shrink-0 w-[88vw] sm:w-[420px] rounded-2xl border border-cream/15 bg-cream/[0.04] p-7 sm:p-8"
            >
              {/* メタ */}
              <div className="mb-5 pb-5 border-b border-cream/10">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-coral font-semibold">
                  {v.role}
                </p>
                <p className="mt-1.5 text-xs text-cream/55">
                  {v.age} · {v.gender}
                </p>
              </div>

              {/* 本文 */}
              <blockquote className="text-base sm:text-lg leading-relaxed text-cream/90">
                「{v.quote}」
              </blockquote>
            </article>
          ))}
        </div>
      </div>

      {/* 注釈 */}
      <p className="mt-10 px-6 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40">
        * 参加者の許可を得て掲載しています。お名前は伏せています。
      </p>
    </section>
  );
}
