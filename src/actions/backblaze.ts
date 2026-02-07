// "use server"

// import supabase from "@/lib/supabase"
// import s3 from "@/lib/s3"

// import { DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommand } from "@aws-sdk/client-s3"
// import moment from "moment"
// import { revalidatePath } from "next/cache"

// type S3Payload = {
//   uploadDestination?: string
//   bucket: string
//   uploadEndpoint?: string
//   mediaID?: string
//   filePath?: string
//   getFileID?: string
//   redirectPath: string
// };

// export async function uploadFileToS3( files: File[], payload: S3Payload ): Promise<any[]> {
//   const { uploadDestination, bucket, uploadEndpoint, mediaID, redirectPath } = payload
//   try {
//     const response = await Promise.all(
//       files.map(async (file) => {
//         console.log("Upload Files", file)
//         const {name: fileName, type: fileType, lastModified: date, size: fileSize} = file
//         const fileExtension = fileType.split("/")[1]

//         const fileID = `${uploadDestination}_${
//           Date.now().toString(36).toUpperCase() +
//           Math.random().toString(36).substring(2, 5).toLowerCase() +
//           Math.random().toString(36).substring(2, 5).toUpperCase() +
//           Math.random().toString(36).substring(2, 5).toLowerCase()
//         }` as string

//         const filePath =
//           uploadDestination != "thumbnail/linkSet"
//             ? `${uploadDestination}/${fileID}.${fileExtension}`
//             : `${uploadDestination}/${mediaID}.${fileExtension}`

//         const arrayBuffer = await file.arrayBuffer()
//         const buffer = Buffer.from(arrayBuffer)

//         const uploadFileObject = {
//           Bucket: bucket,
//           Key: filePath,
//           Body: buffer,
//           ContentType: file.type,
//           ContentLength: fileSize
//         };

//         const uploadFile = new PutObjectCommand(uploadFileObject)
//         const upload = await s3.send(uploadFile)
//         const isFileUploaded = upload.$metadata.httpStatusCode === 200 ? true : false

//         if (isFileUploaded) {
//           try {
//             const id = mediaID ? mediaID : uploadDestination === "photography" ? "photo"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase() : "file"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

//             const { status: databaseS1Status, error: databaseS1Error } = await supabase.from(
//               uploadDestination === "photography" ? "PhotographyMedia"
//               : uploadDestination === "videography" ? "VideographyMedia"
//               : uploadDestination === "thumbnail" ? "ThumbnailMedia"
//               : null
//             ).insert({
//               fileID,
//               fileKey: filePath,
//               fileTitle: file.name,
//               fileExtension: fileExtension,
//               filePath: `${uploadEndpoint}/${filePath}`,
//               fileVersionID: upload.VersionId,
//               capturedOn: date ? moment(date) : moment(),
//               uploadedOn: moment(),
//               metadata: id
//             })

//             if (databaseS1Status === 201) {
//               try {
//                 uploadDestination === "photography" && await supabase.from("Photography").insert({
//                   id: id,
//                   fileID: fileID,
//                   lastUpdatedOn: date ? moment(date) : moment(),
//                   photoName: file.name,
//                   capturedOn: date ? moment(date) : moment(),
//                   uploadedOn: moment(),
//                   isPublic: false,
//                   isSetup: false,
//                   isPortfolio: false,
//                   isPinned: false,
//                 })

//                 uploadDestination === "videography" && await supabase.from("Videography").update({
//                   videoFileID: fileID,
//                   lastUpdatedOn: date ? moment(date) : moment()
//                 }).eq("id", id)

//                 uploadDestination === "thumbnail" && await supabase.from("Videography").update({
//                   thumbnailFileID: fileID,
//                   lastUpdatedOn: date ? moment(date) : moment()
//                 }).eq("id", id)
//               } catch (error) {
//                 console.error("Error adding file to database (2):", error)
//                 throw new Error("Couldn't upload the file to the database (2).")
//               }
//             }
//             return {
//               fileUploaded: isFileUploaded,
//               fileDatabase: databaseS1Status,
//               fileDatabaseError: databaseS1Error,
//               fileSetup: isFileUploaded && databaseS1Status === 201 ? true : false,
//               fileID,
//               id,
//               fileName,
//               filePath,
//             }
//           } catch (error) {
//             console.error("Error adding file to database:", error)
//             throw new Error("Couldn't upload the file to the database.")
//           }
//         }
//       })
//     )
//     revalidatePath(redirectPath)
//     return response
//   } catch (error) {
//     console.error("Error uploading file(s) to S3:", error)
//     throw new Error("Failed to upload file(s) to S3.")
//   }
// }

// export async function deleteFileFromS3( { bucket, filePath, getFileID, redirectPath}: S3Payload ): Promise<DeleteObjectCommandOutput> {
//   const deleteFile = new DeleteObjectCommand({ Bucket: bucket, Key: filePath })

//   try {
//     const sendDelete = await s3.send(deleteFile)

//     const isFileDeleted = sendDelete.$metadata.httpStatusCode === 204 ? true : false
//     try {
//       isFileDeleted && await supabase.from("PhotographyMedia").delete().eq('fileID', getFileID)
//     } catch (error) {
//       console.error("Error deleting database for file:", error)
//       throw new Error("Failed to delete database for file.")
//     }

//     revalidatePath(redirectPath)
//     return sendDelete
//   } catch (error) {
//     console.error("Error deleting file(s) from S3:", error)
//     throw new Error("Failed to delete file(s) from S3.")
//   }
// }
