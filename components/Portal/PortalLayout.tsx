import React, { ReactNode, useState, useEffect } from 'react'
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

// import { 
//   parseCookies
// } from "nookies"

// import { useState, useEffect } from 'react'

import { PortalNavigation } from './PortalNavigation'
import PortalHeader  from './PortalHeader'
import RedirectingLoop from '../RedirectingLoop'

// import { getSession } from 'next-auth/react'
// import { GetServerSidePropsContext } from 'next'

// import { getSession } from 'next-auth/react';

import { useSession } from 'next-auth/react'

interface PortalLayoutProps {
    children: ReactNode
    pageTitle: string
}

// import prisma from '../../config/prisma'

// export default function PortalLayout( pageTitle: string, { children } : { children: ReactNode } ) {
export default function PortalLayout(props: PortalLayoutProps) {
    const router = useRouter()

    const { pageTitle, children } = props

    const { data: session, status } = useSession()
    
    const [userStatus, setUserStatus] = useState(false) as unknown as any

    const pathName = router.pathname.substring(1)

    // console.log(status)

    // console.log(session?.user?.email)

    useEffect(() => {
        if (status === 'loading') {
            setUserStatus(false)
        }
        if (!session && status === 'unauthenticated') {
            setUserStatus(false)
            // router.push({
            //     pathname: '/login',
            //     query: {
            //         refURL: pathName,
            //         errCode: 'Not Logged In',
            //         errMessage: 'You were redirected back to the login screen as it seems that you are not logged in.',
            //     }
            // })
        } if (status === 'authenticated') {
            setUserStatus(true)
        }
        /*else {
            // (async function() {
                // const sessionEmail = session?.user?.email
                // const res = await fetch(`/api/users/getUserByEmail?uEmail=${sessionEmail}`)
                // const data = await res.json()
                // if (!data?.[0]?.id && status != 'loading') {
                //     setUserStatus(false)
                //     await router.push({
                //         pathname: '/signup',
                //         query: {
                //             refURL: pathName,
                //             errCode: 'No User Data',
                //             errMessage: 'There seems to be no user data found with your account. Please use the signup form to assign the proper account information.',
                //         }
                //     })
                // }
                // setUserStatus(true)
            // })()
        }*/
    }, [session, pathName, router, status])
    // console.log(userStatus)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {userStatus == false ? (
                <RedirectingLoop />
                ) : (
                    <Box 
                        minH="100vh" 
                        bg="blurredBackground" 
                        borderRadius="0 3.5rem"
                        mt={{base: "0vw", md: "0"}}
                        backdropFilter="blur(20px)"
                    >
                    <PortalNavigation
                        onClose={() => onClose}
                        display={{ base: 'none', md: 'block' }}
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
    )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     console.log("Hello")
//     return {
//       props: {
//         session: await getSession(context),
//       },
//     };
//   }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = await getSession(context)

//     console.log(session?.user?.email)
  
//     // const user = await prisma.user.findMany({
//     //   where: {
//     //     email: session?.user?.email
//     //   }
//     // })
  
//     return {
//       props: {
//         session,
//         // user
//       },
//     }
//   }