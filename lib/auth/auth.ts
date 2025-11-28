import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
// import { createAuthMiddleware } from "better-auth/api";
import { twoFactor } from "better-auth/plugins/two-factor";
import { passkey } from "@better-auth/passkey";
import { admin as adminPlugin } from "better-auth/plugins/admin";
import { ac, admin, user } from "@/utils/auth/permissions";
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
  appName: "Donald Louch",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  trustedOrigins: ["https://localhost:3000", "https://donaldlouch.ca", "https://*.donaldlouch.ca", "https://*.vercel.app"],
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/mail/sendUserEmail`, {
            method: 'POST',
            body: JSON.stringify({
              user: { ...user, email: newEmail },
              url,
              type: "emailChange",
            }),
        })
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/mail/sendUserEmail`, {
            method: 'POST',
            body: JSON.stringify({
              user,
              url,
              type: "deleteAccount",
            }),
        })
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/mail/sendUserEmail`, {
          method: 'POST',
          body: JSON.stringify({
            user,
            url,
            type: "passwordReset",
          }),
      })
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await fetch( `${process.env.NEXT_PUBLIC_BASE_URL!}/api/mail/sendUserEmail`, {
          method: 'POST',
          body: JSON.stringify({
            user,
            url,
            type: "emailVerification",
          }),
      })
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute
    },
  },
  plugins: [
    nextCookies(),
    twoFactor(),
    passkey(),
    multiSession(),
    adminPlugin({
      ac,
        roles: {
          admin,
          user,
        },
    })
  ],
  database: new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),
  // TODO: Fix Hooks
  // hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path.startsWith("/signup")) {
  //       const user = ctx.context.newSession?.user ?? {
  //         name: ctx.body.name,
  //         email: ctx.body.email,
  //       };

  //       if (user != null) {
  //         await fetch('/api/mail/sendUserEmail', {
  //             method: 'POST',
  //             body: JSON.stringify({
  //               user,
  //               type: "welcomeEmail",
  //             }),
  //         })
  //       }
  //     }
  //   }),
  // },
})
