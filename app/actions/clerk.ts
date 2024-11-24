"use server";

import { auth } from "@clerk/nextjs/server"
import { Roles } from "@/types/globals"

export async function isUserSignedIn(): Promise<any> {
  try{
      const { userId }: { userId: string | null } = await auth();
      return userId ? true : false
  } catch (error) {
    console.error("Error checking if user is signed in:", error)
    return false
  }
}

export async function userRole(): Promise<Roles> {
  try {
    const { sessionClaims, userId } = await auth()
    const role = userId ? sessionClaims?.metadata.role : "loggedOut" as Roles
    return role
  } catch (error) {
    console.error("Error checking if user is signed in:", error)
    const role = "loggedOut"
    return role
  }
}

export async function userData(): Promise<any> {
  try {
    const { userId, sessionClaims } = await auth()
    const fullName = sessionClaims?.fullName
    return { userId: userId, fullName: fullName }
  } catch (error) {
    console.error("Error checking if user is signed in:", error)
    return error
  }
}

// export async function setBetaStatus(userId: string, status: boolean) {
//   await clerkClient.users.updateUserMetadata(userId, {
//     publicMetadata: {
//       isBetaUser: status,
//     },
//   });
// }