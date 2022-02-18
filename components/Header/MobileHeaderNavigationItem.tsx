import React, { ReactText } from 'react'
import {
//   HStack,
  Flex,
  useColorModeValue,
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
//   IconButton,
  Grid,
  Text,

//   MenuDivider
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../config/fontAwesome'

import { HeaderSubNavigationItems } from '../../config/HeaderNavigationItems/SubNavigationItems'

interface HeaderNavigationItemProps extends FlexProps {
    slug: any
    iconName: any
    iconPre: any
    isParent: boolean
    parentID: number|null
    children: ReactText
}
  
export const MobileHeaderNavigationItem = ({ slug, iconName, iconPre, isParent, parentID, children, ...rest }: HeaderNavigationItemProps) => {
    const blackWhiteColour = useColorModeValue('black', 'white')
    // const primGreyColour = useColorModeValue('primary', 'grey')
    const boxShadow = useColorModeValue("bsBoldBlue", "bsBoldWhite")

    return (
        <>
        {isParent == false ? (
                <Link 
                    href={slug == null ? ("") : (`../../../${slug}`)}
                    textDecoration="none"
                    fontSize={{base: "initial", lg: "0.5rem"}}
                >
                    <Flex align="center" fontSize="1.3rem" py={{base: "8", lg: "0rem"}} px={{base: "4", lg: "1rem"}} mx="3" my="1" borderRadius="0 1.5rem" role="group" cursor="pointer" color={blackWhiteColour} bg="none" _hover={{ bg: 'secondary' }} _focus={{ boxShadow: 'none' }} transition="all 0.3s" {...rest} boxShadow={{base: "none", lg: "bsBoldBlue"}} justifyContent={{base: "initial", lg:"center" }}>
                        <Box mr="4" width="4%" color={blackWhiteColour} display={{ base: 'flex', lg: 'none' }}>
                            <FontAwesomeIcon 
                                icon={[iconPre, iconName]} 
                                width="100%"
                            />
                        </Box>
                        <Text fontSize={{base: "initial", lg: "1rem"}}>{children}</Text>
                    </Flex>
                </Link>
            ) : (
                <Grid templateColumns={{base: "80% 15%", lg: "75% 25%"}} alignItems="center">
                    <Link href={`../../../${slug}`} textDecoration="none" whiteSpace="nowrap">
                        <Flex align="center" fontSize="1.3rem"  py={{base: "4", lg: "0rem"}} px={{base: "4", lg: "0.5rem"}} mx="3" my={{base: "1", lg:"0"}} borderRadius="0 1.5rem" role="group" cursor="pointer" color={blackWhiteColour} bg="none" _hover={{ bg: 'secondary' }} _focus={{ boxShadow: 'none' }} transition="all 0.3s" boxShadow={{base: "none", lg: "bsBoldBlue"}} justifyContent={{base: "initial", lg:"center" }}  {...rest}>
                                <Box mr="0.3rem" width="4%" color={blackWhiteColour} display={{ base: 'flex', lg: 'none' }}>
                                    <FontAwesomeIcon 
                                        icon={[iconPre, iconName]} 
                                        // color="black"
                                        // {
                                        //     useColorModeValue('black', 'white')
                                        // }
                                        width="100%"
                                    />
                                </Box>
                                <Text fontSize={{base: "initial", lg: "1rem"}}>{children}</Text>
                        </Flex>
                    </Link>
                    <Menu>
                        <MenuButton alignItems="center" my="1" borderRadius={{base: "0 1.5rem", lg: "0"}} role="group" cursor="pointer" color={blackWhiteColour} bg="none" _hover={{ bg: 'secondary', boxShadow: "none" }} _focus={{ boxShadow: 'none' }} transition="all 0.3s" textDecoration="none" w={{base: "100%", lg: "100%"}}>
                                <Box  color={blackWhiteColour} boxShadow={boxShadow} ml={{base: "initial", lg:"0rem"}} _hover={{boxShadow: "none", color: "primary"}} p={{base: "0.9rem", lg: "0.5rem"}} borderRadius={{base: "0 1.5rem", lg: "0"}} w="100%">
                                    <FontAwesomeIcon 
                                        icon={["fas", "chevron-down"]} 
                                        // color="black"
                                        // {
                                        //     useColorModeValue('black', 'white')
                                        // }
                                        width="100%"
                                    />
                                </Box>
                        </MenuButton>
                        <MenuList
                                bg="white"
                                //{useColorModeValue('white', 'black')}
                                boxShadow= "bsBlue"
                                //{useColorModeValue('bsBlue', 'bsBoldBlue')}
                                m="-0.5rem 1.9rem"
                        
                            >
                                {HeaderSubNavigationItems.map((subLink: any) => (
                                subLink?.parentMenu == parentID ? (
                                    <Link href={`../../../${subLink.slug}`} variant="unstyled" _hover={{textDecoration: "none", color: 'secondary'}}><MenuItem key={subLink.index}>{subLink.name}</MenuItem></Link>
                                ) : (<></>)
                            ))}
                            </MenuList>
                        </Menu>
                    </Grid>
            )}
        </>
    )
}