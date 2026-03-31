import { Stack, Text, Group, Title, Progress, Grid, GridCol } from "@mantine/core";

import { useState } from "react";

import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { notifications } from "@mantine/notifications";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { SectionCard } from "@/components/cards/SectionCard";

import { useUploadFiles } from '@better-upload/client';
import { AddMedia, UploadMetaData } from "@/actions/database/AddDatabase.functions";
import { moveObject } from '@better-upload/server/helpers';
import { backblaze } from "@better-upload/server/clients";
import { clientB2 } from "@/lib/b2Client";
import { meta } from "zod/v4/core";

type FileUploaderProps = {
  mediaType: string, 
  helperText?: string,
  id?: string,
  uploadTitle?: string,
  props?: Partial<DropzoneProps>
};

// export const clientS3 = backblaze({
//   region: "us-west-004",
//   applicationKeyId: import.meta.env.VITE_BACKBLAZE_APPLICATION_KEY_ID!,
//   applicationKey: import.meta.env.VITE_BACKBLAZE_APPLICATION_KEY!,
// })

export default function FileUploader({ mediaType, helperText, id, uploadTitle, props }: FileUploaderProps) {
    const router = useRouter()
    const navigate = useNavigate()

    const pathname = mediaType === "videography" ? "/admin/videography/upload?step=2" : mediaType === "thumbnail" ? "/admin/videography/upload?step3" : `/admin/photography`

    const [isUploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploaded, setIsUploaded] = useState(false)

    const uploadDestination = mediaType
    const uploadEndpoint = `https://${import.meta.env.VITE_S3_BUCKET_NAME}.${import.meta.env.VITE_S3_HOST_NAME}`

    const { upload } = useUploadFiles({
      route: mediaType === "videography" ? 'videos' : 'images',
      // onBeforeUpload: async ({ files }) => {
      //   // console.log(files, "files received in onBeforeUpload callback")
      //   setUploading(true)
      //   setUploadProgress(0)
      //   files.forEach((file) => {
      //     // console.log("Preparing file for upload", file)
      //     const uploadMetadata = {
      //       fileName: file.name,
      //       fileType: file.type,
      //       date: new Date(file.lastModified),
      //       mediaID: id,
      //     } as UploadMetaData
      //     // console.log("File metadata", uploadMetadata)

      //     const fileExtension = uploadMetadata.fileType.split("/")[1]

      //     const fileID = `${uploadDestination}_${
      //       Date.now().toString(36).toUpperCase() +
      //       Math.random().toString(36).substring(2, 5).toLowerCase() +
      //       Math.random().toString(36).substring(2, 5).toUpperCase() +
      //       Math.random().toString(36).substring(2, 5).toLowerCase()
      //     }` as string

      //     const filePath =
      //       uploadDestination != "thumbnail/linkSet"
      //         ? `${uploadDestination}/${fileID}.${fileExtension}`
      //         : `${uploadDestination}/${uploadMetadata.mediaID}.${fileExtension}`
      //     // console.log("Generated file path for S3 upload", filePath)

      //     return {
      //      objectInfo: () => ({
      //         folder: filePath,
      //       })
      //     }
      //   })
      // },
      onError: (error) => {
        // console.error("Upload error", error)
        setUploading(false)
        notifications.show({
          id: `uploadError${id}`,
          title: `Upload Failed (${error.type})`,
          message: `${error.message || "An error occurred during the upload. Please try again."}`,
          color: "red",
          icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
        })
      },
      onUploadProgress: (event) => {
        // console.log(`Upload progress: ${event.file.progress * 100}% for file ${event.file.name}`)
        setUploadProgress(Math.round((event.file.progress) * 100))
      },
      onUploadComplete: (response) => {
        // console.log("Upload complete", response)
        response.files.forEach(async (file) => {
          // console.log("Prep for database", file)

          const fileID = `${uploadDestination}_${
            Date.now().toString(36).toUpperCase() +
            Math.random().toString(36).substring(2, 5).toLowerCase() +
            Math.random().toString(36).substring(2, 5).toUpperCase() +
            Math.random().toString(36).substring(2, 5).toLowerCase()
        }` as string

        const fileExtension = file.raw.type.split("/")[1]
        const filePath =
          uploadDestination != "thumbnail/linkSet"
              ? `${uploadDestination}/${fileID}.${fileExtension}`
              : `${uploadDestination}/${id}.${fileExtension}`

          const metadata = {
            fileID,
            fileExtension,
            fileName: file.raw.name,
            fileType: file.raw.type,
            date: new Date(file.raw.lastModified),
            fileSize: file.raw.size,
            uploadDestination,
            uploadEndpoint, 
            mediaID: id,
            redirectPath: pathname,
            versionID: "",
            filePath
          } as UploadMetaData


          await moveObject(clientB2, {
            source: {
              bucket: import.meta.env.VITE_S3_BUCKET_NAME!,
              key: file.objectInfo.key,
            },
            destination: {
              bucket: import.meta.env.VITE_S3_BUCKET_NAME!,
              key: filePath
            },
          });

          // console.log("File metadata for database entry", metadata)

          const res = await AddMedia({ data: { metadata }}) as any
          // console.log("Database response", res)
          res.success && console.log("File metadata successfully added to database")

          res.success && notifications.show({ 
            id: `fileUploaded${metadata.fileName}`,
            title:  res.success ? "File Uploaded!" : `An Error Has Occurred.`,
            message: res.success ?  `You have successfully uploaded your ${mediaType} file titled "${metadata.fileName}"` : res.error.message || "An error occurred while uploading the file.",
            color: res.success ? "black" : "red",
            icon: res.success ? <FontAwesomeIcon icon={["fadl", "cloud-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
          })
        })
        setUploading(false)
        setIsUploaded(true)
        mediaType != "videography" && mediaType != "thumbnail" && mediaType != "thumbnail/linkSet" && router.invalidate()
        // mediaType === "videography" && navigate({ to: "/admin/videography/upload", search: {step: 3, id}})
        // mediaType === "thumbnail" && navigate({ to: "/admin/videography/upload", search: {step: 4, id}})
      }
    })

    async function UploadFiles(files: File[]) {
      try {
        // console.log("Uploading", files)
        setUploading(true)
        await upload(files as any)
      } catch (err) {
        console.error("Upload failed", err)
        setUploading(false)
      }
    }

    // async function handleOnSubmit(e: any) {
    //   setUploading(true)

    //   // const xhr = new XMLHttpRequest()

    //   const files = e
    //   const uploadDestination = mediaType

    //   // const formData = new FormData()
    //   // const s3Payload = {
    //   //   uploadDestination,
    //   //   mediaID: id,
    //   //   bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    //   //   uploadEndpoint: `https://${import.meta.env.VITE_S3_BUCKET_NAME}.${import.meta.env.VITE_S3_HOST_NAME}`,
    //   //   redirectPath: pathname
    //   // } as any
    //   // formData.append('payload', JSON.stringify(s3Payload))

    //   try {
    //     files.forEach((file: string | Blob) => {
    //       // Use the top-level `control` to upload rather than calling hooks here
    //       // kept for future per-file custom logic if needed
    //       console.log(file)
    //       // const formData = new FormData()
    //       // formData.set("file", file)
    //       // // formData.append("files", file)
    //       // const res = uploadFileFromS3({ data: {file: formData, payload: s3Payload}})
    //       // console.log(formData.get("file"))
    //       // const url = "/api/upload"
          
    //       // axios
    //       // .post(url, formData,
    //       //   {
    //       //     headers: {
    //       //       'x-ms-blob-type': 'BlockBlob',
    //       //       'Content-Type': 'multipart/form-data'
    //       //     },
    //       //     maxContentLength: 2e10,
    //       //     maxBodyLength: 2e10,
    //       //     onUploadProgress: (event: any) => {
    //       //       setUploadProgress(Math.round((event.loaded / event.total) * 100))
    //       //     }
    //       //   }
    //       // )
    //       //   .then((upload) => {
    //       //     setUploading(false)
    //       //     setIsUploaded(true)
    //       //     const uploadURL = upload.data.uploadURL
    //       //     uploadURL.forEach((u: any) => {
    //       //       u.fileSetup && notifications.show({ 
    //       //         id: `fileUploaded${u.fileName}`,
    //       //         title: "File Uploaded!",
    //       //         message:`You have successfully uploaded your ${mediaType} file titled "${u.fileName}"`,
    //       //         color: "black",
    //       //         icon: <FontAwesomeIcon icon={["fadl", "cloud-check"]} />
    //       //       })
    //       //       u.fileDatabase != 201 && notifications.show({ 
    //       //         id: `fileUploaded${u.fileName}`,
    //       //         title: `Error #${u.fileDatabaseError?.code} has Occurred`,
    //       //         message:`An error has occurred: ${u.supabaseError?.message}. ${u.supabaseError?.hint && `${u.supabaseError?.hint}.`}`,
    //       //         color: "red",
    //       //         icon: <FontAwesomeIcon icon={["fadl", "cloud-exclamation"]} />
    //       //       })
    //       //     })
    //       //     mediaType != "videography" && mediaType != "thumbnail" && mediaType != "thumbnail/linkSet" && router.invalidate()
    //       //     // mediaType === "videography" && navigate({ to: "/admin/videography/upload", search: {step: 3, id}})
    //       //     // mediaType === "thumbnail" && navigate({ to: "/admin/videography/upload", search: {step: 4, id}})
    //       //   })
    //       //   .catch((error) => {
    //       //     if (error.response) {
    //       //       console.log(error.response)
    //       //       console.log("server responded error")
    //       //     } else if (error.request) {
    //       //       console.log("network error")
    //       //     } else {
    //       //       console.log(error)
    //       //     }
    //       //   })
    //       })
    //   } catch (error) {
    //     console.error("File(s) couldn't be uploaded to S3", error)
    //   }
    // }

  return <SectionCard styleType="primaryCard" id="mediaUpload">
      <Dropzone
        onDrop={(files) => UploadFiles(files)}
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
