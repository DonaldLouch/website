

import { Anchor, Box, Tooltip } from '@mantine/core'

interface propTypes {
    colour?: string | null | undefined | unknown
    hoverColour?: string | null | undefined | unknown
    link?: string | null | undefined | unknown
    icon?: any | null | undefined | unknown
    iconType?: string | null | undefined | unknown
    helperText?: string | null | undefined | unknown
}

import classes from "./Buttons.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HomeButton( props: propTypes ) {
    const {link, icon, helperText} = props

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
            <Anchor href={goToLink} style={{color: "white"}}>
                <Tooltip label={theHelperText}>
                    <Box className={classes.homeButton}>{icon || 
                        <FontAwesomeIcon icon={["fajr", "house"]} size="3x" />
                    }</Box>
                </Tooltip>
            </Anchor>
        </Box>
    )
}