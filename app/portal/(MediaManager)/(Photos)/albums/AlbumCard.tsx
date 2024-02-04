'use client'

import { 
    Grid,
    Image,
    Heading,
    Button,
    useToast,
    useClipboard,
    Stack,
    Text,
    IconButton,
    LinkBox,
    LinkOverlay
} from '@chakra-ui/react'

import { useRouter } from 'next/navigation'
  
// interface CardProps {
//     fileID: string
//     fileTitle: string
//     filePath: string
//     uploadedOn: any
//     fileExtension: string
//     fileKey: string
//     fileVersionID: string
//     isPublic: boolean
//     isSetup: boolean
//     photographyAlbum: any
//     photoMetadata: any
// }
  
import { useState } from 'react'
import DisplayDate from '@/lib/DisplayDate'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import supabase from '@/lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditPhotography from '../photography/EditPhotography'
// import { v2 as cloudinary } from 'cloudinary'
  
export const AlbumCard = ({ albumData }: any) => {
    const router = useRouter()
    const toast = useToast()
    const { id, albumName } = albumData
    // const toastID = "toastID"
    // const date = new Date(uploadedOn).toLocaleDateString()
    // const { fileID, filePath, uploadedOn, fileExtension, fileKey, fileVersionID } = media.fileID
    // const { isPublic, isSetup, photoName: fileTitle, id, caption } = media

    // const [ value ] = useState(filePath)
    // const { hasCopied, onCopy } = useClipboard(value)

    // async function deleteMedia() {
    //     // const fileDelete = {
    //     //     "Bucket": process.env.S3_BUCKET_NAME,
    //     //     "Delete": {
    //     //         "Objects": [{
    //     //             "Key": id
    //     //         }],
    //     //         "Quiet": false
    //     //     }
    //     // }
    //     // new DeleteObjectsCommand(fileDelete)
    //     const id = fileID.replace("_", "/");
    //     const formData = new FormData()
    //     formData.append("fileKey", fileKey)
    //     formData.append("versionID", fileVersionID)
    //     const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
    //     console.log(deleteFile)

        
        
    //     const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
    //     mediaDeleteStatus &&
    //     toast({
    //         // id: toastID,
    //         // title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
    //         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
    //         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
    //         duration: 9000,
    //         isClosable: true,
    //     })
    //     mediaDeleteStatus === 204 && router.refresh()
    // }
    return (
        <LinkBox color="white" _hover={{color: "secondary", boxShadow:"none"}}  boxShadow="bsBoldPrimary" my="2rem" borderRadius="0 2rem" gap="4" p="2rem" overflowX="scroll" id={`album_${id}`}>
    <Stack >
        <LinkOverlay href={`/portal/albums/${id}`} color="currentcolor">
            <Text>{albumName}</Text>
        </LinkOverlay>
        {/* <Image src={filePath} alt={fileTitle} gridRow="1" />
        <Stack justifyContent="space-between">
            <Stack>
                <Heading as="h4" gridRow="1" gridColumn="2/6" color='white'>{fileTitle}</Heading>
                <Text fontSize="lg" color="grey">{isSetup ? caption : `This photo is not setup yet; please does so by clicking the edit button.${!isPublic && " Note that this photo is also not a publicly listed photo."}`}</Text>
            </Stack>
            <Grid gridTemplateColumns="repeat(4, 1fr)" justifyContent="space-between" alignItems="center" gap="2rem" pr="1rem">
                {/* <StatsCard startsTitle="Media Kind" statsDescription={fileKind} /> */}
                {/* <StatsCard startsTitle="Extension" statsDescription={fileExtension} /> 
                <StatsCard startsTitle="Uploaded On" statsDescription={<DisplayDate source={uploadedOn} format="MM/DD/YY" />} />
                <IconButton as="a" onClick={onCopy} variant="portalButton" color="white" icon={<FontAwesomeIcon icon={["fal", "copy"]} width="100%" color='currentColor' height="100%" />} aria-label="Copy Button"  fontSize="1.5rem" height="100%"></IconButton>
                <IconButton as="a" variant="portalButton" color="white" href={`/portal/photography/${id}`} icon={<FontAwesomeIcon icon={["fal", "pen-to-square"]} width="100%" color='currentColor' height="100%" />} fontSize="1.5rem" aria-label="Edit Button" height="100%"></IconButton> 
                <IconButton as="a" variant="portalButtonRed" onClick={deleteMedia} icon={<FontAwesomeIcon icon={["fal", "trash"]} width="100%" color='currentColor' height="100%" />} fontSize="1.5rem" aria-label="Delete Button" height="100%"></IconButton> 
            </Grid>
        </Stack> */}
    </Stack>
    </LinkBox>
    )
}