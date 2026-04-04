export { auth as middleware } from "@/auth";

export const config = {
  // Protect /dashboard and all its sub-routes
  matcher: ["/dashboard/:path*"],
};
