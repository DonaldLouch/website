import { 
    extendTheme,
 } from "@chakra-ui/react"

import { ButtonStyles as Button } from "./components/ButtonStyles"
import { HeadingStyles as Heading } from "./components/HeadingStyles"
import { LinkStyles as Link } from "./components/LinkStyles"
//import { InputStyles as Input } from "./components/InputStyles"

export const theme = extendTheme({
    styles: {
        global: {
            html: {
                scrollBehavior: "smooth",
                scrollPadding: "5em",
                overscrollBehaviorInline: "contain",
                overscrollBehavior: "contain",
                scrollSnapType: "inline mandatory",
            },
            a: {
                color: "primary",
            }
        },
    },
    colors: {
        primary: "#764688",
        secondary: "#e7c462",
        tertiary: "#6acc1b",
        black: "#0F111B",
        white: "#EDEDED",
        whiteColourGradient: "radial-gradient(ellipse at center, #EDEDED 0%,#FAFAFA 36%,#EBEBEB 100%)",
        mainGradient: "linear-gradient(135deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%)",
        backgroundGradient: "linear-gradient(-135deg, rgba(59,103,217,0.8) 0%, rgba(67,12,140,0.95) 75%)",
        blurredBackground: "rgba(237 237 237 / 15%)",
        prideGradient: "linear-gradient(92deg, rgba(212,6,6,0.95) 0%, rgba(240,157,0,0.95) 10%, rgba(229,254,3,0.94) 20%, rgba(13,190,3,0.95) 30%, rgba(10,26,154,0.95) 40%, rgba(118,1,138,0.95) 50%, rgba(1,1,1,0.95) 60%, rgba(97,58,22,0.95) 70%, rgba(116,215,237,0.95) 80%, rgba(255,175,199,0.95) 90%, rgba(250,249,245,0.9514180672268907) 100%)"
    },
    fonts: {
        body: "Lato, system-ui, sans-serif",
        heading: "Playfair Display, Georgia, serif", 
    },
    shadows: {
        bsBlue: "5px 3px 8.37px rgba(118, 70, 136,.2)",
        bsOrange: "5px 3px 8.37px rgba(231, 196, 98,.2)",
        bsWhite: "5px 3px 8.37px rgba(237, 237, 237,0.2)",
        bsBoldWhite: "1px 1px 8.37px rgba(237, 237, 237,0.2)",
        bsBigBoldWhite: "1px 1px 8.37px 12px rgba(237, 237, 237,0.2)",
        bsBoldRed: "1px 1px 10px rgba(193, 39, 45,1)",
        bsBigBoldRed: "1px 1px 10px 12px rgba(193, 39, 45,1)",
        bsBoldBlue: "1px 1px 10px rgba(118, 70, 136,1)",
        bsBoldOrange: "1px 1px 10px rgba(231, 196, 98,1)",
        bsBigBoldBlue: "1px 1px 10px 12px rgba(118, 70, 136,1)",
        bsBigBoldOrange: "1px 1px 10px 12px rgba(231, 196, 98,1)",
    },
    components: {
        Button,
        Heading,
        Link,
    
        Input: {
            variants: {
                primary: {
                    bg: "mainGradient",
                },
            },
        },
        FormLabel: {
            baseStyle: {
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "white"
            },
        },
        Text: {
            baseStyle: {
                margin: 4,
                lineHeight: 1.2,
            }
        }
    }
})