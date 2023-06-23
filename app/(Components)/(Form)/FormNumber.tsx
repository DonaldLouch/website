import { NumberInputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
}


export const FormNumber = ( props: FormProps) => {
    const { inputID, inputLabel } = props
    
    return (
        <NumberInputControl 
            name={inputID}
            label={inputLabel}
            numberInputProps={{
                variant: "unstyled",
                boxShadow: "bsBoldWhite",
                _focus: {boxShadow: "bsBoldOrange"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: "white",
                borderRadius: "0 2rem 0 2rem",
            }}
            showStepper={false}
        />
    )
}