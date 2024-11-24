import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import HugeIcon, { IconArray } from "../HugeIcon";


interface ButtonProps {
  isHidden?: boolean
  link: string
  icon?: any
  children: React.ReactNode
  isFullWidth?: boolean
  colour?: string
  fontColour?: string
  isExternal?: boolean,
  primNewIcon?: IconArray
  [key: string]: any
}

// ( formData?: FormData, payload?: S3Payload )

export default function PrimaryLinkedButton({isHidden, link, icon, isFullWidth, children, colour, fontColour, isExternal, primNewIcon,  ...rest}: ButtonProps) {
  // const { isHidden, link, icon, isFullWidth, children, colour, fontColour, isExternal } = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    component="a" 
    href={link} 
    leftSection={primNewIcon ? <HugeIcon name={primNewIcon.name} variant={primNewIcon.variant ? primNewIcon.variant : "stroke"} /> : icon} 
    color={colour ? colour : "black"}
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    c={fontColour ? fontColour : "white"}
    target={isExternal ? "_blank" : "_self"}
    {...rest}
  >
    {children}
  </Button>
}
