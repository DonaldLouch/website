import * as React from "react";
import type { AppProps } from "next/app";

// import splitbee from '@splitbee/web'
// import { useEffect } from 'react'

// import { AuthProvider } from '../config/Firebase/FirebaseAuth'

import {
  ChakraProvider,
  ColorModeProvider,
  // CSSReset,
} from "@chakra-ui/react";

import { theme } from "../theme/index";

import { SessionProvider } from "next-auth/react";

import { Analytics } from '@vercel/analytics/react';

import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@fontsource/lato/100-italic.css";
import "@fontsource/lato/300-italic.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700-italic.css";
import "@fontsource/lato/900-italic.css";

import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/600-italic.css";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource/playfair-display/800-italic.css";
import "@fontsource/playfair-display/900-italic.css";

import { Layout } from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps): any {
  // useEffect((): void => { splitbee.init({
  //   token: process.env.SPLITBEE_TOKEN,
  // }); }, []);

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        {/* <CSSReset /> */}
        <SessionProvider session={pageProps.session}>
          <Layout>
            {/* <AuthProvider> */}
            <Component {...pageProps} />
            {/* </AuthProvider> */}
          </Layout>
        </SessionProvider>
        <Analytics />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

//export default MyApp
