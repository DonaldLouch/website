import React from 'react'

import {
    Box,
    CloseButton,
    Flex, 
    Image, 
    Stack,
    BoxProps,
    useColorModeValue
  } from '@chakra-ui/react'

import { HeaderNavigationItems } from '../../lib/HeaderNavigationItems'

import { MobileHeaderNavigationItem } from './MobileHeaderNavigationItem'
import { HeaderNavigationItem } from './HeaderNavigationItem'

interface HeaderNavigationProps extends BoxProps {
    onClose: () => void;
  }

  export const HeaderNavigation = ({ onClose, ...rest }: HeaderNavigationProps) => {
    return (
        <Stack transition="3s ease" direction={{base:"column", lg:"row"}} pos={{base: "fixed", lg:"initial"}} h={{ base:"100vh", lg:"initial"}} bg={{base: "mainGradient", lg:"none"}} backdropFilter={{base: "blur(20px)", lg:"none"}} pb={{base: "6", lg:"initial"}} w={{ base: "100%", lg:"initial"}} {...rest}>
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" display={{ base: 'flex', lg: 'none' }}>
            <Image src={useColorModeValue("/titleLogoPride.svg", "/titleLogoPride.svg")} alt="Donald Louch" width="25vw" m="0.5rem auto" />
            <CloseButton onClick={onClose} />
          </Flex>
          <Box display={{ base: 'none', lg: 'flex' }} alignItems="center">
            {HeaderNavigationItems.map((link) => (
              <HeaderNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </HeaderNavigationItem>
            ))}
          </Box>
          <Stack display={{ base: 'initial', lg: 'none' }} w="100%" p="1rem">
            {HeaderNavigationItems.map((link) => (
              <MobileHeaderNavigationItem key={`mobile_${link.name}`} slug={link.slug} iconPre={link.iconPre} iconName={link.iconName} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </MobileHeaderNavigationItem>
            ))}
          </Stack>
        </Stack>
      )
    }
