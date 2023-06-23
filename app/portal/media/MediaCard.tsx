'use client'

import { 
    Grid,
    Image,
    Heading,
    Button,
    useToast,
    useClipboard,
} from '@chakra-ui/react'

import { useRouter } from 'next/navigation'
  
interface CardProps {
    mediaID: string
    mediaPath: string
    mediaTitle: string
    mediaKind: string
    mediaExtension: string
    uploadedOn: any
    mediaPublicID: string
}
  
import { StatsCard } from './StatsCard'
import { useState } from 'react'
import supabase from '@/lib/supabase'
import { v2 as cloudinary } from 'cloudinary'
  
export const MediaCard = ({ mediaID, mediaPath, mediaTitle, mediaKind, mediaExtension, uploadedOn, mediaPublicID }: CardProps) => {
    // const router = useRouter()
    const toast = useToast()
    const toastID = "toastID"
    const date = new Date(uploadedOn).toLocaleDateString()
    const [ value ] = useState(mediaPath)
    const { hasCopied, onCopy } = useClipboard(value)

    async function deleteMedia() {
        // cloudinary.uploader.destroy(mediaPath, function(error: any,result: any) {console.log(result, error) });
        // cloudinary.uploader.destroy(mediaPath).then((result: any) => {
        // return NextResponse.json(result);
            // console.log(result);
        // })
        // const idSplit = mediaPublicID.split('/')
        // const data = {
        //     mediaID:  idSplit[1],
        //     mediaFolder: idSplit[0]
        // }
        // const response = await fetch(`/api/media/destroy`, {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // })
        // console.log(response)
        // const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("Media").delete().eq('mediaPublicID', mediaPublicID);
        // mediaDeleteStatus && !toast.isActive(toastID) &&
        // toast({
        //     id: toastID,
        //     title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
        //     description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${mediaPublicID}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
        //     status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
        //     duration: 9000,
        //     isClosable: true,
        // })
    }
    return (
    <Grid id={`media_${mediaID}`} gridTemplateColumns="repeat(5, 1fr)" p="5" boxShadow="bsBoldBlue" overflowX="scroll" my="5" borderRadius="0 2rem" gap="4" alignItems="center" justifyContent="baseline">
        <Image src={mediaPath} alt={mediaTitle} gridRow="1" />
        <Heading as="h4" gridRow="1" gridColumn="2/6" color='white'>{mediaTitle}</Heading>
        <StatsCard startsTitle="Media Kind" startsDescription={mediaKind} />
        <StatsCard startsTitle="Extension" startsDescription={mediaExtension} />
        <StatsCard startsTitle="Uploaded On" startsDescription={date} />
        <Button onClick={onCopy} variant="portalButton" color="white">
            {hasCopied ? 'Copied Path' : 'Copy Path'}
        </Button>
        <Button variant="portalButtonRed" onClick={deleteMedia} isDisabled>Delete</Button> 
    </Grid>
    )
}