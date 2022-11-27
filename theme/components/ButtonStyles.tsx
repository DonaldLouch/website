export const ButtonStyles = {
  variants: {
      heroButton: {
          color: "black",
          m: "0.5rem 0",
          p: { base: "1rem", md: "2rem"} ,
          borderRadius: "0 2rem",
          wordBreak: "break-word",
          boxShadow: "bsBoldBlue",
          fontWeight: "900",
          textShadow: "tsPrimary",
          _hover: { 
              bg: "none",
              boxShadow: "bsBigBoldOrange",
              fontWeight: "600",
              color: "white"
          },
      },

      portalButton: {
          color: "black",
          px: { base: 2, md: 5 },
          py: "2.5rem",
          borderRadius: "0 1.5rem",
          wordBreak: "break-word",
          boxShadow: "bsBoldOrange",
          fontWeight: "900",
          _hover: { 
              bg: "none",
              boxShadow: "bsBigBoldOrange",
              fontWeight: "100",
              color: "primary"
          },
      },
      
      portalButtonRed: {
          color: "red",
          px: { base: 2, md: 5 },
          py: "2.5rem",
          borderRadius: "0 1.5rem",
          wordBreak: "break-word",
          boxShadow: "bsBoldRed",
          fontWeight: "900",
          _hover: { 
              bg: "none",
              boxShadow: "bsBigBoldRed",
              fontWeight: "100",
              color: "primary"
          },
      },

      formButton: {
          bg: "mainGradient",
          color: "white",
          m: "2rem",
          p: "2rem",
          borderRadius: "0 3rem 0 3rem",
          wordBreak: "break-word",
          boxShadow: "bsBlue",
           _disabled: { 
              bg: "black",
              opacity: "0.2",
              pointerEvent: "none",
          },
          _hover: { 
              bg: "none",
              boxShadow: "none",
          },
      },

      sectionButton: {
          bg: "backgroundGradient",
          color: "white",
          borderRadius: "0 1.5rem",
          py: "2rem",
          _hover: {
              bg: "none",
              color: "primary",
          },
          wordBreak: "break-word",
          whiteSpace: "break-spaces",
      },

      blackFormButton: {
          bg: "black",
          color: "white",
          m: "1.5rem 1rem 0 !important",
          p: "2rem",
          borderRadius: "0 3rem 0 3rem",
          wordBreak: "break-word",
          boxShadow: "bsBoldWhite",
           _disabled: { 
              bg: "black",
              opacity: "0.2",
              pointerEvent: "none",
          },
          _hover: { 
              bg: "none",
              boxShadow: "none",
              color: "primary"
          },
      },
  },
};
