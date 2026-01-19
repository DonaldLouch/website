import { Accordion, ActionIcon, Alert, Anchor, AspectRatio, Badge, Combobox, createTheme, Input, Slider, Tabs, Text, Notification } from "@mantine/core"
// import "@mantine/core/styles.css";

// import { Noto_Sans, Noto_Serif, Noto_Sans_Mono } from "next/font/google"

// import "@/app/(Config)/global.css";

import classes from "../components/Components.module.css"
import formStyles from "../components/(Form)/Forms.module.css"
import notificationClasses from "../config/styles/Notifications.module.css";


import "@fontsource-variable/noto-sans"
import "@fontsource-variable/noto-serif"
import "@fontsource-variable/noto-sans-mono"

// const notoBase = Noto_Sans({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   display: "swap",
//   preload: true,
//   fallback: ["system-ui", "arial", "sans-serif"],
// })
// const notoSerif = Noto_Serif({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   display: "swap",
//   preload: true,
//   fallback: ["Georgia", "serif"],
// })
// const notoMono = Noto_Sans_Mono({
//   subsets: ["latin"],
//   style: ["normal"],
//   display: "swap",
//   preload: true,
//   fallback: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
// })

export const MantineTheme = createTheme({
  // black: "#0F111B",
  //   primaryColor: "#57416c",
  components: {
    Text: Text.extend({
      defaultProps: {
        fw: "300",
        style: { whiteSpace: "break-spaces", margin: "1rem 0" },
      },
    }),
    Accordion: Accordion.extend({
      defaultProps: {
        // c: "red",
        bg: "none",
        variant: "filled",
        styles: {
          item: {
            border: "none",
            background: "none !important",
            padding: "0 1rem 0 0.5rem",
          },
          panel: {
            background: "none !important",
            padding: "0rem 1rem 0 !important",
            // borderTop: "solid 0.2px var(--mantine-color-dimmed)",
          },
        },
        classNames: {
          root: classes.accordionDefault,
        },
        // chevronSize: "5rem",
        chevronPosition: "right",
        radius: "md",
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        // c: "red",
        // classNames: {
        //   root: classes.linkDefault,
        // },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: "var(--darkPurple)",
        size: "3.5rem",
        classNames: {
          root: classes.actionIconDefault,
        },
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: "md",
        variant: "unstyled",
        size: "lg",
        c: "white",
        m: "0.5rem",
        classNames: {
          input: formStyles.defaultInput,
        },
      },
    }),
    Combobox: Combobox.extend({
      defaultProps: {
        styles: {
          dropdown: {
            zIndex: 100,
            border: "none",
            color: "white",
            background: "black",
            maxHeight: "25%",
            overflowY: "scroll",
          },
          option: { fontSize: "1.1rem" },
        },
        classNames: {
          option: classes.comboboxOption,
        },
      },
    }),
    AspectRatio: AspectRatio.extend({
      classNames: { root: classes.AspectRatioRoot },
    }),
    Slider: Slider.extend({
      defaultProps: {
        color: "primary",
        thumbSize: "1.5rem",
        styles: {
          thumb: { borderRadius: "100%", background: "var(--darkPurple)" },
          mark: {
            background: "var(--darkPurple)",
            borderColor: "var(--darkPurple)",
          },
        },
        w: "calc(100% + 2rem)",
        radius: "0 1rem 0 0",
        classNames: {
          // trackContainer: classes.sliderTrack,
          track: classes.sliderTrack,
          // bar: classes.sliderTrack,
          // root: classes.sliderTrack,
        },
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        size: "lg",
        autoContrast: true,
        radius: "md",
        p: "1rem 1.2rem",
        h: "auto",
        styles: {
          root: { whiteSpace: "nowrap", wordBreak: "keep-all" },
          label: { marginLeft: "0.5rem" },
        },
        w: "fit-content",
        variant: "light",
        fw: "500",
        tt: "capitalize",
      },
    }),
    Tabs: Tabs.extend({
      defaultProps: {
        variant: "pills",
        // c: "var(--darkPurple)",
        fz: "2rem",
        classNames: {
          tab: classes.tabTab,
        },
        styles: {
          root: {
            margin: "2rem 0",
            boxShadow: "var(--mantine-shadow-bsBoldPrimary)",
            paddingBottom: "2rem !important",
            borderRadius: "0 2rem",
          },
          // tab: {
          //   fontSize: "2rem"
          //   // background: "black"
          // },
          tab: {
            border: "none",
            bg: "none",
            borderRadius: "var(--mantine-radius-md)",
            padding: "1rem 0.5rem",
            paddingLeft: "1rem",
            margin: "2rem",
            fontFamily: "var(--mantine-font-text)",
            fontWeight: "500",
            opacity: 0.6,
            color: "grey",
            fontSize: "1rem",
            textAlign: "center",
          },
          list: {
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
            overflowX: "scroll",
            textAlign: "center",
          },
          panel: {
            padding: "0 2rem 1.5rem",
          },
        },
      },
    }),
    Notification: Notification.extend({
      defaultProps: {
        color: "var(--darkPurpleRGBA)",
        p: "1rem 2rem",
        radius: "md",
        classNames: {
          root: notificationClasses.root,
          title: notificationClasses.title,
          description: notificationClasses.description,
          closeButton: notificationClasses.closeButton,
        },
        // classNames: notificationClasses,
      },
    }),
    Alert: Alert.extend({
      defaultProps: {
        styles: {
          root: {
            boxShadow: "var(--mantine-shadow-bsSMSecondary)",
            padding: "1.5rem",
          },
          message: {
            fontSize: "1.2rem",
            // marginTop: "-0.1rem",
          },
          title: {
            fontFamily: "heading",
            fontSize: "1.5rem",
            fontWeight: "500",
          },
          body: {
            my: "0.5rem",
          },
        },
        radius: "md",
        m: "1rem 0.5rem",
        variant: "filled",
        // style: {f: "break-spaces", margin: "1rem 0"},
      },
    }),
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
  //   fontSizes: {
  //     text: "1.3rem",
  //   },
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
  },
  other: {
    // whiteColourGradient: "radial-gradient(ellipse at center, #EDEDED 0%,#FAFAFA 36%,#EBEBEB 100%)",
    // mainGradient: "linear-gradient(135deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%)",
    // backgroundGradient: "linear-gradient(-135deg, rgba(59,103,217,0.8) 0%, rgba(67,12,140,0.95) 75%)",
    blurredBackground: "rgba(118 70 136 / 15%)",
    // subtleBlurredBackground: "rgba(237 237 237 / 15%)",
    // prideGradient: "linear-gradient(75deg, rgba(212,6,6,1) 0%, rgba(240,157,0,1) 15%, rgba(229,254,3,1) 22%, rgba(13,190,3,1) 35%, rgba(10,26,154,1) 42%, rgba(118,1,138,1) 60%,  rgba(118,1,138,1) 65%, rgba(1,1,1,1) 70%, rgba(97,58,22,1) 80%, rgba(116,215,237,1) 90%, rgba(255,175,199,1) 100%)",
    // newPrideGradient: "linear-gradient(45deg, #5D62B5 0%, #5D62B5 17%, #6BB0A6 17%, #6BB0A6 34%, #EFC050 34%, #EFC050 51%, #EB7F3F 51%, #EB7F3F 68%, #ED4C67 68%, #ED4C67 85%, #652D90 85%, #652D90 100%);",
  },
});

// "linear-gradient(-45deg, #2c3e50 0%, #3498db 100%, #e74c3c 100%)",
    // "linear-gradient(45deg, #D01318 0%, #3B5026 50%, #D6BD76 100%)",