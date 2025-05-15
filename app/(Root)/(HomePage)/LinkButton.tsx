import {
  Text,
  Anchor,
  Stack,
  ActionIcon,
  Group,
} from "@mantine/core"

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"

import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}
interface LinkButtonProps {
  id: string
  link: string|null
  title: string
  iconPrefix: any
  newIcon: Icons
  subTitle: string | null | undefined
}

export const LinkButton = (link: LinkButtonProps) => {

  // console.log(link.newIcon)
  return <Anchor
    key={link.id}
    href={link.link ? link.link : "#"}
    c="currentColor"
    underline="never"
  >
    <Group wrap="nowrap" className={ classes.linkButton } 
      my="1.5rem"
      p="0.5rem 1.2rem"
    >
      <ActionIcon bg="none" style={{boxShadow: "none", padding: "0.6rem", margin: 0}}><HugeIcon name={link.newIcon[0].iconName!} size="3rem" variant={link.newIcon[0].iconVariant ? link.newIcon[0].iconVariant : "twotone"} /></ActionIcon>
      <Stack gap="0">
        <Text c="white" mb="0" fz="1.5rem">{link.title}</Text>
        {link.subTitle ? <Text size="sm" c="dimmed" fw={300} mt="0">{link.subTitle}</Text> : null}
      </Stack>
    </Group>
  </Anchor>
}
