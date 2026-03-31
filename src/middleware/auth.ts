import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth/auth";

export const authMiddleware = createMiddleware().server(
    async ({ next, request }) => {
        const headers = getRequestHeaders();
        const redirectURL = new URL(request.url).pathname
        const session = await auth.api.getSession({ headers })
        const adminAccess = session && session?.user.role === "admin"? true : false
        const url = new URL(request.url)
        const pathname = url.pathname // This is your path (e.g., "/about")
        // const adminAccess = session ? true : false
        if (!adminAccess && !pathname.includes("/admin/profile")) {
            throw redirect({ to: "/auth", search: { message: "NoAccess", returnTo: redirectURL } });
        }
        return await next()
    }
);