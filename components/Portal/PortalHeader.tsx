import React from 'react'
import {
  IconButton,
  Flex,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
//   Badge
} from '@chakra-ui/react'

// import { 
//     parseCookies
//   } from "nookies"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../config/fontAwesome'

// import { useSession } from 'next-auth/react'
// import prisma from '../../config/prisma'

// import { firebaseClient } from "../../config/Firebase/FirebaseClient";
// import firebase from "firebase/app"
// import "firebase/firestore"

// import {FirebaseClient } from '../../config/Firebase/FirebaseClient'
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

interface PortalHeaderProps extends FlexProps {
    onOpen: () => void
    pageTitle: string
}

export default function PortalHeader({ pageTitle, onOpen, ...rest }: PortalHeaderProps) {
    // const database = getFirestore(FirebaseClient);

    // const cookies = parseCookies()
    // const userID = cookies.uID

    // const { data: session, status} = useSession()

    // const pageTitle = props

    // const [userInformation, setUserInformation] = useState({
    //     firstName: "LOADING ...",
    //     userType: "ACCOUNT"
    // }) as unknown as any
    
    /*useEffect(() => {
        if (status != 'loading' && status == 'authenticated') {
            (async function() {
                const sessionEmail = session?.user?.email
                const res = await fetch(`/api/users/getUserByEmail?uEmail=${sessionEmail}`)
                const data = await res.json()

                setUserInformation({
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    // userType: data[0].userType
                })
            })()
            // })
        }
    }, [status]) */

    // console.log(userInformation)

    const blackWhite = useColorModeValue('black', 'white')

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg="blurredBackground"
            boxShadow="bsBlue"
            borderRadius="0 3.5rem 0 0"
            // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="unstyled"
                boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
                aria-label="open menu"
                // w="5%"
                padding="0.5rem"
                borderRadius="0 1em"
                color={blackWhite}
                _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                icon={
                    <FontAwesomeIcon 
                        icon={'bars'} 
                        // color={blackWhite}
                        //width="50%"
                    />
                }
            />

            {/* <Image
                display={{ base: 'block', md: 'none' }}
                src="/devLexiconTitle.svg"
                alt="DevLexicon"
                width="20vw"
                m="0.5rem auto"
            /> */}

            <VStack
                // display={{ base: 'none', md: 'flex' }}
                alignItems="flex-end"
                spacing="0.2rem"
                boxShadow="bsBoldBlue"
                borderRadius="0 2rem"
                p="0.5rem 1.5rem"
                mr="2"
            >
                <Text fontSize="lg" m="0" color={useColorModeValue('black', 'white')} fontWeight="bold">{pageTitle}</Text> 
                {/* <Badge variant="solid" colorScheme={useColorModeValue('purple', 'blackAlpha')}>{userInformation.userType}</Badge> */}
                {/* <Text fontSize="sm" m="0" color={useColorModeValue('black', 'white')}>DevLexicon</Text>
                <Badge variant="solid" colorScheme={useColorModeValue('whiteAlpha', 'blackAlpha')}>TEST</Badge> */}
            </VStack>
        </Flex>
    )
}