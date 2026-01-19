import { Anchor, Box, Center, Tooltip } from "@mantine/core"

import classes from "@/components/Components.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import type { Icons } from "@/lib/FontAwesome"

export default function InlineLink({link, leftIcon, rightIcon, body, isInternal}: {link: string, leftIcon?: Icons, rightIcon?: Icons, body: string, isInternal?: boolean}) {
    return <Tooltip label={link}>
        <Anchor 
            href={link} 
            target={!isInternal ? "_blank" : "_self"}
            fw="700" 
            underline="never" 
            className={classes.markdownLink}
            // display="inline-flex"
            style={{ verticalAlign: "middle" }}
            p="0"
            aria-label={body}
            // inline
        >
            <Center inline>
                {leftIcon 
                    ? <FontAwesomeIcon icon={[leftIcon.pack || "fadt", leftIcon.name]} size="1x" />
                    : null
                }
                <Box component="span" pl={leftIcon ? "0.2rem" : "0"} pr={rightIcon || !leftIcon && !rightIcon ? "0.2rem" : "0"}>{body}</Box>
                {rightIcon 
                    ? <FontAwesomeIcon icon={[rightIcon.pack || "fadt", rightIcon.name]} size="1x" />
                    : !leftIcon && !rightIcon && (<FontAwesomeIcon icon={["fal", isInternal ? "arrow-up-right-from-square" : "arrow-up-right-from-square"]} size="1x" />)
                }
                {/* {leftIcon ? <HugeIcon name={leftIcon.name} size="1.3rem" variant={leftIcon.variant ? leftIcon.variant : "twotone"} /> : null}
                <Box component="span" pl={leftIcon ? "0.2rem" : "0"} pr={rightIcon || !leftIcon && !rightIcon ? "0.2rem" : "0"}>{body}</Box>
                {rightIcon ? (<HugeIcon name={rightIcon.name} size="1.3rem" variant={rightIcon.variant ? rightIcon.variant : "twotone"} weight={2} />) : !leftIcon && !rightIcon && (<HugeIcon name={isInternal ? "link-square-02" : "arrow-up-right-01"} size="1.3rem" variant="twotone" weight={2} />)} */}
            </Center>
        </Anchor>
    </Tooltip>
}