import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import { authClient } from "@/lib/auth/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PasskeyButton() {
  const router = useRouter();
  const { refetch } = authClient.useSession();

  console.log("PasskeyButton");

  useEffect(() => {
    authClient.signIn.passkey(
      { autoFill: true },
      {
        onSuccess() {
          refetch();
          router.push("/");
        },
      },
    );
  }, [router, refetch]);
  return (
    <PrimaryButton
      icon={<FontAwesomeIcon icon={["fal", "user-lock"]} />}
      isFullWidth
    >
      Signin with Passkey
    </PrimaryButton>
  );
}
