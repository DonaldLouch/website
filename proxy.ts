import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
export async function proxy() {
    await auth.api.getSession({
        headers: await headers()
    })
    return NextResponse.next()
    // if(!session) {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }
    // return NextResponse.next();
}
export const config = {
  runtime: "nodejs", // Required for auth.api calls
  matcher: ["/admin"], // Specify the routes the middleware applies to
};