import { Anchor, Image, Tooltip } from "@mantine/core"

interface LinkedSVGButtonProps {
  link: string
  title: string
  icon: any
}

export const LinkedSVGButton = (buttonLink: LinkedSVGButtonProps) => {
  return (
    <Anchor href={buttonLink.link}>
      <Tooltip label={buttonLink.title}>
        <Image src="/logoFull.svg" h="auto" w="4rem" fz="inherit" maw="none !important" />
      </Tooltip>
    </Anchor>
  )
}
