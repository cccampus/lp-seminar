import Link from "next/link";
import Stripe from "stripe";
import {
  buildSeminarSessionMap,
  type SeminarSessionInfo,
} from "@/lib/seminar-sessions";

export const metadata = {
  title: "お申込み完了 — Claude Code 実践セミナー",
};

export const dynamic = "force-dynamic";

async function resolveSessionInfo(
  stripeSessionId: string | undefined
): Promise<SeminarSessionInfo | null> {
  if (!stripeSessionId) return null;
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return null;
  try {
    const stripe = new Stripe(apiKey, { apiVersion: "2026-04-22.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    const key = session.metadata?.sessionDate;
    if (!key) return null;
    const map = buildSeminarSessionMap();
    return map[key] ?? null;
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
  const info = await resolveSessionInfo(session_id);
  const hasZoom = !!(info && info.zoomUrl && info.zoomId && info.zoomPw);

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
          <span className="text-sm text-sumi/65">
            Zoom 参加情報を下記にも表示しています。
            <br />
            ブックマーク・スクリーンショット推奨です。
          </span>
        </p>

        <div className="rounded-2xl border border-sumi/15 bg-sumi/[0.02] p-8 sm:p-10 text-left space-y-6">
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

          {hasZoom && info ? (
            <div className="border-t border-sumi/15 pt-6 space-y-3">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold">
                Zoom 参加情報
              </p>
              <div className="space-y-2.5 text-sm">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-sumi/55 mb-1">
                    URL
                  </p>
                  <a
                    href={info.zoomUrl}
                    className="font-mono text-xs sm:text-sm text-coral hover:underline break-all"
                  >
                    {info.zoomUrl}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-sumi/55 mb-1">
                    ミーティングID
                  </p>
                  <p className="font-mono text-base font-semibold text-sumi-deep">
                    {info.zoomId}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-sumi/55 mb-1">
                    パスコード
                  </p>
                  <p className="font-mono text-base font-semibold text-sumi-deep">
                    {info.zoomPw}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t border-sumi/15 pt-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-2">
                Zoom 参加情報
              </p>
              <p className="text-sm text-sumi/75 leading-relaxed">
                開催前日までに、ご登録のメールアドレス宛にお送りいたします。
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-coral/30 bg-coral/[0.04] p-5 text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-coral font-semibold mb-2">
            メールが届かない場合
          </p>
          <p className="text-sm text-sumi/75 leading-relaxed">
            確認メールが受信箱に見当たらない場合は、迷惑メール /
            プロモーション / ゴミ箱フォルダもご確認ください。
            <br />
            上記の Zoom 参加情報があれば当日ご参加いただけます。
          </p>
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
