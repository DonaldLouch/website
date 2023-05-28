import React, { useState, useEffect } from "react";
import {
  useSession,
  getProviders,
  signOut,
  // signIn,
  ClientSafeProvider,
  LiteralUnion,
  getCsrfToken,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

import {
  Box,
  Heading,
  Image,
  Button,
  // Stack,
  useToast,
} from "@chakra-ui/react";

import { Metadata } from "../components/Metadata";

import { SectionCard } from "../components/Cards/SectionCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../lib/fontAwesome";
import { CtxOrReq } from "next-auth/client/_utils";

import { useRouter } from "next/router";
import useSWR from "swr";

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

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBJJZ0k7k" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return (
    <>
      <Metadata
        title={`Login | ${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box as="main" color="white">
        <SectionCard id="signup" styleType="primaryCard">
          {/* @ts-ignore */}
          <Image
            src="/titleLogoPride.svg"
            alt="Donald Louch"
            width="20vw"
            m="0.5rem auto"
          />
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
                    height="1em"
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
            <Button as="a" variant="blackFormButton" href="/api/auth/signin" w="98%" leftIcon={
                  <FontAwesomeIcon
                    icon={["fas", "sign-in-alt"]}
                    color="currentColor"
                    height="1em"
                  />
                }>Login</Button>
              {/* <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify="center"
              >
                {providers?.zoho && (
                  <Button
                    leftIcon={
                      <FontAwesomeIcon
                        icon={["far", "envelope-open"]}
                        color="currentColor"
                        height="1em"
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
                {providers?.apple && (
                  <Button
                    leftIcon={
                      <FontAwesomeIcon
                        icon={["fab", "apple"]}
                        color="currentColor"
                        height="1em"
                      />
                    }
                    type="button"
                    onClick={() => signIn(providers?.apple.id)}
                    variant="blackFormButton"
                    w="80%"
                  >
                    Login with Apple
                  </Button>
                )}
              </Stack> */}
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
