import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// /dashboard/* と /api/dashboard/* を Basic Auth で保護
export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (!pathname.startsWith("/dashboard") && !pathname.startsWith("/api/dashboard")) {
    return NextResponse.next();
  }

  const user = process.env.DASHBOARD_USER;
  const pass = process.env.DASHBOARD_PASS;
  if (!user || !pass) {
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

  if (reqUser !== user || reqPass !== pass) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="CCC Seminar Dashboard"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
