import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CCC 会員の紹介リンク受け口（?ref=xxx）→ Cookie 30日保存 + クエリ落としてリダイレクト
function handleReferral(req: NextRequest): NextResponse | null {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return null;
  if (!/^[a-zA-Z0-9_-]{6,12}$/.test(ref)) return null;

  const url = req.nextUrl.clone();
  url.searchParams.delete("ref");
  url.searchParams.delete("utm_source");
  url.searchParams.delete("utm_medium");
  url.searchParams.delete("utm_campaign");

  const res = NextResponse.redirect(url);
  res.cookies.set("ccc_referral_code", ref, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });
  return res;
}

// /dashboard/* と /api/dashboard/* を Basic Auth で保護
// admin (kiyotakka) / guest (guest) の2ロール対応、ヘッダーに role を流す
export function proxy(req: NextRequest) {
  // 紹介リンク処理（全パスで先行）
  const refResponse = handleReferral(req);
  if (refResponse) return refResponse;

  const pathname = req.nextUrl.pathname;
  if (!pathname.startsWith("/dashboard") && !pathname.startsWith("/api/dashboard")) {
    return NextResponse.next();
  }

  const adminUser = process.env.DASHBOARD_USER;
  const adminPass = process.env.DASHBOARD_PASS;
  const guestUser = process.env.DASHBOARD_GUEST_USER;
  const guestPass = process.env.DASHBOARD_GUEST_PASS;

  if (!adminUser || !adminPass) {
    return new NextResponse("Dashboard not configured", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="CCC Seminar Dashboard"' },
    });
  }

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return new NextResponse("Invalid auth header", { status: 401 });
  }
  const idx = decoded.indexOf(":");
  const reqUser = idx >= 0 ? decoded.slice(0, idx) : "";
  const reqPass = idx >= 0 ? decoded.slice(idx + 1) : "";

  let role: "admin" | "guest" | null = null;
  if (reqUser === adminUser && reqPass === adminPass) {
    role = "admin";
  } else if (guestUser && guestPass && reqUser === guestUser && reqPass === guestPass) {
    role = "guest";
  }

  if (!role) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="CCC Seminar Dashboard"' },
    });
  }

  // ロールを下流に渡す
  const fwd = new Headers(req.headers);
  fwd.set("x-dashboard-role", role);
  return NextResponse.next({ request: { headers: fwd } });
}

export const config = {
  // dashboard + 全ページ（?ref= 受け口のため）
  // _next / api / 静的ファイルは除外
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
