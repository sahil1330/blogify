import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/"]);

// const isPublicApiRoute = createRouteMatcher(["/api"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  // console.log(userId);
  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === "/dashboard";
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  if (isProtectedRoute(req)) await auth.protect();
  // If user is logged in and accessing a public route but not the dashboard
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  //not logged in
  if (!userId) {
    // If user is not logged in and trying to access a protected route
    if (!isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    // If the request is for a protected API and the user is not logged in
    if (isApiRequest) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.*\\..*|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
