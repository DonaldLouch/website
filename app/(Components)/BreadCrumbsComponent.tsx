import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Text } from '@chakra-ui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BsHouse } from "react-icons/bs"
import { BsChevronRight } from "react-icons/bs"
// import { TbChevronRight } from "react-icons/tb";
import HouseIcon from './(Vectors)/house';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BreadComp {
    breads: any
}

export const BreadCrumb = (props: BreadComp) => {
    const { breads } = props
    const breadNumber = breads.length - 1
    
    return (
        <>
            <Breadcrumb m={{base: "0 0 1.5rem", lg:"-1.5rem -2rem 1.5rem"}} separator={<BsChevronRight />}>
                <BreadcrumbItem>
                {/* mt="-0.2rem" */}
                    <BreadcrumbLink href='/portal' _hover={{color: "white"}} color="secondary">
                        <BsHouse />
                        {/* <FontAwesomeIcon icon={["fal", "home"]} /> */}
                    </BreadcrumbLink>
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