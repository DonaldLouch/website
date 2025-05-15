'use client'

import { NavLink } from "@mantine/core";

import { HeaderSubNavigationItems } from "@/lib/HeaderNavigationItems/SubNavigationItems";

import classes from '@/app/(Components)/(Buttons)/Buttons.module.css'
import HeaderLink1 from "@/app/(Components)/(Buttons)/HeaderLink1";

interface HeaderNavigationItemProps {
  slug: any
  isParent: boolean
  parentID: number | null
  linkName: string
  icon?: any
}
export default function HeaderNavigationItem( { slug, isParent, parentID, linkName, icon }: HeaderNavigationItemProps ) {
  return (
    <>
      {!isParent ? (
        <HeaderLink1 linkName={linkName} href={`/${slug}`} icon={icon} />
      ) : (
        <>
          <HeaderLink1 linkName={linkName} href={`/${slug}`} icon={icon}>
            {HeaderSubNavigationItems.map((subLink: any) =>subLink?.parentMenu == parentID && (
              <NavLink href={`/${subLink.slug}`} label={subLink.name} key={subLink.slug} classNames={{ root: classes.headerLink, label: classes.headerLinkSub_label }} />
            ))}
          </HeaderLink1>
        </>
      )}
    </>
  );
};
