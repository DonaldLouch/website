import { Button } from "@mantine/core";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import HugeIcon from "../HugeIcon";

export default function FormSubmitButton({icon, isNotFull, children}: any) {
    const theIcon = icon ? icon : <HugeIcon name="sent" />
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
