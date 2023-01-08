import Head from "next/head";
import Script from "next/script";

import { useColorModeValue } from "@chakra-ui/react"

interface MetaProps {
  title: string;
  keywords: string;
  description: string;
}

export const Metadata = (props: MetaProps) => {
  const { title, keywords, description } = props;

  const colour = useColorModeValue("#EDEDED", "#0F111B")

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#764688" />
      <meta name="apple-mobile-web-app-title" content={process.env.WEBSITE_NAME} />
      <meta name="application-name" content={process.env.WEBSITE_NAME} />
      <meta name="theme-color" content={colour} />
      <meta name="msapplication-TileColor" content={colour} />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <Script
        src="https://donaldlouch.instatus.com/6390a14d/widget/script.js"
        strategy="lazyOnload"
      ></Script>
      <title>{title}</title>
    </Head>
  );
};

// Meta.defaultProps = {
//     title: process.env.WEBSITE_NAME,
//     keywords: 'links, devlexicon, devlexicon links, donald louch',
//     description: 'DevLexicon Links is a web application for links associated to DevLexicon and Donald Louch',
// }

//export default Meta
