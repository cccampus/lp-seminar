import LegalPage from "@/components/sections/LegalPage";

export const metadata = {
  title: "特定商取引法に基づく表記 — オンラインセミナー",
};

const baseInfo: [string, React.ReactNode][] = [
  ["販売事業者", "株式会社ISSHIN"],
  ["運営責任者", "代表取締役　陳 紀洋"],
  ["所在地", "東京都中野区新井一丁目9-4"],
  [
    "電話番号",
    <>
      請求があった場合、遅滞なく開示いたします<sup>(注1)</sup>
    </>,
  ],
  [
    "メールアドレス",
    <a
      key="mail"
      href="mailto:noreply@isshin-ai.co.jp"
      className="text-coral hover:underline"
    >
      noreply@isshin-ai.co.jp
    </a>,
  ],
  ["販売URL", "各セミナー申込ページ"],
  [
    "販売価格",
    "各セミナー申込ページに表示する金額（税抜価格を表示し、別途消費税相当額を申し受けます）",
  ],
  [
    "販売価格以外に必要な費用",
    "通信回線使用料、インターネット接続費用、端末・機材費用等は参加者のご負担とします",
  ],
  [
    "支払方法",
    "クレジットカード一括払い（Visa／Mastercard／JCB／American Express／Diners）",
  ],
  [
    "支払時期",
    "お申込み時に決済（ご利用のクレジットカード会社の締め日や契約内容により異なります。ご利用されるカード会社までご確認ください）",
  ],
  [
    "役務の提供時期",
    "各セミナー申込ページに表示する開催日時にオンラインで実施します",
  ],
];

const environment: [string, string][] = [
  ["OS", "Windows 10 以降 / macOS 12 以降 / iOS 16 以降 / Android 10 以降"],
  [
    "ブラウザ",
    "Google Chrome 最新版 / Safari 最新版 / Microsoft Edge 最新版",
  ],
  [
    "配信プラットフォーム",
    "Zoom（事前にアプリのインストールまたは最新版への更新を推奨）",
  ],
  ["インターネット回線", "安定した5Mbps以上の回線を推奨"],
];

const contact: [string, React.ReactNode][] = [
  ["受付方法", "メール"],
  [
    "メールアドレス",
    <a
      key="cmail"
      href="mailto:noreply@isshin-ai.co.jp"
      className="text-coral hover:underline"
    >
      noreply@isshin-ai.co.jp
    </a>,
  ],
  ["受付時間", "平日 10:00〜18:00（土日祝日・年末年始を除く）"],
];

export default function TermsPage() {
  return (
    <LegalPage
      title="特定商取引法に基づく表記"
      updatedAt="2026-05-25"
    >
      <dl className="space-y-6 border-t border-sumi/15 pt-8">
        {baseInfo.map(([k, v], i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 sm:gap-x-8 border-b border-sumi/10 pb-5"
          >
            <dt className="font-mono text-xs tracking-[0.2em] uppercase text-coral font-semibold">
              {k}
            </dt>
            <dd className="text-sm sm:text-base leading-relaxed text-sumi/85">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="font-serif text-xl sm:text-2xl font-semibold mt-16 mb-6">
        返品・キャンセル・返金に関する特約
      </h2>
      <ol className="space-y-4 text-sm sm:text-base leading-loose text-sumi/85 list-decimal pl-6">
        <li>
          本セミナーは、オンラインで提供するライブ配信形式の役務です。
          <strong className="text-sumi-deep">
            お申込み完了後の参加者ご都合によるキャンセルおよび返金は、開催日時に関わらず一切お受けできません。
          </strong>
          クーリングオフ制度の適用はありません（特定商取引法第15条の3）。
        </li>
        <li>
          主催者である当社の都合により当該セミナーを中止した場合は、お支払いいただいた料金を全額返金いたします。
        </li>
        <li>
          通信環境その他参加者側の事情に起因して当日視聴できなかった場合についても、返金は行いません。代替日程の振替も行いません。
        </li>
        <li>
          セミナーの録画・録音・スクリーンショット・資料の二次配布・SNS等への内容転載は、いかなる形式であっても禁止します。違反行為が確認された場合、当社は法的措置を講じることがあります。
        </li>
      </ol>

      <h2 className="font-serif text-xl sm:text-2xl font-semibold mt-16 mb-6">
        動作環境のご案内
      </h2>
      <dl className="space-y-4 border-t border-sumi/15 pt-8">
        {environment.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 sm:gap-x-8 border-b border-sumi/10 pb-5"
          >
            <dt className="font-mono text-xs tracking-[0.2em] uppercase text-coral font-semibold">
              {k}
            </dt>
            <dd className="text-sm sm:text-base leading-relaxed text-sumi/85">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="font-serif text-xl sm:text-2xl font-semibold mt-16 mb-6">
        お問い合わせ窓口
      </h2>
      <dl className="space-y-4 border-t border-sumi/15 pt-8">
        {contact.map(([k, v], i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 sm:gap-x-8 border-b border-sumi/10 pb-5"
          >
            <dt className="font-mono text-xs tracking-[0.2em] uppercase text-coral font-semibold">
              {k}
            </dt>
            <dd className="text-sm sm:text-base leading-relaxed text-sumi/85">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 pt-8 border-t border-sumi/15">
        <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-sumi/55 mb-3">
          注釈
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-sumi/70">
          <strong className="text-sumi/85">
            (注1) 電話番号の開示請求について
          </strong>
          ：本表記では電話番号の公開掲載を省略していますが、特定商取引法に関する法令およびガイドラインに基づき、利用者から請求があった場合は遅滞なく電話番号を開示いたします。請求は上記メールアドレスまでご連絡ください。
        </p>
      </div>
    </LegalPage>
  );
}
