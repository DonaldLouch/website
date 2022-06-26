import { Metadata } from "../components/Metadata";
import HeroPage from "../components/HeroPage";

const pageID = "pageL4UBF3Y5fn7" as string;

export default function Home(pageID: string) {
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

  //   const pageID = "pageL4UBF3Y5fn7" as string;
  updatePostView(pageID);
  async function updatePostView(pageID: string) {
    await fetch("/api/pages/updateView", {
      method: "POST",
      body: JSON.stringify(pageID),
    });
  }

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
