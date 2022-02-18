import {
  Text, 
  Heading
} from '@chakra-ui/react'

import { SectionCard } from "./Cards/SectionCard"

export default function AboutUs() {
    return (
        <SectionCard id="aboutUs" styleType="primaryCard">
            <Heading as="h3" variant="sectionTitle" size="3xl">About Us</Heading>
            <Text>DevLexicon is the re-branded Donald Louch Productions. With this re-brand, DevLexicon is moving towards a more professional freelance company. Within the company there will be a primary focus in web development and production with a subsidiary focus on media production such as videography and photography.</Text>
            <Text>DevLexicon stands for development of a variety of different web productions to the production of different media. Lexicons are in essence the vocabulary or word of branches of knowledge. Thus, with DevLexicon we’ll branch our knowledge within productions and will be used to produce the end product.</Text>
        </SectionCard>
    )
}
