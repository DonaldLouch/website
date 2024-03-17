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
import { useUser } from '@clerk/nextjs'
import CopyButton from '@/app/(Components)/(Buttons)/CopyButton'
import { BsCalendar2, BsEye, BsHash, BsImages, BsPencilSquare, BsPinMap, BsTag, BsTags } from 'react-icons/bs'

export default function ViewPhotoFeed({ imageData, hideElement }: {imageData: any,hideElement?: any}) {
    const {user} = useUser()
    const toast = useToast()
    const toastID = "toastID"
    // const albumData = photographyAlbum.find(({ id }: any) => id ===  imageData.album)
    const { album: albumData } = imageData
    const { isOpen, onOpen, onClose } = useDisclosure()
    // isLoading
    
    //  const [ value ] = useState(`${process.env.NEXT_PUBLIC_SITE_URL}/photo/${imageData.id}`)
    // const { hasCopied, onCopy } = useClipboard(value)
    return (
        <>
        {/* _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s" display="inherit" my="0.5rem" */}
         {/* height="2160" onClick={onOpen} _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s" */}
         {/* style={{display: "inherit"}} */}
            {/* <Skeleton isLoaded={!isLoading} my={isLoading ? "0.5rem" : "0"} startColor="primary" endColor="secondary" opacity={isLoading ? "0.6" : "1"}> */}
                <Box onClick={onOpen} display="inline-block" _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.1s">
                    {/* <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`} width="3840" height="2160" /> */}
                    <Image 
                    src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`} 
                    quality={10} 
                    sizes="10%"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    width={500}
                    height={300}

                />
                </Box>
            {/* </Skeleton> */}
            {/* <Button variant="portalButton" color="white" p="2rem" mb="1rem" onClick={onOpen} leftIcon={<FontAwesomeIcon icon={["fas", "eye"]} width="100%" color="currentColor" />}>Preview Photo</Button>  */}
            {/* <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button>  */}
            <Modal isOpen={isOpen} onClose={onClose} id={`viewPhoto${imageData.id}`} size="7xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent background="blurredPurple" mx="2rem" pb="2rem">
                    <ModalHeader>{imageData.photoName}</ModalHeader>
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
                                     <Button as="a" href={`/photo/${imageData.id}`} leftIcon={<BsEye />} aria-label={'View Photo'} background="none" boxShadow="bsBoldSecondary" my="2rem" color="white" wordBreak="break-word"  whiteSpace="nowrap" p="2rem" width="auto" borderRadius="0 1.5rem" _hover={{background: "none", boxShadow: "none"}}>View Photo</Button>
                                    {/* <LinkBox as="div" display="flex" gap="1rem" alignItems="center"
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
                                        <BsEye />
                                        <LinkOverlay href={`/photo/${imageData.id}`}>
                                            <Text fontSize="1.1rem" color="white">Open Photo Link</Text>
                                        </LinkOverlay>
                                    </LinkBox> */}
                                    
                                </Stack>
                            </Stack>
                            <Stack width={{base: "100%", lg: "50%"}}>
                                {/* <Text boxShadow="bsBoldPrimary" p="2rem" borderRadius="0 2rem">{imageData.fileID.takenOn}</Text> */}
                                <Stack direction="row" gap="2rem" hidden={!user}>
                                    <CopyButton copyValue={imageData.fileID.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
                                    <Button as="a" href={`/portal/photography/${imageData.id}`} leftIcon={<BsPencilSquare />} aria-label={'Edit Photo'} background="none" boxShadow="bsBoldSecondary" my="2rem" color="white" wordBreak="break-word"  whiteSpace="nowrap" p="2rem" width="auto" borderRadius="0 1.5rem" _hover={{background: "none", boxShadow: "none"}}>Edit Photo</Button>

                                    <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" my="2rem">
                                        <BsHash />
                                        <TagLabel pl="0.5rem">{imageData.id}</TagLabel>
                                    </Tag> 
                                </Stack>
                                <Text boxShadow="bsBoldPrimary" p="2rem" borderRadius="0 2rem" whiteSpace="break-spaces">{imageData.caption}</Text>
                                <Stack direction="row" my="2rem" gap="0.8rem">
                                     {imageData.album && hideElement != "album" && <Link href={`/album/${albumData.slug}`} style={{color: "currentColor"}}><Tag size='lg' colorScheme='purple' _hover={{background: "white"}} borderRadius='0 1rem' p="1rem" whiteSpace="normal" wordBreak="break-all" width="fit-content">
                                        {/* <FontAwesomeIcon icon={["fas", "images"]} color="currentColor" height="40%" /> */}
                                        <BsImages />
                                        <TagLabel pl="0.5rem">{albumData.albumName}</TagLabel>
                                    </Tag></Link>}
                                    {imageData.location && <Link href={`/feed/photography?search=location&value=${imageData.location}`} style={{color: "currentColor"}}><Tag size='lg' colorScheme='messenger' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                        {/* <FontAwesomeIcon icon={["fas", "location-pin"]} color="currentColor" height="40%" /> */}
                                        <BsPinMap />
                                        <TagLabel pl="0.5rem">{imageData.location}</TagLabel>
                                    </Tag></Link>}
                                </Stack>
                                <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" m="-1rem 0 1rem">
                                    {/* <FontAwesomeIcon icon={["fas", "camera-viewfinder"]} color="currentColor" height="40%" /> */}
                                    <BsCalendar2 />
                                    <TagLabel pl="0.5rem"><DisplayDate source={imageData.fileID.takenOn} /></TagLabel>
                                </Tag>
                                <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem">
                                    <BsTags />
                                    {/* <Box mr="0.3rem" color="secondary">
                                       <FontAwesomeIcon icon={["fas", "tags"]} color="currentColor" height="40%" />
                                    </Box> */}
                                    {imageData.tags.map((tag: any) => (
                                        <Link href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                                            <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={tag} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                                {/* <FontAwesomeIcon icon={["fas", "tag"]} color="currentColor" height="40%" /> */}
                                                <BsTag />
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
