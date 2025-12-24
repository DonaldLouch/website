import { SessionInformation } from "@/app/actions/auth";
import ProfileEdit from "./ProfileEdit";
import { auth } from "@/lib/auth/auth";
import { authClient } from "@/lib/auth/auth-client";
import { headers } from "next/headers";

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function Profile() {
  const sessionInfo = await SessionInformation();

  // const passkeyList = auth.pass

  // const [passkeys, accounts] = (await Promise.all([
  //   fetch("https://3000/api/passkeys").then((res) => res.json()),
  //   // fetch("https://3000/api/accounts").then((res) => res.json()),
  // ])) as any;
  // const [passkeys, accounts] = new Array({});
  //
  const passkeys = await auth.api.listPasskeys({ headers: await headers() });
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  return (
    <ProfileEdit
      sessionInfo={sessionInfo}
      passkeys={passkeys}
      accounts={accounts}
    />
  );
}
