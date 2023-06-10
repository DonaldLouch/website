// import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react"
import {Metadata} from "../components/Metadata"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../lib/fontAwesome";
// import MaintenanceModePage from "../components/MaintenanceMode";
// import HeroPage from "../components/HeroPage"


export default function MaintenanceMode() {
  return (
    <>  
      <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        {/* <MaintenanceModePage /> */}
    </>
  )
}