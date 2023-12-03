import { Input } from '@chakra-ui/react'
import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel?: string
    inputType?: any|undefined|null
    inputValue?: any|undefined|null
}

export const FormInputReadOnlyNew = ( props: FormProps) => {
    const { inputID, inputLabel, inputType, inputValue } = props
    
    let theInputType = "text"
    if (inputType != undefined) {
        theInputType = inputType
    }
    
    return (

         <Input 
            name={inputID}
            value={inputValue}
            // mt="0.5rem"
            variant="primary"
            // boxShadow='bsBoldRed'
            // p="1.5rem 2rem"
            // color='yellow'
            // borderRadius="0 2rem 0 2rem"
            // type={theInputType}
            // fontStyle="italic"
            // fontWeight="300"
            // isReadOnly
        />
    )
}