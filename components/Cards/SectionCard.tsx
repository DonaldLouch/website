import { 
  Box,
  useColorModeValue
} from '@chakra-ui/react'

interface CardProps {
    id: string
    styleType: string
    children: React.ReactNode
}

export const SectionCard = (props: CardProps) => {
    const { id, styleType, children } = props

    let stylesForComp =  {
        background: {
            bgLight: '',
            bgDark: ''
        }, 
        boxShadow: {
            bsLight: '',
            bsDark: ''
        }
    }
    
    if (styleType === 'primaryCard') {
        stylesForComp = {
            background: {
                bgLight: 'none',
                bgDark: 'none'
            }, 
            boxShadow: {
                bsLight: 'bsBoldBlue',
                bsDark: 'bsBoldBlue'
            }
        }
    }
     
    if (styleType === 'secondaryCard') {
        stylesForComp = {
            background: {
                bgLight: 'none',
                bgDark: 'none'
            }, 
            boxShadow: {
                bsLight: 'bsBoldOrange',
                bsDark: 'bsBoldOrange'
            }
        }
    } 

    return (
        <Box 
            as="section" 
            id={id} 
            filter="opacity(80%)" 
            p="2rem" 
            borderRadius="0 3rem 0 3rem" 
            mb="2rem" 
            bg={useColorModeValue(stylesForComp.background.bgLight, stylesForComp.background.bgDark)}
            boxShadow={useColorModeValue(stylesForComp.boxShadow.bsLight, stylesForComp.boxShadow.bsDark)}
            color={useColorModeValue('black', 'white')}
        >
            {children}
        </Box>
    )
}
