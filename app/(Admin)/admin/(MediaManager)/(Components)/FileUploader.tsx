import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import supabase from "@/lib/supabase";
import { Stack, Input, Button, Box, Text, Group, rem, Title, Progress } from "@mantine/core";
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
    const [isUploaded, setUploaded] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)


    // let upload = null

    
    
    // function handleOnChange(changeEvent: any) {
    //   const reader = new FileReader();

    //   reader.onload = function() {
    //     setUploaded(false);
    //   }

    //   reader.readAsDataURL(changeEvent.target.files[0]);
    // }
    const initialState = {
      message: null
    }
    async function handleOnSubmit(e: any) {
      setUploading(true)

      // const xhr = new XMLHttpRequest()

      const files = e
      const uploadDestination = mediaType

      const s3Payload = {
        uploadDestination,
        mediaID: id,
        bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        uploadEndpoint: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_HOST_NAME!}`,
        redirectPath: pathname
      }
      
      try {
        const formData = new FormData()
        const url = uploadFileToS3(formData, s3Payload) as any
        // files.forEach((file: string | Blob) => formData.append("file", file))
        files.forEach((file: string | Blob) => {
          // const [state, formAction] = useActionState(uploadFileToS3, initialState);
          const { pending } = useFormStatus()
          console.log(pending)
          // console.log(pending)
          
          
          formData.append("file", file)
          // formData.append('s3Payload', s3Payload)
          axios
            .post(url,
              {
                headers: {
                  'x-ms-blob-type': 'BlockBlob',
                  // 'Content-Type': file.type
                },
                maxContentLength: 2e10,
                maxBodyLength: 2e10,
                onUploadProgress: (event: any) => {
                  // if (event.lengthComputable) {
                    console.log("Hello from event", event)
                    setUploadProgress(Math.round((event.loaded / event.total) * 100))
                  // }
                }
              }
            ).then((response) => {
              console.log(response)
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response)
                console.log("server responded")
              } else if (error.request) {
                console.log("network error")
              } else {
                console.log(error)
              }
            })
            setUploading(pending)
          setUploaded(pending ? true : false)
        })
        
// useEffect(() => {
//           xhr.upload.addEventListener('progress', (event: { loaded: number; total: number; }) => {
//             // updateStatusMessage(`⏳ Uploaded ${event.loaded} bytes of ${event.total}`);
//             setUploadProgress(event.loaded / event.total)
//             // updateProgressBar(event.loaded / event.total);
//           })
//         }, [xhr])
  //         xhr.open(method, url);

    // const upload = await axios.get(uploadFileToS3(formData, {
    //     uploadDestination,
    //     mediaID: id,
    //     bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    //     uploadEndpoint: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_HOST_NAME!}`
    //   }))

    // console.log(response);
      // const upload = await uploadFileToS3(formData, {
      //   uploadDestination,
      //   mediaID: id,
      //   bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      //   uploadEndpoint: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_HOST_NAME!}`
      // }) as any

      // var formData = new FormData();
      // var imagefile = document.querySelector('#file');
      // formData.append("image", imagefile.files[0]);
      // axios.post(upload, { 
      // onUploadProgress: (progressEvent: { loaded: number; total: number; }) => {
      //   const { loaded, total } = progressEvent
      //   setUploadProgress(Math.floor((loaded * 100) / total))
      //   // console.log(precentage);
      // },
      // headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      // }).then((res) => {console.log("got it")})
      // xhr.send(upload)

      //   console.log(upload)

        // upload.forEach((u: any) => {
        //   u.fileSetup && notifications.show({ 
        //     id: `fileUploaded${u.fileName}`,
        //     title: "File Uploaded!",
        //     message:`You have successfully uploaded your ${mediaType} file titled "${u.fileName}"`,
        //     color: "black",
        //     icon: <FileUploadIcon variant="twotone" />
        //   })
        //   u.fileDatabase != 201 && notifications.show({ 
        //     id: `fileUploaded${u.fileName}`,
        //     title: `Error #${u.fileDatabaseError?.code} has Occurred`,
        //     message:`An error has occurred: ${u.supabaseError?.message}. ${u.supabaseError?.hint && `${u.supabaseError?.hint}.`}`,
        //     color: "red",
        //     icon: <AlertDiamondIcon variant="twotone" />
        //   })
        // })
        
        // mediaType != "videography" && mediaType != "thumbnail" && router.refresh()
        // upload.fileDatabase === 201 && mediaType === "videography" && router.push(`/admin/videography/upload?step=3`); router.refresh()
        // upload.fileDatabase === 201 && mediaType === "thumbnail" && router.push(`/admin/videography/upload?step=4`); router.refresh()
      } catch (error) {
        console.error("File(s) couldn't be uploaded to S3", error)
      }

    
      // e.forEach(async (file: any) => {
      //     // const date = new Date(file.lastModified) as any
      //     console.log("Going to start the upload!")
      //     const body = new FormData()
      //     body.append("file", file)
      //     body.append('uploadDestination', uploadDestination)
      //     body.append('date', file.lastModifiedDate)
      //     id && body.append('mediaID', id)
      //     const upload = await fetch('/api/media/upload2', { method: "POST", body }).then(response => response.json())
      //     console.log("Upload Process Done", upload)
      //   //   upload.supabaseStatus && notifications.show({ 
      //   //     title: `${upload.supabaseStatus === 201 ? "File Uploaded!" : `Error #${upload.supabaseError?.code} has Occurred`}`, 
      //   //     message:`${upload.supabaseStatus === 201 ? `You have successfully uploaded your ${mediaType} file titled "${upload.fileName}"` : `An error has occurred: ${upload.supabaseError?.message}. ${upload.supabaseError?.hint && `${upload.supabaseError?.hint}.`}`}`, 
      //   //     color: upload.supabaseStatus === 201 ? "black" : "red",
      //   //     icon: upload.supabaseStatus === 201 ? <FileUploadIcon variant="twotone" /> : <AlertDiamondIcon variant="twotone" />
      //   // })

      //   // mediaType != "videography" && mediaType != "thumbnail" && router.refresh()
      //   // upload.supabaseStatus === 201 && mediaType === "videography" && router.push(`/admin/videography/upload?step=3`); router.refresh()
      //   // upload.supabaseStatus === 201 && mediaType === "thumbnail" && router.push(`/admin/videography/upload?step=4`); router.refresh()
          
      //     // upload.videoUploaded && setVideoUploaded(true), setVideoID(upload.fileID), setFileID(upload.videoID), setThumbnailUploaded(isThumbnailUploaded)
      //     // upload.thumbnailUploaded && setThumbnailUploaded(true), setThumbnailID(upload.fileID), setFileID(upload.videoID), setVideoUploaded(isVideoUploaded)
      // })
      
      // const findFileName = ({ name }: any) => name === 'file[]'
      // const form = e.currentTarget
      // const fileInput = Array.from(form.elements).find(findFileName) as any

      // const uploadDestination = mediaType
      //  for ( const file of fileInput.files ) {
      //     const body = new FormData()
      //     body.append("file", file, file.name)
      //     body.append('uploadDestination', uploadDestination)
      //     id && body.append('mediaID', id)

      //     const upload = await fetch('/api/media/upload', { method: "POST", body }).then(response => response.json())
      //     upload.supabaseStatus &&
            // toast({
            //     title: `${upload.supabaseStatus === 201 ? "Media Uploaded 🎉" : `Error #${upload.supabaseError?.code} has Occurred`}`,
            //     description: `${upload.supabaseStatus === 201 ? `You have successfully uploaded ${upload.fileName} at ${upload.filePath}!` : `An error has occurred: ${upload.supabaseError?.message}. ${upload.supabaseError?.hint && `${upload.supabaseError?.hint}.`}`}`,
            //     status: `${upload.supabaseStatus === 201 ? "success" : "error"}`,
            //     duration: 9000,
            //     isClosable: true,
            // })
            // upload.videoUploaded && router.push('/admin/videography/upload?step=3')
            // upload.thumbnailUploaded && router.push('/admin/videography/upload?step=4')
            
            // upload.videoUploaded && setVideoUploaded(true), setVideoID(upload.fileID), setFileID(upload.videoID), setThumbnailUploaded(isThumbnailUploaded)
            // upload.thumbnailUploaded && setThumbnailUploaded(true), setThumbnailID(upload.fileID), setFileID(upload.videoID), setVideoUploaded(isVideoUploaded)
        // }
        
        // mediaType != "videography" && mediaType != "thumbnail" && router.refresh()
        // setUploading(false)
        // setUploaded(true)
    }

    // // console.log(isVideoUploaded, isThumbnailUploaded, fileID, videoID, thumbnailID)
    
    // useEffect(() => {
    //     // console.log("Hello from use effect!")
    //     async ({isVideoUploaded, isThumbnailUploaded, fileID, videoID, thumbnailID}: {isVideoUploaded: boolean, isThumbnailUploaded: boolean, fileID: string, videoID: string, thumbnailID: string}) => {
    //         if (isVideoUploaded && isThumbnailUploaded) {
    //             const { status: supabaseStatus, error: supabaseError } = await supabase.from("Videography").insert({
    //               id: fileID,
    //               videoFileID: videoID,
    //               thumbnailFileID: thumbnailID,
    //               lastUpdatedOn: moment(),
    //               videoName: null,
    //               uploadedOn: moment(),
    //               isPublic: false,
    //               isSetup: false,
    //               isPortfolio: false,
    //               isPinned: false,
    //             });
    //             supabaseStatus === 201 && toast({
    //                 title: `${supabaseStatus === 201 ? "Media Uploaded 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
    //                 description: `${supabaseStatus === 201 ? `You have successfully uploaded your video and thumbnail!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
    //                 status: `${supabaseStatus === 201 ? "success" : "error"}`,
    //                 duration: 9000,
    //                 isClosable: true,
    //             })
    //         }
    //     }
    // }, [isVideoUploaded, isThumbnailUploaded])

    return <>
        {/* <Box as="main" color="white"> */}
        {/* <Box m="2rem 2rem 0rem" color="white"> */}
          <SectionCard styleType="primaryCard" id="mediaUpload"> 
            {/* <SectionTitle headingTitle={uploadTitle ? uploadTitle : "Upload Media"} /> */}
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
                  {/* <FileUploadIcon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                  /> */}
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <Cancel01Icon variant="twotone" />
                  {/* <Cancel01Icon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  /> */}
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <CloudUploadIcon variant="twotone" size="5rem" />
                  {/* <CloudUploadIcon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  /> */}
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
            <Text>Is Uploading: <strong>{isUploading ? "Yes" : "No"}</strong> | Is Uploaded: <strong>{isUploaded ? "Yes" : "No"}</strong></Text>
            <Text>{uploadProgress}% Uploaded!</Text>
            {/* <Progress radius="0 0 0 1rem" size="xl" value={uploadProgress} color="primary" mt="0.5rem" animated /> */}
            {/* {upload?.status && (
              )} */}
            {/* <Text ta="center">{helperText ? helperText : `Please note that once you have selected your media or media's you MUST click on the "<strong>Confirm Media Upload</strong>" Button to upload your media.`}</Text>  */}
            {/* <Text ta="center">{helperText ? helperText : `THE MEDIA UPLOADER IS CURRENTLY DISABLED!`}</Text>  */}
            {/* <Stack component="form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} boxShadow="bsBoldPrimary" p="2rem" direction="row" alignItems="center" borderRadius="0 2rem" m="1.5rem 0 0.5rem"> 
              <InputGroup border="none" appearance="none" outline="none">
                <InputLeftElement pointerEvents='none' fontSize="2xl">
                  <BsCloudUpload />
                </InputLeftElement>
                <Input 
                  type='file' 
                  name="file[]" 
                  id="file"
                  multiple 
                  sx={{
                    "::file-selector-button": {
                      display: "none",
                    }
                  }}
                  p="0.4rem 3rem"
                  border="none"
                ></Input>
              </InputGroup>
              <Button variant="newFormButton" type="submit" isLoading={isUploading === true} width="60%">{isUploaded ? "Previous Files Uploaded! Reload to See or Select New FIles" : "Confirm Media Upload"}</Button>
            </Stack>  */}
          </SectionCard>
        {/* </Box> */}
    </>
}

function useFormStatus(): { pending: any; } {
  throw new Error("Function not implemented.");
}
