// "use client"

import { NavLink } from "@mantine/core";

import classes from './Buttons.module.css'
import PortalHeaderLink from "./PortalHeaderLink";

import type { AdminLinkProps } from "@/lib/AdminLinks";

export default function AdminNavigationItem(props: AdminLinkProps ) {
const { name, slug, icon, subMenuLinks } = props

  return <>
    {!subMenuLinks ?  <PortalHeaderLink name={name} slug={slug} icon={icon} /> :
      <PortalHeaderLink name={name} slug={slug} icon={icon}>
        <NavLink href={slug} label={name} key={slug} classNames={{ root: classes.headerLink, label: classes.headerLinkSub_label }} />
        {subMenuLinks && subMenuLinks.map((subLink: any) => (
          <NavLink href={subLink.slug} label={subLink.name} key={subLink.slug} classNames={{ root: classes.headerLink, label: classes.headerLinkSub_label }} />
        ))}
      </PortalHeaderLink>
    }
  </>
}