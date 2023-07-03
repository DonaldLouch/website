'use client'
import React from 'react'

import {
    Box,
    CloseButton,
    Flex, 
    Image, 
    Stack,
    BoxProps,
    Text
  } from '@chakra-ui/react'

import { HeaderNavigationItems } from '@/lib/HeaderNavigationItems'

import { MobileHeaderNavigationItem } from './MobileHeaderNavigationItem'
import { HeaderNavigationItem } from './HeaderNavigationItem'
import Link from 'next/link'

interface HeaderNavigationProps extends BoxProps {
    onClose: () => void;
  }

  export const HeaderNavigation = ({ onClose, ...rest }: HeaderNavigationProps) => {
    return (
        <Stack transition="3s ease" direction={{base:"column", lg:"row"}} pos={{base: "fixed", lg:"initial"}} h={{ base:"100vh", lg:"initial"}} bg={{base: "black", lg:"none"}} backdropFilter={{base: "blur(20px)", lg:"none"}} pb={{base: "6", lg:"initial"}} w={{ base: "100%", lg:"initial"}} {...rest}>
          <Flex h="auto" alignItems="center" justifyContent="space-between" display={{ base: 'flex', lg: 'none' }}>
            <Image src="/titleLogo.svg" alt="Donald Louch" width="50vw" p="0.8rem 1.5rem"/>
            <CloseButton onClick={onClose} />
          </Flex>
          <Stack display={{ base: 'none', lg: 'flex' }} alignItems="center" gap="0.6rem" direction="row">
            {HeaderNavigationItems.map((link) => (
              <HeaderNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </HeaderNavigationItem>
            ))}
            <Link href="/jobs"><Text color="white" boxShadow="bsBoldSecondary" p="0.3rem 1rem" my="0" borderRadius="0 0.5rem" fontSize="1.2rem" fontWeight="900" _hover={{background: "blurredBackground", boxShadow: "none"}}>Hire Me!</Text></Link>
          </Stack>
          <Stack display={{ base: 'initial', lg: 'none' }} w="100%" p="1rem" background="blurredBackground" h="100vh">
            {HeaderNavigationItems.map((link) => (
              <MobileHeaderNavigationItem key={`mobile_${link.name}`} slug={link.slug} iconPre={link.iconPre} iconName={link.iconName} isParent={link.isParent} parentID={link.parentID}>
                {link.name}
              </MobileHeaderNavigationItem>
            ))}
          </Stack>
        </Stack>
      )
    }
