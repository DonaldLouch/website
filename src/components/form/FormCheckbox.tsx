import { Checkbox, CheckboxProps } from '@mantine/core'

import classes from "./Forms.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FormCheckbox( props: any) {
    const { inputID, inputLabel, isRequired, formProps, isFieldDisabled, colour, ...rest } = props
    const theColour = colour ? colour : "primary"
    const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) => indeterminate ? <FontAwesomeIcon icon={["fal", "clipboard-list"]} color="currentcolor !important" {...others} /> : <FontAwesomeIcon icon={["fal", "clipboard-check"]} color="currentcolor !important" {...others} />
    
    return <Checkbox label={inputLabel} color={theColour} variant="filled" styles={{label: {fontSize: "1.1rem"}}} icon={CheckboxIcon} size="1.5rem" classNames={{input: classes.checkColour, root: classes.checkLabel}} {...rest} iconColor="white !important" />
}