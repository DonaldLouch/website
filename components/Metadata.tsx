import Head from "next/head";
import Script from "next/script";

// import { Playfair_Display, Lato } from "@next/font/google"
// const playfairDisplay = Playfair_Display();
// const lato = Lato({weight: ["100", "300", "400", "700", "900"]});

interface MetaProps {
  title: string;
  keywords: string;
  description: string;
}

export const Metadata = (props: MetaProps) => {
  //const Meta = ({ title, keywords, description }) => {
  const { title, keywords, description } = props;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/faviconChristmas/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/faviconChristmas/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/faviconChristmas/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/faviconChristmas/favicon-16x16.png" />
      <link rel="manifest" href="/faviconChristmas/site.webmanifest" />
      <link rel="mask-icon" href="/faviconChristmas/safari-pinned-tab.svg" color="#764688" />
      <meta name="apple-mobile-web-app-title" content={process.env.WEBSITE_NAME} />
      <meta name="application-name" content={process.env.WEBSITE_NAME} />
      <meta name="theme-color" content="#ededed" />
      <meta name="msapplication-TileColor" content="#ededed" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      {/* <script data-token={process.env.SPLITBEE_TOKEN} async src="https://cdn.splitbee.io/sb.js"></script> */}
      <Script
        src="https://donaldlouch.instatus.com/widget/script.js"
        strategy="lazyOnload"
      ></Script>
      {/* <style
          id="font"
          dangerouslySetInnerHTML={{
            __html: `*{font-family: ${lato.style.fontFamily}}`,
          }}
      /> */}
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
