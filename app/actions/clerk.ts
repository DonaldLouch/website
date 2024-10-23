"use server"

import { auth } from "@clerk/nextjs/server"

export async function isUserSignedIn(): Promise<boolean> {
  try{
      const { userId } = auth()
      console.log(userId)
      return userId ? true : false
  } catch (error) {
    console.error("Error checking if user is signed in:", error)
    return false
  }
}
