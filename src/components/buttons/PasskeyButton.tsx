import PrimaryButton from "@/components/buttons/PrimaryButton";
import { authClient } from "@/lib/auth/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function PasskeyButton() {
  const { refetch } = authClient.useSession();
   const navigate = useNavigate()

  useEffect(() => {
    sleep(5000).then(() => 
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
      )
    )
  }, [navigate, refetch]);
  return (
    <PrimaryButton
      icon={{ name: "user-lock", pack: "fal" }}
      isFullWidth
    >
      Signin with Passkey
    </PrimaryButton>
  );
}
