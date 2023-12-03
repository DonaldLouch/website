'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import supabase from "@/lib/supabase"
import { Box, Button, Stack, useToast } from "@chakra-ui/react"
import * as Yup from 'yup'
import { Formik } from "formik"
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly"
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea"
import { SubmitButton } from "formik-chakra-ui"
import { useRouter } from "next/navigation"

export default function EditResumeEducationExperiencePage({ resumeExperience, resumeID }: any) {
  const router = useRouter()
  const toast = useToast()
  const toastID = "toastID"
    
  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Page Manager"},
    {"pageLink": "/portal/pagesResume", "pageName": "Edit: Resume Page"},
    {"pageLink": "/portal/pagesResumeExperience", "pageName": "Resume Experience Manager"},
    {"pageLink": "/portal/pagesResumeWorkEdit", "pageName":  `Resume Education Experience: ${resumeExperience.school}`}
  ]

  const deleteEducation = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeEducation").delete().eq('id', resumeExperience.id);
        deleteStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deleteStatus === 204 ? `${resumeExperience.school} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            description: `${deleteStatus === 204 ? `You have successfully deleted ${resumeExperience.school}!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            status: `${deleteStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        deleteStatus === 204 && router.push("/portal/pagesResumeExperience")
    }
  
  const onSubmit =  async (values: any, actions: any) => {
    const submitData = {
      id: values.id,
      school: values.school,
      degree: values.degree,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description
    }
  const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeEducation").update({
    school: submitData.school,
    degree: submitData.degree,
    startDate: submitData.startDate,
    endDate: submitData.endDate,
    description: submitData.description,
  }).match({ id: submitData.id })
  await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
  supabaseStatus && !toast.isActive(toastID) &&
    toast({
        id: toastID,
        title: `${supabaseStatus === 204 ? `Updated ${submitData.school} Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
        description: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        status: `${supabaseStatus === 204 ? "success" : "error"}`,
        duration: 9000,
        isClosable: true,
    })
    actions.setSubmitting(false)
  }

  const initialValues = {
      id: resumeExperience.id,
      school: resumeExperience.school,
      degree: resumeExperience.degree,
      startDate: resumeExperience.startDate,
      endDate: resumeExperience.endDate,
      description: resumeExperience.description
    }
   const validationSchema = Yup.object({
      school: Yup.string().required('School is required'),
      degree: Yup.string().required('Degree is required'),
      startDate: Yup.string().required('Start Date is required'),
    })

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/portfolio/resume`} variant="primary" background="primary" color="white" mt="1rem !important">View Resume Page</Button>
        <Button onClick={deleteEducation}variant="primary" background="red" color="white" mt="1rem !important">DELETE: {resumeExperience.school}</Button> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ handleSubmit }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
              <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
            
              <Stack direction="row" spacing="2rem">
                  <FormInputRow inputID="school" inputLabel="School Name" inputType="text" />
                  <FormInputRow inputID="degree" inputLabel="Degree" inputType="text" />
              </Stack>

              <Stack direction="row" spacing="2rem">
                  <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="number" />
                  <FormInputRow inputID="endDate" inputLabel="End Date" inputType="number" />
              </Stack>

              <FormTextArea inputID="description" inputLabel="description" textRows={4} />
              
              <SubmitButton variant="blackFormButton">Update {resumeExperience.school}</SubmitButton> 
          </Stack>
          )}
        </Formik>
      </Box>
    </>
  )
}
