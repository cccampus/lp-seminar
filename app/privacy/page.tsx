import LegalPage from "@/components/sections/LegalPage";

export const metadata = {
  title: "プライバシーポリシー — Claude Code Campus",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="プライバシーポリシー" updatedAt="2026-05-22（仮）">
      <p className="text-sm sm:text-base leading-loose text-sumi/85 mb-6">
        本ページは仮文言です。本番公開前に正式版へ差し替え予定。
      </p>

      <h2 className="font-serif text-xl font-semibold mt-12 mb-4">1. 取得する個人情報</h2>
      <p className="text-sm sm:text-base leading-loose text-sumi/75">
        Claude Code Campus（以下「当方」）は、セミナー申込・お問い合わせの際に、お名前・
        メールアドレス・会社名（任意）・お申込みの目的等の情報を取得します。
      </p>

      <h2 className="font-serif text-xl font-semibold mt-12 mb-4">2. 利用目的</h2>
      <p className="text-sm sm:text-base leading-loose text-sumi/75">
        取得した個人情報は、セミナーの開催連絡・資料配布・お問い合わせへの回答・
        次回開催のご案内（任意）の目的に限定して利用します。
      </p>

      <h2 className="font-serif text-xl font-semibold mt-12 mb-4">3. 第三者提供</h2>
      <p className="text-sm sm:text-base leading-loose text-sumi/75">
        ご本人の同意がない限り、第三者への提供は行いません。
      </p>

      <h2 className="font-serif text-xl font-semibold mt-12 mb-4">4. お問い合わせ窓口</h2>
      <p className="text-sm sm:text-base leading-loose text-sumi/75">
        個人情報の取扱いに関するお問い合わせは、
        <a href="/contact" className="text-coral hover:underline">お問い合わせ窓口</a> までご連絡ください。
      </p>
    </LegalPage>
  );
}
