/**
 * SixMonths — v3.3（紀洋さんストーリー・34歳/店舗経営）
 *
 * B案：押し寄せる背景画像（津波の没入演出）。背景画像は「これは波ではなく、津波です。」の
 * 締めまで含め SixMonths セクション全体を覆う（section 全面 fill object-cover）。
 *   - スマホ＝ flood_mobile.jpg（縦）をセクション全面背景。
 *   - PC＝ flood_pc.jpg（横）をセクション全面背景（スマホの拡大流用ではない別構図）。
 *   - 出し分けは hidden / sm:block。next/image は他セクション同様 unoptimized + fill object-cover。
 *
 * 可読性（v3.4 で改修・§0 準拠）：
 *   - 文字ブロック直下のローカル暗幕箱（rounded-3xl + backdrop-blur + radial）は撤去。
 *     「箱・枠・blur 面」を足さず、可読化はセクション全面の滑らかなグラデで行う。
 *   - PC＝左→右の不透明度グラデ（左が濃く本文可読／右に行くほど透明）だけで読ませる。
 *   - スマホ＝縦グラデ。下端は緩めて津波付近でも背景画像が見える明るさに保つ。
 *   - 文字は十分大きい。可読化はグラデ強度・文字サイズ差・ウェイト・余白・行間・
 *     テキストシャドウで行う（装飾追加は最終手段・§0）。
 *   - 色は coral / sumi / cream の 3 軸のみ。境界はパキッと（overflow-hidden）。
 *
 * 新ビフォアフ4項目
 * - LP・SEO記事制作 外注で月30万 → 自分で1時間以内
 * - SNS動画作成・投稿 外注で月10万 → AI補助で30分以内
 * - Google・Meta広告運用 外注で月20万 → 自分で30分以内
 * - 仕訳や契約書作成 外注で月10万 → 自分で30分以内
 */
import Image from "next/image";

const beforeAfter = [
  {
    label: "LP・SEO記事制作",
    before: "外注で月30万",
    after: "自分で1時間以内",
  },
  {
    label: "SNS動画作成・投稿",
    before: "外注で月10万",
    after: "AI補助で30分以内",
  },
  {
    label: "Google・Meta広告運用",
    before: "外注で月20万",
    after: "自分で30分以内",
  },
  {
    label: "仕訳や契約書作成",
    before: "外注で月10万",
    after: "自分で30分以内",
  },
];

