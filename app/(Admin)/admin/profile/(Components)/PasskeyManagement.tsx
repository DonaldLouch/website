"use client";

import { Box, Group, Stack, Text, Title } from "@mantine/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import AddPasskey from "./AddPasskey";
import DisplayDate from "@/lib/DisplayDate";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function PasskeyManagement({ passkeys }: { passkeys: any }) {
  const router = useRouter();

  const handleDeletePasskey = async (passkeyId: string) => {
    // return await authClient.passkey.deletePasskey(
    //   { id: passkeyId },
    //   {
    //     onSuccess: () => {
    //       notifications.show({
    //         id: `removePasskey${passkeyId}`,
    //         title: "Removed Passkey",
    //         message: `You have successfully removed a passkey.`,
    //         // color: "green",
    //         icon: <FontAwesomeIcon icon={["fal", "user-check"]} />,
    //       });
    //       router.refresh();
    //     },
    //   },
    // );
  };

  return (
    <>
      {passkeys.length === 0 ? (
        <Stack>
          <Title order={2}>No Passkeys</Title>
          <Text>No passkeys have been added yet.</Text>
        </Stack>
      ) : (
        <>
          {passkeys?.map((passkey: any, index: number) => (
            <SectionCard
              styleType="secondaryCard"
              m="2rem 1rem"
              p="2rem"
              key={index}
            >
              <Group justify="space-between">
                <Stack lh="0" p="0">
                  <Title order={3} m="0">
                    {passkey.name}
                  </Title>
                  <Text m="0">
                    Created On:{" "}
                    <DisplayDate
                      source={passkey.createdAt}
                      format="MM/DD/YYYY"
                    />
                  </Text>
                </Stack>
                <PrimaryButton
                  action={() => handleDeletePasskey(passkey.id)}
                  colour="red"
                >
                  <FontAwesomeIcon icon={["fal", "trash"]} />
                </PrimaryButton>
              </Group>
            </SectionCard>
          ))}
          <AddPasskey />
        </>
      )}
    </>
  );
}
