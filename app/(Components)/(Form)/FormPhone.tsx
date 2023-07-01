import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputDescription?: string
}

export const FormPhone = ( props: FormProps) => {
    const { inputID, inputLabel, inputDescription } = props
    
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
                    boxShadow: 'bsBoldOrange',
                    _focus: {boxShadow: "bsBoldBlue"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    p: "1.5rem 2rem",
                    color: 'white',
                    borderRadius: "0 2rem",
                    type: "tel",
                    pattern: "\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}"
                }}
            />
         </Grid>
    )
}