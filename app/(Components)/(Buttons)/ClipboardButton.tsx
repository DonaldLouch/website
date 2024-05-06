'use client'

import { BsCopy } from 'react-icons/bs'

import classes from "./Buttons.module.css"
import { Button, CopyButton } from '@mantine/core'
import { Copy01Icon } from '@hugeicons/react-pro'

interface propTypes {
    copyValue: any
    style?: any
    // colour?: string | null | undefined | unknown
    // hoverColour?: string | null | undefined | unknown
    copyText?: string | null | undefined | unknown
    copiedText?: string | null | undefined | unknown
}

export default function ClipboardButton( props: propTypes ) {
    const {copyText, copiedText, copyValue} = props
    const theCopyText = copyText ? copyText : "Copy" as any
    const theCopiedText = copiedText ? copiedText : "Copied" as any
    
    return (<>
        <CopyButton value={copyValue}>
            {({ copied, copy }: any) => (
                <Button 
                    onClick={copy} 
                    leftSection={<Copy01Icon />}
                    aria-label={!copied ? theCopyText : theCopiedText}
                    color="black" 
                    variant="filled" 
                    size="lg"
                    classNames={{root: classes.primaryButton}}
                >{!copied ? theCopyText : theCopiedText}</Button>
            )} 
        </CopyButton>
    </>)
}
