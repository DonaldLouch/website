import { Switch } from '@mantine/core'

export const FormSwitch = ({ inputID, helperText, ...rest }: any) => {
    // const { inputID, helperText } = props
    
    return <Switch 
        name={inputID}
        label={helperText}
        color="var(--primary)"
        p="1.5rem 2rem"
        m="1.5rem 0.5rem"
        styles={{
            root: {
                boxShadow: "var(--mantine-shadow-bsBoldSecondary)",
                borderRadius: "var(--mantine-radius-md)"
            },
            label: {fontSize: "1.2rem"}
        }}
        {...rest}
    />
}