import React, { ReactText } from 'react'
import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
//   MenuDivider
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../config/fontAwesome'

import { PortalSubNavigationItems } from '../../config/PortalNavigationItems/PortalSubNavigationItems'

interface PortalNavigationItemProps extends FlexProps {
    slug: any
    iconName: any
    iconPre: any
    isParent: boolean
    parentID: number|null
    levelOfAccess: string
    children: ReactText
}


export const PortalNavigationItem = ({ slug, iconName, iconPre, isParent, parentID, levelOfAccess, children, ...rest }: PortalNavigationItemProps) => {
    const blackWhiteColour = useColorModeValue('black', 'white')
    
    return (
        <>
            {isParent == false ? (
                <Link 
                    href={slug == null ? ("") : (`../../../${slug}`)}
                    textDecoration="none"
                >
                    <Flex align="center" p="4" mx="3" my="1" borderRadius="0 1.5rem" role="group" cursor="pointer" color={blackWhiteColour} bg="none" _hover={{ bg: 'secondary' }} _focus={{ boxShadow: 'none' }} transition="all 0.3s" {...rest}>
                        {iconName && (
                        <Box mr="4" width={{ base: '4%', md: '12%' }} color={blackWhiteColour}>
                            <FontAwesomeIcon 
                                icon={[iconPre, iconName]} 
                                // color="black"
                                // {
                                //     useColorModeValue('black', 'white')
                                // }
                                width="100%"
                            />
                        </Box>
                        )}
                        {children}
                    </Flex>
                </Link>
            ) : (
                <Menu>
                    <MenuButton alignItems="center" p="4" mx="3" my="1" borderRadius="0 1.5rem" role="group" cursor="pointer" color={blackWhiteColour} bg="none" _hover={{ bg: 'secondary' }} _focus={{ boxShadow: 'none' }} transition="all 0.3s" w={{base: "96%", md: "initial"}} textDecoration="none" fontWeight="900">
                        <Flex align="center" whiteSpace="nowrap" {...rest}>
                            {iconName && (
                            <Box mr="4" width={{ base: '4%', md: '12%' }} color={blackWhiteColour}>
                                <FontAwesomeIcon 
                                    icon={[iconPre, iconName]} 
                                    // color="black"
                                    // {
                                    //     useColorModeValue('black', 'white')
                                    // }
                                    width="100%"
                                />
                            </Box>
                            )}
                            {children}
                        </Flex>
                    </MenuButton>
                    <MenuList
                            bg="white"
                            //{useColorModeValue('white', 'black')}
                            boxShadow= "bsBlue"
                            //{useColorModeValue('bsBlue', 'bsBoldBlue')}
                            m="-0.5rem"
                        >
                            {PortalSubNavigationItems.map((subLink: any) => (
                            subLink?.parentMenu == parentID ? (
                                <Link href={`../../../${subLink.slug}`} variant="unstyled" textDecoration="none"><MenuItem textDecoration="none" key={subLink.index}>{subLink.name}</MenuItem></Link>
                            ) : (<></>)
                        ))}
                        </MenuList>
                </Menu>   
            )}
        </>
    )
}