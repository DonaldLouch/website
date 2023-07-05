import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType?: any|undefined|null
    inputDescription?: string|any
}

export const FormInput = ( props: FormProps) => {
    const { inputID, inputLabel, inputType, inputDescription } = props
    
    const theInputType = inputType ? inputType : "text"
    
    return (
        <Grid gridTemplateColumns="33% 67%" alignItems="flex-start" gap="2rem" w="calc(100% - 2rem)">
            <Stack>
                <Heading size="lg" lineHeight="1" borderBottom="solid" borderBottomColor="primary" pb="0.5rem">{inputLabel}</Heading>
                <Text fontSize="md" opacity="0.7">{inputDescription}</Text>
            </Stack>
            <InputControl 
                name={inputID}
                mt="0.5rem"
                inputProps={{
                    variant: "unstyled",
                    boxShadow: 'bsBoldSecondary',
                    _focus: {boxShadow: "bsBoldPrimary"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    p: "1.5rem 2rem",
                    color: 'white',
                    borderRadius: "0 2rem",
                    type: theInputType
                }}
            />
         </Grid>
    )
}