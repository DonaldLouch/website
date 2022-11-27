import React, { ReactNode, useState, useEffect } from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import { useRouter } from "next/router";

import { PortalNavigation } from "./PortalNavigation";
import PortalHeader from "./PortalHeader";
import RedirectingLoop from "../RedirectingLoop";

import { useSession } from "next-auth/react";

interface PortalLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function PortalLayout(props: PortalLayoutProps) {
  const router = useRouter();

  const { pageTitle, children } = props;

  const { data: session, status } = useSession();

  const [userStatus, setUserStatus] = (useState(false) as unknown) as any;

  const pathName = router.pathname.substring(1);

  useEffect(() => {
    if (status === "loading") {
      setUserStatus(false);
    }
    if (!session && status === "unauthenticated") {
      setUserStatus(false);
      router.push({
        pathname: "/login",
        query: {
          refURL: pathName,
          errCode: "NotLoggedIn",
        },
      });
    }
    if (status === "authenticated" && session?.user?.userLevel != 0) {
      setUserStatus(false);
      router.push({
        pathname: "/login",
        query: {
          refURL: pathName,
          errCode: "UserLevel",
        },
      });
    }
    if (status === "authenticated" && session?.user?.userLevel == 0) {
      setUserStatus(true);
    }
  }, [session, pathName, router, status]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {userStatus == false ? (
        <RedirectingLoop />
      ) : (
        <Box
          minH="100vh"
          bg="blurredBackground"
          borderRadius="0 3.5rem"
          mt={{ base: "0vw", md: "0" }}
          backdropFilter="blur(20px)"
        >
          <PortalNavigation
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <PortalNavigation onClose={onClose} />
            </DrawerContent>
          </Drawer>

          <PortalHeader onOpen={onOpen} pageTitle={pageTitle} />

          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
      )}
    </>
  );
}
