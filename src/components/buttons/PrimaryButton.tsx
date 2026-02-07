import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Icons } from "@/lib/FontAwesome"

type PrimaryButtonProps = {
  isHidden?: boolean;
  isFullWidth?: boolean;
  children?: React.ReactNode;
  colour?: string;
  fontColour?: string;
  action?: any;
  icon?: Icons|any;
  [key: string]: any;
}

export default function PrimaryButton({isHidden, icon, isFullWidth, children, colour, fontColour, action, ...rest}: PrimaryButtonProps) {
  // const { isHidden, icon, isFullWidth, children, colour, action} = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    leftSection={
      icon
        ? <FontAwesomeIcon icon={[icon.pack || "fal", icon.name]} size="1x" />
        : null
    }
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
