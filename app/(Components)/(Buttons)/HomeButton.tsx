import { Box, Tooltip, IconButton } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'

export default function HomeButton() {
    return (
        <Box
            position="absolute"
            top={{ base: "1.4%", md: "1%" }}
            left={{ base: "4%", md: "1%" }}
            zIndex="tooltip"
            color="white"
        >
            <Link href="../" style={{color: "white"}}>
                <Tooltip label="Go Back Home">
                    <IconButton
                        aria-label="Go Back Home"
                        variant="unstyled"
                        _hover={{ color: "secondary" }}
                        // h="auto"
                        // w="100%"
                        // height="100%"
                        fontSize="3xl"
                        icon={<FontAwesomeIcon icon={["fal", "house"]} />}
                    />
                </Tooltip>
            </Link>
        </Box>
    )
}
