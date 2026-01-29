// "use client"

import { AspectRatio, CopyButton, Stack, Title, Text, Tooltip } from '@mantine/core'

interface propTypes {
    colourTitle: string
    colourHex: string
    colourAmount: number
}

export default function CopyColourSwatch( props: propTypes ) {
    const { colourTitle, colourHex} = props
    
    return (<>
        <CopyButton value={colourHex}>
            {({ copied, copy }: any) => (
                <Tooltip label="Click to copy colour swatch">
                    <AspectRatio ratio={1/1} bg={copied ? "none" : colourHex} p="1rem" onClick={copy} style={{ boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }}>
                        <Stack justify="center" align="center">
                            <Title order={3} fz="1.1rem" style={{ whiteSpace: "nowrap" }} ff="text" fw="900" c={copied && colourTitle != "Mirage"  ? colourHex : colourTitle === "Equator" || colourTitle === "Puttuy" || colourTitle === "White Sand" ? "black" : "white"}>{copied ? "Copied" : colourTitle}</Title>
                            <Text lh="0" p="0" m="0" fz="1.1rem" c={copied && colourTitle != "Mirage"  ? colourHex : colourTitle === "Equator" || colourTitle === "Puttuy" || colourTitle === "White Sand" ? "black" : "white"}>{colourHex}</Text>
                        </Stack>
                    </AspectRatio>
                </Tooltip>
            )}
        </CopyButton>
    </>)
}
