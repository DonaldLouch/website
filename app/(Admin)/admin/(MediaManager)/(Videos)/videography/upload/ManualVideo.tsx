// import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import ClipboardButton from '@/app/(Components)/(Buttons)/ClipboardButton'
import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import FormDatePicker from '@/app/(Components)/(Form)/FormDatePicker'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'

import supabase from '@/lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Group, Modal, SimpleGrid, Stack, Text } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import * as yup from 'yup';

export default function ManualVideo({id}: {id: string | undefined | null}) {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()

    // const id = "videoM3XZM4MFmor"

    const fileID = `videography_${
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase() +
      Math.random().toString(36).substring(2, 5).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase()
    }` as string

    const filePath = `videography/${fileID}`

    const [isAdded, setIsAdded] = useState(false)

    const onSubmit =  async (values: any) => {
        console.log("Hello!")
        const { status: supabaseStatus1, error: supabaseError1 } = await supabase
            .from("VideographyMedia")
            .insert({
                fileID,
                fileKey: filePath,
                fileTitle: values.fileName,
                fileExtension: values.fileExtension,
                filePath: `https://donaldlouch.s3.us-west-004.backblazeb2.com/${filePath}.${values.fileExtension}`,
                // fileVersionID: values.fileVersionID,
                capturedOn: values.capturedOn ? moment(values.capturedOn) : moment(),
                uploadedOn: values.uploadedOn ? moment(values.uploadedOn) : moment(),
                metadata: id
            })
         const { status: supabaseStatus2, error: supabaseError2 } = await supabase.from("Videography").update({
            videoFileID: fileID,
            lastUpdatedOn: moment(),
        }).eq("id", id)
        console.log(supabaseError1 || supabaseError2 ? {supabaseError1, supabaseError2} : "No errors!" )

        supabaseStatus1 === 201 && supabaseStatus2 === 204 && closed(); router.push('/admin/videography/upload?step=3')
    }

    const initialValues = {
        id: id,
        fileID: fileID,
        fileType: "video/mp4",
        fileExtension: "mp4",
        // capturedOn: moment().format("yyyy-MM-DDTkk:mm"),
        // uploadedOn: moment().format("yyyy-MM-DDTkk:mm"),
    }
    const schema = yup.object().shape({
        // ID:  yup.string().required('This field is required.')
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    // const OPTIONS = new Array(
    //     {value: "VALUE", label: "LABEL"},
    // )

    // const initialValues = { 
    //     id: id,
    //     fileID: fileID,
    //     fileType: "video/mp4",
    //     fileExtension: "mp4",
    //     capturedOn: moment().format("yyyy-MM-DDTkk:mm"),
    //     uploadedOn: moment().format("yyyy-MM-DDTkk:mm"),
    // }

    // const validationSchema = Yup.object({ })
    function closed() {
        close()
    }
    return <>
        <PrimaryButton onClick={open} primNewIcon={{name: "file"}} isFullWidth m="3rem 0 0">Add a Manual Video</PrimaryButton>
        {/* <Button onClick={open} variant="newFormButton">Add a Manual Video</Button> */}
        <Modal opened={opened} onClose={closed} title={`Add a manual video for ${id}`} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
             id={`manualVideo${id}`}
        >
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                {/* <FormInput inputID="id" inputLabel="Video ID" {...form.getInputProps('id')} inputDescription="DESCRIPTION" icon={<FontAwesomeIcon icon={["fal", "hashtag"]} />} isRequired /> */}
                <FormInput inputID="fileName" inputLabel="Original File Name" {...form.getInputProps('fileName')} inputDescription="Please provide the original file name." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />


                {/* <FormInput inputID="fileID" inputLabel="File ID" {...form.getInputProps('fileID')} inputDescription="DESCRIPTION" icon={<FontAwesomeIcon icon={["fal", "hashtag"]} />} isRequired /> */}
                
                <SimpleGrid cols={2} my="2rem">
                    <FormInput inputID="fileType" inputLabel="File Type" {...form.getInputProps('fileType')} inputDescription="Such as video/mp4" icon={<FontAwesomeIcon icon={["fal", "file"]} />} isRequired />
                    <FormInput inputID="fileExtension" inputLabel="File Extension" {...form.getInputProps('fileExtension')} inputDescription="Such as mp4" icon={<FontAwesomeIcon icon={["fal", "file"]} />} isRequired />
                </SimpleGrid>
                <SimpleGrid cols={2} my="2rem">
                    <FormDatePicker dateLabel="Taken On" datePlaceholder="Taken On" {...form.getInputProps('capturedOn')} />
                    <FormDatePicker dateLabel="Uploaded On" datePlaceholder="Uploaded On" {...form.getInputProps('uploadedOn')} />
                </SimpleGrid>
                <Stack my="2rem" style={{boxShadow: "var(--mantine-shadow-bsBigBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="2rem" align='center'>
                    <Text ta="center" fw="700">First make sure to copy the original file name from the S3 bucket; then copy the following id and rename the file on the S3 bucket. Keep the current extension.</Text>
                    <ClipboardButton copyValue={fileID} copyText={fileID} copiedText="Copied File ID" />
                </Stack>
                {/* <FormSelect inputID="ID" inputLabel="LABEL" inputData={OPTIONS} {...form.getInputProps(`ID`)} onChange={SET} value={VALUES} clearable searchable />
                <FormInputPhone inputID="id" inputLabel="LABEL" {...form.getInputProps('ID')} inputDescription="LABEL'." icon={<ICON variant="twotone" />} /> */}
                <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "film"]} />}>Manually Add Video</FormSubmitButton>
            </Box>

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
