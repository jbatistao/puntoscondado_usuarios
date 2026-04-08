import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isRootRoute = req.nextUrl.pathname === "/";

  if (isRootRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  // Protect /dashboard and all its sub-routes, and check root for redirect
  matcher: ["/", "/dashboard/:path*"],
};
