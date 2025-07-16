import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    publicRoutes: ["/"], 
});

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - static files (/_next/static/)
     * - api routes (/api/)
     */
    "/((?!.*\\..*|_next|api).*)",
  ],
};
