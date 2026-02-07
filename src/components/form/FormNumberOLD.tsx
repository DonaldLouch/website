import { Grid, Input, NumberInput, Text, Title } from '@mantine/core'

import classes from "./Forms.module.css"

export default function FormNumberOLD( props: any) {
      const { inputID, inputLabel, inputDescription, isRequired, icon, formProps, isFieldDisabled, suffix, ...rest  } = props
    
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
                    <NumberInput 
                        name={inputID}
                        // label={inputLabel}
                        // numberInputProps={{
                        //     variant: "unstyled",
                        //     boxShadow: "bsBoldWhite",
                        //     _focus: {boxShadow: "bsBoldSecondary"},
                        //     _invalid: {boxShadow: "bsBoldRed"},
                        //     p: "1.5rem 2rem",
                        //     color: "white",
                        //     borderRadius: "0 2rem 0 2rem",
                        // }}
                        suffix={suffix ? suffix : null}

                        // decimalScale={2} fixedDecimalScale

                        
                        styles={{
                            input: {padding: !icon ? "1rem 1.5rem" : "1.5rem 4rem", margin: "0.5rem -0.5rem", fontSize: "1.1rem"}, 
                            section: {marginLeft: "0rem", borderRight: "solid 0.2px grey"},
                            controls: {marginLeft: "-3rem", borderLeftColor: "var(--darkPurple)", borderRadius: "var(--mantine-radius-md)"},
                            control: {color: "var(--mantine-color-white)"}
                        }}
                            classNames={{input: classes.defaultInput, control: classes.dateInput}} 
                            leftSection={icon && icon} 
                            disabled={isFieldDisabled} 
                            c={isFieldDisabled ? "primary" : "white"} 
                            w="100%" {...rest}
                    />
                </Input.Wrapper>
            </Grid.Col>
        </Grid>
    )
}