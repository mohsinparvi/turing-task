import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    const session = req.cookies.get("accessToken");
    if (req.nextUrl.pathname.startsWith("/calls")) {
      if (!session) {
        console.log("No session data found, redirecting to login");
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    // Auth routes (login/signup)
    if (req.nextUrl.pathname.startsWith("/auth")) {
      if (session) {
        console.log("Session exists on auth route, redirecting to dashboard");
        return NextResponse.redirect(new URL("/calls", req.url));
      }
    }

    return res;
  } catch (error) {
    console.error("Middleware Error:", error);
    return res;
  }
}

export const config = {
  matcher: ["/calls:path*", "/auth/:path*"],
};
