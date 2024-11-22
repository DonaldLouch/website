import { Anchor, Box, Center, Tooltip } from "@mantine/core"

import classes from "@/app/(Components)/Components.module.css"
import HugeIcon, { IconName, IconVariant } from "./HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

export default function InlineLink({link, leftIcon, rightIcon, body, isInternal}: {link: string, leftIcon?: Icons, rightIcon?: Icons, body: string, isInternal?: boolean}) {
    return <Tooltip label={link}>
        <Anchor 
            href={link} 
            target={!isInternal ? "_blank" : "_self"}
            fw="700" 
            underline="never" 
            className={classes.markdownLink}
            display="inline-block"
            style={{ verticalAlign: "middle" }}
            p="0"
        >
            <Center inline>
                {leftIcon ? <HugeIcon name={leftIcon.name} size="1.3rem" variant={leftIcon.variant ? leftIcon.variant : "twotone"} weight={2} /> : null}
                <Box component="span" pl={leftIcon ? "0.2rem" : "0"} pr={rightIcon || !leftIcon && !rightIcon ? "0.2rem" : "0"}>{body}</Box>
                {rightIcon ? <HugeIcon name={rightIcon.name} size="1.3rem" variant={rightIcon.variant ? rightIcon.variant : "twotone"} weight={2} /> : !leftIcon && !rightIcon && <HugeIcon name={isInternal ? "link-square-02" : "arrow-up-right-01"} size="1.3rem" variant="twotone" weight={2} />}
            </Center>
        </Anchor>
    </Tooltip>
}
