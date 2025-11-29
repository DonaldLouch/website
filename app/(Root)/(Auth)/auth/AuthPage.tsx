"use client"

import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import InlineLink from "@/app/(Components)/InlineLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Alert, Stack, Title, Text, Box, Grid, Center, Anchor, Group, Image } from "@mantine/core"

import z from "zod/v4"
import { zodResolver } from "mantine-form-zod-resolver"
import { useForm } from "@mantine/form"
import { useRouter, useSearchParams } from "next/navigation"
import { signInUser, signOutUser } from "@/app/actions/auth"
import { notifications } from "@mantine/notifications"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import FormInputPassword from "@/app/(Components)/(Form)/FormInputPassword"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"

export default function AuthLoginSignup({session}: {session: any}) {
    const params = useSearchParams()
    const message = params.get("message")

    const router = useRouter()
    message && notifications.show({ 
        id: "auth-message",
        title: "Note:",
        message: message == "NotSignedIn" ? "You must be signed in to access that page." : message == "NoAccess" ? "You tried to access a page you don't have permission to access. Please log into a different account or contact Donald Louch for further assistance." : message,
        color: "primary",
        icon: <FontAwesomeIcon icon={["fal", "info-circle"]} />,
        autoClose: false,
        withCloseButton: true,
    })

    const signOut = async () => {
        const res = await signOutUser()
        if (res.code === 200) {
            notifications.show({ 
                title: `Signed Out!`,
                message:"You have been successfully signed out.",
                color: "black",
                icon: <FontAwesomeIcon icon={["fal", "badge-check"]} />
            })
            router.push("/")
        } else {
            notifications.show({ 
                title: `Error #${res?.code} has Occurred`,
                message: res?.message,
                color: "red",
                icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
            })
        }
    }
    const signinSubmit =  async (values: any) => {
        const res = await signInUser({
            email: values.email,
            password: values.password
        })
        if (res.code === 200) {
            router.push("/admin")
            router.refresh()
        } else {
            notifications.show({ 
                title: `Error #${res?.code} has Occurred`,
                message: res?.message,
                color: "red",
                icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
            })
        }
    } // TODO: Fix on production/beta
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
        email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    })
    // const signupSchema = z.object({
    //     name: z.string().min(1, { message: 'Name is required' }),
    //     email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    //     password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    // })

    const signinForm = useForm({
        mode: 'controlled',
        validate: zodResolver(signinSchema)
    })
    // const signupForm = useForm({
    //     mode: 'controlled',
    //     validate: zodResolver(signupSchema)
    // })

    const imageLink = "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LWEIJJ2O4srNRK7or.jpeg"

    return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflow: "hidden !Important"}} bg="var(--blurredBackground)">
        <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.7" pos="absolute" bgsz="150% 150%"></Box>
        <Box bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>
        <HomeButton />
        <Stack id="hero" pos="absolute" top="0" left="0" justify="center" h="100%" w="100%" style={{overflow: "hidden"}}>
            <Grid gutter="2rem">
                <Grid.Col span={{base: 12, md: 4}} h="100%">
                    <Center>
                        {session == null ? <>
                        {/* <Tabs defaultValue="signin" w="calc(100% - 5rem)" fz="inherit" bg="var(--darkPurpleRGBA)" m="0" p="1rem 0rem 0">
                            <Tabs.List grow justify="center">
                                <Tabs.Tab value="signin">Signin</Tabs.Tab>
                                <Tabs.Tab value="signup">Signup</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="signin">  */}
                            <SectionCard styleType="primaryCard" id="authCard" w="calc(100% - 5rem)" fz="inherit" bg="var(--darkPurpleRGBA)" m="0" p="3rem 0.5rem 0">
                                <Title order={2} fz="2rem" ta="center" ff="text">Signin to Your Account</Title>
                                <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={signinForm.onSubmit(signinSubmit)}>
                                    <FormInput inputID="email" inputLabel="Email" {...signinForm.getInputProps('email')}   isRequired icon={<FontAwesomeIcon icon={["fal", "envelope"]} />} autoComplete="email webauthn" />
                                    <FormInputPassword inputID="password" inputLabel="Password" {...signinForm.getInputProps('password')} isRequired icon={<FontAwesomeIcon icon={["fal", "lock"]} />} forgotPasswordOption autoComplete="current-password webauthn" />
                                    <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "person-to-portal"]} />} customWidth="calc(100% - 2rem)">Signin</FormSubmitButton>
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
                        : <SectionCard styleType="primaryCard" id="authCard" w="calc(100% - 5rem)" fz="inherit" bg="var(--darkPurpleRGBA)" m="0" ta="center">
                            <Title order={3} fz="2rem" ta="center">Welcome, {session.user?.name}!</Title>
                            <Text>You are currently signed into the Donald Louch Website.If you chose too you may signout below.</Text>
                            <PrimaryButton onClick={() => signOut()} icon={<FontAwesomeIcon icon={["fal", "person-from-portal"]} />} isFullWidth>Sign Out</PrimaryButton>
                        </SectionCard>}
                    </Center>
                </Grid.Col>
                <Grid.Col span={8} h="100%" style={{ justifyContent: "center" }} visibleFrom="md">
                    <Stack component="section" mah={{base: "100%", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center">
                        <Stack bg="var(--darkPurpleRGBA)" style={{
                            boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "var(--mantine-radius-lg)"
                        }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p={{base: "1rem", md: "1.5rem 3rem 2rem"}} gap="0.5rem">
                            <Anchor href="/" underline="never">
                                <Group align="center">
                                    <Image
                                        src="/titleLogo/titleLogoWhiteColoured.svg"
                                        alt="Donald Louch"
                                        w={{base: "60vw", lg: "30vw !important"}}
                                        height="auto"
                                    />
                                    <Title order={1} fz="2rem" c="var(--blackRGBA)">Client Portal</Title>
                                </Group>
                            </Anchor>
                            <Alert variant="light" color="red" title="Client Portal Currently disabled!" icon={<FontAwesomeIcon icon={["fal", "ban"]} />} mx="2rem">
                                <Text c="white" component="span">At this time, Donald Louch has decided to pause the implementation of the Client Portal and will be corresponding to client projects via. email with <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} />.</Text>
                            </Alert>
                        </Stack>
                    </Stack>
                </Grid.Col> {/* // TODO: Maybe make this first on mobile? */}
            </Grid> 
        </Stack>
    </Box>
}