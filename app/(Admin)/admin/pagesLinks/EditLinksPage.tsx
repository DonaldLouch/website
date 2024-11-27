'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { LinkCardAdmin } from "./LinkCardAdmin"
import AddLink from "./AddLink"
import { PrimaryLinkManager } from "./PrimaryLinkManager"
import AddPrimaryLink from "./AddPrimaryLink"
import { EmbedManager } from "./EmbedManager"
import { AddEmbed } from "./AddEmbed"
import { Box, Tabs } from "@mantine/core"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import { ArrowUpRight01Icon } from "@hugeicons/react"

export default function EditLinksPage({ links, primaryLinks, embeds }: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesLinks", "pageName": "Links Manager"}
  ]

  /*
    import { Reorder } from 'framer-motion'

    <Reorder.Group values={items} onReorder={setItems}>
      {items.ma((item) => (
        <Reorder.Item value={item} key={item}>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  */
  
  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box component="main">
        <PrimaryLinkedButton link="/" primNewIcon={{name: "arrow-up-right-01", variant: "twotone"}}>View Links</PrimaryLinkedButton>
        
        <Tabs defaultValue="all">
            <Tabs.List grow justify="center">
              <Tabs.Tab value="all">All Links</Tabs.Tab>
              <Tabs.Tab value="primary">Primary Links</Tabs.Tab>
              <Tabs.Tab value="embeds">Embeds</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="all">
              <AddLink />
              {links.map((link: any) => ( <LinkCardAdmin {...link} key={link.id} /> ))}
            </Tabs.Panel>
            <Tabs.Panel value="primary">
              <AddPrimaryLink primaryLength={primaryLinks.length} />
              {primaryLinks.map((link: any) => ( <PrimaryLinkManager {...link} key={link.id} /> ))}
            </Tabs.Panel>
            <Tabs.Panel value="embeds">
              <AddEmbed />
              {embeds.map((embed: any) => ( <EmbedManager {...embed} key={embed.id} /> ))} 
            </Tabs.Panel>
          </Tabs>
      </Box> 
    </>
  )
}
