export const LinkStyles = {
  baseStyle: {
    // color: "primary",
    _hover: { color: "secondary" },
    fontWeight: "bold",
    // textDecoration: "underline",
  },
  variants: {
    primary: {
      borderBottom: "1px solid purple",
      // pb: "0.1rem",
      _hover: {
        borderColor: "orange",
        textDecoration: "none",
        color: "inherit",
      },
    },

    primaryButton: {
      boxShadow: "bsBoldBlue",
      _hover: {
        boxShadow: "none",
        textDecoration: "none",
        color: "primary",
        bg: "none",
        fontWeight: "900",
      },
      p: "1rem 2rem",
      color: "white",
      borderRadius: "0 1.5rem",
      fontSize: "2xl",
      fontWeight: "400",
      bg: "backgroundGradient",
    },

    primaryButton2: {
      boxShadow: "bsBoldBlue",
      _hover: {
        boxShadow: "none",
        textDecoration: "none",
        color: "primary",
        bg: "none",
        fontWeight: "900",
      },
      p: "1rem 2rem",
      color: "white",
      borderRadius: "0 1.5rem",
      fontSize: "1.3rem",
      fontWeight: "400",
      bg: "backgroundGradient",
      w: "95%",
      display: "block",
      m: "1rem auto",
    },

    fullCardButton: {
      bg: "black",
      color: "black",
      m: "1rem",
      p: "1rem 2rem",
      display: "block",
      minW: "100%",
      fontWeight: "bold",
      borderRadius: "0 3rem 0 3rem",
      wordBreak: "break-word",
      boxShadow: "bsBlue",
      _hover: {
        bg: "none",
        boxShadow: "none",
        textDecoder: "none",
      },
    },
  },
};
