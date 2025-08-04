import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { Stack, Text, Group, Title, Progress, Grid, GridCol } from "@mantine/core";
;
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { notifications } from "@mantine/notifications";

import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileUploader({ mediaType, helperText, id, uploadTitle, props }: {mediaType: string, helperText?: string, id?: string, uploadTitle?: string, props?: Partial<DropzoneProps> }) {
    const router = useRouter()
    const pathname = mediaType === "videography" ? "/admin/videography/upload?step=2" : mediaType === "thumbnail" ? "/admin/videography/upload?step3" : `/admin/photography`

    // const toast = useToast()

    // // console.log(id)

    const [isUploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploaded, setIsUploaded] = useState(false)


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

      try {
        files.forEach((file: string | Blob) => {
          formData.append("files", file)
          
          const url = "/api/upload"
          
          axios
          .post(url, formData,
            {
              headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'multipart/form-data'
              },
              maxContentLength: 2e10,
              maxBodyLength: 2e10,
              onUploadProgress: (event: any) => {
                setUploadProgress(Math.round((event.loaded / event.total) * 100))
              }
            }
          )
            .then((upload) => {
              setUploading(false)
              setIsUploaded(true)
              const uploadURL = upload.data.uploadURL
              uploadURL.forEach((u: any) => {
                u.fileSetup && notifications.show({ 
                  id: `fileUploaded${u.fileName}`,
                  title: "File Uploaded!",
                  message:`You have successfully uploaded your ${mediaType} file titled "${u.fileName}"`,
                  color: "black",
                  icon: <FontAwesomeIcon icon={["fadl", "cloud-check"]} />
                })
                u.fileDatabase != 201 && notifications.show({ 
                  id: `fileUploaded${u.fileName}`,
                  title: `Error #${u.fileDatabaseError?.code} has Occurred`,
                  message:`An error has occurred: ${u.supabaseError?.message}. ${u.supabaseError?.hint && `${u.supabaseError?.hint}.`}`,
                  color: "red",
                  icon: <FontAwesomeIcon icon={["fadl", "cloud-exclamation"]} />
                })
              })
              mediaType != "videography" && mediaType != "thumbnail" && mediaType != "thumbnail/linkSet" && router.refresh()
              mediaType === "videography" && router.push(`/admin/videography/upload?step=3&id=${id}`)
              mediaType === "thumbnail" && router.push(`/admin/videography/upload?step=4&id=${id}`)
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response)
                console.log("server responded error")
              } else if (error.request) {
                console.log("network error")
              } else {
                console.log(error)
              }
            })
          })
      } catch (error) {
        console.error("File(s) couldn't be uploaded to S3", error)
      }
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
            <FontAwesomeIcon icon={["fadl", "cloud-check"]} size="4x" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FontAwesomeIcon icon={["fadl", "cloud-exclamation"]} size="4x" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <FontAwesomeIcon icon={["fadl", "cloud-arrow-up"]} size="4x" />
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
          <Text m="0" p="0" ta="right">
              {
                !isUploaded && isUploading ? uploadProgress < 100 ? `${uploadProgress}% Uploaded!` : "Processing Upload..."
                : isUploaded ? "Upload Complete!" : null
              }
            </Text>
        </GridCol>
      </Grid>
  </SectionCard>
}
