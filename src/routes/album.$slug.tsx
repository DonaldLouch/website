import { useEffect, useRef, useState } from 'react'

import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'
import { GetAlbum, GetAllAlbumPhotos, GetFilteredPhotosCount } from '@/actions/database/GetDatabase.server'
import { GetMarkdown } from '@/actions/markdown.server'

import { 
Box,
Flex,
Tooltip,
Drawer,
Stack,
Text,
ActionIcon,
Paper,
Group,
Loader,
Title,
Anchor,
Badge
} from '@mantine/core'

import Masonry from 'react-masonry-css'

import DisplayDate from '@/lib/DisplayDate'
import { useInView } from 'react-intersection-observer'
import { useDisclosure } from '@mantine/hooks'

import { BreadCrumbPublic } from '@/components/BreadCrumbsComponentPublic'
import ViewPhotoFeed from '@/components/feed/photo/ViewPhotoFeed'
import LinkBadge from '@/components/LinkBadge'
import InlineLink from '@/components/InlineLink'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Markdown } from '@/components/markdown'
import FeedLoader from '@/components/feed/FeedLoader'

export const Route = createFileRoute('/album/$slug')({
  component: RouteComponent,
  loader:  async ({ params }) => {
    const postLimit = 20
    const { slug } = params as any
    const album = await GetAlbum({ data: {slug} }) as any
    const albumCaption = await GetMarkdown({ data: { content: album.albumCaption } })
    const photos = await GetAllAlbumPhotos({ data: { id: album.id, postLimit } }) as any

    let locations = new Array()
    let tags = new Array()
    photos.forEach((photo: {tags: any, location: string}) => {
        const photoTags = photo.tags
        const photoLocation = photo.location
        
        photoTags.forEach((tag: any) => {
            !tags.includes(tag) && tags.push(tag)
        })
        !locations.includes(photoLocation) && locations.push(photoLocation)
    })

    return { 
      album,
      photos,
      albumCaption,
      locations,
      tags,
      photoLimit: postLimit,
      photosCount: await GetFilteredPhotosCount({ data: { searchType: "album", keyword: album.id } }),
      isUser: await UserLoggedInCheck(),
      isAdmin: await AdminAccessCheck()
    }
  },

  head: ({ loaderData }) => ({
    meta: [
      ...seo({
        title: `${loaderData?.album?.albumName} | ${import.meta.env.VITE_WEBSITE_NAME}`,
        description: loaderData?.album?.albumCaption || "No description at this time",
        keywords: `${import.meta.env.VITE_KEYWORDS}, ${loaderData?.tags}`,
        image: loaderData?.photos[0]?.PhotographyMedia?.filePath!
      }),
    ]
  })
})

async function fetchPhotos(nextPage: number, photoLimit: number, photosCount: number, id: string) {
    const from = nextPage * photoLimit
    const to = Math.min(from + photoLimit - 1, photosCount) 
    
    const data = GetAllAlbumPhotos({data: {id, from, to}}) 

    return data
}

function RouteComponent() {
  const { album, photos, albumCaption, locations, tags, photosCount, isUser, isAdmin, photoLimit } = Route.useLoaderData()

  const [opened, { open, close }] = useDisclosure(false);

  const [loadedPhotos, setLoadedPhotos] = useState(photos)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(photoLimit >= photosCount ? true : false)

  const [ref, inView] = useInView()

  async function loadMorePhotos() {
  if (!isLastPage) {
    const nextPage = page + 1
    const newPhotos = await fetchPhotos(nextPage, photoLimit, photosCount, album.id)
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

  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    800: 3,
  }

  const breadCrumbs = [
    {"pageLink": "/feed/photography", "pageName": "Photography Feed"},
    {"pageLink": `/album/${album.slug}`, "pageName": `View Album: ${album.albumName}`}
  ]

  return <Box id="feed" pos="relative" w="100%">
    <BreadCrumbPublic breads={breadCrumbs} />
    <Tooltip label="Album Information">
      <ActionIcon variant="filled" aria-label="Filter" color="black"
        pos="fixed"
        bottom={{ base: "1.4%", md: "2%" }}
        right={{ base: "4%", md: "1.5%" }}
        onClick={open}
      >
        <FontAwesomeIcon icon={["fadl", "info-circle"]} size="xl" />
      </ActionIcon>
    </Tooltip>
    <Drawer size="full" opened={opened} onClose={close} title={album.albumName} 
      overlayProps={{
        backgroundOpacity: 0.5, 
        blur: 4,
      }}
      offset="2rem"
      radius="lg"
      position="top"
      styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
    >      
    <Group gap="0.8rem" my="1rem">
      <Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} />}>
        <DisplayDate source={album.uploadedOn} />
      </Badge>
      {locations.map((location: any) => (
        <Anchor href={`/feed/photography?search=location&value=${location}`} style={{color: "currentColor"}} key={`location_${location}`}><Badge color="blue" leftSection={<FontAwesomeIcon icon={["fadl", "map-marker-smile"]} />}>
          {location}
        </Badge></Anchor>
      ))}
      <Badge color="teal" leftSection={<FontAwesomeIcon icon={["fadl", "hashtag"]} />}>
        Contains {photosCount} Photos
      </Badge>
      {album.links?.length > 0 && album.links.map((link: any, index: number) => (
        <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
      ))}
    </Group>
    <Markdown source={albumCaption} />
    <Group gap="0.5rem" m="2rem 1rem 1rem">
      <FontAwesomeIcon icon={["fadl", "tags"]} />
      {tags.map((tag: any) => (<Anchor key={`tag_${tag}`} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
        <Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} />}>
          {tag}
        </Badge>
      </Anchor> ))}
    </Group>
    </Drawer>
    <Flex 
      component={Masonry}
      breakpointCols={breakpointColumnsObj}
      m={{base: "0rem -1rem 2rem", sm: "1rem -5rem 1rem"}} 
      p="1rem 1rem 1rem"
      gap="0.5rem"
    >
      {loadedPhotos?.map((photo: any, index: number) => (<ViewPhotoFeed photo={photo} key={index} hideElement="album" />))}
    </Flex>
    <FeedLoader ref={ref} isLastPage={isLastPage} loaderTitle="Loading More Photos" />
  </Box>
}
