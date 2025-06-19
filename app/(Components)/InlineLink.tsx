import { Anchor, Box, Center, Tooltip } from "@mantine/core"

import classes from "@/app/(Components)/Components.module.css"
import HugeIcon, { IconName, IconVariant } from "./HugeIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Icons = {name: IconName, variant?: IconVariant}

export default function InlineLink({link, leftIcon, rightIcon, body, isInternal}: {link: string, leftIcon?: any, rightIcon?: any, body: string, isInternal?: boolean}) {
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
                    ? leftIcon.variant?.includes("fa")
                        ? <FontAwesomeIcon icon={[leftIcon.variant || "fadt", leftIcon.name]} size="1x" />
                        : <HugeIcon name={leftIcon.name} size="1.3rem" variant={leftIcon.variant || "twotone"} /> 
                    : null
                }
                <Box component="span" pl={leftIcon ? "0.2rem" : "0"} pr={rightIcon || !leftIcon && !rightIcon ? "0.2rem" : "0"}>{body}</Box>
                {rightIcon 
                    ? (rightIcon && rightIcon.variant?.includes("fa") 
                        ? <FontAwesomeIcon icon={[rightIcon.variant || "fadt", rightIcon.name]} size="1x" />
                        : <HugeIcon name={rightIcon.name} size="1.3rem" variant={rightIcon.variant || "twotone"} />
                    )
                    : !leftIcon && !rightIcon && (<FontAwesomeIcon icon={["fadt", isInternal ? "arrow-up-right-from-square" : "arrow-up-right-from-square"]} size="1x" />)
                }
            </Center>
        </Anchor>
    </Tooltip>
}