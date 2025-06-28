import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import HugeIcon, { IconArray } from "../HugeIcon";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface ButtonProps {
  isHidden?: boolean
  link: string
  icon?: any
  children: React.ReactNode
  isFullWidth?: boolean
  colour?: string
  fontColour?: string
  isExternal?: boolean
  primNewIcon?: any
  [key: string]: any
}

// ( formData?: FormData, payload?: S3Payload )

export default function PrimaryLinkedButton({isHidden, link, icon, isFullWidth, children, colour, fontColour, isExternal, primNewIcon,  ...rest}: ButtonProps) {
  // const { isHidden, link, icon, isFullWidth, children, colour, fontColour, isExternal } = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    component="a" 
    href={link} 
    leftSection={
      primNewIcon ?
        <HugeIcon name={primNewIcon.name} size="1.5rem" variant={primNewIcon.variant || undefined} /> 
        : icon
      // primNewIcon ? primNewIcon.variant?.includes("fa")
      //   ? <FontAwesomeIcon icon={[primNewIcon.variant || "far", primNewIcon.name]} size="1x" />
      //   : <HugeIcon name={primNewIcon.name} size="1.5rem" variant={primNewIcon.variant || undefined} /> 
      //   : icon
    }
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
