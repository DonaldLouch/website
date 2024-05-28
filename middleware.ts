import {
  clerkMiddleware,
  createRouteMatcher
} from "@clerk/nextjs/server";

// const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
// const isAdminRoute = createRouteMatcher(["/portal(.*)"])
// const { orgId, orgPermissions, orgRole, orgSlug } = auth(); 
// publicRoutes: [
//     "/",
//     "/about",
//     "/blog",
//     "/(post)(.*)",
//     "/(portfolio)(.*)",
//     "/jobs",
//     "/(T)(.*)",
//     "/(C)(.*)",
//     "/(api)(.*)",
//     "/(feed)(.*)",
//     "/(video)(.*)",
//     // "/(embed)(.*)",
//     "/(photo)(.*)",
//     "/(album)(.*)",
//     "/(portal)(.*)",
//   ],
export default clerkMiddleware({
  // publicRoutes: [
  //   "/",
  //   "/about",
  //   "/blog",
  //   "/(post)(.*)",
  //   "/(portfolio)(.*)",
  //   "/jobs",
  //   "/(T)(.*)",
  //   "/(C)(.*)",
  //   "/(api)(.*)",
  //   "/(feed)(.*)",
  //   "/(video)(.*)",
  //   // "/(embed)(.*)",
  //   "/(photo)(.*)",
  //   "/(album)(.*)",
  //   "/(portal)(.*)",
  // ],

  // Restrict admin route to users with specific role
  // const { orgId, orgPermissions, orgRole, orgSlug } = auth();
  // // console.log(auth);
  // && orgId === process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID;
  // // console.log(orgId === process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID);
  // const { has } =auth();
  // if (isAdminRoute(req))auth().has({ permission: "org:portal:access" });
  // if (isAdminRoute(req)) auth().protect();

  // Restrict dashboard routes to logged in users
  // if (isDashboardRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// import type { NextRequest } from "next/server";
// import type { Database } from "@/lib/database.types";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient<Database>({ req, res });
//   await supabase.auth.getSession();
//   return res;
// }
