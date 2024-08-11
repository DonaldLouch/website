import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import supabase from "@/lib/supabase";
import { Stack, Input, Button, Box, Text, Group, rem, Title } from "@mantine/core";
;
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { BsCloudUpload } from "react-icons/bs";

import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Cancel01Icon, CloudUploadIcon, FileUploadIcon } from "@hugeicons/react";

export default function FileUploader({ mediaType, helperText, id, uploadTitle, props }: {mediaType: string, helperText?: string, id?: string, uploadTitle?: string, props?: Partial<DropzoneProps> }) {
    const router = useRouter()
    // const toast = useToast()

    // // console.log(id)

    const [isUploading, setUploading] = useState(false)
    const [isUploaded, setUploaded] = useState(false)
    
    function handleOnChange(changeEvent: any) {
      const reader = new FileReader();

      reader.onload = function() {
        setUploaded(false);
      }

      reader.readAsDataURL(changeEvent.target.files[0]);
    }
    
    async function handleOnSubmit(e: any) {
      setUploading(true)

      // e.preventDefault()

      // // console.log("Event", e)

      const files = e
      const uploadDestination = mediaType

      // // console.log(moment())

      e.forEach(async (file: any) => {
          // const date = new Date(file.lastModified) as any
          const body = new FormData()
          body.append("file", file)
          body.append('uploadDestination', uploadDestination)
          body.append('date', file.lastModifiedDate)
          id && body.append('mediaID', id)
          const upload = await fetch('/api/media/upload', { method: "POST", body }).then(response => response.json())
          mediaType != "videography" && mediaType != "thumbnail" && router.refresh()
          // upload.videoUploaded && router.push('/admin/videography/upload?step=3')
          // upload.thumbnailUploaded && router.push('/admin/videography/upload?step=4')
          
          // upload.videoUploaded && setVideoUploaded(true), setVideoID(upload.fileID), setFileID(upload.videoID), setThumbnailUploaded(isThumbnailUploaded)
          // upload.thumbnailUploaded && setThumbnailUploaded(true), setThumbnailID(upload.fileID), setFileID(upload.videoID), setVideoUploaded(isVideoUploaded)
      })
      
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

    return (<>
        {/* <Box as="main" color="white"> */}
        <Box m="2rem 2rem 0rem" color="white">
          <SectionCard styleType="primaryCard" id="mediaUpload"> 
            {/* <SectionTitle headingTitle={uploadTitle ? uploadTitle : "Upload Media"} /> */}
            <Dropzone
              onDrop={(files) => handleOnSubmit(files)}
              onReject={(files) => console.log('rejected files', files)}
              // maxSize={5 * 1024 ** 2}
              // accept={IMAGE_MIME_TYPE}
              bg="none"
              radius="md"
              c="white"
              {...props}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <FileUploadIcon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <Cancel01Icon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <CloudUploadIcon
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  />
                </Dropzone.Idle>

                <Stack gap="0">
                  <Title c="white">
                    {uploadTitle ? uploadTitle : "Upload Media"} 
                  </Title>
                  <Text size="sm" c="grey">
                    {helperText ? helperText : `Please note that once you have selected your media or media's you MUST click on the "<strong>Confirm Media Upload</strong>" Button to upload your media.`}
                  </Text>
                </Stack>
              </Group>
            </Dropzone>
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
        </Box>
    </>)
}