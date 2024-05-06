'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { Box, Button, Grid, Stack } from "@chakra-ui/react"
import AddEducation from "./AddEducation"
import AddWork from "./AddWork"

export default function EditResumeExperiencePage({ resumeExperience, resumeEducation, resumeID }: any) {

  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesResume", "pageName": "Edit: Resume Page"},
    {"pageLink": "/admin/pagesResumeExperience", "pageName": "Resume Experience Manager"}
  ]

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/portfolio/resume`} variant="primary" background="primary" color="white" my="1rem !important">View Resume Page</Button>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="2rem" mt="2rem">
          <Stack w="100%" rowGap="1rem">
            <AddWork resumeID={resumeID} />
            <SectionTitle headingTitle="Work Experience" />
            {resumeExperience?.map((experience: any) => ( <Button as="a" key={experience.id} variant="sectionButton" href={`pagesResumeWorkEdit/${experience.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{experience.company}</Button> ))}
          </Stack>
          <Stack w="100%" rowGap="1rem">
            <AddEducation resumeID={resumeID} />
            <SectionTitle headingTitle="Education" />
            {resumeEducation?.map((education: any) => ( <Button as="a" key={education.id} variant="sectionButton" href={`pagesResumeEducationEdit/${education.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{education.school}</Button> ))}
          </Stack>
        </Grid>
      </Box>
    </>
  )
}
