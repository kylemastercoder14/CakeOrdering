import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/",
  "/sso-callback",
  "/admin(.*)",
  "/about-us",
  "/blogs",
  "/faqs",
  "/privacy-policy",
  "/products(.*)",
  "/return-policy",
  "/terms-condition",
  "/contact-us",
  "/api/dashboard(.*)",
]);

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  },
  {
    afterSignInUrl: "/",
    afterSignUpUrl: "/",
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
