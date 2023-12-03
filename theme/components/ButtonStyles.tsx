export const ButtonStyles = {
  variants: {
    primary: {
        m: "1.5rem 0.5rem 0 !important",
        p: "1.5rem",
        borderRadius: "0 1.5rem",
        _hover: { 
            bg: "none",
            boxShadow: "none",
            color: "primary"
        },
         _disabled: { 
            bg: "black",
            opacity: "0.2",
            pointerEvent: "none",
        },
        wordBreak: "break-word",
      },
      
      heroButton: {
          color: "black",
          m: "0.5rem 0",
          p: { base: "1rem", md: "2rem"} ,
          borderRadius: "0 2rem",
          wordBreak: "break-word",
          boxShadow: "bsBoldPrimary",
          fontWeight: "900",
          textShadow: "tsPrimary",
          _hover: { 
              bg: "none",
              boxShadow: "bsBigBoldSecondary",
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
          boxShadow: "bsBoldSecondary",
          fontWeight: "900",
          _hover: { 
              bg: "none",
              boxShadow: "bsBigBoldSecondary",
              fontWeight: "600",
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
          boxShadow: "bsPrimary",
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
          bg: "subtleBlurredBackground",
          color: "white",
        //   m: "1.5rem 1rem 0",
          m: "0 3rem -1rem !important",
          p: "2rem 0",
          borderRadius: "0 2rem",
          wordBreak: "break-word",
        //   boxShadow: "bsBoldWhite",
        //   fontWeight: "900",
          fontSize: "lg",
          w: "calc(100% - 6rem)" ,
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
      newFormButton: {
        background: "blurredPurple",
        p: "1.8rem 1.5rem",
        _hover: { 
            bg: "none",
            boxShadow: "none",
            color: "currentColor"
        },
        borderRadius: "0 1.5rem",
        width: "100%",
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
      }
  },
};
