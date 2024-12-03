


'use client'


import DisplayDate from '@/lib/DisplayDate'
import { Badge, Text, Group, Paper, Title, Box, useMantineTheme, rem, AspectRatio, Center, Stack, Tooltip, Flex, Anchor, Button, Card, Spoiler } from '@mantine/core'
import { Calendar03Icon, ContactIcon, Folder01Icon, PinIcon, ViewIcon } from '@hugeicons/react'
import PrimaryLinkedButton from '../(Buttons)/PrimaryLinkedButton'
import { useMediaQuery } from '@mantine/hooks'
import { SectionTitle } from '../SectionTitle'

import { Carousel } from '@mantine/carousel';

import classes from "../Components.module.css"
import HugeIcon from '../HugeIcon'

function CardPost (post: any) {
    return <>
    <Card
      // p="lg"
      pos="relative"
      h={{base: "400px", md: "360px"}}
      className={classes.cardScale}
      radius="md"
      component="a"
      href={`/post/${post.slug}`}
    >
      <Box
        pos="absolute"
        inset="0"
        bg={`url(${post.thumbnail})`}
        bgsz="cover"
        bgp="center"
        style={{
          transform: "500ms ease",
        }}
       className={classes.cardThumbnail}
      />


      <Box pos="absolute" top="0" left="0" right="0" bottom="0" bg="var(--blackRGBA)" />

      <Spoiler hideLabel="Hide all Categories" showLabel="Show all Categories" maxHeight={70}>
      <Group pos="relative" top="0%" right="1%" style={{ zIndex: 1 }}>
          {post.category.map((category: any) => (
              <Badge color="blue" leftSection={<Folder01Icon />} key={category}>
                  {category}
              </Badge>
          ))}
      </Group>
      </Spoiler>

      <Stack pos="relative" h="100%" justify="flex-end" style={{ zIndex: 1 }}>
          <Title
              order={1}
              style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
              fz="2rem"
              mt="1rem"
              lineClamp={1}
              c="white"
          >
            {post.title}
          </Title>
          {/* <Group justify="space-between" align="flex-start"> */}
            <Text fz="1rem" c="white" fw="300" mt="0" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} lineClamp={2}>
                {post.headingText}
            </Text>
            <Group justify="space-between">
              <Badge color="red" leftSection={<Calendar03Icon />}>
                  <DisplayDate source={post.postedOn} />
              </Badge>
              <Badge color="white" leftSection={<HugeIcon name="pin" variant="duotone" />}>
                Pinned
              </Badge>
            </Group>
          {/* </Group> */}
      </Stack>
    </Card>
    {/* <Anchor href={`/post/${post.slug}`} underline="never" c="white">
        <Flex direction="column" align={{base: "center", lg: "flex-start"}} key={post.id} style={{borderRadius: "var(--mantine-radius-md)"}} m="1.5rem" bg={`url(${post.thumbnail})`} bgp="center" className={classes.pinnedHover}>
            <Stack gap="0" bg="var(--blackRGBA)" w="100%" h="100%" p="0.5rem 2rem" style={{borderRadius: "var(--mantine-radius-md)"}} pos="relative">
                <Title
                    order={1}
                    style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                    fz="2rem"
                    mt="1rem"
                    lineClamp={1}
                >
                    {post.title}
                </Title>
                <Text fz="1rem" c="grey" fw="300" mt="0" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} lineClamp={2}>
                    {post.headingText}
                </Text>
                <Stack gap="1rem" m="0" visibleFrom="md" my="0rem">
                    <Group>
                        <Badge color="grey" leftSection={<PinIcon />}>Pinned</Badge>
                        <Badge color="primary" leftSection={<ContactIcon />}>
                            {post.author}
                        </Badge>
                        <Badge color="red" leftSection={<Calendar03Icon />}>
                            <DisplayDate source={post.postedOn} />
                        </Badge>
                        <Group>
                            {post.category.map((category: any) => (
                                <Badge color="blue" leftSection={<Folder01Icon />} key={category}>
                                    {category}
                                </Badge>
                            ))}
                        </Group>
                    </Group> 
                </Stack>
            </Stack>
        </Flex>
    </Anchor> */}
    </>
}


export default function PinnedPostsCard({pinnedPosts}: any) {
    return <>
      <Carousel
          height="100%"
          withIndicators
          slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
          slideGap={{ base: 0, sm: 'md' }}
          // slidesToScroll={2}
          loop
          align="start"
          my="2rem"
      >
        {pinnedPosts.map((post: any) => (
          <Carousel.Slide>
            <CardPost {...post} key={post.id} />
          </Carousel.Slide>
        ))}
      </Carousel>
    {/* <Box my="2rem">
        {pinnedPosts.map((post: any) => (
            <CardPost {...post} key={post.id} />
        ))}
    </Box> */}
    </>
}
