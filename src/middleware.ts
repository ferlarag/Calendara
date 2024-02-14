import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { type NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: [
    "/b/:businessID/:path*",
    "/dashboard/:path*",
    "/dashboard/:businessID/:path*",
    "/new/:path*",
    "/edit/:eventID/:path*",
  ],
};
