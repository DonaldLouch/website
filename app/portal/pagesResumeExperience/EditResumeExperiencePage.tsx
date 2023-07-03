'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"
import { Box, Button, Grid, Stack } from "@chakra-ui/react"
import * as Yup from 'yup'
import AddEducation from "./AddEducation"
import AddWork from "./AddWork"

export default function EditResumeExperiencePage({ resumeExperience, resumeEducation, resumeID }: any) {

  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Page Manager"},
    {"pageLink": "/portal/pagesResume", "pageName": "Edit: Resume Page"},
    {"pageLink": "/portal/pagesResumeExperience", "pageName": "Resume Experience Manager"}
  ]

  // const { data: resumeExperience } = await supabase.from('ResumeWorkExperience').select().order('startDate', {ascending: false}) as any
  // const { data: resumeEducation } = await supabase.from('ResumeEducation').select().order('startDate', {ascending: false}) as any

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/portfolio/resume`} variant="primary" background="primary" color="white" my="1rem !important">View Resume Page</Button>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="2rem" mt="2rem">
          <Stack w="100%" rowGap="1rem">
            {/* <Button  variant="primary" background="primary" color="white" my="1rem !important" isDisabled>Add New Work Experience</Button> */}
            <AddWork resumeID={resumeID} />
            <SectionTitle headingTitle="Work Experience" />
            {resumeExperience?.map((experience: any) => ( <Button as="a" key={experience.id} variant="sectionButton" href={`pagesResumeWorkEdit/${experience.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{experience.company}</Button> ))}
          </Stack>
          <Stack w="100%" rowGap="1rem">
            {/* <Button variant="primary"  background="primary"color="white" my="1rem !important">Add New Education</Button>  */}
            <AddEducation resumeID={resumeID} />
            <SectionTitle headingTitle="Education" />
            {resumeEducation?.map((education: any) => ( <Button as="a" key={education.id} variant="sectionButton" href={`pagesResumeEducationEdit/${education.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{education.school}</Button> ))}
          </Stack>
        </Grid>
      </Box>
    </>
  )
}
