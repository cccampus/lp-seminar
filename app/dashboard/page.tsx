import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  name: string;
  email: string;
  company: string;
  amount: number;
  createdMs: number;
  sessionDate: string;
  sessionLabel: string;
};

const SESSION_LABELS: Record<string, string> = {
  "2026-06-03": "第1回 (6/3 水 19:00)",
  "2026-06-14": "第2回 (6/14 日 11:00)",
};

async function getRows(): Promise<Row[]> {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return [];
  const stripe = new Stripe(apiKey, { apiVersion: "2026-04-22.dahlia" });

  const rows: Row[] = [];
  let hasMore = true;
  let starting_after: string | undefined;
  while (hasMore) {
    const res: Stripe.ApiList<Stripe.Checkout.Session> = await stripe.checkout.sessions.list({
      limit: 100,
      starting_after,
    });
    for (const s of res.data) {
      if (s.payment_status !== "paid") continue;
      const sessionDate = s.metadata?.sessionDate || "";
      const companyField = s.custom_fields?.find((f) => f.key === "company");
      rows.push({
        id: s.id,
        name: s.customer_details?.name || "(未取得)",
        email: s.customer_details?.email || "",
        company: companyField?.text?.value || "(未記入)",
        amount: s.amount_total || 0,
        createdMs: (s.created || 0) * 1000,
        sessionDate,
        sessionLabel: SESSION_LABELS[sessionDate] || sessionDate || "(未確定)",
      });
    }
    hasMore = res.has_more;
    starting_after = res.data.length > 0 ? res.data[res.data.length - 1].id : undefined;
    if (!starting_after) break;
  }
  // 新しい順
  rows.sort((a, b) => b.createdMs - a.createdMs);
  return rows;
}

function formatJPY(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function formatJST(ms: number): string {
  if (!ms) return "—";
  const d = new Date(ms);
  const y = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric" });
  const mo = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", month: "2-digit" });
  const da = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", day: "2-digit" });
  const hh = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", hour12: false });
  const mm = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", minute: "2-digit" });
  return `${y}/${mo.padStart(2, "0")}/${da.padStart(2, "0")} ${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;
}

export default async function DashboardPage() {
  const rows = await getRows();
  const totalRevenue = rows.reduce((s, r) => s + r.amount, 0);
  const totalCount = rows.length;
  const session1Count = rows.filter((r) => r.sessionDate === "2026-06-03").length;
  const session2Count = rows.filter((r) => r.sessionDate === "2026-06-14").length;
  const otherCount = rows.filter(
    (r) => r.sessionDate !== "2026-06-03" && r.sessionDate !== "2026-06-14",
  ).length;

  return (
    <div className="min-h-screen bg-sumi-deep text-cream py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-coral mb-2">
            CCC Seminar — Internal Dashboard
          </p>
          <h1
            className="font-serif text-3xl sm:text-4xl font-semibold leading-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            申込状況
          </h1>
          <p className="mt-3 text-xs text-cream/55">
            Stripe API 経由 / リロードで最新化 / 関係者限定
          </p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <KpiCard label="売上合計" value={formatJPY(totalRevenue)} />
          <KpiCard label="申込数" value={`${totalCount}名`} />
          <KpiCard label="第1回 (6/3 水)" value={`${session1Count}名`} />
          <KpiCard label="第2回 (6/14 日)" value={`${session2Count}名`} />
        </div>

        {otherCount > 0 && (
          <p className="text-xs text-coral/80 mb-6">
            ⚠ 日程未確定/その他: {otherCount}件 (metadata.sessionDate 未登録の可能性)
          </p>
        )}

        {/* リスト */}
        <div className="bg-cream/[0.03] border border-cream/15 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream/[0.05] border-b border-cream/15">
                <tr>
                  <Th>決済日時 (JST)</Th>
                  <Th>名前</Th>
                  <Th>会社</Th>
                  <Th>金額</Th>
                  <Th>日程</Th>
                  <Th>メール</Th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-cream/50">
                      まだ申込はありません
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="border-b border-cream/10 hover:bg-cream/[0.04]">
                      <Td mono>{formatJST(r.createdMs)}</Td>
                      <Td>{r.name}</Td>
                      <Td>{r.company}</Td>
                      <Td mono>{formatJPY(r.amount)}</Td>
                      <Td>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-coral/40 text-[11px] text-coral">
                          <span className="h-1 w-1 rounded-full bg-coral" />
                          {r.sessionLabel}
                        </span>
                      </Td>
                      <Td mono>
                        <a
                          href={`mailto:${r.email}`}
                          className="text-cream/75 hover:text-coral"
                        >
                          {r.email}
                        </a>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-10 text-xs text-cream/40 text-center">
          Stripe Checkout Sessions API / payment_status = paid のみ表示
        </p>
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream/[0.03] border border-cream/15 rounded-lg px-5 py-5">
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-coral/85 mb-2">
        {label}
      </p>
      <p
        className="font-serif text-2xl sm:text-3xl font-semibold text-cream"
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.15em] uppercase text-coral/80">
      {children}
    </th>
  );
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={`px-4 py-3 text-cream/85 ${mono ? "font-mono text-xs" : ""}`}>
      {children}
    </td>
  );
}

export const metadata = {
  title: "Dashboard — CCC Seminar",
  robots: { index: false, follow: false },
};
