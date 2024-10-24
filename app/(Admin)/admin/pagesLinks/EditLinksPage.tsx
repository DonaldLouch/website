'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { LinkCardAdmin } from "./LinkCardAdmin"
import AddLink from "./AddLink"
import { PrimaryLinkManager } from "./PrimaryLinkManager"
import AddPrimaryLink from "./AddPrimaryLink"
import { EmbedManager } from "./EmbedManager"
import { AddEmbed } from "./AddEmbed"

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
      <div><h1>Page is being refactored.</h1></div>
      {/* <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/about#links`} variant="primary" background="primary" color="white" my="1rem !important">View About#Links Page</Button>
        <Tabs p="1rem" borderRadius="0 2rem" isFitted>
          <TabList display="flex" justifyContent="center">
            <Tab>All Links</Tab>
            <Tab>Primary Links</Tab>
            <Tab>Embeds</Tab>
            {/* <Tab>Pinned Posts</Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>
              <AddLink />
              {links.map((link: any) => ( <LinkCardAdmin {...link} key={link.id} /> ))}
            </TabPanel>
            <TabPanel>
              <AddPrimaryLink primaryLength={primaryLinks.length} />
              {primaryLinks.map((link: any) => ( <PrimaryLinkManager {...link} key={link.id} /> ))}
            </TabPanel>
            <TabPanel>
              <AddEmbed />
              {embeds.map((embed: any) => ( <EmbedManager {...embed} key={embed.id} /> ))} 
            </TabPanel>
            {/* <TabPanel>
              {pinnedPosts.map((post: any) => ( <PinnedPostsManager {...post} /> ))} 
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box> */}
    </>
  )
}
