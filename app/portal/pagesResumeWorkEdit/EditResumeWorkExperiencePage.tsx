'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"
import { Box, Button, Stack, useToast } from "@chakra-ui/react"
import * as Yup from 'yup'
import { Formik } from "formik"
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly"
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea"
import { SubmitButton } from "formik-chakra-ui"
import AddWorkHistory from "./AddWorkHistory"
import EditWorkHistory from "./editWorkHistory"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { useRouter } from "next/navigation"

export default function EditResumeWorkExperiencePage({ resumeExperience, resumeID, resumeHistory }: any) {
  const router = useRouter()
  const toast = useToast()
  const toastID = "toastID"
    
  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Page Manager"},
    {"pageLink": "/portal/pagesResume", "pageName": "Edit: Resume Page"},
    {"pageLink": "/portal/pagesResumeExperience", "pageName": "Resume Experience Manager"},
    {"pageLink": "/portal/pagesResumeWorkEdit", "pageName":  `Resume Work Experience: ${resumeExperience.company}`}
  ]

  const deleteWork = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeWorkExperience").delete().eq('id', resumeExperience.id);
        deleteStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deleteStatus === 204 ? `${resumeExperience.company} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            description: `${deleteStatus === 204 ? `You have successfully deleted ${resumeExperience.company}!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            status: `${deleteStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        deleteStatus === 204 && router.push("/portal/pagesResumeExperience")
    }
  
  const onSubmit =  async (values: any, actions: any) => {
    const submitData = {
      id: values.id,
      company: values.company,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description
    }
  const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperience").update({
    company: submitData.company,
    position: submitData.position,
    startDate: submitData.startDate,
    endDate: submitData.endDate,
    description: submitData.description,
  }).match({ id: submitData.id })
  await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
  supabaseStatus && !toast.isActive(toastID) &&
    toast({
        id: toastID,
        title: `${supabaseStatus === 204 ? `Updated ${submitData.company} Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
        description: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        status: `${supabaseStatus === 204 ? "success" : "error"}`,
        duration: 9000,
        isClosable: true,
    })
    actions.setSubmitting(false)
  }

  const initialValues = {
      id: resumeExperience.id,
      company: resumeExperience.company,
      position: resumeExperience.position,
      startDate: resumeExperience.startDate,
      endDate: resumeExperience.endDate,
      description: resumeExperience.description,
    }
   const validationSchema = Yup.object({
      company: Yup.string().required('Company is required'),
      position: Yup.string().required('Position is required'),
      startDate: Yup.string().required('Start Date is required'),
      // endDate: Yup.string().required('End Date is required'),
      description: Yup.string().required('Description is required'),
    })

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/portfolio/resume`} variant="primary" background="primary" color="white" mt="1rem !important">View Resume Page</Button>
        <Button onClick={deleteWork}variant="primary" background="red" color="white" mt="1rem !important">DELETE: {resumeExperience.company}</Button> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ handleSubmit }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
              <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
            
              <Stack direction="row" spacing="2rem">
                      <FormInputReadOnly inputID="company" inputLabel="Company" inputType="text" />
                      <FormInputRow inputID="position" inputLabel="Position" inputType="text" />
                  </Stack>
                  
                  <Stack direction="row" spacing="2rem">
                      <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                      <FormInputRow inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                  </Stack>
                  
                  <FormTextArea inputID="description" inputLabel="Description" textRows={4} />
              
              <SubmitButton variant="blackFormButton">Update {resumeExperience.company} Experience</SubmitButton> 
          </Stack>
          )}
        </Formik>
        <SectionCard styleType="primaryCard" id="history">
          <SectionTitle headingTitle={`${resumeExperience.company} Work History`} />
          <AddWorkHistory resumeID={resumeID} workID={resumeExperience.id} company={resumeExperience.company} />
          <Stack gap="1rem">
            {resumeHistory?.map((history: any) => ( <EditWorkHistory history={history} resumeID={resumeID} company={resumeExperience.company} />))}
          </Stack>
        </SectionCard>
      </Box>
    </>
  )
}
