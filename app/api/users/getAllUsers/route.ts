import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
// import { Roles } from "@/types/globals";

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = auth()
  const isAdmin = sessionClaims?.metadata.role === "admin"
  const isMod = sessionClaims?.metadata.role === "moderator"
  const isStaff = isAdmin || isMod
  if (!isStaff || !userId) return NextResponse.redirect(new URL("/portal/tickets?error=unauthorizedAPI", req.url))

  const {data: users} = await clerkClient().users.getUserList()

  return NextResponse.json({ users })
}
