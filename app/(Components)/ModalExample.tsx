'use client'

import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'

export default function MODALEXAMPLE() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important">Add New Work Experience</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New Work Experience</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* CONTENT */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
