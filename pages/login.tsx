import React, { useState, useEffect } from "react";
import {
  useSession,
  getProviders,
  signOut,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  getCsrfToken,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

import {
  Box,
  // Text,
  Heading,
  // Link,
  // Tabs,
  // TabList,
  // TabPanels,
  // Tab,
  // TabPanel,
  Image,
  // Input,
  // FormControl,
  // FormLabel,
  Button,
  // Divider,
  Stack,
  useToast,
  // useColorModeValue
} from "@chakra-ui/react";

import { Metadata } from "../components/Metadata";
// import { parseCookies, destroyCookie } from 'nookies'

import { SectionCard } from "../components/Cards/SectionCard";
// import { DividerText } from "../components/DividerText"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../config/fontAwesome";
import { CtxOrReq } from "next-auth/client/_utils";

import { useRouter } from "next/router";

// { csrfToken }: any

export default function Login() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  const router = useRouter();
  const toast = useToast();

  if (router.query.errCode == "NotLoggedIn") {
    const toastID = "errorLogin";
    if (!toast.isActive(toastID)) {
      toast({
        id: toastID,
        title: "Not Logged In",
        description:
          "You were redirected back to the login screen as it seems that you are not logged in.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (router.query.errCode == "UserLevel") {
    const toastID = "userLevel";
    if (!toast.isActive(toastID)) {
      toast({
        id: toastID,
        title: "User Not Allowed 🚨",
        description:
          "It appears that you do NOT have the proper user clearance to proceed to the portal. Please try signing into another account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (router.query.error == "EmailSignin") {
    toast({
      title: "Oh No!",
      description:
        "It seems that you have tried to login without a registered email. If you feel this is an error, please contact Donald Louch.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === "authenticated" && session?.user?.userLevel == 0) {
    router.push("/portal");
  }

  // const pageID = "pageL4UBJJZ0k7k" as string;
  // updatePostView(pageID);
  // async function updatePostView(pageID: string) {
  //   await fetch("/api/pages/updateView", {
  //     method: "POST",
  //     body: JSON.stringify(pageID),
  //   });
  // }

  // const labelColour = useColorModeValue('primary', 'white')
  // const formColour = useColorModeValue('black', 'white')
  // const boxShadowColour = useColorModeValue('bsBoldBlue', 'bsBoldWhite')

  return (
    <>
      <Metadata
        title={`Login | ${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box as="main" color="white">
        <SectionCard id="signup" styleType="primaryCard">
          <Image
            src="/titleLogo.svg"
            alt="Donald Louch"
            width="20vw"
            m="0.5rem auto"
          />
          {/* <Text textAlign="center" fontSize="xl">Please note that I have disabled the login function. For more details please visit the incident page <Link href="https://donaldlouch.instatus.com/cl2uwebu5113668jaoefzwgiw9t" color={useColorModeValue('primary', 'secondary')}>on Instatus</Link>.</Text> */}
          {status === "loading" ? (
            <Heading as="h2" variant="sectionTitle" size="3xl" m="1rem 0">
              Loading ...
            </Heading>
          ) : session ? (
            <>
              {session.user?.userLevel == 0 ? (
                <Heading as="h2" variant="sectionTitle" size="2xl">
                  You are currently logged in as {session.user?.email} 👋
                </Heading>
              ) : (
                <>
                  <Heading as="h3" variant="sectionTitle" size="2xl">
                    It appears that you do NOT have the proper user clearance to
                    proceed to the portal. Please try signing into another
                    account.
                  </Heading>
                </>
              )}
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    icon={["fas", "sign-out-alt"]}
                    color="black"
                  />
                }
                type="button"
                onClick={() => signOut()}
                variant="blackFormButton"
                w="100%"
              >
                Sign Out
              </Button>
            </>
          ) : providers ? (
            <>
              {/* <Heading as="h2" variant="sectionTitle" size="3xl">Login to DevLexicon</Heading> */}
              {/* {providers?.email && (
                                    <>
                                        <form method="post" action="/api/auth/signin/email">
                                            <Input 
                                                variant="unstyled" boxShadow="bsBoldBlue" p="1.5rem 2rem" color="primary" borderRadius="0 2rem 0 2rem" my="1rem"
                                                name="csrfToken"
                                                defaultValue={csrfToken}
                                                hidden
                                            /> 
                                            <FormControl>
                                                <FormLabel 
                                                  htmlFor="email" 
                                                  color={labelColour}
                                                >Email</FormLabel>
                                                <Input variant="unstyled" id="email" name="email" boxShadow={boxShadowColour} _focus={{boxShadow: "bsBoldOrange",}} p="1.5rem 2rem" color={formColour} borderRadius="0 2rem 0 2rem" />
                                            </FormControl>
                                            <Button leftIcon={<FontAwesomeIcon icon={['fas', 'magic']} color="white" />} type="submit" variant="blackFormButton" w="99%" m="1rem" >Login with Email</Button>
                                        </form>
                                    </>
                                )} */}
              {/* <DividerText>Or Login With</DividerText> */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify="center"
              >
                {/* {providers?.github && (
                                        <Button leftIcon={<FontAwesomeIcon icon={['fab', 'github']} color="white" />} type="button" onClick={() => signIn(providers?.github.id)} variant="blackFormButton" w={{ base: '100%', md: '100%' }}>Login with Github</Button>
                                    )} */}

                {/* {providers?.google && (
                                        <Button leftIcon={<FontAwesomeIcon icon={['fab', 'google']} color="white" />} type="button" onClick={() => signIn(providers?.google.id)} variant="blackFormButton" w="80%">Login with Google</Button>
                                    )} */}
                {providers?.zoho && (
                  <Button
                    leftIcon={
                      <FontAwesomeIcon
                        icon={["far", "envelope-open"]}
                        color="currentColor"
                      />
                    }
                    type="button"
                    onClick={() => signIn(providers?.zoho.id)}
                    variant="blackFormButton"
                    w="80%"
                  >
                    Login with ZoHo
                  </Button>
                )}
              </Stack>
            </>
          ) : (
            <Heading as="h2" variant="sectionTitle" size="xl" m="1rem 0">
              Oh no, we are having issues with loading our login system.
            </Heading>
          )}
        </SectionCard>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

// export default Login;
