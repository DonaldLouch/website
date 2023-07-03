import { TextareaControl } from 'formik-chakra-ui'
import { Heading, Stack } from '@chakra-ui/react'

interface FormProps {
    inputID: string
    inputLabel: string
    textRows: number
}

export const FormTextArea = ( props: FormProps) => {
    const { inputID, inputLabel, textRows } = props
    
    return (
        <Stack w="100%">
            <Heading size="lg" mb="1.5rem">{inputLabel}</Heading>
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