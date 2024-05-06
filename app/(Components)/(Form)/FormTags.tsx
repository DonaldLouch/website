'use client'

import { TagsInput, Title, Text, Box, Code, Stack } from "@mantine/core";


import classes from "@/app/(Components)/Components.module.css"

export default  function FormTags({ searchValues, ...rest }: any) {
    const options = new Array()
    searchValues.forEach((option: any) => {
        options.push(option.tag)
    })

    return <Stack my="1rem">
        <Title size="1.5rem">Tags</Title>
        <Code p="1rem" color='var(--darkPurple)' c="white">Pick tag from list or type new tag and hit enter.</Code>
        <TagsInput
            placeholder="More Tags"
            data={options}
            styles={{
                pill: {background: "var(--darkPurple)", color: "var(--mantine-color-white)", fontWeight: 500, whiteSpace: "nowrap", wordBreak: "keep-all", borderRadius: "var(--mantine-radius-sm)", fontSize: "1rem"},
                pillsList: {boxShadow: "var(--mantine-shadow-bsBoldSecondary)", padding: "1.5rem", borderRadius: "var(--mantine-radius-md)"},
                input: {color: "var(--mantine-color-white)"},
                option: {fontSize: "1.1rem"},
                dropdown: {background: "var(--mantine-color-black)", color: "var(--mantine-color-white)", border: "none", fontSize: "1.1rem"},
            }}
            classNames={{
                option: classes.comboboxOption,
            }}
            {...rest}
        />
    </Stack>
}