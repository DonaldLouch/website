'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"
import { Box } from "@mantine/core"

// import * as yup from "yup"

export default function PAGETITLEPage(){
  const breadCrumbs = [
    {"pageLink": "/portal/test", "pageName": "Test"}
  ]

  // Form
  // const onSubmit = async (values: any) => {}
  // const initialValues= {}
  // const schema = yup.object().shape({})
  // const form = useForm({
  //     mode: 'controlled',
  //     initialValues,
  //     validate: yupResolver(schema)
  // })

  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box component="main" color="white">
            {/* CONTENT GOES HERE! */}
        </Box>
    </>
  )
}
