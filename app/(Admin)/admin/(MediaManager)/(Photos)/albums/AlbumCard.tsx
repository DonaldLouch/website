'use client'

import { 
    Anchor,
    Box,
    Text,
} from '@mantine/core'

import classes from "@/app/(Components)/Components.module.css"

export const AlbumCard = ({ albumData }: any) => {
    const { id, albumName } = albumData
    
    return <Anchor href={`/admin/albums/${id}`} underline="never">
        <Box c="white" className={classes.videoThumbnail}>
            <Text my="2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="2rem">{albumName}</Text>
        </Box>
    </Anchor> 
}