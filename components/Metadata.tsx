import Head from 'next/head'
interface MetaProps {
    title: string
    keywords: string
    description: string
}

export const Metadata = (props: MetaProps) => {
    //const Meta = ({ title, keywords, description }) => {
    const { title, keywords, description } = props

    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            {/* <link rel="manifest" href="/site.webmanifest" /> */}
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#4625e8" />
            <meta name="apple-mobile-web-app-title" content={title} />
            <meta name="application-name" content={title} />
            <meta name="theme-color" content="#ededed" />
            <meta name="msapplication-TileColor" content="#ededed" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
            <script data-token={process.env.SPLITBEE_TOKEN} async src="https://cdn.splitbee.io/sb.js"></script>
            <script async src="https://donaldlouch.instatus.com/widget/script.js"></script>
            <title>{title}</title>
        </Head>
    )
}

// Meta.defaultProps = {
//     title: process.env.WEBSITE_NAME,
//     keywords: 'links, devlexicon, devlexicon links, donald louch',
//     description: 'DevLexicon Links is a web application for links associated to DevLexicon and Donald Louch',
// }

//export default Meta