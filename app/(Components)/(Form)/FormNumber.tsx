import { Grid, Title, Text, Input, NumberInput } from '@mantine/core'
// import { BsAsterisk } from 'react-icons/bs'

// interface FormProps {
//     inputID: string
//     inputLabel: string
//     inputType?: any|undefined|null
//     inputDescription?: string|any
// }

import classes from "./Forms.module.css"
import InlineCode from '../(MarkdownCode)/InlineCode'

interface NumberProps {
    inputID: string
    inputLabel?: string
    inputDescription?: string
    isRequired?: boolean
    icon?: any
    isFieldDisabled?: boolean,
    isRow?: boolean,
    [key: string]: any
}

export default function FormNumber({ inputID, inputLabel, inputDescription, isRequired, icon, isFieldDisabled, isRow, ...rest}: NumberProps ) {
    return <>
        <Grid gutter="1rem">
            <Grid.Col span={3} hidden={!inputDescription || isRow} visibleFrom="sm">
                <Title size="1.5rem" style={{borderBottom:"solid 0.2px", borderBottomColor: "var(--mantine-primary-0)"}} pb="0.5rem">{inputLabel}</Title>
                <Text fz="0.9rem" opacity="0.7" lh="sm" mt="0.5rem" c="grey">{inputDescription}</Text>
            </Grid.Col>
            <Grid.Col span={inputDescription ? {base: 12, sm: 9} : 12}>
                {isRow && inputDescription ? <InlineCode code={inputDescription} ta="center" /> : null}
                <Input.Wrapper
                    withAsterisk={isRequired}
                    label={inputLabel}
                    labelProps={{
                        hiddenFrom: !isRow ||inputDescription && "sm",
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
                >
                    <NumberInput 
                        styles={{
                            input: {
                                padding: !icon ? "4rem 0 4rem 1.5rem" : "1.5rem 0 1.5rem 4rem", 
                                margin: "0.5rem -0.5rem",
                                fontSize: "1rem",
                                fontFamily: "var(--mantine-font-family)"
                            }, 
                            section: {
                                marginLeft: "0.5rem",
                                // marginRight: "0rem",
                                paddingRight: "0.5rem",
                                borderRight: "solid 0.2px grey"
                            },
                            // control: {
                            //     color: "white",
                            //     background: "none",
                            //     marginLeft: "-0.5rem"
                            // }
                        }} 
                        classNames={{input: classes.defaultInput}} 
                        leftSection={icon && icon} 
                        rightSection={icon ? "" : undefined}
                        name={inputID}
                        disabled={isFieldDisabled} 
                        c={isFieldDisabled ? "primary" : "white"}
                        w="100%" 
                        thousandSeparator=","
                        hideControls
                        required={isRequired}
                        {...rest} 
                    />
                </Input.Wrapper>
            </Grid.Col>
         </Grid>
    </>
}