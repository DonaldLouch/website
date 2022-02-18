import {Metadata} from "../../components/Metadata"
import HeroPage from "../../components/HeroPage"


export default function Portfolio() {
    const pageLinks = [
        {
            'linkTitle': 'Websites', 
            'linkUrl': 'https://github.com/donaldlouch'
        },
        {
            'linkTitle': 'Photography', 
            'linkUrl': 'portfolio/photography'
        },
        {
            'linkTitle': 'Videography', 
            'linkUrl': 'portfolio/videography'
        },
        {
            'linkTitle': 'Graphic Design', 
            'linkUrl': 'C/graphic'
        },
        // {
        //     'linkTitle': 'Written Work', 
        //     'linkUrl': 'portfolio/written'
        // },
        // {
        //     'linkTitle': 'All Other Content', 
        //     'linkUrl': 'blog'
        // },
    ]
  return (
    <>  
      <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <HeroPage name="Donald Louch" tagLine="and I'm a Canadian Digital Content Creator" links={pageLinks} cta={["Resume", "portfolio/resume"]} />
    </>
  )
}