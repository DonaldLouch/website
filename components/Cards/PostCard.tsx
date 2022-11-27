import { 
    Box,
    useColorModeValue
  } from '@chakra-ui/react'
  
  interface CardProps {
    //   id: string
    //   styleType: string
      children: React.ReactNode
  }
  
  export const PostCard = (props: CardProps) => {
      const { children } = props
  
    //   let stylesForComp =  {
    //       background: {
    //           bgLight: '',
    //           bgDark: ''
    //       }, 
    //       boxShadow: {
    //           bsLight: '',
    //           bsDark: ''
    //       }
    //   }
      
    //   if (styleType === 'primaryCard') {
    //       stylesForComp = {
    //           background: {
    //               bgLight: 'none',
    //               bgDark: 'none'
    //           }, 
    //           boxShadow: {
    //               bsLight: 'bsBoldBlue',
    //               bsDark: 'bsBoldBlue'
    //           }
    //       }
    //   }
       
    //   if (styleType === 'secondaryCard') {
    //       stylesForComp = {
    //           background: {
    //               bgLight: 'none',
    //               bgDark: 'none'
    //           }, 
    //           boxShadow: {
    //               bsLight: 'bsBoldOrange',
    //               bsDark: 'bsBoldOrange'
    //           }
    //       }
    //   } 
  
      return (
        <Box as="article" id="post" boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")} p="4rem 2rem" borderRadius="0 3rem">
              {children}
          </Box>
      )
  }
  