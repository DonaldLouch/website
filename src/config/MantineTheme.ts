import { Accordion, ActionIcon, Alert, Anchor, AspectRatio, Badge, Combobox, createTheme, Input, Slider, Tabs, Text, Notification } from "@mantine/core"

import classes from "../components/Components.module.css"
import formStyles from "../components/form/Forms.module.css"
import notificationClasses from "../config/styles/Notifications.module.css";


import "@fontsource-variable/noto-sans"
import "@fontsource-variable/noto-serif"
import "@fontsource-variable/noto-sans-mono"

export const MantineTheme = createTheme({
  components: {
    Text: Text.extend({
      defaultProps: {
        fw: "300",
        style: { whiteSpace: "break-spaces", margin: "1rem 0" },
      },
    })
  },

  lineHeights: {
    md: "1.5rem",
  },
  fontSizes: {
    md: "1.2rem",
  },
  scale: 1,
  radius: {
    xs: "0 0.2rem",
    sm: "0 0.5rem",
    md: "0 1rem",
    lg: "0 1.5rem",
    xl: "0 2rem",
    "2xl": "0 2.5rem",
    "3xl": "0 3rem",
    "4xl": "0 4rem",
  },
  fontFamily: "Noto Sans Variable, sans-serif",
  fontFamilyMonospace: "Noto Sans Mono Variable, monospace",
  headings: {
    fontFamily: "Noto Serif Variable, serif",
  },
  shadows: {
    bsSMPrimary: "0px 1px 10px rgba(118, 70, 136,.2)",
    bsSMSecondary: "0px 1px 10px rgba(231, 196, 98,.2)",
    bsSMWhite: "0px 1px 10px rgba(244, 244, 244,0.2)",

    bsPrimary: "5px 3px 8.37px rgba(118, 70, 136,.2)",
    bsSecondary: "5px 3px 8.37px rgba(231, 196, 98,.2)",
    bsWhite: "5px 3px 8.37px rgba(244, 244, 244,0.2)",

    bsBoldPrimary: "1px 1px 10px rgba(118, 70, 136,1)",
    bsBoldSecondary: "1px 1px 10px rgba(231, 196, 98,1)",
    bsBoldWhite: "1px 1px 8.37px rgba(244, 244, 244,0.2)",
    bsBoldRed: "1px 1px 10px rgba(193, 39, 45,1)",

    bsMediumBoldPrimary: "1px 1px 10px 9px rgba(118, 70, 136,0.7)",
    bsMediumBoldSecondary: "1px 1px 10px 9px rgba(231, 196, 98,0.7)",
    bsMediumBoldWhite: "1px 1px 8.37px 9px rgba(244, 244, 244,0.2)",
    bsMediumBoldRed: "1px 1px 10px 9px rgba(193, 39, 45,1)",

    bsBigBoldPrimary: "1px 1px 10px 12px rgba(118, 70, 136,1)",
    bsBigBoldSecondary: "1px 1px 10px 12px rgba(231, 196, 98,1)",
    bsBigBoldWhite: "1px 1px 8.37px 12px rgba(244, 244, 244,0.2)",
    bsBigBoldRed: "1px 1px 10px 12px rgba(193, 39, 45,1)",

    tsPrimary: "1px 1px 10px rgba(118, 70, 136,0.7)",
  },
  fontSmoothing: false,
  white: "#e7e7e7",
  black: "#0F111B",
  colors: {
    primary: [
      "#734485",
      "#f8f1fc",
      "#ebe0ef",
      "#d4bedb",
      "#bb9ac7",
      "#a77bb8",
      "#9a68ad",
      "#955ea9",
      "#814e94",
      "#653975",
    ],
    secondary: [
      "#ebcd78",
      "#fff8e2",
      "#fbf0d0",
      "#f3dfa6",
      "#e4bd50",
      "#e0b437",
      "#deaf28",
      "#c59919",
      "#b08810",
      "#987500",
    ],
    green: [
      "#68c81b",
      "#f1fee7",
      "#e4f9d3",
      "#c9f3a7",
      "#aced78",
      "#94e750",
      "#84e437",
      "#7be228",
      "#5ab212",
      "#4a9a00",
    ],
    darkPurple: [
      "#30243c",
      "#57416c",
      "#e5e2e9",
      "#cbc2d4",
      "#afa0be",
      "#9783ab",
      "#8971a0",
      "#82679d",
      "#6f5789",
      "#644d7a",
    ],
    whiteShades: [
      "#e7e7e7",
      "#fbf3f5",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#5c5557",
    ],
    blackShades: [
      "#0F111B",
      "#e2e3e9",
      "#c1c4d3",
      "#9fa3bf",
      "#8187ad",
      "#6e75a3",
      "#656d9f",
      "#545c8b",
      "#4a527e",
      "#3e466f",
    ],
    red: [
      "#ffeaec",
      "#fdd4d6",
      "#f4a7ac",
      "#ec777e",
      "#e64f57",
      "#e3353f",
      "#e22732",
      "#c91a25",
      "#b31220",
      "#9e0419",
    ],
    newPurple: [
      "#30243c",
      "#44394f",
      "#594f62",
      "#6e6576",
      "#827b8a",
      "#97919d",
      "#aca7b1",
      "#c0bdc4",
      "#d5d3d8",
      "#eae9eb",
    ],
    newBlack: [
      "#1e192a",
      "#342f3f",
      "#4a4654",
      "#615e69",
      "#78757f",
      "#8e8c94",
      "#a5a3a9",
      "#bbbabf",
      "#d2d1d4",
      "#e8e8e9",
    ],
  }
})