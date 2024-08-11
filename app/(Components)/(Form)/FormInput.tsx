import { Grid, Title, Stack, Text, Input } from '@mantine/core'
// import { BsAsterisk } from 'react-icons/bs'
// import { InputControl } from 'formik-chakra-ui'

// interface FormProps {
//     inputID: string
//     inputLabel: string
//     inputType?: any|undefined|null
//     inputDescription?: string|any
// }

import classes from "./Forms.module.css"

export default function FormInput( props: any) {
    const { inputID, inputLabel, inputType, inputDescription, isRequired, icon, formProps, isFieldDisabled, ...rest } = props
    

    // const isInputRequiredLabel = !inputDescription && isRequired || inputDescription && isRequired

    const theInputType = inputType ? inputType : "text"
    // TODO: Fix labels and widths
    return (
        <Grid gutter="1rem">
            <Grid.Col span={3} hidden={!inputDescription} visibleFrom="sm">
                <Title size="1.5rem" style={{borderBottom:"solid 0.2px", borderBottomColor: "var(--mantine-primary-0)"}} pb="0.5rem">{inputLabel}</Title>
                <Text fz="0.9rem" opacity="0.7" lh="sm" mt="0.5rem" c="grey">{inputDescription}</Text>
            </Grid.Col>
            <Grid.Col span={inputDescription ? {base: 12, sm: 9} : 12}>
                <Input.Wrapper
                    withAsterisk={isRequired}
                    label={inputLabel}
                    labelProps={{
                        hiddenFrom: inputDescription && "sm",
                    }}
                    mt="0.5rem"
                    // w="100%"
                    // classNames={{input: classes.defaultInput}}
                    styles={{
                        root: {width: "100%"},
                        label: {
                            fontSize: "calc(1.5rem * var(--mantine-scale))",
                            fontFamily: "heading",
                            fontWeight: "700",
                            lineHeight: "3rem"
                        },
                        error: {
                            fontSize: "0.8rem",
                            margin: "0 0 0.5rem",
                            color: "var(--mantine-color-red-7)"
                        }
                    }}
                    unstyled
                    {...rest}
                >
                    <Input styles={{input: {padding: !icon ? "1rem 1.5rem" : "1rem 4rem", margin: "0.5rem -0.5rem"}, section: {marginLeft: "-0.5rem", borderRight: "solid 0.2px grey"}}} classNames={{input: classes.defaultInput}} leftSection={icon && icon} name={inputID} type={theInputType} disabled={isFieldDisabled} c={isFieldDisabled ? "primary" : "white"} w="100%" {...rest} />
                </Input.Wrapper>
            </Grid.Col>
         </Grid>
    )
}