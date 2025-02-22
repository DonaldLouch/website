import { Code, Select, Stack, Title } from "@mantine/core"

import classes from "@/app/(Components)/Components.module.css"

export const FormSelect = ({inputID, inputData, inputLabel, inputHelperText, ...rest}: any) => {
    return <><Stack my="1rem">
        {inputLabel && <Title size="1.5rem">{inputLabel && inputLabel}</Title>}
        <Code p="1rem" color='var(--darkPurple)' hidden={!inputHelperText} c="white">{inputHelperText}</Code>
        <Select
            name={inputID}
            // label="Your favorite library"
            placeholder={inputHelperText}
            data={inputData ? inputData : [{value: "NONE", label: "No data found", disabled: true}]}
            c="white"
            styles={{
                // pill: {background: "var(--darkPurple)", color: "var(--mantine-color-white)", fontWeight: 500, whiteSpace: "nowrap", wordBreak: "keep-all", borderRadius: "var(--mantine-radius-sm)", fontSize: "1rem"},
                dropdown: {background: "var(--mantine-color-black)", color: "var(--mantine-color-white)", border: "none", fontSize: "1.1rem"},
                root: {boxShadow: "var(--mantine-shadow-bsBoldSecondary)", padding: "0.3rem 1rem", borderRadius: "var(--mantine-radius-md)", marginTop: "-0.7rem"},
                input: {color: "var(--mantine-color-white)", fontSize: "1.1rem"},
                option: {fontSize: "1.1rem"}
            }}
            classNames={{
                option: classes.comboboxOption,
                input: classes.selectInput,
                section: classes.selectSection
            }}
            {...rest} 
        />
    </Stack></>
}