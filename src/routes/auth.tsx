import { SessionInformation } from "@/actions/auth.server"
import { createFileRoute, useLoaderData } from "@tanstack/react-router"

import HomeButton from "@/components/(Buttons)/HomeButton";
import FormInput from "@/components/(Form)/FormInput";
import FormSubmitButton from "@/components/(Form)/FormSubmitButton";
import InlineLink from "@/components/InlineLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Stack,
  Title,
  Text,
  Box,
  Grid,
  Center,
  Anchor,
  Group,
  Image,
  Spoiler,
} from "@mantine/core";

import z from "zod/v4";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { signInUser, signOutUser } from "@/actions/auth.server";
import { notifications } from "@mantine/notifications";
import PrimaryButton from "@/components/(Buttons)/PrimaryButton";
import FormInputPassword from "@/components/(Form)/FormInputPassword";
import { SectionCard } from "@/components/(Cards)/SectionCard";
import { authClient } from "@/lib/auth/auth-client";
import DividerInlineText from "@/components/DividerInlineText";
import PasskeyButton from "@/components/(Buttons)/PasskeyButton";
import { useState } from "react";
import { redirect, Router, useNavigate, useParams, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute('/auth')({ 
    loader: () => SessionInformation(),
    component: Auth
})
function Auth() {
    const session = Route.useLoaderData()
   const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
    const { message } = useSearch({ strict: false }) as any
  
  
    // TODO: 2FA: <PinInput length={6} type="number" oneTimeCode />
    message &&
      notifications.show({
        id: "auth-message",
        title: "Note:",
        message:
          message == "NotSignedIn"
            ? "You must be signed in to access that page."
            : message == "NoAccess"
              ? "You tried to access a page you don't have permission to access. Please log into a different account or contact Donald Louch for further assistance."
              : message,
        color: "primary",
        icon: <FontAwesomeIcon icon={["fal", "info-circle"]} />,
        autoClose: false,
        withCloseButton: true,
      });
  
    const signOut = async () => {
      const res = await signOutUser();
      if (res.code === 200) {
        notifications.show({
          title: `Signed Out!`,
          message: "You have been successfully signed out.",
          color: "black",
          icon: <FontAwesomeIcon icon={["fal", "badge-check"]} />,
        });
        navigate({
          to: '/',
        })
      } else {
        notifications.show({
          title: `Error #${res?.code} has Occurred`,
          message: res?.message,
          color: "red",
          icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        });
      }
    };
  
    const signinSubmit = async (values: any) => {
      const res = await signInUser({
        data: {
          email: values.email,
          password: values.password
        }
      })
      if (res.code !== 200) {
        notifications.show({
          title: `Error #${res?.code} has Occurred`,
          message: res?.message,
          color: "red",
          icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        });
      } else if (res.code === 200) {
        navigate({
          to: '/admin'
        })
      }
    };
  
    // const signupSubmit =  async (values: any) => {
    //      const res = await signUpUser({
    //         name: values.name,
    //         email: values.email,
    //         password: values.password,
    //      })
    //      console.log(res)
    //         if (res.code === 200) {
    //             notifications.show({
    //                 title: `${values.name}, Your Account Has Been Created!`,
    //                 message:"Please check your email to verify your account before signing in.",
    //                 color: "black",
    //                 icon: <FontAwesomeIcon icon={["fal", "badge-check"]} />
    //             })
    //             router.refresh()
    //         } else {
    //             notifications.show({
    //                 title: `Error #${res?.code} has Occurred`,
    //                 message: res?.message,
    //                 color: "red",
    //                 icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
    //             })
    //         }
    // }
  
    const signinSchema = z.object({
      email: z
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    });
    // const signupSchema = z.object({
    //     name: z.string().min(1, { message: 'Name is required' }),
    //     email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    //     password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    // })
  
    const signinForm = useForm({
      mode: "uncontrolled",
      validate: zodResolver(signinSchema),
    });
    // const signupForm = useForm({
    //     mode: 'controlled',
    //     validate: zodResolver(signupSchema)
    // })
  
    const imageLink =
      "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LWEIJJ2O4srNRK7or.jpeg";

  return (
      <Box
        component="section"
        id="homeHero"
        w="100vw"
        h="100vh"
        maw="100vw"
        mah="100vh"
        pos="absolute"
        top="0"
        left="0"
        style={{ boxShadow: "bsSecondary", overflow: "hidden !Important", zIndex: 1000 }}
        bg="var(--blurredBackground)"
      >
        <Box
          bg="var(--mainGradient)"
          w="100vw"
          h="100%"
          opacity="0.7"
          pos="absolute"
          bgsz="150% 150%"
        ></Box>
        <Box
          bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`}
          bgsz="cover"
          h="100%"
          w="100vw"
        ></Box>
        <HomeButton />
        <Stack
          id="hero"
          pos="absolute"
          top="0"
          left="0"
          justify="center"
          h="100%"
          w="100%"
          style={{ overflow: "hidden" }}
        >
          <Grid gutter="2rem">
            <Grid.Col
              span={{ base: 12, lg: 4 }}
              h="100%"
              order={{ base: 2, lg: 1 }}
            >
              <Center>
                {session == null ? (
                  <>
                    {/* <Tabs defaultValue="signin" w="calc(100% - 5rem)" fz="inherit" bg="var(--darkPurpleRGBA)" m="0" p="1rem 0rem 0">
                              <Tabs.List grow justify="center">
                                  <Tabs.Tab value="signin">Signin</Tabs.Tab>
                                  <Tabs.Tab value="signup">Signup</Tabs.Tab>
                              </Tabs.List>
                              <Tabs.Panel value="signin">  */}
                    <SectionCard
                      styleType="primaryCard"
                      id="authCard"
                      w={{ base: "calc(100% - 1rem)", lg: "calc(100% - 5rem)" }}
                      fz="inherit"
                      bg="var(--darkPurpleRGBA)"
                      m="0"
                      p={{ base: "2rem 1rem 0", lg: "3rem 0.5rem 0" }}
                    >
                      <Title order={2} fz="2rem" ta="center" ff="text">
                        Signin to Your Account
                      </Title>
                      <Box
                        p={{ base: "0.5rem", sm: "2rem" }}
                        component="form"
                        onSubmit={signinForm.onSubmit(signinSubmit)}
                        mb="-4rem"
                      >
                        <FormInput
                          inputID="email"
                          inputLabel="Email"
                          {...signinForm.getInputProps("email")}
                          isRequired
                          icon={<FontAwesomeIcon icon={["fal", "envelope"]} />}
                          autoComplete="email webauthn"
                        />
                        <FormInputPassword
                          inputID="password"
                          inputLabel="Password"
                          {...signinForm.getInputProps("password")}
                          isRequired
                          icon={<FontAwesomeIcon icon={["fal", "lock"]} />}
                          forgotPasswordOption
                          autoComplete="current-password webauthn"
                        />
                        <FormSubmitButton
                          icon={
                            <FontAwesomeIcon icon={["fal", "person-to-portal"]} />
                          }
                          customWidth="calc(100% - 2rem)"
                        >
                          Signin
                        </FormSubmitButton>
                      </Box>
                      <DividerInlineText text="or" />
                      <Box m="0 3rem 2rem">
                        <PasskeyButton />
                      </Box>
                    </SectionCard>
                    {/* </Tabs.Panel>
                              <Tabs.Panel value="signup">
                                  <Title order={2} fz="2rem" ta="center" ff="text">Signup for an Account</Title>
                                  <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={signupForm.onSubmit(signupSubmit)}>
                                      <FormInput inputID="name" inputLabel="Name" {...signupForm.getInputProps('name')} isRequired icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} />
                                      <FormInput inputID="email" inputLabel="Email" {...signupForm.getInputProps('email')}   isRequired icon={<FontAwesomeIcon icon={["fal", "envelope"]} />} />
                                      <FormInputPassword inputID="password" inputLabel="Password" {...signupForm.getInputProps('password')} isRequired icon={<FontAwesomeIcon icon={["fal", "lock"]} />} />
                                      <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "person-to-portal"]} />}>Signup</FormSubmitButton>
                                  </Box>
                              </Tabs.Panel>
                          </Tabs>  */}
                  </>
                ) : (
                  <SectionCard
                    styleType="primaryCard"
                    id="authCard"
                    w="calc(100% - 5rem)"
                    fz="inherit"
                    bg="var(--darkPurpleRGBA)"
                    m="0"
                    ta="center"
                  >
                    <Title order={3} fz="2rem" ta="center">
                      Welcome, {('user' in session && session.user?.name) || "Guest"}!
                    </Title>
                    <Text>
                      You are currently signed into the Donald Louch Website.If
                      you chose too you may signout below.
                    </Text>
                    <PrimaryButton
                      onClick={() => signOut()}
                      icon={
                        <FontAwesomeIcon icon={["fal", "person-from-portal"]} />
                      }
                      isFullWidth
                    >
                      Sign Out
                    </PrimaryButton>
                  </SectionCard>
                )}
              </Center>
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, lg: 8 }}
              h="100%"
              style={{ justifyContent: "center" }}
              order={{ base: 1, lg: 2 }}
            >
              <Stack
                component="section"
                mah={{ base: "100%", sm: "calc(100vh - 2rem)" }}
                style={{ overflow: "scroll" }}
                justify="center"
                align="center"
              >
                <Stack
                  bg="var(--darkPurpleRGBA)"
                  style={{
                    boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--mantine-radius-lg)",
                  }}
                  w={{ base: "calc(100% - 1rem)", md: "calc(100% - 2rem)" }}
                  p={{ base: "1rem", md: "1.5rem 3rem 2rem" }}
                  gap="0.5rem"
                >
                  <Anchor href="/" underline="never">
                    <Group align="center" justify="center">
                      <Image
                        src="/titleLogo/titleLogoWhiteColoured.svg"
                        alt="Donald Louch"
                        w={{ base: "60vw", lg: "30vw !important" }}
                        height="auto"
                      />
                      <Title
                        order={1}
                        fz="2rem"
                        c="var(--blackRGBA)"
                        visibleFrom="md"
                      >
                        Client Portal
                      </Title>
                    </Group>
                  </Anchor>
                  <Alert
                    variant="light"
                    color="red"
                    title="Client Portal Currently disabled!"
                    icon={<FontAwesomeIcon icon={["fal", "ban"]} />}
                    mx="2rem"
                  >
                    <Text
                      c="white"
                      component="span"
                      mah="1px"
                      style={{ overflow: "hidden" }}
                    >
                      <Spoiler
                        maxHeight={50}
                        showLabel="Read Full Alert"
                        hideLabel="Hide"
                        expanded={expanded}
                        onExpandedChange={setExpanded}
                      >
                        At this time, Donald Louch has decided to pause the
                        implementation of the Client Portal and will
                        becorresponding to client projects via. email with{" "}
                        <InlineLink
                          link="mailto:hello@donaldlouch.ca"
                          body="hello@donaldlouch.ca"
                          leftIcon={{ name: "light-envelope-at", pack: "fak" }}
                        />
                        .
                      </Spoiler>
                    </Text>
                  </Alert>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    );
}
