import { SelectControl } from 'formik-chakra-ui'
import { Heading, useColorModeValue } from '@chakra-ui/react'

interface FormProps {
    selectID: string
    selectPlaceholder: string
    selectLabel: string
   children: React.ReactNode
}

//import React, { useState } from "react"

export const FormSelect = ( props: FormProps) => {
    const { selectID, selectPlaceholder, selectLabel, children } = props
    return (
        <>
            <Heading as="label" fontSize="1.5rem" textAlign="left" color={useColorModeValue('primary', 'white')}>{selectLabel}</Heading>
            <SelectControl
                name={selectID}
                selectProps={{ 
                    placeholder: selectPlaceholder, 
                    boxShadow: useColorModeValue('bsBoldBlue', 'bsBoldWhite'),
                    _focus: {boxShadow: "bsBoldOrange"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    color: useColorModeValue('black', 'white'),
                    borderRadius: "0 2rem 0 2rem",
                    border: "none",
                    size: "lg",
                    h: "4.5rem",
                }}
            >
            { children }
            </SelectControl>
        </>
    )
}