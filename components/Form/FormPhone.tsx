import { useColorModeValue } from '@chakra-ui/react'

import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    //children: React.ReactNode
}

//import React, { useState } from "react"

export const FormPhone = ( props: FormProps) => {
    const { inputID, inputLabel } = props
    
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
                type: "tel",
                pattern: "\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}"
            }}
            labelProps={{color: useColorModeValue('primary', 'white')}}
        />
    )
}