import Link from "next/link";
import Stripe from "stripe";

export const metadata = {
  title: "お申込み完了 — Claude Code 実践セミナー",
};

export const dynamic = "force-dynamic";

type SessionInfo = {
  label: string;
  dateText: string;
  openText: string;
};

const SESSION_MAP: Record<string, SessionInfo> = {
  "2026-06-03": {
    label: "第1回",
    dateText: "2026年6月3日（火）19:00〜21:00",
    openText: "開場 18:50（開催10分前）",
  },
  "2026-06-14": {
    label: "第2回",
    dateText: "2026年6月14日（土）11:00〜13:00",
    openText: "開場 10:50（開催10分前）",
  },
};

async function resolveSessionDate(stripeSessionId: string | undefined) {
  if (!stripeSessionId) return null;
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return null;
  try {
    const stripe = new Stripe(apiKey, { apiVersion: "2026-04-22.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    const key = session.metadata?.sessionDate;
    if (key && SESSION_MAP[key]) return SESSION_MAP[key];
    return null;
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const info = await resolveSessionDate(session_id);

  return (
    <main className="min-h-screen bg-cream text-sumi-deep flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
          Confirmed
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight mb-8">
          お申込みありがとうございます
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-sumi/80 mb-10">
          決済が完了しました。
          <br />
          ご登録のメールアドレス宛に確認メールをお送りしています。
          <br />
          <span className="text-sm text-sumi/60">
            （Zoom URL も本メールに記載しています）
          </span>
        </p>

        <div className="rounded-2xl border border-sumi/15 bg-sumi/[0.02] p-8 sm:p-10 text-left space-y-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
              開催日時
            </p>
            {info ? (
              <>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-coral/80 mb-1">
                  {info.label}
                </p>
                <p className="font-serif text-xl font-semibold">
                  {info.dateText}
                </p>
                <p className="mt-1.5 text-xs text-sumi/55">{info.openText}</p>
              </>
            ) : (
              <p className="font-serif text-base text-sumi/80">
                確認メールに記載しております
              </p>
            )}
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-1.5">
              形式
            </p>
            <p className="font-serif text-xl font-semibold">オンライン（Zoom）</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-sumi/65 leading-relaxed">
          ご質問は{" "}
          <a
            href="mailto:noreply@isshin-ai.co.jp"
            className="text-coral hover:underline"
          >
            noreply@isshin-ai.co.jp
          </a>{" "}
          まで
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-sumi/55 hover:text-coral"
        >
          ← トップへ戻る
        </Link>
      </div>
    </main>
  );
}
