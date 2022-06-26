import { Metadata } from "../components/Metadata";
import HeroPage from "../components/HeroPage";

import useSWR from "swr";

export default function Home() {
  const pageLinks = [
    {
      linkTitle: "Blog",
      linkUrl: "blog",
    },
    {
      linkTitle: "Portfolio",
      linkUrl: "portfolio",
    },
    {
      linkTitle: "Resume",
      linkUrl: "portfolio/resume",
    },
    {
      linkTitle: "Contact Me",
      linkUrl: "about#contact",
    },
    {
      linkTitle: "Links",
      linkUrl: "about#links",
    },
    {
      linkTitle: "Available For Freelance Jobs!",
      linkUrl: "jobs",
    },
  ];

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBF3Y5fn7" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return (
    <>
      <Metadata
        title={`${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
      />
      <HeroPage
        name="Donald Louch"
        tagLine="and I'm a Canadian Digital Content Creator"
        links={pageLinks}
        cta={["About Me", "about"]}
      />
    </>
  );
}
