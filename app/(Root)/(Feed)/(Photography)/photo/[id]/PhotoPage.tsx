'use client'

import { BreadCrumbPublic } from "@/app/(Components)/BreadCrumbsComponentPublic";
import { MdxContent } from "@/app/mdx-content";
import DisplayDate from "@/lib/DisplayDate";
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

import { BsCalendar2, BsHash, BsImages, BsPencilSquare, BsPinMap, BsTag, BsTags } from "react-icons/bs";
import ClipboardButton from "@/app/(Components)/(Buttons)/ClipboardButton";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { useUser } from "@clerk/nextjs";
import ViewFullPhoto from "@/app/(Components)/ViewFullPhoto";
import { Album02Icon, Calendar03Icon, Edit02Icon, GridIcon, PinLocation03Icon, Tag01Icon, TagsIcon } from "@hugeicons/react";

export default function PhotoPage({photoData, mdxSource}: any) {
  const {user} = useUser()
  const { album: albumData } = photoData

  const breadCrumbs = [
    {"pageLink": "/feed/photography", "pageName": "Photography Feed"},
    {"pageLink": `/photo/${photoData.id}`, "pageName": `View: ${photoData.photoName}`}
  ]
    
  return (<>
    <BreadCrumbPublic breads={breadCrumbs} />
    <Title order={1} size="3rem" style={{textDecoration: "underline", textDecorationColor: "var(--primary"}} ta="left" c="white">{photoData.photoName}</Title>
    
    <Flex direction={{base:"column", sm:"row"}} m={{base: "1rem", lg: "1rem 0rem"}} align="space-between" gap="2rem">
      <ViewFullPhoto photoData={photoData} />
      <Stack w={{base: "100%", md: "50%"}}> 
       {user &&
          <Group gap="0.5rem">
            <ClipboardButton copyValue={photoData.fileID.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
            <PrimaryLinkedButton link={`/admin/photography/${photoData.id}`} icon={<Edit02Icon />}>Edit Photo</PrimaryLinkedButton>
            <Badge color="white" leftSection={<GridIcon />}>
              {photoData.id}
            </Badge> 
          </Group>
        }
        <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem 2rem" m="0.5rem">
          {/* <Text>{photoData.caption}</Text> */}
          {/* source={photoData.caption} */}
          <MdxContent source={mdxSource} />
        </Box>
        <Group gap="0.5rem">
          {photoData.album && <Anchor href={`/album/${albumData.slug}`} style={{color: "currentColor"}}>
            <Badge color="primary" leftSection={<Album02Icon />}>
              {albumData.albumName}
            </Badge>
          </Anchor>} 
          {photoData.location && <Anchor href={`/feed/photography?search=location&value=${photoData.location}`} style={{color: "currentColor"}}>
            <Badge color='blue' leftSection={<PinLocation03Icon />}>
              {photoData.location}
            </Badge>
          </Anchor>}
        </Group>
        <Badge color="red" leftSection={<Calendar03Icon />}>
          <DisplayDate source={photoData.fileID.takenOn} />
        </Badge>
        <Group gap="0.5rem">
          <TagsIcon />
          {photoData.tags.map((tag: any) => (<Anchor href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
            <Badge color="white" leftSection={<Tag01Icon />}>
              {tag}
            </Badge>
          </Anchor> ))}
        </Group>
      </Stack>
    </Flex>
  </>)
}