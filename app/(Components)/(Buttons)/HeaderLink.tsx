import { Box, Divider, Flex, HoverCard, NavLink, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'

import classes from './Buttons.module.css'
import HugeIcon from '../HugeIcon'

import type {HeaderLinkProps} from "@/lib/HeaderLinks"
import PrimaryLinkedButton from './PrimaryLinkedButton'
import { useMediaQuery } from '@mantine/hooks'


export default function HeaderLink( props: HeaderLinkProps & { isMobile?: boolean } ) {
    const { name, slug, description, icon, isMega, ctaText, subMenuLinks, isMobile } = props
    const theme = useMantineTheme();
    const lgDevice = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    return <>
        {(isMega && !isMobile) ? 
        <HoverCard width="50%" position="bottom" radius="lg" shadow="bsBoldPrimary" withinPortal zIndex={10000000}>
            <HoverCard.Target>
                <NavLink href={slug}
                    variant="subtle"
                    classNames={{
                        root: classes.headerLink,
                        label: classes.headerLink_label,
                    }}
                    label={name}
                    p="1rem"
                    fw="500"
                    leftSection={!lgDevice ? <HugeIcon name={icon.name} size="1.5rem" variant={icon.variant ? icon.variant : undefined} /> : null}
                    rightSection={<HugeIcon name="arrow-down-01" size="1.5rem" />}
                />
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ overflow: "hidden", outline: "none", border: "none", backdropFilter: "blur(20px)" }} bg="var(--darkPurple)">
                <Flex justify="space-between" p="1rem" align="center">
                    <Flex direction="row" align="center" gap="1rem" c="var(--secondary)">
                        <HugeIcon name={icon.name} size="1.5rem" variant={icon.variant ? icon.variant : "duotone"} />
                        <Title order={2} lh="0" m="0">{name}</Title>
                    </Flex>
                    <PrimaryLinkedButton link={slug} colour="var(--blackRGBA)" m="0">{ctaText}</PrimaryLinkedButton>
                </Flex>
                <Text fz="sm" c="dimmed" visibleFrom="md" m="0 1rem 1rem">{description}</Text>
                <Divider label="MORE PAGES" labelPosition="center" m="2rem 3rem 0" />
                <Box p="md">
                    {subMenuLinks && subMenuLinks.map((subLink, index) => (
                        <NavLink href={subLink.slug}
                            key={`${slug}sub${slug}${index}`}
                            variant="subtle"
                            classNames={{
                                root: classes.headerLink,
                                label: classes.headerLink_label,
                                section: classes.headerLink_section
                            }}
                            label={subLink.name}
                            description={subLink.description}
                            my="0rem"
                            p="1rem"
                            leftSection={<HugeIcon name={subLink.icon.name} size="1.5rem" variant={subLink.icon.variant ? subLink.icon.variant : undefined} />}
                            rightSection={null}
                        />
                    ))}
                </Box>
                <Box bg="var(--blackRGBA)" p="2rem" m="0rem -1rem -1rem">
                    <SimpleGrid cols={3}>
                        <PrimaryLinkedButton link="/" colour="primary">Home</PrimaryLinkedButton>
                        <PrimaryLinkedButton link="/contact" colour="primary">Contact Me</PrimaryLinkedButton>
                        <PrimaryLinkedButton link="/#links" colour="primary">View All Links</PrimaryLinkedButton>
                    </SimpleGrid>
                </Box>
            </HoverCard.Dropdown>
        </HoverCard> 
        : (!isMega && !isMobile) ?
        <NavLink href={slug}
            variant="subtle"
            classNames={{
                root: classes.headerLink,
                label: classes.headerLink_label,
            }}
            label={name}
            my="0.5rem"
            p="1rem"
            fw="500"
            rightSection={null}
       />

        : (isMega && isMobile) ? <>
            <NavLink href={slug}
                variant="subtle"
                classNames={{
                    root: classes.headerLink,
                    label: classes.headerLink_label,
                    section: classes.headerLink_section
                }}
                label={name}
                description={description}
                p="1rem"
                mt="2rem"
                leftSection={<HugeIcon name={icon.name} size="1.5rem" variant={icon.variant ? icon.variant : "duotone"} />}
                rightSection={null}
            />
            <Divider label="MORE PAGES" labelPosition="center" mx="3rem" my="0rem" />
            {subMenuLinks && subMenuLinks.map((subLink, index) => (
                    <NavLink href={subLink.slug}
                        key={`${slug}sub${slug}${index}`}
                        variant="subtle"
                        classNames={{
                            root: classes.headerLink,
                            label: classes.headerLink_label,
                            section: classes.headerLink_section
                        }}
                        label={subLink.name}
                        description={subLink.description}
                        my="0rem"
                        p="1rem"
                        ml="1rem"
                        leftSection={<HugeIcon name={subLink.icon.name} size="1.5rem" variant={subLink.icon.variant ? subLink.icon.variant : undefined} />}
                        rightSection={null}
                    />
                ))}
            </> :

            <NavLink href={slug}
                variant="subtle"
                classNames={{
                    root: classes.headerLink,
                    label: classes.headerLink_label,
                }}
                label={name}
                my="0.5rem"
                p="1rem"
                leftSection={<HugeIcon name={icon.name} size="1.5rem" variant={icon.variant ? icon.variant : "duotone"} />}
                rightSection={null}
            />
        }
    </>
}