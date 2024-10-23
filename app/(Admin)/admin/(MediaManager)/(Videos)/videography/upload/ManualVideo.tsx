// import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'

import supabase from '@/lib/supabase'
import { Attachment02Icon } from '@hugeicons/react'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'

import * as Yup from 'yup'

export default function ManualVideo({ id }: {id: string}) {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()

    const fileID = `videography_${
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase() +
      Math.random().toString(36).substring(2, 5).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase()
    }` as string

    const filePath = `videography/${fileID}`

    // const onSubmit =  async (values: any, actions: any) => {
    //     const { status: supabaseStatus1, error: supabaseError1 } = await supabase
    //         .from("VideographyMedia")
    //         .insert({
    //             fileID,
    //             fileKey: filePath,
    //             fileTitle: values.fileName,
    //             fileExtension: values.fileExtension,
    //             filePath: `https://donaldlouch.s3.us-west-004.backblazeb2.com/${filePath}`,
    //             fileVersionID: values.fileVersionID,
    //             capturedOn: moment(),
    //             uploadedOn: moment(),
    //             videoMetadata: id
    //         })
    //      const { status: supabaseStatus2, error: supabaseError2 } = await supabase.from("Videography").update({
    //         videoFileID: fileID,
    //         lastUpdatedOn: moment(),
    //     }).eq("id", id)
    //     // console.log(supabaseError1 || supabaseError2 ? {supabaseError1, supabaseError2} : "No errors!" )
    //     actions.setSubmitting(false)
    //     supabaseStatus1 === 201 && supabaseStatus2 === 204 && router.push('/admin/videography/upload?step=3')
    // }

    // const initialValues = { 
    //     id: id,
    //     fileID: fileID,
    //     fileType: "video/mp4",
    //     fileExtension: "mp4",
    //     capturedOn: moment().format("yyyy-MM-DDTkk:mm"),
    //     uploadedOn: moment().format("yyyy-MM-DDTkk:mm"),
    // }

    // const validationSchema = Yup.object({ })
    
    return <>
        <PrimaryButton onClick={open} icon={<Attachment02Icon />} isFullWidth m="3rem 0 0">Add a Manual Video</PrimaryButton>
        {/* <Button onClick={open} variant="newFormButton">Add a Manual Video</Button> */}
        <Modal opened={opened} onClose={close} title={`Add a manual video for ${id}`} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
             id={`manualVideo${id}`}
        >
                    {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                            <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                                <Stack gap="2rem" direction="row" alignItems="baseline">
                                    <FormInputReadOnly inputID="id" inputLabel="Video ID" inputType="text" />
                                    <FormInputReadOnly inputID="fileID" inputLabel="FileID" inputType="text" />
                                    <FormInputRow inputID="fileVersionID" inputLabel="Version ID" inputType="text" />
                                </Stack>
                                <FormInput inputID="fileName" inputLabel="File Name" inputType="text" inputDescription="Please provide the original file name as for proper formatting the file should be renamed to the new file ID." />
                                <Stack gap="2rem" direction="row" alignItems="baseline">
                                    <FormInputRow inputID="fileType" inputLabel="File Type" inputType="text" inputDescription="Such as video/mp4"/>
                                    <FormInputRow inputID="fileExtension" inputLabel="File Extension" inputType="text" inputDescription="Such as mp4" />
                                </Stack>
                                <Stack gap="2rem" direction="row" alignItems="baseline">
                                    <FormInputRow inputID="capturedOn" inputLabel="Taken On" inputType="datetime-local" />
                                    <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                                </Stack>
                                <Button type="submit" variant="blackFormButton">Manually Add Video</Button>
                            </Stack>
                        )}
                    </Formik> */}
            </Modal>
    </>
}
