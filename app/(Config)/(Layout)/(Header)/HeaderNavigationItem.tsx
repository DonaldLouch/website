'use client'

import {
  Anchor,
  Group,
  // FlexProps,
  Menu,
  NavLink,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Stack,
  Tooltip,
  // Icon,
} from "@mantine/core";

import { HeaderSubNavigationItems } from "@/lib/HeaderNavigationItems/SubNavigationItems";
;
// import { BsChevronDown } from "react-icons/bs";
import HeaderLink from "@/app/(Components)/(Buttons)/HeaderLink";

import classes from '@/app/(Components)/(Buttons)/Buttons.module.css'

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
        <HeaderLink linkName={linkName} href={`/${slug}`} icon={icon} />
      ) : (
        <>
          <HeaderLink linkName={linkName} href={`/${slug}`} icon={icon}>
            {HeaderSubNavigationItems.map((subLink: any) =>subLink?.parentMenu == parentID && (
              <NavLink href={`/${subLink.slug}`} label={subLink.name} key={subLink.slug} classNames={{ root: classes.headerLink, label: classes.headerLinkSub_label }} />
            ))}
          </HeaderLink>
        </>
      )}
    </>
  );
};
