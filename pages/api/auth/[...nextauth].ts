import NextAuth from "next-auth"
// import EmailProvider from 'next-auth/providers/email'
import ZohoProvider from 'next-auth/providers/zoho'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import AppleProvider from "next-auth/providers/apple";

// import { SignJWT } from "jose";
// import { createPrivateKey } from "crypto";

// interface generateSecretArgs {
//   teamId: string;
//   privateKey: string;
//   clientId: string;
//   keyId: string;
//   expiresIn?: number;
// }

// export async function generateSecret({
//   teamId,
//   privateKey,
//   clientId,
//   keyId,
//   expiresIn = 86400 * 180,
// }: generateSecretArgs) {
//   const exp = Math.ceil(Date.now() / 1000) + expiresIn;

//   /**
//    * How long is the secret valid in seconds.
//    * @default 15780000
//    */
//   const expiresAt = Math.ceil(Date.now() / 1000) + expiresIn;
//   const expirationTime = exp ?? expiresAt;
//   console.log(
//     `Apple client secret generated. Valid until: ${new Date(
//       expirationTime * 1000
//     )}`
//   );
//   return new SignJWT({})
//     .setAudience("https://appleid.apple.com")
//     .setIssuer(teamId)
//     .setIssuedAt()
//     .setExpirationTime(expirationTime)
//     .setSubject(keyId)
//     .setProtectedHeader({ alg: "ES256", kid: keyId, typ: "JWT" })
//     .sign(createPrivateKey(privateKey.replace(/\\n/g, "\n")));
// }
// import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// const getAppleToken = async () => {
//   const appleToken = await new SignJWT({})
//     .setAudience("https://appleid.apple.com")
//     .setIssuer(process.env.APPLE_TEAM_ID)
//     .setIssuedAt(new Date().getTime() / 1000)
//     .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
//     .setSubject(process.env.APPLE_ID)
//     .setProtectedHeader({
//       alg: "ES256",
//       kid: process.env.APPLE_KEY_ID,
//     })
//     .sign(createPrivateKey(process.env.APPLE_PRIVATE_KEY));
//   return appleToken;
// };
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
      // clientSecret: await generateSecret({
      //   clientId: process.env.APPLE_ID, // my unique service identifier
      //   keyId: process.env.APPLE_KEY_ID, // Private Key ID from apple developer account
      //   teamId: process.env.APPLE_TEAM_ID, // Team ID from my apple developer account
      //   privateKey: process.env.APPLE_SECRET!,
      // }),
      clientSecret: process.env.APPLE_SECRET!,
      authorization: {
        params: {
          response_type: "code id_token",
          response_mode: "form_post",
          scope: "name email",
          client_id: process.env.APPLE_ID,
        },
      },
    }),
  ],

  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
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
    async jwt({ token, account }: any) {
      console.log(token, account);
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }
    },
    async session({ session, user, sessionToken }: any) {
      session.user.userLevel = user.userLevel as number;
      // session.user.username = user.username as string;
      return Promise.resolve({ ...session, ...user, ...sessionToken });
    },
    // async session({ session, token, user }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
    // async signIn({ profile, email }: any) {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       email
    //     }
    //   })

    //   if (provider.name === "Apple") {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: profile.email,
    //   },
    // })
    // if (!user) {
    //   return false
    // }
    // return true
    // if(!user) return false

    // if(user?.userLevel == 0) return true

    // return false

    //       //Create new user and account
    //       await prisma.user.create({
    //         data: {
    //           name: profile.name,
    //           email,
    //           accounts: {
    //             create: {
    //               type: provider.type,
    //               provider: provider.id,
    //               providerAccountId: profile.sub,
    //             },
    //           },
    //         },
    //       });
    //     }
    //     return true;
    //   }

    //   // let providerID = null
    //   // if (provider.name === "Zoho") {
    //   //   providerID = profile.ZUID
    //   // } else if (provider.name === "Apple") {
    //   //   providerID = "SOMEID"
    //   // }
    //   // try {

    //   //   const user = await prisma.user.findUnique({
    //   //     where: {
    //   //       email,
    //   //     },
    //   //   })

    //     // if (!user) {
    //       // throw new Error('User not found')
    //       // await prisma.user.create({
    //       //    data: {
    //       //      email: profile.email,
    //       //      accounts: {
    //       //       create: {
    //       //        type: profile.type,
    //       //        provider: profile.provider ? profile.provider : profile.name,
    //       //        providerAccountId: profile.providerAccountId
    //       //          ? profile.providerAccountId
    //       //          : profile.sub,
    //       //       }
    //       //      },
    //       //    },
    //       //  })
    //       //  console.log(profile)
    //       //  .then(JSON.parse(JSON.stringify(this)));
    //       // await prisma.account.create({
    //       //   data: {
    //       //     userId: newUser.id,
    //       //     type: profile.type,
    //       //     provider: profile.provider ?  profile.provider : profile.name,
    //       //     providerAccountId: profile.providerAccountId ? profile.providerAccountId : profile.sub,
    //       //   }
    //       // })
    //     // }
    //     // console.log(profile)

    //     return true;
    //   // } catch (error: any) {
    //   //   console.log("Error checking if user exists: ", error.message);
    //   //   return false;
    //   // }

    //   // console.log(user, account, profile, email);
    // return true;
    // },
    // async jwt({token, user, account, profile}: any) {
    //     if (token) {
    //       return Promise.resolve({ ...token, ...user, ...account, ...profile });
    //     }
    //   }
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

  useSecureCookies: false,
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