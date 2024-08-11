import { extendTheme } from "@chakra-ui/react";

import { cardTheme as Card } from "./components/CardStyles";
import { ButtonStyles as Button } from "./components/ButtonStyles";
import { HeadingStyles as Heading } from "./components/HeadingStyles";
import { LinkStyles as Link } from "./components/LinkStyles";
import { tabsTheme as Tabs } from "./components/TabsStyles";

import { Playfair_Display, Lato } from "next/font/google"
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['normal', 'italic'], 
  display: 'swap', 
  preload: true,
  fallback: ['Georgia', 'serif']
})
const lato = Lato({
    weight: ["100", "300", "400", "700", "900"], 
    style: ['normal', 'italic'],
    subsets: ["latin"],
    display: 'swap', 
    preload: true,
    fallback: ['system-ui', 'arial', 'sans-serif']
})

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth !important",
        scrollPadding: "5rem",
        overscrollBehaviorInline: "contain",
        overscrollBehavior: "contain",
        scrollSnapType: "inline mandatory",
        background: "blurredBackground",
      },
      body: {
        background: "black",
        color: "white",
        height: "100%",
        minHeight: "100%"
      },
      a: {
        color: "primary",
      },
      svg: {
        height: "initial",
        // height: "auto",
        // display: "inline",
        // width: "100%",
        // height: "100%",
      },
      p: {
        lineHeight: "1.25",
        fontSize: "1.3rem",
        // marginY: "0.1rem",
      }
    },
  },
  colors: {
    primary: "#764688",
    secondary: "#e7c462",
    green: "#6acc1b",
    black: "#0F111B",
    blackRGBA: "rgba(15,17,27,0.7)",
    white: "#EDEDED",
    whiteRGBA: "rgba(237,237,237,0.7)",
    blurredPurple: "#30243c",
    blurredPurpleRGBA: "rgba(48,36,60,0.7)",
    whiteColourGradient:
      "radial-gradient(ellipse at center, #EDEDED 0%,#FAFAFA 36%,#EBEBEB 100%)",
    mainGradient:
      "linear-gradient(135deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%)",
      // "linear-gradient(-45deg, #2c3e50 0%, #3498db 100%, #e74c3c 100%)",
      // "linear-gradient(45deg, #D01318 0%, #3B5026 50%, #D6BD76 100%)",
    backgroundGradient:
      "linear-gradient(-135deg, rgba(59,103,217,0.8) 0%, rgba(67,12,140,0.95) 75%)",
    blurredBackground: "rgba(118 70 136 / 15%)",
    subtleBlurredBackground: "rgba(237 237 237 / 15%)",
    prideGradient:
      "linear-gradient(75deg, rgba(212,6,6,1) 0%, rgba(240,157,0,1) 15%, rgba(229,254,3,1) 22%, rgba(13,190,3,1) 35%, rgba(10,26,154,1) 42%, rgba(118,1,138,1) 60%,  rgba(118,1,138,1) 65%, rgba(1,1,1,1) 70%, rgba(97,58,22,1) 80%, rgba(116,215,237,1) 90%, rgba(255,175,199,1) 100%)",
    newPrideGradient : "linear-gradient(45deg, #5D62B5 0%, #5D62B5 17%, #6BB0A6 17%, #6BB0A6 34%, #EFC050 34%, #EFC050 51%, #EB7F3F 51%, #EB7F3F 68%, #ED4C67 68%, #ED4C67 85%, #652D90 85%, #652D90 100%);"
  },
  fonts: {
    body: lato.style.fontFamily,
    heading: playfairDisplay.style.fontFamily,
  },
  shadows: {
    bsPrimary: "5px 3px 8.37px rgba(118, 70, 136,.2)",
    bsSecondary: "5px 3px 8.37px rgba(231, 196, 98,.2)",
    bsWhite: "5px 3px 8.37px rgba(237, 237, 237,0.2)",
    
    bsBoldPrimary: "1px 1px 10px rgba(118, 70, 136,1)",
    bsBoldSecondary: "1px 1px 10px rgba(231, 196, 98,1)",
    bsBoldWhite: "1px 1px 8.37px rgba(237, 237, 237,0.2)",
    bsBoldRed: "1px 1px 10px rgba(193, 39, 45,1)",
    
    bsMediumBoldPrimary: "1px 1px 10px 9px rgba(118, 70, 136,0.7)",
    bsMediumBoldSecondary: "1px 1px 10px 9px rgba(231, 196, 98,0.7)",
    bsMediumBoldWhite: "1px 1px 8.37px 9px rgba(237, 237, 237,0.2)",
    bsMediumBoldRed: "1px 1px 10px 9px rgba(193, 39, 45,1)",
    
    bsBigBoldPrimary: "1px 1px 10px 12px rgba(118, 70, 136,1)",
    bsBigBoldSecondary: "1px 1px 10px 12px rgba(231, 196, 98,1)",
    bsBigBoldWhite: "1px 1px 8.37px 12px rgba(237, 237, 237,0.2)",
    bsBigBoldRed: "1px 1px 10px 12px rgba(193, 39, 45,1)",

    tsPrimary: "1px 1px 10px rgba(118, 70, 136,0.7)"
  },
  components: {
    Card,
    Button,
    Heading,
    Link,
    Tabs,

    // Text: {
    //   base: {
    //     lineHeight: "1.2",
    //     fontSize: "1.5rem",
    //   }
    // },
    // FormInput: {
    //   variants: {
    //     primary: {
    //       bg: "mainGradient",
    //     },
    //   },
    // },
    FormLabel: {
      baseStyle: {
        fontFamily: "Playfair Display, Georgia, serif",
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: "white",
      },
    },
  },
});
