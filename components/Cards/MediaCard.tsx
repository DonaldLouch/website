import React, { useState } from "react"
import { 
    Grid,
    Image,
    Heading,
    // Text,
    Button,
    // Box,
    useColorModeValue,
    useToast,
    useClipboard,
  } from '@chakra-ui/react'

  import { useRouter } from 'next/router'
  
  interface CardProps {
    mediaID: string
    path: string
    title: string
    kind: string
    extension: string
    uploadedOn: any
    mediaPublicID: string
  }
  
  import { StatsCard } from './StatsCard'
  
  export const MediaCard = (props: CardProps) => {
    const router = useRouter()
    const toast = useToast()
    const { mediaID, path, title, kind, extension, uploadedOn, mediaPublicID } = props
    const date = new Date(uploadedOn).toLocaleDateString()
    const [ value ] = useState(path)
    const { hasCopied, onCopy } = useClipboard(value)

    async function deleteMedia() {
        const idSplit = mediaPublicID.split('/')
        const id = idSplit[0] + ";;" + idSplit[1]

        const response = await fetch(`/api/media/destroy/${id}`, {
          method: "post",
        })
        if (response.ok) {
          router.reload()
        } else {
          toast({
            title: "An error occurred while deleting the media",
            description: `Please try again or contact support if the problem persists.`,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      }

      return (
        <Grid id={`media_${mediaID}`} gridTemplateColumns="repeat(5, 1fr)" p="5" boxShadow="bsBoldBlue" overflowX="scroll" my="5" borderRadius="0 2rem" gap="4" alignItems="center" justifyContent="baseline">
            <Image src={path} alt={title} gridRow="1" />
            <Heading as="h4" gridRow="1" gridColumn="2/6" color={useColorModeValue('black', 'white')}>{title}</Heading>
            <StatsCard startsTitle="Media Kind" startsDescription={kind} />
            <StatsCard startsTitle="Extension" startsDescription={extension} />
            <StatsCard startsTitle="Uploaded On" startsDescription={date} />
            <Button onClick={onCopy} variant="portalButton">
                {hasCopied ? 'Copied Path' : 'Copy Path'}
            </Button>
            <Button variant="portalButtonRed" onClick={deleteMedia}>Delete</Button>
        </Grid>
      )
  }