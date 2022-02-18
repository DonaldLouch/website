import { 
    IconButton 
} from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../config/fontAwesome";

interface FooterProps {
    linkURL: string
    socialMedia: string
    linkIcon: any
}

export const FooterIcon = (props:FooterProps) => {
    const { linkURL, socialMedia, linkIcon } = props

    return (
        <IconButton 
            as="a" 
            href={linkURL}
            aria-label={socialMedia}
            p="0.5rem" 
            size="lg" 
            variant="outline" 
            rounded="full" 
            colorScheme="white"
            _hover={{ bg: "white", color: "tertiary", border: "none" }}>
                <FontAwesomeIcon icon={['fab', linkIcon]} />
        </IconButton>
    )
}
