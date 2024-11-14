// import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

// import s3 from "@/lib/s3"
// import { revalidatePath } from "next/cache";

// type UploadImageToS3Payload = {
//   bucket: string
//   key: string
// };
// formData: FormData, payload: UploadImageToS3Payload)
export async function POST(request: Request) {
// export async function POST() {
//   const { bucket, key } = payload
  console.log("Hello!")

//   try {
//     const files = formData.getAll("file") as File[]

//     const date = formData.get("date") as any
//     const uploadDestination = formData.get("uploadDestination") as string
    
//     // const uploadEndpoint = `https://${bucket}.${HostName}`;
   
//     const response = await Promise.all(
//         files.map(async (file) => {
//             const {name: fileName, type: fileType} = file
//             const fileExtension = fileType.split("/")[1]

//             const fileID = `${uploadDestination}_${
//                 Date.now().toString(36).toUpperCase() +
//                 Math.random().toString(36).substring(2, 5).toLowerCase() +
//                 Math.random().toString(36).substring(2, 5).toUpperCase() +
//                 Math.random().toString(36).substring(2, 5).toLowerCase()
//             }` as string

//             const filePath = `${uploadDestination}/${fileID}.${fileExtension}`;

//             const arrayBuffer = await file.arrayBuffer()
//             const buffer = Buffer.from(arrayBuffer)

//             const uploadFileObject = {
//                 Bucket: bucket,
//                 Key: key,
//                 Body: buffer,
//                 ContentType: file.type,
//                 acl: "public-read",
//             }

//             const uploadFile = new PutObjectAclCommand(uploadFileObject)
//             const upload = await s3.send(uploadFile)
//             const isFileUploaded = upload.$metadata.httpStatusCode === 200 ? true : false
//             console.log("Upload RES", isFileUploaded, upload)
//         })
//     )

//     revalidatePath("/")
//     return response
//   } catch (error) {
//     console.error("Error uploading file(s) to S3:", error)
//     throw new Error("Failed to upload file(s) to S3.")
//   }
}
