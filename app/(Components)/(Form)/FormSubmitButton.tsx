import { Button } from "@mantine/core";
import { BsSend } from "react-icons/bs";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { SentIcon } from "@hugeicons/react-pro";

export default function FormSubmitButton({icon, children}: any) {
    const theIcon = icon ? icon : <SentIcon />
  return <Button
    leftSection={theIcon} 
    color="black" 
    fullWidth
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    type="submit"
    m="2rem 1rem"
  >
    {children}
  </Button>
}
