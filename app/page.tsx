'use client'
import { useToast } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"

import HeroPage from "./(Components)/HeroPage";

export default function HomePageContent() {
  const params = useSearchParams()
  const message = params.get('message') as string
  const toast = useToast();
  const toastID = "toastID";


  //   const fetcher = (url: RequestInfo | URL) =>
//     fetch(url).then((res) => res.json());
//   const pageID = "pageL4UBF3Y5fn7" as string;
//   useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

   // https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg

  message == "userLoginNotAllowed" && !toast.isActive(toastID) &&
  toast({
    id: toastID,
    title: "Authentication Error",
    description: "At this time users are not allowed to signup nor login to the Donald Louch website. Sorry for any inconvenience this may cause.",
    status: "error",
    duration: 9000,
    isClosable: true,
  })

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
  ]

  return <HeroPage
    name="Donald Louch"
    tagLine="and, I'm a Web Developer and Digital Content Creator"
    links={pageLinks}
    cta={["About Me", "about"]}
    imageLink="https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg"
  />
}