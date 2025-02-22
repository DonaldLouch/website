"use server";

import { auth, clerkClient, PhoneNumber } from "@clerk/nextjs/server";
import { Roles } from "@/types/globals"

interface MetadataProps {
  role?: string
  address: { 
    city?: string|unknown|null|undefined
    country?: string|unknown|null|undefined
    province?: string|unknown|null|undefined
    timezone?: string|unknown|null|undefined
  }
  phoneNumber?: string
}

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
    return { userId: userId, fullName: fullName };
  } catch (error) {
    console.error("Error checking if user is signed in:", error)
    return error
  }
}

export async function userList(): Promise<any> {
  const client = await clerkClient()

  try{
    const users = await client.users.getUserList()
    return users
  } catch (error) {
    console.error("Error fetching user list:", error)
    return error
  }
}
  
export async function userLookup(id: string): Promise<any> {
  const client = await clerkClient()

  try{
    const user = await client.users.getUser(id) as any
    return {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.publicMetadata.phoneNumber || undefined,
      address: {
        city: user.publicMetadata.address?.city || undefined,
        province: user.publicMetadata.address?.province || undefined,
        country: user.publicMetadata.address?.country || undefined,
        timezone: user.publicMetadata.address?.timezone || undefined
      },
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return error
  }
}

export async function updateUser({id, data}: { id: string, data: MetadataProps }): Promise<any> {
  const client = await clerkClient()

  try {
    const {publicMetadata: currentData} = await client.users.getUser(id) as any
    const user =(await client.users.updateUserMetadata(id, {
      publicMetadata: {
        role: data.role || currentData.role || "client",
        address: {
          city: data.address.city || currentData.address?.city,
          country: data.address.country || currentData.address?.country,
          province: data.address.province || currentData.address?.province,
          timezone: data.address.timezone || currentData.address?.timezone
        },
        phoneNumber: data.phoneNumber || currentData.phoneNumber
      }
    })) as any
    
    return { message: user.publicMetadata }
  } catch (error) {
    console.error("Error updating user:", error)
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