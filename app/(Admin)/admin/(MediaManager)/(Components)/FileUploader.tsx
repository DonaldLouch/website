import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import supabase from "@/lib/supabase";
import { Stack, Input, Button, Box, Text, Group, rem, Title, Progress, Grid, GridCol } from "@mantine/core";
;
import moment from "moment";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
// import { BsCloudUpload } from "react-icons/bs";

import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { AlertDiamondIcon, Cancel01Icon, CloudUploadIcon, FileUploadIcon } from "@hugeicons/react";
import { notifications } from "@mantine/notifications";
import { uploadFileToS3 } from "@/app/actions/backblaze";

import axios from "axios"

export default function FileUploader({ mediaType, helperText, id, uploadTitle, props }: {mediaType: string, helperText?: string, id?: string, uploadTitle?: string, props?: Partial<DropzoneProps> }) {
    const router = useRouter()
    const pathname = mediaType === "videography" ? "/admin/videography/upload?step=2" : mediaType === "thumbnail" ? "/admin/videography/upload?step3" : `/admin/photography`

    // const toast = useToast()

    // // console.log(id)

    const [isUploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)


    // let upload = null

    
    
    // function handleOnChange(changeEvent: any) {
    //   const reader = new FileReader();

    //   reader.onload = function() {
    //     setUploaded(false);
    //   }

    //   reader.readAsDataURL(changeEvent.target.files[0]);
    // }
    async function handleOnSubmit(e: any) {
      setUploading(true)

      // const xhr = new XMLHttpRequest()

      const files = e
      const uploadDestination = mediaType

      const formData = new FormData()
      const s3Payload = {
        uploadDestination,
        mediaID: id,
        bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        uploadEndpoint: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_HOST_NAME!}`,
        redirectPath: pathname
      } as any
      formData.append('payload', JSON.stringify(s3Payload))


    }

  return <SectionCard styleType="primaryCard" id="mediaUpload">
      <Dropzone
        onDrop={(files) => handleOnSubmit(files)}
        onReject={(files) => console.log('rejected files', files)}
        // maxSize={5 * 1024 ** 2}
        // accept={IMAGE_MIME_TYPE}
        // loading={isUploading}
        bg="none"
        radius="md"
        c="white"
        {...props}
      >
        <Group justify="center" gap="2rem" style={{ pointerEvents: 'none' }} py="4rem">
          <Dropzone.Accept>
            <FileUploadIcon variant="twotone" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Cancel01Icon variant="twotone" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <CloudUploadIcon variant="twotone" size="5rem" />
          </Dropzone.Idle>

          <Stack gap="0" m="0" p="0">
            <Title c="white" lh="1" fw="900" ff="text" ta={{base: "center", lg: "left"}}>
              {uploadTitle ? uploadTitle : "Upload Media"} 
            </Title>
            <Text size="sm" c="grey" lh="1" ta={{base: "center", lg: "left"}}>
              {helperText ? helperText : "Drag and Drop or Click to Upload File(s)"}
            </Text>
          </Stack>
        </Group>
      </Dropzone>
      <Grid align="center" justify="space-evenly" gutter="1rem" m="1rem 0.5rem 0" w="100%">
        <GridCol span={10}>
          <Progress radius="sm" size="2rem" value={uploadProgress} color="primary" animated={isUploading} bg="none"  />
        </GridCol>
        <GridCol span={2}>
          <Text m="0" p="0" ta="right">{uploadProgress}% Uploaded!</Text>
        </GridCol>
      </Grid>
  </SectionCard>
}
