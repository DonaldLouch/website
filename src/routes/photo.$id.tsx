import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server';
import { GetPhoto } from '@/actions/database/GetDatabase.server'
import { GetMarkdown } from '@/actions/markdown.server';

import {
  Stack,
  Title,
  Flex,
  Group,
  Anchor,
  Badge,
  Box,
  Text
} from "@mantine/core";

import ClipboardButton from "@/components/buttons/ClipboardButton";
import PrimaryLinkedButton from "@/components/buttons/PrimaryLinkedButton";
import ViewFullPhoto from "@/components/ViewFullPhoto";
import LinkBadge from "@/components/LinkBadge";

import DisplayDate from "@/lib/DisplayDate";
import { BreadCrumbPublic } from "@/components/BreadCrumbsComponentPublic";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Markdown } from '@/components/markdown';

export const Route = createFileRoute('/photo/$id')({
  component: RouteComponent,
  loader:  async ({ params }) => {
    const { id } = params as any
    const photo = await GetPhoto({ data: {id} }) as any
    const caption = await GetMarkdown({ data: { content: photo.caption } })
    
    return { 
      photo,
      caption,
      isUser: await UserLoggedInCheck(),
      isAdmin: await AdminAccessCheck()
    }
  },

  head: ({ loaderData }) => ({
      meta: [
        ...seo({
          title: `${loaderData?.photo?.photoName} | ${import.meta.env.VITE_WEBSITE_NAME}`,
          description: loaderData?.photo?.caption || "No description at this time",
          keywords: `${import.meta.env.VITE_KEYWORDS}, ${loaderData?.photo?.tags}`,
          image: loaderData?.photo?.PhotographyMedia?.filePath!
        }),
      ]
    })
})

function RouteComponent() {
  const { photo: photoData, isUser,  isAdmin, caption} = Route.useLoaderData()
  const  albumData = photoData?.PhotographyAlbum
  const photoMedia = photoData?.PhotographyMedia

  const breadCrumbs = [
    {"pageLink": "/feed/photography", "pageName": "Photography Feed"},
    {"pageLink": `/photo/${photoData.id}`, "pageName": `View: ${photoData.photoName}`}
  ]

  return <>
    <BreadCrumbPublic breads={breadCrumbs} />
    <Title order={1} size="3rem" style={{textDecoration: "underline", textDecorationColor: "var(--primary"}} ta="left" c="white">{photoData.photoName}</Title>

    <Flex direction={{base:"column", sm:"row"}} m={{base: "1rem", lg: "1rem 0rem"}} align="space-between" gap="2rem">
      <ViewFullPhoto photoData={photoData} />
      <Stack w={{base: "100%", md: "50%"}}> 
        {isUser && isAdmin &&
          <Group gap="0.5rem">
            <ClipboardButton copyValue={photoData.fileID.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
            <PrimaryLinkedButton link={{ to: "/admin/photography/$id", params: { id: photoData.id } }} icon={{ name: "light-image-pen", pack: "fak" }}>Edit Photo</PrimaryLinkedButton>
            <Badge color="white" leftSection={<FontAwesomeIcon icon={["fal", "hashtag"]} />}>
              {photoData.id}
            </Badge> 
          </Group>
        }
        <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem 2rem" m="0.5rem">
          <Markdown source={caption} />
        </Box>
        <Group gap="0.5rem">
          {photoData.album && <Anchor href={`/album/${albumData.slug}`} style={{color: "currentColor"}}>
            <Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "images"]} />}>
              {albumData.albumName}
            </Badge>
          </Anchor>} 
          {photoData.location && <Anchor href={`/feed/photography?search=location&value=${photoData.location}`} style={{color: "currentColor"}}>
            <Badge color='blue' leftSection={<FontAwesomeIcon icon={["fadl", "map-marker-smile"]} />}>
              {photoData.location}
            </Badge>
          </Anchor>}
        </Group>
        <Badge color="red" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} />}>
          <DisplayDate source={photoData.fileID.capturedOn} />
        </Badge>
        <Group gap="0.5rem">
          {photoData.links.length > 0 && photoData.links.map((link: any, index: number) => (
            <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
          ))}
        </Group>
        <Group gap="0.5rem">
          <FontAwesomeIcon icon={["fadl", "tags"]} />
          {photoData.tags.map((tag: any) => (<Anchor key={`tag_${tag}`} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
            <Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} />}>
              {tag}
            </Badge>
          </Anchor> ))}
        </Group>
      </Stack>
    </Flex>
  </>
}
