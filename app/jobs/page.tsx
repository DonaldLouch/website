import Hire from './Hire'

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Request Freelance Job From Donald Louch`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}`,
    openGraph: {
        title: `Request Freelance Job From Donald Louch`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
    },
}

export default function Jobs() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBJ0QWcyw" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return <Hire />
}
