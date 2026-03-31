import { Box, Modal } from "@mantine/core";

import z from "zod/v4";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import FormInput from "@/components/form/FormInput";
import FormSubmitButton from "@/components/form/FormSubmitButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionCard } from "@/components/cards/SectionCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useDisclosure } from "@mantine/hooks";
import { authClient } from "@/lib/auth/auth-client";
import { notifications } from "@mantine/notifications";
import { useRouter } from "@tanstack/react-router";

export default function AddPasskey() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    await authClient.passkey.addPasskey(values, {
      onError: (error) => {
        notifications.show({
          id: "addPasskey",
          title: "Error: Adding Passkey",
          message: `When adding a passkey, an error occurred: ${error}`,
          color: "red",
          icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        });
      },
      onSuccess: () => {
        notifications.show({
          id: "addPasskey",
          title: "Added Passkey",
          message: `You have successfully added a passkey. With the name of ${values.name}`,
          // color: "green",
          icon: <FontAwesomeIcon icon={["fal", "user-check"]} />,
        });
        router.invalidate()
        close();
      },
    });
  };

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  const form = useForm({
    mode: "controlled",
    validate: zodResolver(schema),
  });

  return (
    <>
      <PrimaryButton
        onClick={open}
        icon={{ name: "user-lock", pack: "fal" }}
        isFullWidth
      >
        Add Passkey
      </PrimaryButton>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Passkey"
        yOffset="2rem"
        xOffset="2rem"
        size="100%"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 4,
        }}
        styles={{
          header: { background: "var(--blurredBackground)" },
          content: { background: "var(--darkPurple)" },
        }}
        radius="lg"
      >
        <SectionCard
          id="profileEdit"
          styleType="primaryCard"
          mx="2rem"
          p="0rem 1rem"
        >
          <Box
            p={{ base: "0.5rem", sm: "2rem" }}
            component="form"
            onSubmit={form.onSubmit(onSubmit)}
          >
            <FormInput
              inputID="name"
              inputLabel="Name"
              {...form.getInputProps("name")}
              isRequired
              icon={<FontAwesomeIcon icon={["fal", "font-case"]} />}
            />
            <FormSubmitButton
              icon={<FontAwesomeIcon icon={["fal", "user-lock"]} />}
              customWidth="calc(100% - 2rem)"
            >
              Add Passkey
            </FormSubmitButton>
          </Box>
        </SectionCard>
      </Modal>
    </>
  );
}
