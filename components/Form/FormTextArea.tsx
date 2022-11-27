import { TextareaControl } from 'formik-chakra-ui'
import { useColorModeValue } from '@chakra-ui/react'

interface FormProps {
    inputID: string
    inputLabel: string
    textRows: number
}

export const FormTextArea = ( props: FormProps) => {
    const { inputID, inputLabel, textRows } = props
    
    return (
        <TextareaControl 
            name={inputID}
            label={inputLabel}
            my="1.5rem"
            textareaProps={{
                variant: "unstyled",
                boxShadow: useColorModeValue('bsBoldBlue', 'bsBoldWhite'),
                _focus: {boxShadow: "bsBoldOrange"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: useColorModeValue('black', 'white'),
                borderRadius: "0 2rem 0 2rem",
                rows: textRows
            }}
            labelProps={{color: useColorModeValue('primary', 'white')}}
        />
    )
}