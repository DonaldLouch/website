'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"
import { Box, Button, Grid, Stack } from "@chakra-ui/react"
import * as Yup from 'yup'
import AddEducation from "./AddEducation"

export default async function EditResumeExperiencePage() {

  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Page Manager"},
    {"pageLink": "/portal/pagesResume", "pageName": "Edit: Resume Page"},
    {"pageLink": "/portal/pagesResumeExperience", "pageName": "Resume Experience"}
  ]

  const { data: resumeExperience } = await supabase.from('ResumeWorkExperience').select().order('startDate', {ascending: false}) as any
  const { data: resumeEducation } = await supabase.from('ResumeEducation').select().order('startDate', {ascending: false}) as any

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        {/* <Button  variant="primary" background="primary" color="white" my="1rem !important">Add Experience</Button>
        <Button onClick={onEducationOpen} variant="primary"  background="primary"color="white" my="1rem !important">Add Education</Button> */}
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="2rem" mt="2rem">
          <Stack w="100%" rowGap="1rem">
            <SectionTitle headingTitle="Work Experience" />
            {resumeExperience?.map((experience: any) => ( <Button as="a" key={experience.id} variant="sectionButton" href={`resumeEditWork/${experience.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{experience.company}</Button> ))}
          </Stack>
          <Stack w="100%" rowGap="1rem">
            <SectionTitle headingTitle="Education" />
            {resumeEducation?.map((education: any) => ( <Button as="a" key={education.id} variant="sectionButton" href={`resumeEditEducation/${education.id}`} justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{education.school}</Button> ))}
          </Stack>
        </Grid>

        <AddEducation />
      </Box>
    </>
  )
}
