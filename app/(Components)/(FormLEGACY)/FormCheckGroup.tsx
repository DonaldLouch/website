import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui'

interface FormProps {
    checkGroupID: string
    checkGroupLabel: string
    checkGroupArray: any
}

//import React, { useState } from "react"

export const FormCheckGroup = ( props: FormProps) => {
    const { checkGroupID, checkGroupArray, checkGroupLabel } = props
    
    return (
        <CheckboxContainer 
            name={checkGroupID}
            label={checkGroupLabel}
            boxShadow="bsBoldSecondary"
            _focus={{boxShadow: "bsBoldSecondary"}}
            _invalid={{boxShadow: "bsBoldRed"}}
            color="white"
            borderRadius="0 2rem"
            border="none"
            p="1.5rem"
            m="2rem 0 0.5rem !important"
            labelProps={{color: 'white'}}
        >
            {checkGroupArray.map(function(d:any, idx:number){
                return (
                    <CheckboxControl name={checkGroupID} value={d.checkValue} key={idx} colorScheme="purple">
                        {d.checkLabel}
                    </CheckboxControl>
                )
            })}
        </CheckboxContainer>
    )
}