import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType: any|undefined|null
    //children: React.ReactNode
}

//import React, { useState } from "react"

export const FormInputReadOnly = ( props: FormProps) => {
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
                boxShadow: "bsOrange",
                // _focus: {boxShadow: "bsBoldOrange"},
                // _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: "yellow",
                borderRadius: "0 2rem 0 2rem",
                type: theInputType,
            }}
            isReadOnly
        />
    )
}