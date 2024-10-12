import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"

interface ButtonProps {
  isHidden?: boolean
  icon?: any
  children: React.ReactNode
  isFullWidth?: boolean
  colour?: string
  action?: any
}

export default function PrimaryButton({isHidden, icon, isFullWidth, children, colour, action, ...rest}: any) {
  // const { isHidden, icon, isFullWidth, children, colour, action} = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    leftSection={icon} 
    color={colour ? colour : "black"}
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    onClick={action ? action : null}
    {...rest}
  >
    {children}
  </Button>
}
