import PortfolioPhotographyContent from "./PortfolioPhotographyContent";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Photography | Donald Louch Portfolio`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portfolio, Donald Louch, donald, louch, photography`,
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: `Photography | Donald Louch Portfolio`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default function PortfolioPhotography() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBHBV1wlb" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return <PortfolioPhotographyContent />
}
