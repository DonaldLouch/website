import PortfolioPhotographyContent from "./PortfolioPhotographyContent";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Photography | Donald Louch Portfolio`,
    description: process.env.DESCRIPTION,
    keywords: `${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, photography`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `Photography | Donald Louch Portfolio`,
        description: process.env.DESCRIPTION,
        siteName: process.env.WEBSITE_NAME,
        images: [{
            url: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default function PortfolioPhotography() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBHBV1wlb" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return <PortfolioPhotographyContent />
}
