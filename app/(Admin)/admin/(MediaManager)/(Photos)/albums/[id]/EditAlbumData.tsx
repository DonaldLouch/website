'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Divider, Group, Loader, Paper, SimpleGrid, Stack, Title, Text, Anchor } from "@mantine/core";

import ViewPhotoEditAlbum from "./ViewPhotoEditAlbum";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import supabase from "@/lib/supabase";
import EditAlbumMetadata from "./EditAlbumMetadata";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";

async function fetchPhotos(nextPage: number, photoLimit: number, albumID: string, photosCount: number) {
    const from = nextPage * photoLimit + 1
    const to = Math.min(from + photoLimit - 1, photosCount) 

    const { data } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).range(from, to).order('capturedOn', { ascending: true }).match({ isPublic: true, isSetup: true, album: albumID })

    return data || [] // Ensure an empty array is returned if no data is fetched
}

export default function EditAlbumData({albumData, locations, photoData, photosCount, tagsData}: any) {
    const { id, albumName } = albumData
    const photoLimit = 12 as number
    const [loadedPhotos, setLoadedPhotos] = useState(photoData)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(photoLimit >= photosCount ? true : false)

    const [ref, inView] = useInView()

    async function loadMorePhotos() {
        if (!isLastPage) {
            const nextPage = page + 1
            const newPhotos = await fetchPhotos(nextPage, photoLimit, albumData.id, photosCount)
            setIsLastPage(nextPage === Math.ceil(photosCount / photoLimit) - 1)
            setPage(nextPage)
            setLoadedPhotos((prevPhotos: any) => {
                const combinedPhotos = [...(prevPhotos?.length ? prevPhotos : []), ...newPhotos]
                return Array.from(new Set(combinedPhotos.map((photo: any) => photo.id)))
                    .map((id: any) => combinedPhotos.find((photo: any) => photo.id === id))
            })
        }
    }

    useEffect(() => {
        inView && loadMorePhotos()
    }, [inView])

    const breadCrumbs = [
        {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
        {"pageLink": "/admin/albums", "pageName": "Photography Album Manager"},
        {"pageLink": `/admin/albums/${id}`, "pageName": `Edit Album: ${albumName}`},
    ]

    return (<>
        <BreadCrumb breads={breadCrumbs} />
        <SimpleGrid cols={2} spacing="2rem" mt="2rem">
            <PrimaryLinkedButton link={`/album/${albumData.slug}`} primNewIcon={{name: "eye"}} colour="primary">View Photo Album</PrimaryLinkedButton>
            <EditAlbumMetadata albumData={albumData} /> 
        </SimpleGrid>

        <Divider label="Photos in Album" labelPosition="center" mx="3rem" my="2rem" />

        <SimpleGrid cols={4} spacing="1rem">
            {loadedPhotos.map((photo: any) => (
                <ViewPhotoEditAlbum key={photo.id} locations={locations} tagsData={tagsData} imageData={photo} />
            ))}
        </SimpleGrid>

        <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg">
            <Stack align="center">
            <Group gap="2rem" align="center">
                <Loader color="white" size="md" type="bars" />
                <Title fz={{base: "2rem", md: "3rem"}}>Loading More Photos</Title>
            </Group>
            <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
            </Stack>
        </Paper>
    </>)
}
