import { DateTimePicker } from '@mantine/dates';

import classes from "./Forms.module.css"
import HugeIcon from '../HugeIcon';

export default function FormDatePicker({dateFormat, dateLabel, datePlaceholder, isClearable, isJustRead, isRequired, ...rest}: any) {
  return <DateTimePicker
        clearable={isClearable}
        // disabled={isJustRead}
        // w="100%"
        valueFormat={dateFormat ? dateFormat : "MMMM DD, YYYY [at] h:mm A"}
        label={dateLabel}
        placeholder={datePlaceholder ? datePlaceholder : "Pick date and time"}
        c="white"
        settings={{ timezone: 'America/Vancouver' }}
        popoverProps={{
            withinPortal: true,
            styles: {
                dropdown: {background: "var(--mantine-color-black)", border: "none", boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}
            }
            // bg: "none"
        }}
        timePickerProps={{
            c: "white",
            styles: {
                input: {color: "var(--mantine-color-white)"},
                dropdown: {
                    background: "var(--mantine-color-black)",
                    color: "var(--mantine-color-white)",
                    outline: "none",
                    border: "none",
                    fontSize: "1.1rem", 
                    boxShadow: "var(--mantine-shadow-bsSMWhite)",
                    padding: "1rem"
                },
            },
            classNames: {control: classes.dateInput},
            format: '12h',
            withDropdown: true,
            popoverProps: {
                position: 'top-start'
            }
        }}
        leftSection={<HugeIcon name="calendar-03" variant="twotone" />}
        leftSectionProps={{
            style: {margin: "0 0.5rem"}
        }}
        styles={{
            levelsGroup: {background: "var(--mantine-color-black)"},
            day: {color: "var(--mantine-color-white)"},
            input: {color: "var(--mantine-color-white)", fontSize: "1.1rem", padding: "1rem 3rem"},
            root: {width: "100%"},
            timeWrapper: {color: "var(--mantine-color-white)"},
            timeInput: {color: "var(--mantine-color-white) !important"},
            label: {
                fontSize: "1.5rem",
                fontFamily: "heading",
                margin: "0.5rem 0"
            },
            monthsListControl: {color: "var(--mantine-color-white)"},
            yearsListControl: {color: "var(--mantine-color-white)"},
            submitButton: {background: "var(--blackRGBA)", border: "none", color: "var(--mantine-color-white)"},
        }}
        classNames={{
            input: classes.defaultInput, 
            day: classes.dateInput,
            calendarHeaderLevel: classes.dateInput,
            monthsListControl: classes.dateInput,
            yearsListControl: classes.dateInput
        }}
        required={isRequired}
        {...rest}
    />
}
