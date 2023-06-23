import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface BreadComp {
    breads: any
}

export const BreadCrumb = (props: BreadComp) => {
    const { breads } = props
    const breadNumber = breads.length - 1
    // const breadsItem = breads.split("||")
    // console.log(breads)
    return (
        <>
            <Breadcrumb m={{base: "0 0 1.5rem", lg:"-1.5rem -2rem 1.5rem"}} separator={<FontAwesomeIcon icon={["fal", "chevron-right"]} color="currentColor" height="100%" width="auto" />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/portal' border="none" _hover={{color: "secondary"}}><FontAwesomeIcon icon={["fal", "house"]} color="currentColor" height="100%" width="auto" /></BreadcrumbLink>
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