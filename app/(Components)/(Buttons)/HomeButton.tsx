

import { Anchor, Box, Tooltip } from '@mantine/core'

import { Home01Icon } from '@hugeicons/react'

interface propTypes {
    colour?: string | null | undefined | unknown
    hoverColour?: string | null | undefined | unknown
    link?: string | null | undefined | unknown
    icon?: any | null | undefined | unknown
    iconType?: string | null | undefined | unknown
    helperText?: string | null | undefined | unknown
}

import classes from "./Buttons.module.css"

export default function HomeButton( props: propTypes ) {
    const {colour, hoverColour, link, icon, helperText} = props

    const iconColour = colour ? colour : "white"
    const hoverIconColour = hoverColour ? hoverColour : "secondary"
    const goToLink = link ? link : "/" as any
    // const iconName = icon ? icon : "house" as any
    const theHelperText = helperText ? helperText : "Go Back to Home" as any

    return (
        <Box
            pos="absolute"
            top={{ base: "1.4%", md: "1%" }}
            left={{ base: "4%", md: "1%" }}
            style={{zIndex: "1000"}}
            c="white"
            id="goHome"
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
            <Anchor href={goToLink} style={{color: "white"}}>
                <Tooltip label={theHelperText}>
                    <Box className={classes.homeButton}>{icon ? icon : <Home01Icon size="3rem" />}</Box>
                    {/* <Icon as={!icon ? BsHouseFill : icon} boxSize="3rem" color={iconColour} _hover={{ color: hoverIconColour }}/> */}
                </Tooltip>
            </Anchor>
        </Box>
    )
}