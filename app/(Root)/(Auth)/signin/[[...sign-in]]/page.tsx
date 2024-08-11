'use client'

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Signin() {
  const prams = useSearchParams()
  const reURL = prams.get("reURL") as string
    
  const redirectURL = reURL ? reURL : "/portal"
  return <SignIn forceRedirectUrl={redirectURL} />
}