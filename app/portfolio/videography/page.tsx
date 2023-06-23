import PortfolioVideographyContent from './PortfolioVideographyContent'

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Videography | Donald Louch Portfolio`,
    description: process.env.DESCRIPTION,
    keywords: `${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, videography`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `Videography | Donald Louch Portfolio`,
        description: process.env.DESCRIPTION,
        siteName: process.env.WEBSITE_NAME,
        images: [{
            url: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default function PortfolioVideography() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBHMANczw" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return <PortfolioVideographyContent />
}
