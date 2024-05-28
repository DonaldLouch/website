'use client'
import { useUser } from "@clerk/nextjs";
import FooterContent from "./FooterContent";

export default function Footer() {
  const {user} = useUser()
  const isLoggedIn = user ? true : false
  // // console.log(user)
  return <FooterContent isLoggedIn={isLoggedIn} />
}
