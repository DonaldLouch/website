import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PrimaryButton({isHidden, icon, isFullWidth, children, colour, fontColour, action, primNewIcon, ...rest}: any) {
  // const { isHidden, icon, isFullWidth, children, colour, action} = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    leftSection={
      primNewIcon
        ? <FontAwesomeIcon icon={[primNewIcon.pack || "far", primNewIcon.name]} size="1x" />
        : icon
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
