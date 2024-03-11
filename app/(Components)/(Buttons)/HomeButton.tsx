import { Box, Tooltip, IconButton, Icon } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import HouseIcon from '../(Vectors)/house'
import { BsHouse, BsArrowLeft } from 'react-icons/bs'

interface propTypes {
    colour?: string | null | undefined | unknown
    hoverColour?: string | null | undefined | unknown
    link?: string | null | undefined | unknown
    icon?: string | null | undefined | unknown
    iconType?: string | null | undefined | unknown
    helperText?: string | null | undefined | unknown
}

export default function HomeButton( props: propTypes ) {
    const {colour, hoverColour, link, icon, helperText} = props

    const iconColour = colour ? colour : "white"
    const hoverIconColour = hoverColour ? hoverColour : "secondary"
    const goToLink = link ? link : "/"
    // const iconName = icon ? icon : "house" as any
    const theHelperText = helperText ? helperText : "Go Back to Home" as any

    return (
        <Box
            position="absolute"
            top={{ base: "1.4%", md: "1%" }}
            left={{ base: "4%", md: "1%" }}
            zIndex="tooltip"
            color="white"
        >
            <Link href={goToLink} style={{color: "white"}}>
                <Tooltip label={theHelperText}>
                    <IconButton
                        aria-label={theHelperText}
                        variant="unstyled"
                        _hover={{ color: hoverIconColour }}
                        color={iconColour}
                        // h="auto"
                        // w="100%"
                        // height="100%"
                        fontSize="3xl"
                        icon={!icon ? <BsHouse size={55}  /> : BsArrowLeft ? <Icon as={BsArrowLeft} /> : <Icon />}
                    />
                </Tooltip>
            </Link>
        </Box>
    )
}