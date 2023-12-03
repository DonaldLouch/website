import { MdxContent } from '@/app/mdx-content'
import PostContent from '@/app/post/(Components)/PostContent'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function FullDescription({ mdxSource, videoTitle }: { mdxSource: any, videoTitle: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Button onClick={onOpen} variant="blackFormButton" mb="1rem !important">View Full Description</Button>
        <Modal isOpen={isOpen} onClose={onClose} id="FullDescription" size="7xl" isCentered>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent background="blurredPurple" mx="2rem" pb="2rem">
                <ModalHeader fontWeight="900">View Full Description for "{videoTitle}"</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* p="2rem" mb="1rem" mx="2rem" */}
                    <Box whiteSpace="break-spaces" p="1rem" mb="1rem">
                        <MdxContent source={mdxSource} />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal> 
    </>)
}
