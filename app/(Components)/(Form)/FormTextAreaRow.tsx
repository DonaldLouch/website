import { TextareaControl } from 'formik-chakra-ui'
import { Grid, Heading, Stack, Text } from '@chakra-ui/react'

interface FormProps {
    inputID: string
    inputLabel: string
    textRows: number
    inputDescription?: any
}

export const FormTextAreaRow = ( props: FormProps) => {
    const { inputID, inputLabel, textRows, inputDescription } = props
    
    return (
        <Grid gridTemplateColumns="33% 67%" alignItems="flex-start" gap="2rem" w="calc(100% - 2rem)" my="0.5rem">
            <Stack>
                <Heading size="lg"mt="-1.5rem" borderBottom="solid" borderBottomColor="primary" pb="0.5rem">{inputLabel}</Heading>
                <Text fontSize="md" opacity="0.7">{inputDescription}</Text>
            </Stack>
            <TextareaControl 
                name={inputID}
                mt="-1rem !important"
                textareaProps={{
                    variant: "unstyled",
                    boxShadow: "bsBoldOrange",
                    _focus: {boxShadow: "bsBoldBlue"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    p: "1.5rem 2rem",
                    color: "white",
                    borderRadius: "0 2rem",
                    rows: textRows
                }}
            />
        </Grid>
    )
}