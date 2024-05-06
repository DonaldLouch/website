import { MdxContent } from '@/app/mdx-content'
import PostContent from '@/app/(Root)/(Blog)/post/(Components)/PostContent'
import { Box, Button, Drawer } from '@mantine/core'
import React from 'react'
import { useDisclosure } from '@mantine/hooks';

export default function FullDescription({ mdxSource, videoTitle }: { mdxSource: any, videoTitle: string }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (<>
        <Button onClick={open} fullWidth color="primary">View Full Description</Button>
        <Drawer size="full" opened={opened} onClose={close} title={`View Full Description for "${videoTitle}"`} 
            overlayProps={{
            backgroundOpacity: 0.5, 
            blur: 4,
            }}
            offset="2rem"
            radius="0 0 0 2rem"
            position="top"
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
        >
            <Box style={{whiteSpace: "break-spaces"}} p="1rem" mb="1rem">
                <MdxContent source={mdxSource} />
            </Box>
        </Drawer> 
    </>)
}
