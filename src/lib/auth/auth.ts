import { betterAuth } from "better-auth";
import { Pool } from "pg";
// import { nextCookies } from "better-auth/next-js";
// import { createAuthMiddleware } from "better-auth/api";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { twoFactor } from "better-auth/plugins/two-factor";
import { passkey } from "@better-auth/passkey";
import { admin as adminPlugin } from "better-auth/plugins/admin";
import { ac, admin, user } from "@/utils/auth/permissions";
import { multiSession } from "better-auth/plugins";
import { SendEmail } from "@/actions/email.server";
import { createAuthMiddleware } from "@better-auth/core/api";

export const auth = betterAuth({
  appName: "Donald Louch",
  baseURL: process.env.VITE_WEB_URI!,
  trustedOrigins: [
    "https://localhost:3000",
    "*.donaldlouch.ca",
    "https://beta.donaldlouch.ca",
    "https://*.vercel.app",
  ],
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        await SendEmail({ data: { type: "auth", body: {user: { ...user, email: newEmail }, url, authType: "emailChange"} } })
        // await fetch(
        //   `${process.env.VITE_SITE_URL!}/api/mail/sendUserEmail`,
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       user: { ...user, email: newEmail },
        //       url,
        //       type: "emailChange",
        //     }),
        //   },
        // );
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await SendEmail({ data: { type: "auth", body: {user, url, authType: "deleteAccount"} } })
        // await fetch(
        //   `${process.env.VITE_SITE_URL!}/api/mail/sendUserEmail`,
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       user,
        //       url,
        //       type: "deleteAccount",
        //     }),
        //   },
        // );
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await SendEmail({ data: { type: "auth", body: {user, url, authType: "passwordReset"} } })
      // await fetch(
      //   `${process.env.VITE_SITE_URL!}/api/mail/sendUserEmail`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       user,
      //       url,
      //       type: "passwordReset",
      //     }),
      //   },
      // );
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await SendEmail({ data: { type: "auth", body: {user, url, authType: "emailVerification"} } })
      // await fetch(
      //   `${process.env.VITE_SITE_URL!}/api/mail/sendUserEmail`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       user,
      //       url,
      //       type: "emailVerification",
      //     }),
      //   },
      // );
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute
    },
  },
  plugins: [
    tanstackStartCookies(),
    twoFactor(),
    passkey(),
    multiSession(),
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
  database: new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),
  // hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path.startsWith("/auth?signup")) {
  //       const user = ctx.context.newSession?.user ?? {
  //         name: ctx.body.name,
  //         email: ctx.body.email,
  //       };

  //       if (user != null) {
  //         await SendEmail({ data: { type: "auth", body: {user, authType: "welcomeEmail"} } })
  //       }
  //     }
  //   })
  // }
});
