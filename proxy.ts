import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// /dashboard/* と /api/dashboard/* を Basic Auth で保護
// admin (kiyotakka) / guest (guest) の2ロール対応、ヘッダーに role を流す
export function proxy(req: NextRequest) {
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
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
