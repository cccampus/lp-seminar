/**
 * FAQ — v3.2 コピー / cinematic V2 ダークトーン
 * 「見せる/景色」軸、規制業種・過去セミナー失敗層対応
 */
import DarkSection from "@/components/ui/DarkSection";

type Item = { q: string; a: React.ReactNode };

const faqs: Item[] = [
  {
    q: "プログラミングの知識がないけど、参加できますか？",
    a: (
      <>
        はい、参加できます。むしろ、コードを書かない経営者・実務家こそが対象です。
        2 時間は「コードを書く」のではなく「AI が仕事をする景色を見る」時間です。
      </>
    ),
  },
  {
    q: "うちの業種でも応用できる話ですか？",
    a: (
      <>
        はい、ほとんどの業種で応用例があります。
        当日、参加された方の業種に合わせて、実際の画面でお見せします。
      </>
    ),
  },
  {
    q: "Zoom URL はいつもらえますか？",
    a: (
      <>
        決済完了後、すぐにメールでお送りします。 開場は開催 10 分前です。
      </>
    ),
  },
  {
    q: "当日参加できなかった場合は？",
    a: (
      <>
        申し訳ございません、本セミナーはライブ配信形式のため、
        返金やアーカイブ視聴の対応はしておりません。
        ご都合のよい日程をお選びください(複数日程あり)。
      </>
    ),
  },
  {
    q: "守秘義務のある業種(医療・士業・教育・自治体など)でも参加できますか？",
    a: (
      <>
        はい、もちろんです。 セミナーで「機密情報を扱う」ことはしません。
        業種への応用は、当日業界規制も触れながら、景色としてお見せします。
      </>
    ),
  },
  {
    q: "AI 系のセミナーに何度か参加して、何も変わらなかった経験があります。今回は違いますか？",
    a: (
      <>
        はい、違います。
        2 時間で「教える」のではなく、AI が実際に仕事をする景色を見ていただきます。
        その景色を見た方が「やってみたい」と思った時に、初めて行動が変わります。
        私たちはそれを大事にしています。
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <DarkSection
      id="faq"
      aria-labelledby="faq-heading"
      bgImage="/images/backdrop/bd_a.jpg"
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-4 text-center">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-center text-cream mb-16"
          style={{ letterSpacing: "-0.01em" }}
        >
          よくある <span className="text-coral">ご質問</span>
        </h2>

        <div className="divide-y divide-cream/10 border-t border-b border-cream/15">
          {faqs.map((f, i) => (
            <details key={i} className="group py-6 sm:py-7">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-4 sm:gap-5 flex-1">
                  <span className="font-mono text-sm tracking-[0.15em] text-coral font-semibold shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-semibold leading-snug text-cream">
                    {f.q}
                  </span>
                </div>
                <span className="shrink-0 pt-1 font-mono text-coral text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-5 pl-9 sm:pl-11 pr-2 text-sm sm:text-base leading-relaxed text-cream/85">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
