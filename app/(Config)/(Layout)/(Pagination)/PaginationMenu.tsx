'use client'
import { Anchor, Box, Button, Group, Menu } from '@mantine/core'
    
import classes from "@/app/(Components)/Components.module.css"
import HugeIcon from '@/app/(Components)/HugeIcon'

//  _hover={{background: "blurredBackground", c:"secondary", fw: "900 !important"}
export const PaginationMenu = ( props: any ) => { 
  const { currentPage, pages, previousPages, nextPages } = props
  return (<>
    <Group justify="space-between" align="center" m="2rem 1rem 1rem" p="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md"}} c="white">
      <Anchor href={`?pg=${currentPage - 1}`} variant="primary" c="white">Previous Page</Anchor>

        {pages.map((page: any) => (
          <Box key={page}>{
            page === "...Prev" && (
              <Menu position="top" key={`prev`}>
                <Menu.Target><Button unstyled bg="none" style={{border: "none"}} c="white"><HugeIcon name="more-horizontal" /></Button></Menu.Target>
                <Menu.Dropdown style={{overflowY: "scroll", border:"none", maxHeight: "40vh"}} w="5%" bg="black">
                  {previousPages?.map((number: any) => (
                    <Anchor href={`?pg=${number}`} key={`${number}`} underline="never">
                      <Menu.Item c="white" ta="center"className={classes.menuDropdown} w="100%">{number}</Menu.Item>
                    </Anchor>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) || page === "...Nex" && (
            <Menu position="top" key={`next`}>
                <Menu.Target><Button unstyled bg="none" style={{border: "none"}} c="white"><HugeIcon name="more-horizontal" /></Button></Menu.Target>
                <Menu.Dropdown style={{overflowY: "scroll", border:"none", maxHeight: "40vh"}} w="5%" bg="black">
                {nextPages?.map((number: any) => (
                  <Anchor href={`?pg=${number}`} key={`${number}`} underline="never">
                      <Menu.Item c="white" ta="center"className={classes.menuDropdown} w="100%">{number}</Menu.Item>
                    </Anchor>
                ))}
              </Menu.Dropdown>
            </Menu>
            ) || (
              page === currentPage ? (
                <Anchor c="secondary" fz="1.4rem" fw="900" key={page?.index}>{page}</Anchor>
              ) : (
                <Anchor href={`?pg=${page}`} c="white" key={page?.index}>{page}</Anchor>
              )
            )
          }</Box>
        ))}

      <Anchor href={`?pg=${currentPage + 1}`} c="white">Next Page</Anchor>
    </Group>
  </>)
}