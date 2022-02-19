import React, { useState, useEffect } from 'react'
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion, getCsrfToken } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

import { 
    Box, 
    // Text, 
    Heading,
    // Tabs, 
    // TabList, 
    // TabPanels, 
    // Tab, 
    // TabPanel,
    Image,
    Input,
    FormControl,
    FormLabel,
    Button,
    // Divider,
    Stack,
    useToast,
    useColorModeValue
  } from '@chakra-ui/react'

  import {Metadata} from "../components/Metadata";
// import { parseCookies, destroyCookie } from 'nookies'

import { SectionCard } from "../components/Cards/SectionCard"
// import { DividerText } from "../components/DividerText"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../config/fontAwesome'
import { CtxOrReq } from 'next-auth/client/_utils'

import { useRouter } from 'next/router'

export default function Login({ csrfToken }: any) {

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  const router = useRouter()
  const toast = useToast()

  if (router.query.errCode == "Not Logged In") {
    toast({
      title: `${router.query.errCode}`,
      description: `${router.query.errMessage}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }
  console.log(router.query.error)
  if (router.query.error == "EmailSignin") {
    toast({
      title: "Oh No!",
      description: "It seems that you have tried to login without a registered email. If you feel this is an error, please contact Donald Louch.",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, [])

  if (status === 'authenticated') {
    router.push('/portal')
  }

  const labelColour = useColorModeValue('primary', 'white')
  const formColour = useColorModeValue('black', 'white')
  const boxShadowColour = useColorModeValue('bsBoldBlue', 'bsBoldWhite')

  return (
    <>
    <Metadata
        title={`Login | ${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
    />
    <Box as="main" color="white">
        <SectionCard id="signup" styleType="primaryCard">
            <Image
                src="/titleLogo.svg"
                alt="Donald Louch"
                width="20vw"
                m="0.5rem auto"
            /> 
            {status === 'loading' ? (
                <Heading as="h2" variant="sectionTitle" size="3xl" m="1rem 0">Loading ...</Heading>
            ) : (
                session ? (
                    <>
                        <Heading as="h2" variant="sectionTitle" size="2xl">You are currently logged in as {session.user?.email} 👋</Heading>
                        <Button leftIcon={<FontAwesomeIcon icon={['fas', 'sign-out-alt']} color="black" />} type="button" onClick={() => signOut()} variant="blackFormButton" w="100%">Sign Out</Button>
                    </>
                ) : ( 
                    providers ? (
                        <> 
                            {/* <Heading as="h2" variant="sectionTitle" size="3xl">Login to DevLexicon</Heading> */}
                                {providers?.email && (
                                    <>
                                        <form method="post" action="/api/auth/signin/email">
                                            <Input 
                                                variant="unstyled" boxShadow="bsBoldBlue" p="1.5rem 2rem" color="primary" borderRadius="0 2rem 0 2rem" my="1rem"
                                                name="csrfToken"
                                                defaultValue={csrfToken}
                                                hidden
                                            /> 
                                            <FormControl>
                                                <FormLabel 
                                                  htmlFor="email" 
                                                  color={labelColour}
                                                >Email</FormLabel>
                                                <Input variant="unstyled" id="email" name="email" boxShadow={boxShadowColour} _focus={{boxShadow: "bsBoldOrange",}} p="1.5rem 2rem" color={formColour} borderRadius="0 2rem 0 2rem" />
                                            </FormControl>
                                            <Button leftIcon={<FontAwesomeIcon icon={['fas', 'magic']} color="white" />} type="submit" variant="blackFormButton" w="99%" m="1rem">Login with Email</Button>
                                        </form>
                                    </>
                                )}
                                {/* <DividerText>Or Login With</DividerText> */}
                                <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center">
                                    {providers?.github && (
                                        <Button leftIcon={<FontAwesomeIcon icon={['fab', 'github']} color="white" />} type="button" onClick={() => signIn(providers?.github.id)} variant="blackFormButton" w={{ base: '100%', md: '50%' }}>Login with Github</Button>
                                    )}
                                    
                                    {providers?.google && (
                                        <Button leftIcon={<FontAwesomeIcon icon={['fab', 'google']} color="white" />} type="button" onClick={() => signIn(providers?.google.id)} variant="blackFormButton" w={{ base: '100%', md: '50%' }} disabled>Login with Google</Button>
                                    )}
                                </Stack>
                        </>
                    ) : (<Heading as="h2" variant="sectionTitle" size="xl" m="1rem 0">Oh no, we are having issues with loading our login system.</Heading>)
                )
            )}
        </SectionCard>
    </Box>
    </>
  )
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
    const csrfToken = await getCsrfToken(context)
    return {
      props: { csrfToken },
    }
  }

// export default Login;