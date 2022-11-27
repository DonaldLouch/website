import React from 'react'

import {
    Box,
    CloseButton,
    Flex, 
    Image, 
    Stack,
    BoxProps
  } from '@chakra-ui/react'

import { HeaderNavigationItems } from '../../lib/HeaderNavigationItems'
// import { PortalSubNavigationItems } from '../../config/Portal/PortalSubNavigationItems'

import { MobileHeaderNavigationItem } from './MobileHeaderNavigationItem'
import { HeaderNavigationItem } from './HeaderNavigationItem'

// interface HeaderProps {
//     linkURL: string
//     linkTitle: string
// }

interface HeaderNavigationProps extends BoxProps {
    onClose: () => void;
  }

  export const HeaderNavigation = ({ onClose, ...rest }: HeaderNavigationProps) => {
    return (
      /*
      #Stack
      // bg="blurredBackground" 
      // backdropFilter="blur(20px)" 
      // borderRadius="0 0 0 3.5rem" 
      // boxShadow="bsBlue" 
      //borderRightColor={useColorModeValue('gray.200', 'gray.700')} 
      // w={{ base: 'full', lg: 60 }} 
      # Image: Donald Louch Logo
      // display={{ base: 'flex', lg: 'none' }}
      # Under the HeaderNavigationItems Map
       // <FontAwesomeIcon icon={['fab', linkIcon]} />
      */
    //    <Box
    //    transition="3s ease"
    //    bg="blurredBackground"
    //    backdropFilter="blur(20px)"
    //    borderRadius="0 0 0 2rem"
    //    boxShadow="bsBlue"
    //    //borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    //    w={{ base: 'full', lg: 60 }}
    //    pos="fixed"
    //    h="auto"
    //    pb="6"
    //    {...rest}
    //  >
    // bg="blurredBackground" backdropFilter="blur(20px)" pb={{base: "6", lg:"initial"}} w="100%"

        <Stack transition="3s ease" direction={{base:"column", lg:"row"}} borderRadius="0 0 0 2rem" pos={{base: "fixed", lg:"initial"}} h={{ base:"auto", lg:"initial"}} bg={{base: "blurredBackground", lg:"none"}} backdropFilter={{base: "blur(20px)", lg:"none"}} pb={{base: "6", lg:"initial"}} w={{ base: "100%", lg:"initial"}} {...rest}>
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" display={{ base: 'flex', lg: 'none' }}>
            <Image src="/titleLogoChristmas.svg" alt="Donald Louch" width="25vw" m="0.5rem auto" />
            <CloseButton onClick={onClose} />
          </Flex>
          <Box display={{ base: 'none', lg: 'flex' }} alignItems="center">
            {HeaderNavigationItems.map((link) => (
              <HeaderNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </HeaderNavigationItem>
            ))}
          </Box>
          <Box display={{ base: 'initial', lg: 'none' }} w="100%">
            {HeaderNavigationItems.map((link) => (
              <MobileHeaderNavigationItem key={`mobile_${link.name}`} slug={link.slug} iconPre={link.iconPre} iconName={link.iconName} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </MobileHeaderNavigationItem>
            ))}
          </Box>
        </Stack>
      )
    }
