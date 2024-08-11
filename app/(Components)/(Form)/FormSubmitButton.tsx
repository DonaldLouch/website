import { Button } from "@mantine/core";
// import { BsSend } from "react-icons/bs";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { SentIcon } from "@hugeicons/react";

export default function FormSubmitButton({icon, isNotFull, children}: any) {
    const theIcon = icon ? icon : <SentIcon />
  return <Button
    leftSection={theIcon} 
    color="black" 
    fullWidth={isNotFull ? false : true}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    type="submit"
    m="2rem 1rem"
  >
    {children}
  </Button>
}
