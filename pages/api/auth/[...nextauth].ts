import NextAuth from "next-auth"
// import EmailProvider from 'next-auth/providers/email'
import ZohoProvider from 'next-auth/providers/zoho'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import AppleProvider from "next-auth/providers/apple";
// import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     // @ts-ignore
    //     port: process.env.EMAIL_SERVER_PORT,
    //     secure: true,
    //   auth: {
    //     type: 'OAuth2',
    //     user: process.env.EMAIL_SERVER_USER,
    //     serviceClient: process.env.EMAIL_SERVICE_CLIENT,
    //     privateKey: process.env.EMAIL_PRIVATE_KEY,
    //   }
    //   },
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: async ({
    //     identifier: email,
    //     url,
    //     provider: { server, from },
    //   }) => {
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: email,
    //       },
    //     })
    //     if (!user) {
    //       throw new Error('User not found')
    //     } else {
    //       const { host } = new URL(url)
    //       const transport = nodemailer.createTransport(server)
    //       await transport.sendMail({
    //         to: email,
    //         from,
    //         subject: `Sign in to ${host}`,
    //         text: text({ url, host }),
    //         html: html({ url, host, email }),
    //       })
    //     }

    //     /*const { host } = new URL(url);
    //     const transport = nodemailer.createTransport(server);
    //     await transport.sendMail({
    //       to: email,
    //       from,
    //       subject: `Sign in to ${host}`,
    //       text: text({ url, host }),
    //       html: html({ url, host, email }),
    //     });*/
    //   },
    // // }),
    // }),
    ZohoProvider({
      clientId: process.env.ZOHO_CLIENT_ID,
      clientSecret: process.env.ZOHO_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      // @ts-ignore
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "database",
  },

  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    secret: process.env.JWT_SIGNING_PUBLIC_KEY,
  },

  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: "/login", // Displays signin buttons
    // signOut: "/login", // Displays form with sign out button
    // error: '/error', // Error code passed in query string as ?error=
    // verifyRequest: "/email", // Used for check email page
    // newUser: '/signup' // If set, new users will be directed here on first sign in
  },

  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async session({ session, user }: any) {
      session.user.userLevel = user.userLevel as number;
      // session.user.username = user.username as string;
      return Promise.resolve(session);
    },
    async signIn({ profile, email, provider, error }: any) {
      if (provider.name === "Apple") {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          //Create new user and account
          await prisma.user.create({
            data: {
              name: profile.name,
              email,
              accounts: {
                create: {
                  type: provider.type,
                  provider: provider.id,
                  providerAccountId: profile.sub,
                },
              },
            },
          });
        }
        return true;
      }
      alert(error)
      alert(profile)

      // let providerID = null
      // if (provider.name === "Zoho") {
      //   providerID = profile.ZUID
      // } else if (provider.name === "Apple") {
      //   providerID = "SOMEID"
      // }
      // try {

      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email,
      //     },
      //   })

        // if (!user) {
          // throw new Error('User not found')
          // await prisma.user.create({
          //    data: {
          //      email: profile.email,
          //      accounts: {
          //       create: {
          //        type: profile.type,
          //        provider: profile.provider ? profile.provider : profile.name,
          //        providerAccountId: profile.providerAccountId
          //          ? profile.providerAccountId
          //          : profile.sub,
          //       }
          //      },
          //    },
          //  })
          //  console.log(profile)
          //  .then(JSON.parse(JSON.stringify(this)));
          // await prisma.account.create({
          //   data: {
          //     userId: newUser.id,
          //     type: profile.type,
          //     provider: profile.provider ?  profile.provider : profile.name,
          //     providerAccountId: profile.providerAccountId ? profile.providerAccountId : profile.sub,
          //   }
          // })
        // }
        // console.log(profile)

        return true;
      // } catch (error: any) {
      //   console.log("Error checking if user exists: ", error.message);
      //   return false;
      // }

      // console.log(user, account, profile, email);
      // return true;
    },
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified && profile.email.endsWith("@donaldlouch.ca")
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // },
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // https://next-auth.js.org/configuration/events
  events: {},

  debug: true,
});

// Email HTML body
// function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
//   const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
//   const escapedHost = `${host.replace(/\./g, '&#8203;.')}`;

//   const backgroundColor = '#f9f9f9';
//   const textColor = '#444444';
//   const mainBackgroundColor = '#ffffff';
//   const buttonBackgroundColor = '#346df1';
//   const buttonBorderColor = '#346df1';
//   const buttonTextColor = '#ffffff';

//   return `
// <body style="background: ${backgroundColor};">
//   <table width="100%" border="0" cellspacing="0" cellpadding="0">
//     <tr>
//       <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px;@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif;; color: ${textColor};">
//         <strong>Your Magic Link For: ${escapedHost}</strong>
//       </td>
//     </tr>
//   </table>
//   <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
//     <tr>
//       <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px;@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif;; color: ${textColor};">
//         Sign in as <strong>${escapedEmail}</strong> on ${escapedHost}
//       </td>
//     </tr>
//     <tr>
//       <td align="center" style="padding: 20px 0;">
//         <table border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px;@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif;; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in on ${escapedHost}</a></td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//     <tr>
//       <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif;; color: ${textColor};">
//         If you did not request this email you can safely ignore it.
//       </td>
//     </tr>
//   </table>
// </body>
// `;
// }

// function text({ url, host }: Record<'url' | 'host', string>) {
//   return `Sign in to ${host}\n${url}\n\n`;
// }