import { Box, Tooltip, IconButton, Button, useClipboard, Flex, Icon } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import { useState } from 'react'

interface propTypes {
    copyValue: any
    style?: any
    // colour?: string | null | undefined | unknown
    // hoverColour?: string | null | undefined | unknown
    copyText?: string | null | undefined | unknown
    copiedText?: string | null | undefined | unknown
}

export default function CopyButton( props: propTypes ) {
    const {copyText, copiedText, copyValue, style} = props
// colour, hoverColour, 
    // const iconColour = colour ? colour : "white"
    // const hoverIconColour = hoverColour ? hoverColour : "secondary"
    // const goToLink = link ? link : "/"
    // const iconName = icon ? icon : "house" as any
    const theCopyText = copyText ? copyText : "Copy" as any
    const theCopiedText = copiedText ? copiedText : "Copied" as any
    const theStyle = style ? style : "portalButton" as any
    
    const [ value ] = useState(copyValue)
    const { hasCopied, onCopy } = useClipboard(value)
    
    return (<>
    <Flex 
        align="center" 
        whiteSpace="nowrap" 
        onClick={onCopy}
        p="1rem 2rem" 
        width="auto" 
        my="2rem"
        color="white"
        // px={{ base: 2, md: 5 }}
        // py="2.5rem"
        borderRadius="0 1.5rem"
        wordBreak="break-word"
        boxShadow="bsBoldSecondary"
        fontWeight="900"
        _hover={{ 
            bg: "none",
            boxShadow: "bsBigBoldSecondary",
            fontWeight: "600",
            color: "primary"
        }}
    >
        <Icon mr='1rem' w="1.5rem" h="1.5rem">
            <FontAwesomeIcon
                icon={["fal", "copy"]}
                width="100%"
                color="currentColor"
            />
        </Icon>
        {!hasCopied ? theCopyText : theCopiedText}
    </Flex>
        {/* <Button as="a" onClick={onCopy} variant={theStyle} color="white" leftIcon={<FontAwesomeIcon icon={["fal", "copy"]} width="100%" color='currentColor' height="100%" />} aria-label={theCopyText} p="2rem" width="auto" my="2rem"></Button> */}
    </>)
}
