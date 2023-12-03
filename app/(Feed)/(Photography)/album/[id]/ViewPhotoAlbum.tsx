'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormInputReadOnly } from '@/app/(Components)/(Form)/FormInputReadOnly'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast, Grid, Text, Tag, TagLabel, Icon, Link, Box, ModalOverlay, Skeleton, IconButton, useClipboard, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'
import Image from 'next/image'
import NextLink from 'next/link'
import { Suspense, useState } from 'react'
import DisplayDate from '@/lib/DisplayDate'
import CopyButton from '@/app/(Components)/(Buttons)/CopyButton'
import { useUser } from '@clerk/nextjs'

export default function ViewPhotoAlbum({ imageData, isLoading }: any) {
    const {user} = useUser()
    const toast = useToast()
    const toastID = "toastID"
    // const albumData = photographyAlbum.find(({ id }: any) => id ===  imageData.album)
    const { album: albumData } = imageData
    const { isOpen, onOpen, onClose } = useDisclosure()
    
     const [ value ] = useState(`${process.env.NEXT_PUBLIC_SITE_URL}/photo/${imageData.id}`)
    const { hasCopied, onCopy } = useClipboard(value)


    return (
        <>
        {/* _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s" display="inherit" my="0.5rem" */}
         {/* height="2160" onClick={onOpen} _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s" */}
         {/* style={{display: "inherit"}} */}
            <Skeleton isLoaded={!isLoading} my={isLoading ? "0.5rem" : "0"} startColor="primary" endColor="secondary" opacity={isLoading ? "0.6" : "1"}>
                <Box onClick={onOpen} display="inline-block" _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.1s">
                    <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`} width="3840" height="2160"/>
                </Box>
            </Skeleton>
            {/* <Button variant="portalButton" color="white" p="2rem" mb="1rem" onClick={onOpen} leftIcon={<FontAwesomeIcon icon={["fal", "eye"]} width="100%" color="currentColor" />}>Preview Photo</Button>  */}
            {/* <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button>  */}
            <Modal isOpen={isOpen} onClose={onClose} id={`viewPhoto${imageData.id}`} size="7xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent background="blurredPurple" mx="2rem" pb="2rem">
                    <ModalHeader>{imageData.photoName} {imageData.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* gridTemplateColumns="50% 50%" */}
                        <Stack direction={{base:"column", lg:"row"}} gap="2rem" px={{base: "1rem", lg: "2rem"}} width={{base: "calc(100% - 1rem)", lg: "calc(100% - 4rem)"}} justifyItems="flex-start">
                            <Stack width={{base: "100%", lg: "50%"}} justifyItems="flex-start" alignItems="flex-start">
                                <Box boxShadow="bsWhite">
                                    <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`} width="3840" height="2160" style={{borderRadius: "0 0.5rem" }} />
                                </Box>
                                <Stack direction="row" gap="2rem">
                                    <CopyButton copyValue={`${process.env.NEXT_PUBLIC_SITE_URL}/photo/${imageData.id}`} copyText="Copy Photo Link" copiedText="Copied Photo Link" />
                                    <LinkBox as="div" display="flex" gap="1rem" alignItems="center"
                                        p="1rem 2rem" 
                                        width="auto" 
                                        my="2rem"
                                        color="white"
                                        borderRadius="0 1.5rem"
                                        wordBreak="break-word"
                                        boxShadow="bsBoldSecondary"
                                        fontWeight="900"
                                        fontSize="1rem"
                                        _hover={{ 
                                            bg: "none",
                                            boxShadow: "bsBigBoldSecondary",
                                            fontWeight: "600",
                                            color: "primary"
                                        }}
                                    >
                                        <Icon>
                                            <FontAwesomeIcon icon={["fal", "eye"]} width="100%" color='currentColor' />
                                        </Icon>
                                        <LinkOverlay href={`/photo/${imageData.id}`}>
                                            <Text fontSize="1.1rem" color="white">Open Photo Link</Text>
                                        </LinkOverlay>
                                    </LinkBox>
                                    <Box hidden={!user}><CopyButton copyValue={imageData.fileID.filePath} copyText="Copy Photo URI" copiedText="Copied Photo URI" /></Box>
                                {/* <Button as="a" onClick={onCopy} variant="portalButton" color="white" leftIcon={<FontAwesomeIcon icon={["fal", "copy"]} width="100%" color='currentColor' height="100%" />} aria-label="Copy Button" p="2rem" width="auto" my="2rem">Copy Photo Link</Button>
                                <Button as="a" href={`/photo/${imageData.id}`} variant="portalButton" color="white" leftIcon={<FontAwesomeIcon icon={["fal", "eye"]} width="100%" color='currentColor' height="100%" />} aria-label="Open Button" p="2rem" width="auto" my="2rem">Open Photo Link</Button> */}
                                </Stack>
                            </Stack>
                            <Stack width={{base: "100%", lg: "50%"}}>
                                {/* <Text boxShadow="bsBoldPrimary" p="2rem" borderRadius="0 2rem">{imageData.fileID.takenOn}</Text> */}
                                {/* <Box whiteSpace="break-spaces" p="1rem" mb="1rem">
                                    <MdxContent source={mdxSource} />
                                </Box> */}
                                <Text boxShadow="bsBoldPrimary" p="2rem" borderRadius="0 2rem" whiteSpace="break-spaces">{imageData.caption}</Text>
                                <Stack direction="row" my="2rem" gap="0.8rem">
                                     {/* {imageData.album && <Link href="#" variant="unstyled"><Tag size='lg' colorScheme='purple' _hover={{background: "white"}} borderRadius='0 1rem' p="1rem" whiteSpace="normal" wordBreak="break-all" width="fit-content">
                                        <FontAwesomeIcon icon={["fal", "images"]} color="currentColor" height="40%" />
                                        <TagLabel pl="0.5rem">{albumData.albumName}</TagLabel>
                                    </Tag></Link>} */}
                                    {imageData.location && <Link href={`/feed/photography?search=location&value=${imageData.location}`} style={{color: "currentColor"}}><Tag size='lg' colorScheme='messenger' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                        <FontAwesomeIcon icon={["fal", "location-pin"]} color="currentColor" height="40%" />
                                        <TagLabel pl="0.5rem">{imageData.location}</TagLabel>
                                    </Tag></Link>}
                                    <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                        <FontAwesomeIcon icon={["fal", "camera-viewfinder"]} color="currentColor" height="40%" />
                                        <TagLabel pl="0.5rem"><DisplayDate source={imageData.fileID.takenOn} /></TagLabel>
                                    </Tag>
                                </Stack>
                                <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem">
                                    <Box mr="0.3rem" color="secondary">
                                       <FontAwesomeIcon icon={["fal", "tags"]} color="currentColor" height="40%" />
                                    </Box>
                                    {imageData.tags.map((tag: any) => (
                                        <Link href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                                            <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={tag} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                                <FontAwesomeIcon icon={["fal", "tag"]} color="currentColor" height="40%" />
                                                <TagLabel pl="0.5rem">{tag}</TagLabel>
                                            </Tag>
                                        </Link>
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
