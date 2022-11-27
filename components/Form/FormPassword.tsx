import {
  //Box,
  //Flex,
  FormControl,
  //FormLabel,
  IconButton,
  //Input,
  //InputGroup,
  //InputProps,
  InputRightElement,
  useDisclosure,
  //useMergeRefs,
  //useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

import { InputControl } from 'formik-chakra-ui'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/fontAwesome";

interface FormProps {
  inputID: string
  inputLabel: string
}

//import { HiEye, HiEyeOff } from 'react-icons/hi'

// eslint-disable-next-line react/display-name
//export const FormPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {

export const FormPassword = ( props: FormProps) => {
  const { inputID, inputLabel } = props
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)

  //const mergeRef = useMergeRefs(inputRef, ref)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current
    if (input) {
      input.focus({ preventScroll: true })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    // <FormControl id="password">
    <>
<FormControl my="2rem">
  <InputRightElement>
    <IconButton
      bg="transparent !important"
      variant="ghost"
      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
      icon={isOpen ? <FontAwesomeIcon icon={['far', 'eye-slash']} /> : <FontAwesomeIcon icon={['far', 'eye']} />}
      onClick={onClickReveal}
      pos="absolute"
    />
  </InputRightElement>
  
  <InputControl
      name={inputID}
      label={inputLabel}
      inputProps={{
        variant: "unstyled",
        boxShadow: "bsBoldWhite",
        _focus: { boxShadow: "bsBoldOrange" },
        _invalid: { boxShadow: "bsBoldRed" },
        p: "1.5rem 2rem",
        color: "white",
        borderRadius: "0 2rem 0 2rem",
        //ref: mergeRef,
        type: isOpen ? 'text' : 'password',
        autoComplete: "current-password",
        pos: "relative"
      }}
  />
</FormControl>
    </>
    // </FormControl>
  )
}

//displayName = 'PasswordField'