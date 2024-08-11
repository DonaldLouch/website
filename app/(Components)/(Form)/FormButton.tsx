import { Button } from "@mantine/core";
// import { BsSend } from "react-icons/bs";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { SentIcon } from "@hugeicons/react";

export default function FormButton({icon, children, ...rest}: any) {
    const theIcon = icon ? icon : null
  return <Button
    leftSection={theIcon} 
    color="black" 
    fullWidth
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    // m="2rem 1rem"
    {...rest}
  >
    {children}
  </Button>
}
