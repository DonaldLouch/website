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
        {
            'linkTitle': 'All Other Content', 
            'linkUrl': 'blog'
        },
        {
            'linkTitle': 'Available For Freelance Jobs!', 
            'linkUrl': 'jobs'
        },
    ]
  return (
    <>  
      <Metadata
          title={`Donald Louch Portfolio`}
          keywords={`${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, web production, photography, videography, graphic design, audio, written work`}
          description={`${process.env.DESCRIPTION}`}
        />
        <HeroPage name="Donald Louch" tagLine="and I'm a Canadian Digital Content Creator" links={pageLinks} cta={["Resume", "portfolio/resume"]} />
    </>
  )
}