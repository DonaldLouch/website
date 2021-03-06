import {
    Box,
    keyframes,
    usePrefersReducedMotion,
    // useColorModeValue
} from '@chakra-ui/react'

const spinningGradient = keyframes `
    0%{background: linear-gradient(30deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
    40%{background: linear-gradient(135deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
    60%{background: linear-gradient(90deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
    100%{background: linear-gradient(0deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
`

export default function ImageGradientBox() {
    const prefersReducedMotion = usePrefersReducedMotion()
    const spinningGradientAnimation = prefersReducedMotion
    ? undefined
    : `${spinningGradient} infinite 15s`
    
    return (
        <>
            <Box bg='mainGradient' animation={spinningGradientAnimation} w="100vw" h="100%" opacity="0.6" pos="absolute"></Box>
            <Box bg="url(https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg) #333 40% 40%" h="100%" w="100vw"></Box>
        </>
    )
}
