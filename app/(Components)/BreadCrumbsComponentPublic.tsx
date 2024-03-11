import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react'
import { BsChevronRight, BsHouse } from 'react-icons/bs'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TbChevronRight, TbHome } from 'react-icons/tb'

interface BreadComp {
    breads: any
}

export const BreadCrumbPublic = (props: BreadComp) => {
    const { breads } = props
    const breadNumber = breads.length - 1
    
    return (
        <>
            <Breadcrumb m={{base: "0 0 1.5rem", lg:"-1.5rem -2rem 1.5rem"}} separator={<BsChevronRight />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/' border="none" _hover={{color: "white"}} color="secondary"><Icon as={BsHouse} m="0.25rem 0 0" /></BreadcrumbLink>
                </BreadcrumbItem> 
                {breads.map((bread:any, index: number) => (
                    <BreadcrumbItem key={index} isCurrentPage={index == breadNumber ? true : false}>
                        <BreadcrumbLink href={bread.pageLink}>{bread.pageName}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </>
    )
}