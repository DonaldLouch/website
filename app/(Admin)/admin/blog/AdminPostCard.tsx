import { AspectRatio, Anchor, Image, Box, Text, Title, Tooltip } from '@mantine/core'
// import Link from 'next/link'
// import Image from 'next/image'
import DisplayDate from '@/lib/DisplayDate'

export default function AdminPostCard({ id, slug, title, thumbnail, category, postedOn, lastUpdatedOn }: any) {
  return (<Box
    key={id}
    // span={{base: 12, sm: 3.33}}
    id={id}
    // component="article"
    style={{
        filter: "opacity(98%)",
        borderRadius: "var(--mantine-radius-lg)",
        boxShadow: "var(--mantine-shadow-bsBoldWhite)"
    }}
    // p="2rem"
    // w="100%"
    // mb="2rem"
    bg="none"
    c="white"
  >
    <Anchor
        href={`/admin/postEdit/${slug}`}
        style={{textDecoration: "none", color: "currentcolor"}}
    >
        <AspectRatio
            ratio={16/9}
            style={{
                overflow: "hidden",
                borderRadius: "0 1.5rem 0 0"
            }}
            bg="blurredBackground"
        >
            <Image src={thumbnail} alt={title} />
        </AspectRatio>
        <Box m="0" p="2rem">
            <Title
                order={3}
                size="1rem"
                fw="500"
                // mt="2rem"
                tt="uppercase"
                c="secondary"
            >
                {category && category.length == 2 ? `${category[0]} and ${category[1]}` :  category.length > 2 ? category.map((cat: any, index: number) => (index === category.length-1 ? cat : `${cat}, `)) : category[0]}
            </Title>
            <Tooltip label={title}>
                <Title order={2} size="2rem" fw="bold" mb="1.5rem" lineClamp={1}>{title}</Title>
            </Tooltip>
            {/* <Tooltip label={excerpt}> */}
                <Text c="grey">Posted On: {<DisplayDate source={postedOn} />} | Last Updated: {<DisplayDate source={lastUpdatedOn} />}</Text>
            {/* </Tooltip> */}
        </Box>
    </Anchor>
  </Box>
  )
}
