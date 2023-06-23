import { SwitchControl } from 'formik-chakra-ui'
import { useColorModeValue } from '@chakra-ui/react'
interface FormProps {
    inputID: string
    inputLabel: string
}

export const FormSwitchOLD = (props: FormProps, {...rest}) => {
    const { inputID, inputLabel } = props
    
    return (
        <SwitchControl 
            name={inputID}
            label={inputLabel}
            boxShadow='bsBoldOrange'
            _focus={{boxShadow: "bsBoldOrange"}}
            _invalid={{boxShadow: "bsBoldRed"}}
            p="1.5rem 2rem"
            color='white'
            borderRadius="0 2rem 0 2rem"
            // m="1.5rem 0"
            switchProps={{
                colorScheme: "purple"
            }}
            labelProps={{color: 'white'}}
            {...rest}
        />
    )
}