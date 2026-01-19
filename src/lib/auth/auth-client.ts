import { createAuthClient } from "better-auth/react";

import {
  twoFactorClient,
  adminClient,
  multiSessionClient,
} from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";
import { ac, admin, user } from "@/utils/auth/permissions";

export const authClient = createAuthClient({
  baseURL: process.env.VITE_SITE_URL!,
  plugins: [
    passkeyClient(),
    multiSessionClient(),
    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = "/auth/2fa";
      },
    }),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});
