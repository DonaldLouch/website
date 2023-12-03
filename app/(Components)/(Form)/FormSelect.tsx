import { SelectControl } from 'formik-chakra-ui'
import { Grid, Heading, Stack, Text } from '@chakra-ui/react'

interface FormProps {
    selectID: string
    selectPlaceholder?: string
    selectLabel: string
    children: React.ReactNode
    inputDescription?: string
}

export const FormSelect = ( props: FormProps) => {
    const { selectID, selectPlaceholder, selectLabel, children, inputDescription } = props
    return (
        <Grid gridTemplateColumns="33% 67%" alignItems="flex-start" gap="2rem" w="calc(100% - 2rem)">
            <Stack>
                <Heading size="lg" lineHeight="1" borderBottom="solid" borderBottomColor="primary" pb="0.5rem">{selectLabel}</Heading>
                <Text fontSize="md" opacity="0.7">{inputDescription}</Text>
            </Stack>
            <SelectControl
                name={selectID}
                selectProps={{ 
                    placeholder: selectPlaceholder, 
                    boxShadow: 'bsBoldSecondary',
                    _focus: {boxShadow: "bsBoldPrimary"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    color: 'white',
                    borderRadius: "0 2rem",
                    border: "none",
                    size: "lg",
                    h: "4.5rem",
                }}
            >
            { children }
            </SelectControl>
        </Grid>
    )
}