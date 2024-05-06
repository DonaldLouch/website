// import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType?: any|undefined|null
    inputDescription?: string|any
}

export const FormInputRow = ( props: FormProps) => {
    const { inputID, inputLabel, inputType, inputDescription } = props
    
    const theInputType = inputType ? inputType : "text"
    
    return (<>
    <Stack width="100%">
        <Stack hidden={!inputDescription}>
            <Heading size="lg" lineHeight="1" borderBottom="solid" borderBottomColor="primary" pb="0.5rem">{inputLabel}</Heading>
            <Text fontSize="md" opacity="0.7">{inputDescription}</Text>
        </Stack>
        <InputControl 
            name={inputID}
            label={inputLabel}
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
            labelProps={{
                hidden: inputDescription,
            }}
        />
    </Stack>
    </>)
}