import { useColorModeValue } from '@chakra-ui/react'
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
            boxShadow="bsBoldWhite"
            _focus={{boxShadow: "bsBoldOrange"}}
            _invalid={{boxShadow: "bsBoldRed"}}
            color={useColorModeValue("black", "white")}
            borderRadius="0 2rem 0 2rem"
            border="none"
            p="1.5rem"
            m="2rem 0 0.5rem !important"
            labelProps={{color: useColorModeValue('primary', 'white')}}
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