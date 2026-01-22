import PrimaryButton from "@/components/(Buttons)/PrimaryButton";
import { authClient } from "@/lib/auth/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function PasskeyButton() {
  const { refetch } = authClient.useSession();
   const navigate = useNavigate()

  console.log("PasskeyButton");

  useEffect(() => {
    authClient.signIn.passkey(
      { autoFill: false },
      {
        onSuccess() {
          refetch();
          navigate({
            to: '/admin'
          })
        },
      },
    );
  }, [navigate, refetch]);
  return (
    <PrimaryButton
      icon={<FontAwesomeIcon icon={["fal", "user-lock"]} />}
      isFullWidth
    >
      Signin with Passkey
    </PrimaryButton>
  );
}
