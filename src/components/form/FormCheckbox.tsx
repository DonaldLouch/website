import { Checkbox, CheckboxProps } from '@mantine/core'

import classes from "./Forms.module.css"
import HugeIcon from '../HugeIcon'

export default function FormCheckbox( props: any) {
    const { inputID, inputLabel, isRequired, formProps, isFieldDisabled, colour, ...rest } = props
    const theColour = colour ? colour : "primary"
    const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) => indeterminate ? <HugeIcon name="check-list" color='currentcolor !important' {...others} /> : <HugeIcon name="task-done-01" color='currentcolor !important' {...others} />
    
    return <Checkbox label={inputLabel} color={theColour} variant="filled" styles={{label: {fontSize: "1.1rem"}}} icon={CheckboxIcon} size="1.5rem" classNames={{input: classes.checkColour, root: classes.checkLabel}} {...rest} iconColor="white !important" />
}