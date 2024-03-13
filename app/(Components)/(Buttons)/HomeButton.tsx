import { Box, Tooltip, IconButton, Icon } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import HouseIcon from '../(Vectors)/house'
import { BsHouse, BsArrowLeft, BsHouseFill } from 'react-icons/bs'

interface propTypes {
    colour?: string | null | undefined | unknown
    hoverColour?: string | null | undefined | unknown
    link?: string | null | undefined | unknown
    icon?: any | null | undefined | unknown
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
            {/* <IconButton
                        aria-label={theHelperText}
                        variant="unstyled"
                        _hover={{ color: hoverIconColour }}
                        color={iconColour}
                        // h="auto"
                        // w="100%"
                        // height="100%"
                        // fontSize="3xl"
                        icon={!icon ? <BsHouseFill size="4rem"  /> : BsArrowLeft ? <Icon as={BsArrowLeft} /> : <Icon />}
                    /> */}
            <Link href={goToLink} style={{color: "white"}}>
                <Tooltip label={theHelperText}>
                    <Icon as={!icon ? BsHouseFill : icon} boxSize="3rem" color={iconColour} _hover={{ color: hoverIconColour }}/>
                </Tooltip>
            </Link>
        </Box>
    )
}