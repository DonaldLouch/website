import { Roles } from "@/types/globals"
import { auth } from "@clerk/nextjs/server"

// export const checkRole = async (role: Roles) => {
//   const { sessionClaims } = await auth();

//   return sessionClaims?.metadata.role === role;
// };

import { NextResponse } from "next/server"

export default async function checkRole(role: Roles) {
  const { sessionClaims } = await auth()

  const roles = sessionClaims?.metadata.role
  return NextResponse.json({ roles })
}