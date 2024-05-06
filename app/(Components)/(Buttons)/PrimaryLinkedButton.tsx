import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"

interface ButtonProps {
  isHidden?: boolean
  link: string
  icon?: any
  children: React.ReactNode
  isFullWidth?: boolean
}

export default function PrimaryLinkedButton(props : ButtonProps) {
  const { isHidden, link, icon, isFullWidth, children } = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    component="a" 
    href={link} 
    leftSection={icon} 
    color="black" 
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
  >
    {children}
  </Button>
}
