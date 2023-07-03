// import { Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType?: any|undefined|null
}

export const FormInputRow = ( props: FormProps) => {
    const { inputID, inputLabel, inputType } = props
    
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
                boxShadow: 'bsBoldSecondary',
                _focus: {boxShadow: "bsBoldPrimary"},
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