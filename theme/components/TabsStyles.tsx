import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const mainVariant = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    root: {
      my: "1rem",
      boxShadow: "bsBoldBlue",
      p: "2rem",
      borderRadius: "0 2rem",
    },
    tab: {
      border: 'none',
      bg: "none",
      borderRadius: "0 2rem",
      p: "1rem 0.5rem",
      fontFamily: "body",
      fontWeight: "500",
      opacity: 0.6,
      color: mode(c, "white")(props),
      _selected: {
        bg: "rgba(118, 70, 136, 0.3)",
        color: mode("black", "white")(props),
        fontWeight: "900",
        opacity: 1,
      },
    },
    tablist: {
      overflow: "scroll",
      whiteSpace: "nowrap",
      maxW: "100%"
    },
  };
});

const variants = {
  main: mainVariant,
};

const defaultProps = {
  size: 'md',
  variant: 'main',
  colorScheme: 'purple',
} as any

export const tabsTheme = defineMultiStyleConfig({
  variants,
  defaultProps,
});