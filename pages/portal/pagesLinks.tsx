import { 
    // Stack, 
    // HStack,
    // useToast,
    Box, 
    // Heading,
    Link,
    Stack,
    // useColorModeValue
} from '@chakra-ui/react'

// import { Formik } from 'formik'
// import {
//     SubmitButton
// } from 'formik-chakra-ui'

// import prisma from '../../config/prisma'

import {Metadata} from "../../components/Metadata"


import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

// import * as React from 'react'
// import * as Yup from 'yup'

// import { FormInput } from '../../components/Form/FormInput'
// import { FormTextArea } from '../../components/Form/FormTextArea'
// import { FormInputReadOnly } from '../../components/Form/FormInputReadOnly'

export default function LinksPortal() {
  //   const about = aboutData

  // const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  // const primeWhite = useColorModeValue('primary', 'white')

      // const postedData = new Date(post.postedOn)
      // const postedDay = postedData.toLocaleDateString()
      // const postedTime = postedData.toLocaleTimeString()

      // const postedOnString = postedDay +" at " + postedTime
    

    return (
        <>  
            <PortalLayout pageTitle={`Edit: Links`}>
                <Metadata
                    title={`Edit: Links | ${process.env.WEBSITE_NAME}`}
                    keywords={`${process.env.KEYWORDS}`}
                    description={`${process.env.DESCRIPTION}`}
                    />
                    <Box as="main" id="editAbout" color="black">
                      <Stack direction="row" spacing={8} align="center" justify="center" p={8}>
                        <Link variant="primary" href="linkNew">Add New Link</Link>
                        <Link variant="primary" href="embedNew">Add New Embed</Link>
                        <Link variant="primary" href="pagesLinksPrimary">Edit Primary Links</Link>
                      </Stack>
                    </Box>
            </PortalLayout>
        </>
    )
}


// export async function getServerSideProps() {
   
//     const aboutData = await prisma.about.findUnique({
//         where: {
//             id
//         } 
//     })

//     return { 
//         props: { 
//             aboutData: JSON.parse(JSON.stringify(aboutData))
//         } 
//     }
// }