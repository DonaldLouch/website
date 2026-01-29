import { Code, Title, Stack, Textarea } from '@mantine/core'
// import { BsAsterisk } from 'react-icons/bs'

// interface FormProps {
//     inputID: string
//     inputLabel: string
//     textRows: number
//     helperText?: any
// }

import classes from "./Forms.module.css"

export default function FormTextArea( props: any) {
    const { inputID, inputLabel, textRows, helperText, isRequired, ...rest } = props
    
    return (
        <Stack w="100%" my="1rem">
            <Title size="1.5rem">{inputLabel}</Title>
            <Code p="1rem" color="var(--blackRGBA)" hidden={!helperText} c="white">{helperText}</Code>
            <Textarea
                    mt="-0.5rem"
                    withAsterisk={isRequired}
                    // classNames={{input: classes.defaultInput}}
                    styles={{
                        root: {width: "100%"},
                        label: {
                            fontSize: "1.5rem",
                            fontFamily: "heading",
                        },
                        error: {
                            fontSize: "0.8rem",
                            margin: "0 0 0.5rem",
                            color: "var(--mantine-color-red-7)"
                        },
                        input: {
                            padding: "1rem 1.5rem", 
                            margin: "0.5rem 0 0",
                            width: "100%",
                            background: "none",
                            lineHeight: "1",
                            fontSize: "1.3rem",
                        }
                    }}
                    rows={textRows ? textRows : 5}
                    // styles={{input: {padding: "1rem 1.5rem", margin: "0.5rem -0.5rem"}}}
                    classNames={{input: classes.defaultInput}}
                    name={inputID} 
                    unstyled
                    {...rest}
             />
        </Stack>
    )
}