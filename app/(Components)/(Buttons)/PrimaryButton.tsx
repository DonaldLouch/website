import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import HugeIcon from "../HugeIcon";


export default function PrimaryButton({isHidden, icon, isFullWidth, children, colour, fontColour, action, primNewIcon, ...rest}: any) {
  // const { isHidden, icon, isFullWidth, children, colour, action} = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    leftSection={primNewIcon ? <HugeIcon name={primNewIcon.name} variant={primNewIcon.variant ? primNewIcon.variant : undefined} /> : icon} 
    color={colour ? colour : "black"}
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    c={fontColour ? fontColour : "white"}
    onClick={action ? action : null}
    {...rest}
  >
    {children}
  </Button>
}
