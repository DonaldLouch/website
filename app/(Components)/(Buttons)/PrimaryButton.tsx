import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"

export default function PrimaryButton({isHidden, icon, isFullWidth, children, ...rest}: any) {
  // const { isHidden, icon, isFullWidth, children, ...rest } = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    leftSection={icon} 
    color="black" 
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    {...rest}
  >
    {children}
  </Button>
}
