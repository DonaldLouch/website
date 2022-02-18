// import React, { ReactNode } from 'react'

import { 
    Box, 
    Stack, 
    // HStack, 
    // ButtonGroup,
    Image,
    Link,
    useColorModeValue,
    // FlexProps,
    useDisclosure,
    Drawer,
    DrawerContent,
    IconButton
    // Avatar,
    // Tooltip,
    // HStack,
    // Flex,
    // Menu,
    // MenuButton,
    // MenuDivider,
    // MenuItem,
    // MenuList
} from '@chakra-ui/react'

import { HeaderNavigation } from './Header/HeaderNavigation'

// import { HeaderNavigation } from './HeaderLink/HeaderNavigation';
// import { HeaderIcon } from './HeaderLink/HeaderIcon';

// import { useSession } from 'next-auth/react'
// import { useState, useEffect } from 'react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../config/fontAwesome";

// import { signOut } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../config/fontAwesome'

export default function Header() {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // { children } : { children: ReactNode }
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const blackWhite = useColorModeValue('black', 'white')

    return (
        <Box as="header" role="header" mx="auto" py="2" px={{base: 0, lg: 20}} pos="fixed" w="100vw" bg="blurredBackground" backdropFilter="blur(20px)" zIndex="docked" boxShadow={useColorModeValue('bsOrange', 'bsBoldWhite')}>
            <Stack direction="row" spacing="4" mx="auto">
                <Stack direction="row" align="center" w="100%" justify={{base: "space-between", lg: "inherit"}} px={{base: "5rem", lg: "inherit"}}>
                    <Link href="../../../">
                        <Image
                            src="/titleLogo.svg"
                            alt="Donald Louch"
                            // w="12vw"
                            width={{base: "30vw", lg: "12vw"}}
                        />
                    </Link>
                    <HeaderNavigation
                        onClose={() => onClose}
                        display={{ base: 'none', lg: 'flex' }}
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
                            <HeaderNavigation onClose={onClose} />
                        </DrawerContent>
                    </Drawer>

                    {/* <PortalHeader onOpen={onOpen} pageTitle={pageTitle} /> */}

                    <IconButton
                        display={{ base: 'flex', lg: 'none' }}
                        onClick={onOpen}
                        variant="unstyled"
                        boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
                        aria-label="open menu"
                        // w="5%"
                        padding="0.5rem"
                        borderRadius="0 1em"
                        color={useColorModeValue('black', 'white')}
                        _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                        icon={
                            <FontAwesomeIcon 
                                icon={'grip'} 
                                // color={blackWhite}
                                //width="50%"
                            />
                        }
                    />
                    {/* <Stack as="nav" display="flex" direction="row">
                        <HeaderNavigation
                            onClose={() => onClose}
                            // display="flex"
                            // direction="row"
                            // align="center"
                            // justify="center"
                        />
                    </Stack> */}
                </Stack>
            </Stack>
        </Box>
    )
}
