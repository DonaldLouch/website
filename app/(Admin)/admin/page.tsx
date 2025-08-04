// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Portal`,
//     description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Portal`,
//         description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }


// import { SearchUsers } from "./(Components)/SearchUsers";
// import { clerkClient } from "@clerk/nextjs/server";
// import { setRole } from "./_actions";
import AdminPageContent from "./AdminPageContent";
// import { redirect } from "next/navigation";
// import { checkRole } from "@/lib/roles";

export default async function AdminHome() {
  // params: { searchParams: Promise<{ search?: string }>
  // const searchParams = use(params.searchParams);
  // !checkRole("admin") && redirect("/")
  // const query = params.searchParams.search;
  // const users = searchParams.search;
  // users={users}
  // const users = query ? (await clerkClient().users.getUserList({ query })).data : [];
  return <AdminPageContent />
}
