import { SwitchControl } from 'formik-chakra-ui'
import { Text, Stack } from '@chakra-ui/react'
interface FormProps {
    inputID: string
    helperText?: string
}

export const FormSwitch = ( props: FormProps) => {
    const { inputID, helperText } = props
    
    return (
        <Stack 
            direction="row"
            boxShadow='bsBoldPrimary'
            _focus={{boxShadow: "bsBoldSecondary"}}
            p="1.5rem 2rem"
            color='white'
            borderRadius="0 2rem"
            // m="1.5rem 0"
            alignItems="center"
            w="100%"
            h="auto"
        >
            <SwitchControl 
                name={inputID}
                switchProps={{colorScheme: "purple"}}
                labelProps={{color: 'white'}}
            />
            <Text>
                {helperText}
            </Text>
        </Stack>
    )
}