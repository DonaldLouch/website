import { TextareaControl } from 'formik-chakra-ui'
import { Code, Heading, Stack } from '@chakra-ui/react'

interface FormProps {
    inputID: string
    inputLabel: string
    textRows: number
    helperText?: any
}

export const FormTextArea = ( props: FormProps) => {
    const { inputID, inputLabel, textRows, helperText } = props
    
    return (
        <Stack w="100%">
            <Heading size="lg" mb={!helperText ? "1.5rem" : "0"}>{inputLabel}</Heading>
            <Code p={3} colorScheme='whiteAlpha' m="0.5rem 0 1.5rem" hidden={!helperText}>{helperText}</Code>
            <TextareaControl 
                name={inputID}
                mt="-1rem !important"
                textareaProps={{
                    variant: "unstyled",
                    boxShadow: "bsBoldSecondary",
                    _focus: {boxShadow: "bsBoldPrimary"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    p: "1.5rem 2rem",
                    color: "white",
                    borderRadius: "0 2rem 0 2rem",
                    rows: textRows
                }}
            />
        </Stack>
    )
}