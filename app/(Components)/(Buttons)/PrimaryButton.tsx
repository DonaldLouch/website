import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import HugeIcon from "../HugeIcon";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PrimaryButton({isHidden, icon, isFullWidth, children, colour, fontColour, action, primNewIcon, ...rest}: any) {
  // const { isHidden, icon, isFullWidth, children, colour, action} = props

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
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
    onClick={action ? action : null}
    {...rest}
  >
    {children}
  </Button>
}
