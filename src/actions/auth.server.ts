import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "../lib/auth/auth"
import { string } from "zod";
// import { headers } from "next/headers"
// import { redirect } from "next/navigation"

interface UserAuthPayload {
    email: string
    password: string
}

interface UserSignup extends UserAuthPayload {
    name: string
}

type AdminAccess = {
    redirectDisabled?: boolean
    specialPermission?: any
}

// export async function signUpUser({name, email, password}: UserSignup): Promise<any> {  
//    try {
//         await auth.api.signUpEmail({
//             body: { 
//                 name: name,
//                 email: email, 
//                 password: password, 
//                 callbackURL: "/auth" 
//             }
//         })
//         return {message: "User Signed Up", code: 200}
//     } catch (error: any) {
//         return {message: error.message, code: error.status || 500}
//     }
// }

// const headers = getRequestHeaders();

export const signInUser = createServerFn({method: "POST"})
  .inputValidator((data: { email: string, password: string }) => data)
  .handler(async (ctx) => {
    const headers = getRequestHeaders();
    try {
      const res = await auth.api.signInEmail({
        body: {
          email: ctx.data.email,
          password: ctx.data.password,
          rememberMe: true,
        },
        headers
      })
      return {message: "User Signed In", code: 200, details: res}
    } catch (error: any) {
      return {message: error.message, code: error.status || 500, details: error, email: ctx.data.email}
    }
  })

// export async function signInUserWithPasskey(): Promise<string> {  
//   return "Signed In with Passkey";
// }
export const signOutUser = createServerFn({method: "GET"}).handler(async () => {
// export async function signOutUser(): Promise<any> {  
  const headers = getRequestHeaders();
  try {
    await auth.api.signOut({
      headers
    })
    return {message: "User Signed Out", code: 200}
  } catch (error: any) {
    return {message: error.message, code: error.status || 500}
  }
})

// export async function sendPasswordResetEmail(email: string): Promise<string> {  
//   return "Password Reset Email Sent";
// }

// export async function resetPassword(token: string, newPassword: string): Promise<string> {  
//   return "Password Reset";
// }

export const SessionInformation = createServerFn({method: "GET"}).handler(async () => {
// export async function SessionInformation(): Promise<any> {
  const headers = getRequestHeaders();
  try {
    const session = await auth.api.getSession({ headers })
    return session
  } catch (error: any) {
    return {message: error.message, code: error.status || 500}
  }
})

// export async function AdminAccessOnly(props: AdminAccess): Promise<boolean> {
//     const {redirectDisabled} = props
//     const session = await auth.api.getSession({ headers: await headers() })
//     if (session == null) redirect("/auth?message=NotLoggedIn") 
//     const hasAccess = await auth.api.userHasPermission({
//       headers: await headers(),
//       body: { permission: { user: ["list"] } },
//     })
//     const adminAccess =  hasAccess.success && session.user.role === "admin" ? true : false
//     if (!adminAccess && !redirectDisabled) redirect("/auth?message=NoAccess")
//     return adminAccess
// }
  export const AdminAccessCheck = createServerFn({method: "POST"}).handler(async () => {
    // return true
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers })
    // const hasAccess = await auth.api.userHasPermission({
    //   headers,
    //   body: { permission: { user: ["list"] } },
    // })
    // console.log("session", hasAccess)
    // const adminAccess = hasAccess ? false : false
    const adminAccess =  session?.user.role === "admin" ? true : false
    return adminAccess
}) 
