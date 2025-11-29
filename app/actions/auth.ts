"use server"

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

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

export async function signUpUser({name, email, password}: UserSignup): Promise<any> {  
   try {
        await auth.api.signUpEmail({
            body: { 
                name: name,
                email: email, 
                password: password, 
                callbackURL: "/auth" 
            }
        })
        return {message: "User Signed Up", code: 200}
    } catch (error: any) {
        return {message: error.message, code: error.status || 500}
    }
}

export async function signInUser({email, password}: UserAuthPayload): Promise<any> {  
  console.log("Signing in user with email:", email);
    try {
        await auth.api.signInEmail({
            body: {
                email: email,
                password: password,
                rememberMe: true,
                callbackURL: "/",
        },
        headers: await headers(),
    })
    return {message: "User Signed In", code: 200}
    } catch (error: any) {
        return {message: error.message, code: error.status || 500}
    }
}

export async function signInUserWithPasskey(): Promise<string> {  
  return "Signed In with Passkey";
}

export async function signOutUser(): Promise<any> {  
  try {
    await auth.api.signOut({
      headers: await headers(),
    })
    return {message: "User Signed Out", code: 200}
  } catch (error: any) {
    return {message: error.message, code: error.status || 500}
  }
}

export async function sendPasswordResetEmail(email: string): Promise<string> {  
  return "Password Reset Email Sent";
}

export async function resetPassword(token: string, newPassword: string): Promise<string> {  
  return "Password Reset";
}

export async function SessionInformation(): Promise<any> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    return session
  } catch (error: any) {
    return {message: error.message, code: error.status || 500}
  }
}

export async function AdminAccessOnly(props: AdminAccess): Promise<boolean> {
    const {redirectDisabled, specialPermission} = props
    const session = await auth.api.getSession({ headers: await headers() })
    if (session == null) redirect("/auth?message=NotLoggedIn") 
    const hasAccess = await auth.api.userHasPermission({
      headers: await headers(),
      body: { permission: { user: ["list"] } },
    })
    const adminAccess =  hasAccess.success && session.user.role === "admin" ? true : false
    if (!adminAccess && !redirectDisabled) redirect("/auth?message=NoAccess")
    return adminAccess
}

export async function AdminAccessCheck(): Promise<boolean> {
    const session = await auth.api.getSession({ headers: await headers() })
    const hasAccess = await auth.api.userHasPermission({
      headers: await headers(),
      body: { permission: { user: ["list"] } },
    })
    const adminAccess =  hasAccess.success && session.user.role === "admin" ? true : false
    return adminAccess
}
