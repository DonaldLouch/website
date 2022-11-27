import { InputControl } from 'formik-chakra-ui'
import { useColorModeValue } from '@chakra-ui/react'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType: any|undefined|null
}

export const FormInput = ( props: FormProps) => {
    const { inputID, inputLabel, inputType } = props
    
    let theInputType = "text"
    if (inputType != undefined) {
        theInputType = inputType
    }
    
    return (
        <InputControl 
            name={inputID}
            label={inputLabel}
            my="1.5rem"
            inputProps={{
                variant: "unstyled",
                boxShadow: useColorModeValue('bsBoldBlue', 'bsBoldWhite'),
                _focus: {boxShadow: "bsBoldOrange"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: useColorModeValue('black', 'white'),
                borderRadius: "0 2rem 0 2rem",
                type: theInputType
            }}
            labelProps={{color: useColorModeValue('primary', 'white')}}
        />
    )
}