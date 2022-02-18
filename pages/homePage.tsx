import {Metadata} from "../components/Metadata"
import HeroPage from "../components/HeroPage"


export default function Home() {
    const pageLinks = [
        {
            'linkTitle': 'Blog', 
            'linkUrl': 'blog'
        },
        {
            'linkTitle': 'Portfolio', 
            'linkUrl': 'portfolio'
        },
        {
            'linkTitle': 'Resume', 
            'linkUrl': 'portfolio/resume'
        },
        {
            'linkTitle': 'Contact Me', 
            'linkUrl': 'about#contact'
        },
        {
            'linkTitle': 'Links', 
            'linkUrl': 'about#links'
        },
        {
            'linkTitle': 'Hire Me!', 
            'linkUrl': 'hire'
        },
    ]
  return (
    <>  
      <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <HeroPage name="Donald Louch" tagLine="and I'm a Canadian Digital Content Creator" links={pageLinks} cta={["About Me", "about"]} />
    </>
  )
}