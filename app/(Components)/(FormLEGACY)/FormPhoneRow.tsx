// import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
}

export const FormPhoneRow = ( props: FormProps) => {
    const { inputID, inputLabel } = props
    
    return (
        <InputControl 
            name={inputID}
            mt="0.5rem"
            label={inputLabel}
            inputProps={{
                variant: "unstyled",
                boxShadow: 'bsBoldSecondary',
                _focus: {boxShadow: "bsBoldPrimary"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: 'white',
                borderRadius: "0 2rem",
                type: "tel",
                pattern: "\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}"
            }}
            labelProps={{color: 'white'}}
        />
    )
}