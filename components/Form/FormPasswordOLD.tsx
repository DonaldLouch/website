// import {
//   Box,
//   Flex,
//   FormControl,
//   FormLabel,
//   IconButton,
//   Input,
//   InputGroup,
//   InputProps,
//   InputRightElement,
//   useDisclosure,
//   useMergeRefs,
//   useColorModeValue as mode,
// } from '@chakra-ui/react'
// import * as React from 'react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../../config/fontAwesome";

// //import { HiEye, HiEyeOff } from 'react-icons/hi'

// export const FormPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
//   const { isOpen, onToggle } = useDisclosure()
//   const inputRef = React.useRef<HTMLInputElement>(null)

//   const mergeRef = useMergeRefs(inputRef, ref)

//   const onClickReveal = () => {
//     onToggle()
//     const input = inputRef.current
//     if (input) {
//       input.focus({ preventScroll: true })
//       const length = input.value.length * 2
//       requestAnimationFrame(() => {
//         input.setSelectionRange(length, length)
//       })
//     }
//   }

//   return (
//     <FormControl id="password">
//       <Flex justify="space-between">
//         <FormLabel>Password</FormLabel>
//         <Box as="a" color={mode('blue.600', 'blue.200')} fontWeight="semi bold" fontSize="sm">
//           Forgot Password?
//         </Box>
//       </Flex>
//       <InputGroup>
//         <InputRightElement>
//           <IconButton
//             bg="transparent !important"
//             variant="ghost"
//             aria-label={isOpen ? 'Mask password' : 'Reveal password'}
//             icon={isOpen ? <FontAwesomeIcon icon={['far', 'eye-slash']} /> : <FontAwesomeIcon icon={['far', 'eye']} />}
//             onClick={onClickReveal}
//           />
//         </InputRightElement>
        
//         <Input
//           //ref={mergeRef}
//           name="password"
//           type={isOpen ? 'text' : 'password'}
//           autoComplete="current-password"
//           required
//           {...props}
//         />
//       </InputGroup>
//     </FormControl>
//   )
// })

// //PasswordField.displayName = 'PasswordField'

import { InputControl } from 'formik-chakra-ui'

interface FormProps {
    inputID: string
    inputLabel: string
    inputType: any|undefined|null
    //children: React.ReactNode
}

//import React, { useState } from "react"

export const FormInput = ( props: FormProps) => {
    const { inputID, inputLabel, inputType } = props
    
    let theInputType = "text"
    if (inputType != undefined) {
        theInputType = inputType
    }
    
    return (
        <InputControl 
            name={inputID}
            label={inputLabel}
            inputProps={{
                variant: "unstyled",
                boxShadow: "bsBoldWhite",
                _focus: {boxShadow: "bsBoldOrange"},
                _invalid: {boxShadow: "bsBoldRed"},
                p: "1.5rem 2rem",
                color: "white",
                borderRadius: "0 2rem 0 2rem",
                type: theInputType
            }}
        />
    )
}