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

// import { AdminSubNavigationItems } from "@/lib/AdminNavigationItems/AdminSubNavigationItems";
;
import { BsChevronDown } from "react-icons/bs";
// import HeaderLink from "@/app/(Components)/(Buttons)/HeaderLink";

// import classes from '@/app/(Components)/(Buttons)/Buttons.module.css'
// import PortalHeaderLink from "@/app/(Components)/(Buttons)/PortalHeaderLink";

interface HeaderNavigationItemProps {
  slug: any
  isParent: boolean
  parentID: number | null
  linkName: string
  icon?: any
}
// export default function PortalNavigationItem( { slug, isParent, parentID, linkName, icon }: HeaderNavigationItemProps ) {
export default function PortalNavigationItem({isParent}: HeaderNavigationItemProps) {
  return (
    <>
      {!isParent ? (<>
       {/* <PortalHeaderLink linkName={linkName} href={`/${slug}`} icon={icon} /> */}
      </>) : (
        <>
          {/* <PortalHeaderLink linkName={linkName} href={`/${slug}`} icon={icon}>
            {AdminSubNavigationItems.map((subLink: any) =>subLink?.parentMenu == parentID && (
              <NavLink href={`/${subLink.slug}`} label={subLink.name} key={subLink.slug} classNames={{ root: classes.headerLink, label: classes.headerLinkSub_label }} />
            ))}
          </PortalHeaderLink> */}
        </>
      )}
    </>
  );
};
