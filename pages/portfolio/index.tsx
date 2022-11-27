import { Metadata } from "../../components/Metadata";
import HeroPage from "../../components/HeroPage";
import useSWR from "swr";

export default function Portfolio() {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBG4TUp4n" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  //   const pageID = "pageL4UBG4TUp4n" as string;
  //   updatePostView(pageID);
  //   async function updatePostView(pageID: string) {
  //     await fetch("/api/pages/updateView", {
  //       method: "POST",
  //       body: JSON.stringify(pageID),
  //     });
  //   }

  const pageLinks = [
    {
      linkTitle: "Websites",
      linkUrl: "https://github.com/donaldlouch",
    },
    {
      linkTitle: "Photography",
      linkUrl: "portfolio/photography",
    },
    {
      linkTitle: "Videography",
      linkUrl: "portfolio/videography",
    },
    {
      linkTitle: "Graphic Design",
      linkUrl: "C/graphic",
    },
    {
      linkTitle: "All Other Content",
      linkUrl: "blog",
    },
    {
      linkTitle: "Available For Freelance Jobs!",
      linkUrl: "jobs",
    },
  ];
  return (
    <>
      <Metadata
        title={`Donald Louch Portfolio`}
        keywords={`${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, web production, photography, videography, graphic design, audio, written work`}
        description={`${process.env.DESCRIPTION}`}
      />
      <HeroPage
        name="Donald Louch"
        tagLine="and, I'm a Web Developer and Digital Content Creator"
        links={pageLinks}
        cta={["Resume", "portfolio/resume"]}
        imageLink="https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg"
      />
    </>
  );
}
