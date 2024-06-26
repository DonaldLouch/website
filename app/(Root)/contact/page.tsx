import type { Metadata } from 'next'
import ContactMePage from './ContactMePage'
export const metadata: Metadata = {
    title: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    description: "Contact Donald Louch",
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, Contact`,
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
        description: "Contact Donald Louch",
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default function ContactMe() {
   return <ContactMePage />
}
