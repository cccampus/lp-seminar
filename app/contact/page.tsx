import LegalPage from "@/components/sections/LegalPage";

export const metadata = {
  title: "お問い合わせ — Claude Code Campus",
};

export default function ContactPage() {
  return (
    <LegalPage title="お問い合わせ" updatedAt="2026-05-22（仮）">
      <p className="text-sm sm:text-base leading-loose text-sumi/85 mb-12">
        本ページは仮文言です。本番公開前にフォーム接続等の正式版へ差し替え予定。
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-4">
            セミナー全般のご質問
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-sumi/80 mb-4">
            ご参加可否・内容・配信形式についてのご質問は、下記のメールアドレスまで
            お気軽にどうぞ。原則 2 営業日以内にご返信します。
          </p>
          <a
            href="mailto:hello@cccampus.jp"
            className="inline-flex items-center gap-2 font-serif text-lg text-coral hover:text-coral-deep"
          >
            hello@cccampus.jp
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
        </section>

        <section className="border-t border-sumi/15 pt-12">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-4">
            法人参加・社内勉強会のご相談
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-sumi/80 mb-4">
            2 名以上のご参加、社内勉強会としての共有、録画の社内配布など、
            個別にご相談を承ります。会社名・お役職・想定人数を添えてご連絡ください。
          </p>
          <a
            href="mailto:hello@cccampus.jp?subject=法人参加のご相談"
            className="inline-flex items-center gap-2 font-serif text-lg text-coral hover:text-coral-deep"
          >
            hello@cccampus.jp
            <span className="font-mono text-xs tracking-[0.2em]">↗</span>
          </a>
        </section>
      </div>
    </LegalPage>
  );
}
