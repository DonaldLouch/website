import { Anchor, Box, Button, Group, Menu } from '@mantine/core'
    
import classes from "../Components.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//  _hover={{background: "blurredBackground", c:"secondary", fw: "900 !important"}
export const PaginationMenu = ( props: any ) => { 
  const { currentPage, pages, previousPages, nextPages, lastPage } = props
  return <Group justify="space-between" align="center" m="2rem 1rem 1rem" p="1rem 2rem !important" style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }} c="white">
    <Anchor href={`?pg=${currentPage - 1}`} variant="primary" c="white" fw="500" p="inherit" style={{ display: Number(currentPage) <= 1 ? "none" : "initial" }}>Previous Page</Anchor>

    {pages.map((page: any) => (
      <Box key={page}>{
        page === "...Prev" && (
          <Menu position="top" key={`prev`}>
            <Menu.Target><Button unstyled bg="none" style={{border: "none"}} c="white"><FontAwesomeIcon icon={["fal", "ellipsis-stroke"]} /></Button></Menu.Target>
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
          <Menu.Target><Button unstyled bg="none" style={{border: "none"}} c="white"><FontAwesomeIcon icon={["fal", "ellipsis-stroke"]} /></Button></Menu.Target>
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

    <Anchor href={`?pg=${currentPage + 1}`} c="white" fw="500" p="inherit" style={{ display: lastPage == currentPage ? "none" : "initial" }}>Next Page</Anchor>
  </Group>
}