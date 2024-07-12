'use client'

import {
  IconButton,
  Flex,
  FlexProps,
  Stack,
  Text
} from '@chakra-ui/react'
import { UserButton, useUser } from '@clerk/nextjs'


import { BsList } from 'react-icons/bs'

interface PortalHeaderProps extends FlexProps {
    onOpen: () => void
}


export default function AdminHeader({ onOpen, ...rest }: PortalHeaderProps) {
    // const {user} = useUser();
    return (
        <Flex
            ml={{ base: 0, md: "15rem" }}
            p="2.2rem 1rem"
            height="2rem"
            alignItems="center"
            bg="blurredBackground"
            boxShadow="bsPrimary"
            borderRadius="0 2rem 0 0"
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="unstyled"
                boxShadow="bsBoldWhite"
                aria-label="open menu"
                w="5%"
                padding="0.5rem"
                borderRadius="0 1em"
                color="white"
                _hover={{boxShadow: "none", color: "primary"}}
                icon={
                    <BsList/>
                }
            />
            
            <UserButton />
            {/* <Stack alignItems="center" direction="row">
                <Text fontWeight="700">{user?.fullName}</Text>
                <UserButton afterSignOutUrl="/"/>
            </Stack> */}
        </Flex>
    )
}