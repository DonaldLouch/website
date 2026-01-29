


// "use client"

import React, { Fragment } from "react"

import DisplayDate from '@/lib/DisplayDate'
import { Badge, Text, Group, Title, Box, Stack, Card, Spoiler } from '@mantine/core'
import { randomId } from '@mantine/hooks'

import { Carousel } from '@mantine/carousel';

import classes from "../Components.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function CardPost (post: any) {
    return <Card
      // p="lg"
      pos="relative"
      h={{base: "400px", md: "360px"}}
      className={classes.cardScale}
      radius="md"
      component="a"
      href={`/post/${post.slug}`}
    //   key={`pinnedCard${randomId()}`}
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
              <Badge color="blue" leftSection={<FontAwesomeIcon icon={["fal", "folder"]} />} key={category}>
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
              <Badge color="red" leftSection={<FontAwesomeIcon icon={["fal", "calendar"]} />}>
                  <DisplayDate source={post.postedOn} />
              </Badge>
              <Badge color="white" leftSection={<FontAwesomeIcon icon={["fal", "thumbtack-angle"]} />}>
                Pinned
              </Badge>
            </Group>
          {/* </Group> */}
      </Stack>
    </Card>
}


export default function PinnedPostsCard({pinnedPosts}: any) {
    return <Fragment key={`pinned${randomId()}`}>
        <Carousel
          height="100%"
          withIndicators
          slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
          slideGap={{ base: 0, sm: 'md' }}
          // slidesToScroll={2}
          emblaOptions={{ loop: true, dragFree: true, align: 'start' }}
          my="2rem"
          key={`pinned${randomId()}`}
      >
        {pinnedPosts.map((post: any) => (
          <Carousel.Slide key={`pinnedCard${randomId()}`}>
            <CardPost {...post} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Fragment>
}
