import { RadioGroupControl } from 'formik-chakra-ui'

interface FormProps {
    radioName: string
    radioLabel: string
   children: React.ReactNode
}

export const FormRadio = ( props: FormProps) => {
    const { radioName, radioLabel, children } = props
    return (
        <RadioGroupControl 
            name={radioName} 
            label={radioLabel} 
            radioGroupProps={{
                colorScheme: "orange",
                ml: "1.5rem",
                children
            }}
            boxShadow="bsBoldWhite"
            _focus={{boxShadow: "bsBoldSecondary"}}
            _invalid={{boxShadow: "bsBoldRed"}}
            color="white"
            borderRadius="0 2rem 0 2rem"
            border="none"
            p="1.5rem"
            m="2rem 0 0.5rem !important"
        >
            { children }
        </RadioGroupControl>
    )
}