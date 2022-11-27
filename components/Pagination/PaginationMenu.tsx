import { Link, Menu, MenuButton, MenuItem, MenuList, Stack, useColorModeValue } from '@chakra-ui/react'
    
export const PaginationMenu = ( props: any ) => { 
  const { currentPage, pages, previousPages, nextPages } = props

  const blackWhite = useColorModeValue('black', 'white')
  const primaryWhite = useColorModeValue('primary', 'secondary')

  return (
    <Stack direction="row" justify="space-between" align="center" m="1rem" p="2rem" boxShadow="bsBoldBlue" borderRadius="0 2rem" color={blackWhite}>
      <Link href={`?pg=${currentPage - 1}`} variant="primary" color={blackWhite} _hover={{color: "primary"}}>Previous Page</Link>
        {pages.map((page: any) => (
          page === "...Prev" && (
            <Menu key={page.index} placement="top">
              <MenuButton>...</MenuButton>
              <MenuList maxH="80vh !important" overflowY="scroll">
                {previousPages?.map((number: any) => (
                  <Link href={`?pg=${number}`} key={number}>
                    <MenuItem>{number}</MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          ) || page === "...Nex" && (
          <Menu key={page.index} placement="top">
            <MenuButton>...</MenuButton>
            <MenuList maxH="80vh !important" overflowY="scroll">
              {nextPages?.map((number: any) => (
                <Link href={`?pg=${number}`} key={number}>
                  <MenuItem>{number}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          ) || (
            page === currentPage ? (
              <Link color={primaryWhite} fontSize="1.4rem" fontWeight="900" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
            ) : (
              <Link href={`?pg=${page}`} variant="primary" color={blackWhite} _hover={{color: "primary"}} key={page?.index}>{page}</Link>
            )
          )
        ))}
      <Link href={`?pg=${currentPage + 1}`} variant="primary" color={blackWhite} _hover={{color: "primary"}}>Next Page</Link>
    </Stack>
  )
}