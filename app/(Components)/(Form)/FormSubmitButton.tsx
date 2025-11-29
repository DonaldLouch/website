import { Button } from "@mantine/core";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormSubmitButton({icon, isNotFull, children, customWidth, ...rest}: any) {
    const theIcon = icon ? icon : <FontAwesomeIcon icon={["fajdr", "paper-plane"]} />;
  return <Button
    leftSection={theIcon} 
    color="black" 
    fullWidth={isNotFull ? false : true}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    type="submit"
    m="2rem 1rem"
    w={customWidth || "auto"}
    {...rest}
  >
    {children}
  </Button>
}
