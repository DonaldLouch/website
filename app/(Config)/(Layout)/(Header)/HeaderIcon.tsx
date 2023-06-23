'use client'
import { 
    Tooltip, 
    IconButton 
} from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
    linkURL: string
    linkTitle: string
    linkIcon: any
}

export const HeaderIcon = (props:HeaderProps) => {
    const { linkURL, linkTitle, linkIcon } = props

    return (
        <Tooltip hasArrow label={linkTitle} placement="bottom">                        
            <IconButton 
                as="a" 
                href={linkURL}
                aria-label={linkTitle}
                p="0.5rem"
                size="lg" 
                variant="outline"
                rounded="full"
                _hover={
                    {
                        color: "secondary", 
                        border: "none"
                    }
                }
            >
                <FontAwesomeIcon icon={linkIcon} />
            </IconButton>
        </Tooltip>
    )
}
