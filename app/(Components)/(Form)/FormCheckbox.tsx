import { Grid, Title, Stack, Text, Input, Checkbox, CheckboxProps } from '@mantine/core'

// interface FormProps {
//     inputID: string
//     inputLabel: string
//     inputType?: any|undefined|null
//     inputDescription?: string|any
// }

import classes from "./Forms.module.css"
import { CheckListIcon, TaskDone01Icon, Tick01Icon } from '@hugeicons/react'

export default function FormCheckbox( props: any) {
    const { inputID, inputLabel, isRequired, formProps, isFieldDisabled, colour, ...rest } = props
    const theColour = colour ? colour : "primary"
    const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) => indeterminate ? <CheckListIcon color="currentcolor !important" {...others} /> : <TaskDone01Icon color="currentcolor !important" {...others} />
    
    return <Checkbox label={inputLabel} color={theColour} variant="filled" styles={{label: {fontSize: "1.1rem"}}} icon={CheckboxIcon} size="1.5rem" classNames={{input: classes.checkColour, root: classes.checkLabel}} {...rest} iconColor="white !important" />
}