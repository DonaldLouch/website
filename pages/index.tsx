// import { Box } from '@chakra-ui/react'

import {Metadata} from "../components/Metadata";
import Hero from "../components/Hero";
// import AboutUs  from '../components/AboutUs'
// import Services  from '../components/Services'
// import Products  from '../components/Products'
// import Showcase  from '../components/Showcase'
// import Contact  from '../components/Contact'

import { 
  parseCookies
} from "nookies"

// import nookies from "nookies"

export default function Home() {
  const cookies = parseCookies()
  console.log(JSON.stringify(cookies, null, 2));
  return (
    <>  
      <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Hero />
    </>
  )
}