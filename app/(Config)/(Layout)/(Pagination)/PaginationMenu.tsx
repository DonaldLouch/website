'use client'
import { Link, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
    
export const PaginationMenu = ( props: any ) => { 
  const { currentPage, pages, previousPages, nextPages } = props
  return (
    <Stack direction="row" justify="space-between" align="center" m="1rem" p="2rem" boxShadow="bsBoldBlue" borderRadius="0 2rem" color="white">
      <Link href={`?pg=${currentPage - 1}`} variant="primary" color="white" _hover={{color: "primary"}}>Previous Page</Link>
        {pages.map((page: any) => (
          page === "...Prev" && (
            <Menu placement="top">
              <MenuButton>...</MenuButton>
              <MenuList maxH="80vh !important" overflowY="scroll" background="black" border="none">
                {previousPages?.map((number: any) => (
                  <Link href={`?pg=${number}`} key={`prev_${number}`} _hover={{textDecoration: "none"}}>
                    <MenuItem background="black" _hover={{background: "blurredBackground", color:"secondary", fontWeight: "900 !important"}}>{number}</MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          ) || page === "...Nex" && (
          <Menu placement="top">
            <MenuButton>...</MenuButton>
            <MenuList maxH="80vh !important" overflowY="scroll" background="black" border="none">
              {nextPages?.map((number: any) => (
                <Link href={`?pg=${number}`} key={`next_${number}`} _hover={{textDecoration: "none"}}>
                  <MenuItem background="black" _hover={{background: "blurredBackground", color:"secondary", fontWeight: "900 !important"}}>{number}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          ) || (
            page === currentPage ? (
              <Link color="secondary" fontSize="1.4rem" fontWeight="900" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
            ) : (
              <Link href={`?pg=${page}`} variant="primary" color="white" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
            )
          )
        ))}
      <Link href={`?pg=${currentPage + 1}`} variant="primary" color="white" _hover={{color: "primary"}}>Next Page</Link>
    </Stack>
  )
}