import LegalPage from "@/components/sections/LegalPage";

export const metadata = {
  title: "特定商取引法に基づく表記 — Claude Code Campus",
};

export default function TermsPage() {
  return (
    <LegalPage title="特定商取引法に基づく表記" updatedAt="2026-05-22（仮）">
      <p className="text-sm sm:text-base leading-loose text-sumi/85 mb-6">
        本ページは仮文言です。本番公開前に正式版へ差し替え予定。
      </p>

      <dl className="space-y-8 border-t border-sumi/15 pt-8">
        {[
          ["販売事業者", "Claude Code Campus 運営事務局"],
          ["運営責任者", "（記載予定）"],
          ["所在地", "（記載予定）"],
          ["連絡先", "hello@cccampus.jp"],
          ["販売価格", "各セミナーページに表示（税込）"],
          ["価格以外の必要料金", "なし"],
          ["お支払い方法", "クレジットカード決済（申込フォームの案内に従ってください）"],
          ["商品引渡し時期", "申込完了後、開催日前日までに Zoom URL と事前資料をメールで配布"],
          ["返品・キャンセル", "（開催◯日前まで全額返金 / 以降は△△、詳細は記載予定）"],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-2 sm:gap-x-8 border-b border-sumi/10 pb-6">
            <dt className="font-mono text-xs tracking-[0.2em] uppercase text-coral font-semibold">{k}</dt>
            <dd className="text-sm sm:text-base leading-relaxed text-sumi/85">{v}</dd>
          </div>
        ))}
      </dl>
    </LegalPage>
  );
}
