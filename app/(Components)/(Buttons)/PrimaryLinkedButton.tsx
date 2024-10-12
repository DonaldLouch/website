import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"

interface ButtonProps {
  isHidden?: boolean
  link: string
  icon?: any
  children: React.ReactNode
  isFullWidth?: boolean
  colour?: string
  fontColour?: string
}

export default function PrimaryLinkedButton(props : ButtonProps) {
  const { isHidden, link, icon, isFullWidth, children, colour, fontColour } = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    component="a" 
    href={link} 
    leftSection={icon} 
    color={colour ? colour : "black"}
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    c={fontColour ? fontColour : "white"}
  >
    {children}
  </Button>
}
