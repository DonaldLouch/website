import * as React from "react"
import type { AppProps } from 'next/app'

// import splitbee from '@splitbee/web'
// import { useEffect } from 'react'

// import { AuthProvider } from '../config/Firebase/FirebaseAuth'

import { 
  ChakraProvider, 
  ColorModeProvider, 
  CSSReset,
} from "@chakra-ui/react"

import { theme } from "../theme/index"

import { SessionProvider } from 'next-auth/react';

import "@fontsource/lato"
import "@fontsource/playfair-display"

import  { Layout }  from "../components/Layout"

export default function MyApp({ Component, pageProps }: AppProps): any {
  // useEffect((): void => { splitbee.init({
  //   token: process.env.SPLITBEE_TOKEN,
  // }); }, []);
  
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{
        initialColorMode: "light",
        useSystemColorMode: true,
      }}>
          <CSSReset />
          <SessionProvider session={pageProps.session}>
            <Layout>
              {/* <AuthProvider> */}
                <Component {...pageProps} />
              {/* </AuthProvider> */}
          </Layout>
          </SessionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

//export default MyApp
