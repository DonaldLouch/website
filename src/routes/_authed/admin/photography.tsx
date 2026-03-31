import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.functions'

import { Box, Text, Image, SimpleGrid } from '@mantine/core'
import { BlogData, GetFilteredBlogPosts, GetFilteredPhotography, PhotoData } from '@/actions/database/GetDatabase.functions'
import { BreadCrumb } from '@/components/BreadCrumbsComponent'
import FileUploader from '@/components/media/FileUploader'
import { MediaCard } from '@/components/media/MediaCard'
import PrimaryLinkedButton from '@/components/buttons/PrimaryLinkedButton'
import { SectionTitle } from '@/components/SectionTitle'
import Pagination from '@/components/pagination'

export const Route = createFileRoute('/_authed/admin/photography')({
    component: RouteComponent,
    loaderDeps: ({ search: { pg }}: any) => ({ pg }),
    loader:  async ({ deps: { pg } }) => {
        let page = parseInt(pg) as number
        let currentPage = (((page) - 1) as number) || 0

        // const navigate = useNavigate()

        const contentLimit = 15 as number
        const postCount =  await GetFilteredPhotography({ data: { action: "count" , type: "admin"} }) as any
            
        const numberOfPages = (Math.floor(postCount / contentLimit) + 1) as number

        if (numberOfPages < page) {
            currentPage = numberOfPages
        }
        
        const contentStart = currentPage * contentLimit

        const pagination = new Array()
        pagination.push(numberOfPages, currentPage)
        const photos = await GetFilteredPhotography({ data: {action: "data", contentStart, contentLimit, type: "admin" } }) as any

        const isUser = await UserLoggedInCheck()
        const isAdmin = await AdminAccessCheck()

        // isAdmin && navigate({ to: "/auth", search: { message: "NoAccess" } })

        return {
            photos,
        
            postCount,
            pagination,
            isUser,
            isAdmin
        }
    },

    // head: ({ loaderData }) => ({
    head: () => ({
        meta: [
            ...seo({
                title: `Photography Manager | ${import.meta.env.VITE_WEBSITE_NAME}`,
            }),
        ]
    })
})

function RouteComponent() {
    const { photos, pagination } = Route.useLoaderData()

    const breadCrumbs = [
        {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
    ]
    return <>
        <BreadCrumb breads={breadCrumbs} /> 
        <SimpleGrid cols={2} spacing="2rem" mt="2rem">
            <PrimaryLinkedButton link={{ to: "/admin/albums" }} icon={{name: "images", pack: "fal"}} isFullWidth={false}>Album Manager</PrimaryLinkedButton>
            <PrimaryLinkedButton link={{ to: "/admin/batchEdit" }} icon={{name: "light-images-pen", pack: "fak"}} isFullWidth={false}>Batch Edit</PrimaryLinkedButton>
        </SimpleGrid>
        <Box component="main" color="white">
            <Box m="2rem 5rem 0rem"><FileUploader mediaType={"photography"} uploadTitle="Upload Photo(s)" helperText="For the best photography experience across all devices and browsers, the file format .jpg/jpeg or .png is highly recommended for the photo file. You can drag and drop or click to upload the photo(s)." /></Box>

            <Box px="2rem" color="white" m="2rem 0">
                <SectionTitle headingTitle="Uploaded Media" />
            <Box my="2rem"></Box>
                {photos?.map((media: any) => ( <Box key={media?.PhotographyMedia?.fileID}><MediaCard media={media} /></Box> ))} 
            </Box>
            <Pagination {...pagination} />
        </Box> 
    </>
}