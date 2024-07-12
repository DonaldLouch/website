import { checkRole } from "@/lib/roles";
import FooterContent from "./FooterContent";

import { auth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";

export default function Footer() {
  return <FooterContent  />
}
