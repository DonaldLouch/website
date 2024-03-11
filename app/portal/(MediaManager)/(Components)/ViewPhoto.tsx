'use client'

import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast, Image, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function ViewPhoto({ fileID, fileTitle, filePath }: any) {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton variant="portalButton" color="white" p="2rem" mb="1rem" onClick={onOpen} icon={<FontAwesomeIcon icon={["fas", "eye"]} height="100%" color="currentColor" />} aria-label={`view ${fileTitle}`}>Preview Photo</IconButton> 
            {/* <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button>  */}
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Previewing: {fileTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         <Image src={filePath} alt={`${fileID}-${fileTitle}`} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