export default function SixMonths() {
  return (
    <section
      id="six-months"
      aria-labelledby="six-months-heading"
      className="relative w-full overflow-hidden bg-sumi-deep text-cream isolate"
    >
      {/* ── 全面背景画像（押し寄せる津波）：mobile/pc で別構図を出し分け ── */}
      {/* スマホ用 縦（下1/3が暗ゾーン）。sm 未満のみ表示 */}
      <div className="absolute inset-0 z-0 sm:hidden" aria-hidden>
        <Image
          src="/images/sixmonths/flood_mobile.jpg"
          alt=""
          fill
          unoptimized
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* PC用 横（中央〜左が暗ゾーン）。sm 以上のみ表示 */}
      <div className="absolute inset-0 z-0 hidden sm:block" aria-hidden>
        <Image
          src="/images/sixmonths/flood_pc.jpg"
          alt=""
          fill
          unoptimized
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/*
        可読性の scrim（装飾ではなく可読化のための暗幕・§0）。
        スマホ＝下が濃い縦グラデ（本文は下の暗ゾーン）。
        PC＝左が濃い横グラデ（本文は中央〜左の暗ゾーン）。
      */}
      {/*
        スマホ scrim：上は流入を見せ、本文が乗る中〜下を読める程度に締める。
        下端は画像（津波）を潰さないよう緩める（0.96→0.58）。津波コピー・本文は
        十分に大きいので、過度な暗幕は不要。可読化は縦グラデ＋タイポで行う。
      */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,31,31,0.34) 0%, rgba(31,31,31,0.30) 28%, rgba(31,31,31,0.60) 56%, rgba(31,31,31,0.66) 80%, rgba(31,31,31,0.58) 100%)",
        }}
        aria-hidden
      />
      {/*
        PC scrim：本文が乗る左を濃く、右に行くほど透明に抜く滑らかなグラデ。
        これが PC の唯一の可読化レイヤー（ローカル箱・blur面・枠は使わない・§0）。
      */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(31,31,31,0.96) 0%, rgba(31,31,31,0.90) 30%, rgba(31,31,31,0.66) 55%, rgba(31,31,31,0.30) 78%, rgba(31,31,31,0) 100%)",
        }}
        aria-hidden
      />
      {/* 全面の薄い底上げ scrim：情報量の多い背景上でも cream 文字の最低コントラストを保証 */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(31,31,31,0.28)" }}
        aria-hidden
      />

      {/* 上部の淡い coral スポット（既存ダークセクションと統一・最前面手前） */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 30% 0%, rgba(217,119,87,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/*
        本文レイヤー。
        スマホ：min-h で縦に余韻を取り、justify-end で本文を下の暗ゾーンへ寄せる。
        PC：本文を中央〜左に寄せる（max-w + 左寄せ）。
      */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 py-24 sm:min-h-0 sm:justify-start sm:py-32 lg:px-12">
        <div className="mx-auto w-full max-w-3xl sm:max-w-2xl lg:max-w-3xl">
          {/*
            見出し＋導入文。可読化はセクション全面のグラデ（PC=左→右／スマホ=縦）と
            タイポ（サイズ差・ウェイト・行間・余白）で行う。ローカルの角丸箱・blur面・
            枠は置かない（§0：装飾で解決しない）。
          */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4">
              Six Months
            </p>
            <h2
              id="six-months-heading"
              className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-10"
              style={{ letterSpacing: "-0.01em" }}
            >
              半年で、毎日の仕事が、
              <br />
              ここまで変わる。
            </h2>

            <div className="prose-stub text-cream/90 text-base sm:text-lg leading-loose space-y-5">
              <p>
                ほんの半年前まで、私は AI をほとんど触っていませんでした。
                <br />
                店舗経営をしながら、「ChatGPT って便利らしいね」程度の理解。
              </p>

              <p>
                <span
                  className="block font-serif text-2xl sm:text-4xl font-semibold text-coral leading-snug mt-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Claude Code に出会って、
                  <br className="sm:hidden" />
                  6ヶ月。
                </span>
              </p>
            </div>
          </div>

          {/* Before / After 表（局所暗ゾーン：表組みの可読性のため sumi パネルを濃く） */}
          <div className="mt-12 rounded-2xl border border-cream/15 bg-sumi-deep/75 p-6 backdrop-blur-md sm:p-10">
            <div className="space-y-6">
              {beforeAfter.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-center border-b border-cream/10 pb-6 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral/80 mb-1.5">
                      {item.label}
                    </p>
                    <p className="font-serif text-base sm:text-lg text-cream/60 line-through decoration-coral/50">
                      {item.before}
                    </p>
                  </div>
                  <span className="font-mono text-coral text-lg sm:text-xl hidden sm:block">
                    →
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-semibold text-cream">
                    {item.after}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/*
            締めの段落。セクション末尾まで背景画像が続くが、可読化はセクション全面の
            グラデ（PC=左→右／スマホ=縦）とタイポで行う。津波の大コーラル文字は
            十分大きく、テキストシャドウで背景から浮かせる。ローカル箱・blur面は置かない（§0）。
          */}
          <div className="mt-12 space-y-5 text-base sm:text-lg leading-loose text-cream/90">
            <p>
              これは特別な才能でも、IT 知識でもありません。
              <br />
              タイミングと、やる気と、行動力。
              <br className="sm:hidden" />
              それだけです。
            </p>
            <p>
              IT 革命は 20 年超えても、
              <br className="sm:hidden" />
              今もまだ日本で広がっている最中です。
              <br />
              AI は、半年単位で景色が変わります。
              <br />
              <span
                className="font-serif text-2xl sm:text-3xl font-semibold text-coral block mt-2"
                style={{ textShadow: "0 2px 24px rgba(31,31,31,0.85)" }}
              >
                これは波ではなく、津波です。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
