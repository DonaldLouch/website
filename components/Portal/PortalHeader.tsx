import React from 'react'
import {
  IconButton,
  Flex,
  VStack,
  useColorModeValue,
  Text,
  FlexProps
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../lib/fontAwesome'

interface PortalHeaderProps extends FlexProps {
    onOpen: () => void
    pageTitle: string
}

export default function PortalHeader({ pageTitle, onOpen, ...rest }: PortalHeaderProps) {
    const blackWhite = useColorModeValue('black', 'white')

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg="blurredBackground"
            boxShadow="bsBlue"
            borderRadius="0 3.5rem 0 0"
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="unstyled"
                boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
                aria-label="open menu"
                w="5%"
                padding="0.5rem"
                borderRadius="0 1em"
                color={blackWhite}
                _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                icon={
                    <FontAwesomeIcon 
                        icon={'bars'} 
                        width="100%"
                        height="100%"
                    />
                }
            />

            <VStack
                alignItems="flex-end"
                spacing="0.2rem"
                boxShadow="bsBoldBlue"
                borderRadius="0 2rem"
                p="0.5rem 1.5rem"
                mr="2"
            >
                <Text fontSize="lg" m="0" color={useColorModeValue('black', 'white')} fontWeight="bold">{pageTitle}</Text> 
            </VStack>
        </Flex>
    )
}