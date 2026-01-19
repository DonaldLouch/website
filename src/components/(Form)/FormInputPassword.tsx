import { Grid, Title, Text, Input, Anchor, PasswordInput, Box } from '@mantine/core'
// import { BsAsterisk } from 'react-icons/bs'

// interface FormProps {
//     inputID: string
//     inputLabel: string
//     inputType?: any|undefined|null
//     inputDescription?: string|any
// }

import classes from "./Forms.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InlineLink from '../InlineLink'

export default function FormInputPassword( props: any) {
    const { inputID, inputLabel, inputType, inputDescription, isRequired, formProps, isFieldDisabled, forgotPasswordOption, ...rest } = props
    

    // const isInputRequiredLabel = !inputDescription && isRequired || inputDescription && isRequired

    const theInputType = inputType ? inputType : "text"
    // TODO: Fix labels and widths
    return (<>
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
                    <PasswordInput 
                        id={inputID || "password"}
                        styles={{
                            input: { margin: "0.5rem -0.5rem" },
                            innerInput: {padding: "1rem 4rem"}, 
                            section: {marginLeft: "-0.5rem", borderRight: "solid 0.2px grey"},
                            // innerInput
                        }}    
                        classNames={{input: classes.defaultInput}} 
                        leftSection={<FontAwesomeIcon icon={["fal", "lock"]} />} 
                        name={inputID} 
                        type={theInputType} 
                        disabled={isFieldDisabled} 
                        c={isFieldDisabled ? "primary" : "white"} 
                        w="calc(100% + 1rem)" 
                        {...rest} 
                    />
                </Input.Wrapper>
                {forgotPasswordOption &&
                    <Box component="span"><InlineLink link="#" body="Forgot your password?" leftIcon={{name: "user-lock", pack: "fal"}} isInternal /></Box>
                }
            </Grid.Col>
         </Grid>
    </>)
}