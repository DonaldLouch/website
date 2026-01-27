import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth/auth";

export const authMiddleware = createMiddleware().server(
    async ({ next, request }) => {
        const headers = getRequestHeaders();
        const session = await auth.api.getSession({ headers })
        const redirectURL = new URL(request.url).pathname
        const hasAccess = await auth.api.userHasPermission({
            headers,
            body: { permission: { user: ["list"] } },
        })
        const adminAccess = session && hasAccess.success ? true : false
        if (!adminAccess) {
            throw redirect({ to: "/auth", search: { message: "NoAccess", returnTo: redirectURL } });
        }
        return await next()
    }
);