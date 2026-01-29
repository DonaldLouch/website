import { Button } from "@mantine/core";
import classes from "./Buttons.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "@tanstack/react-router";

import type { Icons } from "@/lib/FontAwesome"

// import  { Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';

type LinkedProps = {
  to: LinkProps["to"]
  search?: LinkProps["search"]
  params?: LinkProps["params"]
} | {
  to: string
  search?: LinkProps["search"]
  params?: LinkProps["params"]
}

interface ButtonProps {
  isHidden?: boolean
  link: LinkedProps
  children: React.ReactNode
  isFullWidth?: boolean
  colour?: string
  fontColour?: string
  isExternal?: boolean
  icon?: Icons|any;
  [key: string]: any
}

// ( formData?: FormData, payload?: S3Payload )

export default function PrimaryLinkedButton({isHidden, link, icon, isFullWidth, children, colour, fontColour, isExternal,  ...rest}: ButtonProps) {
  const navigate = useNavigate()

  const isInternalLink = typeof link.to === "string" && link.to.startsWith("/")

  return <Button
    styles={{root: {display: isHidden ? "none" : "block"}}} 
    onClick={() => isInternalLink ? navigate({
      to: link.to as LinkProps["to"],
      search: link.search || undefined,
      params: link.params || undefined
    }) : navigate({ href: link.to })}
    leftSection={
      icon 
        ? <FontAwesomeIcon icon={[icon.pack || "fal", icon.name]} size="1x" />
        : null
    }
    color={colour ? colour : "black"}
    fullWidth={isFullWidth}
    variant="filled" 
    size="lg"
    classNames={{root: classes.primaryButton}}
    c={fontColour ? fontColour : "white"}
    {...rest}
  >
    {children}
  </Button>
}
