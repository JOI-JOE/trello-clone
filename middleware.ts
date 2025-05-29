import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/organization/:orgId(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();

  const pathname = req.nextUrl.pathname;

  // ✅ Nếu chưa login mà vào route được bảo vệ → chuyển về sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // ✅ Nếu đã login mà chưa chọn tổ chức → ép về trang chọn org
  if (userId && !orgId && pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  // ✅ Nếu đã login + vào route được bảo vệ, nhưng chưa có org → redirect (như trên)
  // ❌ Không cần ép redirect nếu đã có org và đang ở đúng org rồi

  return NextResponse.next(); // Cho phép đi tiếp bình thường
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
