'use client'

import EditProject from "./EditProject";
import EditDetails from "./EditDetails";

export default async function DetailsComponent({project, isStaff}: any) {
    return (
        <>
            {isStaff && <EditProject project={project} /> } 
            <EditDetails project={project} />
        </>
    )
}
