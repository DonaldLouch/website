'use client'

import { Box, Drawer, DrawerContent, Stack, useDisclosure, Text, Button } from '@chakra-ui/react'

import { useRouter } from 'next/navigation'

import { PortalNavigation } from './PortalNavigation'
import PortalHeader from './PortalHeader'
import LoadingComponent from '@/app/(Config)/ContentLoading'
import { Suspense, useEffect, useState } from 'react'
import { OrganizationList, OrganizationSwitcher, Protect, SignOutButton, UserButton, useClerk, useOrganizationList, useSession, useUser } from '@clerk/nextjs'

{/* <Protect
        // permission="org:invoices:create"
        fallback={<>
          <Stack m="2rem">
            <Text mb="2rem" textAlign="center" fontSize="1.5rem">It appears that you are not Donald Louch and thus, can't login to the website portal! Donald may implement a user portal at one point or another?!</Text>
            <Button variant="blackFormButton" as="a" href="/">Go Home!</Button>
          </Stack>
        </>}
      ></Protect> */}

export default function PortalLayoutContext({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { signOut } = useClerk()
    const router = useRouter()

    const user = useUser()
    console.log(user)
    const isInOrg = user.user?.organizationMemberships.length === 0 ? false : true
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(() => {
      if (isInOrg) {
        user.user?.organizationMemberships.forEach((org: any) => {
          if (org.organization.id === process.env.NEXT_PUBLIC_CLERK_ORG_ID) {
              setIsAdmin(org.permissions.includes("org:portal:access"))
          }
        })
      }
    })
   
    return (
      <>
        <Box
          minH="80vh"
          bg="none"
          borderRadius="0 2rem"
          mt={{ base: "0vw", lg: "0" }}
          backdropFilter="blur(20px)"
          w={{base: "100%", lg: "calc(100% + 6rem)"}}
          mx={{base: "0", lg: "-3rem"}}
        >
          {!isAdmin ? (
                <Stack m="2rem">
                  <Text mb="2rem" textAlign="center" fontSize="1.5rem">It appears that you are not Donald Louch and thus, can't login to the website portal! Donald may implement a user portal at one point or another?!</Text>
                  {/* <Stack direction="row"> */}
                    {user.isSignedIn ? <Button variant="blackFormButton" onClick={() => signOut(() => router.push("/"))}>Sign Out and Go Home!</Button> : <Button variant="blackFormButton" as="a" href="/">Go Home!</Button>}
                  {/* <Button variant="blackFormButton" as="a" href="/">Go Home!</Button> */}
                  {/* </Stack> */}
                  {/* <UserButton afterSignOutUrl="/"/> */}
                </Stack>
              
              ) : (<>
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

                <PortalHeader onOpen={onOpen} />

                <Box ml={{ base: 0, md: "15rem" }} p={{base: "2rem 1rem", lg: "2.5rem 4rem"}} mb="0" maxH="80vh" overflow="scroll">
                  {children}
                </Box>
              </>)
            }
        </Box>
      </>
    )
}
