'use client'

import { Image, Text, Anchor, Group, Card, Grid, Title, Stack } from "@mantine/core"

import { useRouter } from 'next/navigation'
  

import DisplayDate from '@/lib/DisplayDate'
import supabase from '@/lib/supabase'
import ClipboardButton from "@/app/(Components)/(Buttons)/ClipboardButton"
import { Calendar03Icon, Delete02Icon, Edit02Icon } from "@hugeicons/react"
import { deleteFileFromS3 } from "@/app/actions/backblaze"
import { notifications } from "@mantine/notifications"
  
export const MediaCard = ({ media }: any) => {
    const router = useRouter()
    // const toastID = "toastID"
    // const date = new Date(uploadedOn).toLocaleDateString()
    const { fileID, filePath, uploadedOn, fileExtension, fileKey, fileVersionID } = media.fileID
    const { isPublic, isSetup, photoName: fileTitle, id, caption } = media

    // const [ value ] = useState(filePath)
    // const { hasCopied, onCopy } = useClipboard(value)

    async function deleteMedia() {
        // const fileDelete = {
        //     "Bucket": process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        //     "Delete": {
        //         "Objects": [{
        //             "Key": id
        //         }],
        //         "Quiet": false
        //     }
        // }
        // new DeleteObjectsCommand(fileDelete)
        // const id = fileID.replace("_", "/");
        // const formData = new FormData()
        // formData.append("fileKey", fileKey)
        // formData.append("versionID", fileVersionID)

        const deleteFile = await deleteFileFromS3({
            bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            filePath: fileKey,
            getFileID: fileID
        })

        const isFileDeleted = deleteFile.$metadata.httpStatusCode === 204 ? true : false

        isFileDeleted && notifications.show({ 
            title: "File Deleted!",
            message:`You have successfully deleted your ${fileExtension} file titled "${fileTitle}"`,
            color: "red",
            icon: <Delete02Icon variant="twotone" />
          })

        // const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
        // console.log(deleteFile.$metadata.httpStatusCode === 204)
        
        // const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
        // mediaDeleteStatus &&
        // toast({
        //     // id: toastID,
        //     // title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
        //     description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
        //     status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
        //     duration: 9000,
        //     isClosable: true,
        // })
        // mediaDeleteStatus === 204 && router.refresh()
    }

    return (<>
    <Card id={`media_${fileID}-${fileExtension}`} shadow="bsSMPrimary" radius="md" my="1rem" bg="none">
        <Card.Section>
            <Grid>
                <Grid.Col span={4}>
                    <Image src={filePath} alt={fileTitle} /> 
                </Grid.Col>
                <Grid.Col span={8}>
                    <Stack>
                        <Title order={3} c="white" fz="h1" m="0">{fileTitle}</Title>
                        <Text fz="1rem" c="grey" m="0" lineClamp={3}>{isSetup ? caption : `This photo is not setup yet; please does so by clicking the edit button.${!isPublic && " Note that this photo is also not a publicly listed photo."}`}</Text>
                    </Stack>
                    <Group justify="space-between" align="center" px="2rem">
                        <Stack m="0" gap="0" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem" align="center">
                            <Group><Calendar03Icon color="var(--mantine-color-white)" variant="twotone" /> <Title order={4} size="1rem" c="grey" tt="uppercase">Uploaded On</Title></Group>
                             <Text fw="500" m="0" tt="uppercase" c="secondary" fz="1rem"><DisplayDate source={uploadedOn} format="MM/DD/YYYY" /></Text>
                        </Stack>
                        <Group p="0" m="0">
                            <ClipboardButton copyValue={filePath} />
                            <Anchor href={`/admin/photography/${id}`} c="var(--secondary)" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem"><Edit02Icon /></Anchor>
                            <Anchor onClick={deleteMedia} c="red" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem"><Delete02Icon /></Anchor>
                        </Group>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card.Section>
    </Card>
    </>)
}