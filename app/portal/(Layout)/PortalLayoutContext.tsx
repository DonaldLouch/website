'use client'

import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'

import { useRouter } from 'next/navigation'

import { PortalNavigation } from './PortalNavigation'
import PortalHeader from './PortalHeader'
import LoadingComponent from '@/app/(Config)/ContentLoading'
import { useEffect } from 'react'

export default function PortalLayoutContext({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean }) {
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
       !isLoggedIn && router.push("/?message=userLoginNotAllowed")
    })
    
   
    // !isLoggedIn && router.push("../../../../../")

    return (
      <>
      {!isLoggedIn ? <LoadingComponent /> : (<>
        <Box
          minH="80vh"
          bg="none"
          borderRadius="0 2rem"
          mt={{ base: "0vw", lg: "0" }}
          backdropFilter="blur(20px)"
          w={{base: "100%", lg: "calc(100% + 6rem)"}}
          mx={{base: "0", lg: "-3rem"}}
        >
          <PortalNavigation
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
            // pos="sticky"
            // top="8%"
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
          {/* <PortalHeader onOpen={onOpen} /> */}

          <Box ml={{ base: 0, md: "15rem" }} p={{base: "2rem 1rem", lg: "2.5rem 4rem"}} mb="0" maxH="80vh" overflow="scroll">
            {children}
          </Box>
        </Box>
      </>)}
      </>
    )
}
