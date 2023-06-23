import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType?: any|undefined|null
    inputDescription?: string
}

export const FormInputRow = ( props: FormProps) => {
    const { inputID, inputLabel, inputType, inputDescription } = props
    
    let theInputType = "text"
    if (inputType != undefined) {
        theInputType = inputType
    }
    
    return (
        <InputControl 
            name={inputID}
            label={inputLabel}
            mt="0.5rem"
            inputProps={{
                variant: "unstyled",
                boxShadow: 'bsBoldOrange',
                _focus: {boxShadow: "bsBoldBlue"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: 'white',
                borderRadius: "0 2rem",
                type: theInputType
            }}
            labelProps={{color: 'white'}}
        />
    )
}