'use client'

import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast, IconButton, Box } from '@chakra-ui/react'

import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
// import { BsEye } from 'react-icons/bs'
import * as Yup from 'yup'

import Image from 'next/image'

export default function ViewPhoto({ fileID, fileTitle, filePath }: any) {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {/* <IconButton variant="portalButton" color="white" p="2rem" mb="1rem" onClick={onOpen} icon={<BsEye />} aria-label={`view ${fileTitle}`}>Preview Photo</IconButton>  */}
            {/* <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button>  */}
            <Box _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.1s" display="inline-block" onClick={onOpen} >
                <Image src={filePath} alt={`${fileID}-${fileTitle}`} width="500" height="500" quality={20}/>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Previewing: {fileTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.1s" display="inline-block">
                            <Image src={filePath} alt={`${fileID}-${fileTitle}`} width="5000" height="5000" quality={20}/>
                        </Box>
                         {/* <Image src={filePath} alt={`${fileID}-${fileTitle}`} /> */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
