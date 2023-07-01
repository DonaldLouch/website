import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
   background: "none",
   boxShadow: "bsBoldWhite",
   borderRadius: "0 2rem",
   p: "1rem 1.5rem",
   m: "2rem 0",
   color: "white"
  },
  header: {
    padding: "0 1rem",
    color: "white"
  },
  body: {
    padding: "0.5rem 1rem",
    color: "white"
  },
  footer: {
  },
})

const sizes = {
  md: definePartsStyle({
    container: {
    //   borderRadius: '0px',
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })