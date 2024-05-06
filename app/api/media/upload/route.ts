import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import cuid from "cuid";
import s3 from "@/lib/s3";
import supabase from "@/lib/supabase";
import cuid from "cuid";
import moment from "moment";

// export const config = {
//   api: {
//     responseLimit: false,
//   },
// }

const Bucket = process.env.S3_BUCKET_NAME
const HostName = process.env.S3_HOST_NAME

// const s3 = new S3Client({
//     endpoint: `https://${process.env.NEXT_PUBLIC_VULTR_HOST_NAME!}:443`,
//     region: "sjc1",
//     credentials: {
//         accessKeyId: process.env.NEXT_PUBLIC_VULTR_ACCESS_KEY!,
//         secretAccessKey: process.env.NEXT_PUBLIC_VULTR_SECRET_KEY!,
//     },
// })

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const date = formData.get("date") as any
    const fileName = file.name
    const fileExtension = file.type.split("/")[1];
    const uploadDestination = formData.get("uploadDestination") as string
    const fileID = `${uploadDestination}_${
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase() +
      Math.random().toString(36).substring(2, 5).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toLowerCase()
    }` as any;
    const filePath = `${uploadDestination}/${fileID}.${fileExtension}`;
    const Body = (await file.arrayBuffer()) as Buffer;
    const fileUpload = {
        Bucket,
        Key: filePath,
        ContentType: file.type,
        ACL: "public-read",
        Body,
    }; 

    //@ts-ignore
    const command = new PutObjectCommand(fileUpload)
    const upload = await s3.send(command)
    const fileUploaded = upload.$metadata.httpStatusCode === 200 ? true : false
    const uploadEndpoint = `https://${Bucket}.${HostName}`;
    
    console.log(upload)

    if (uploadDestination === "photography") {
      const photoID = cuid()
  
      const { status: supabaseStatus, error: supabaseError } = await supabase
        .from("PhotographyMedia")
        .insert({
          fileID,
          fileKey: filePath,
          fileTitle: file.name,
          fileExtension: fileExtension,
          filePath: `${uploadEndpoint}/${filePath}`,
          fileVersionID: upload.VersionId,
          takenOn: date ? moment(date) : moment(),
          uploadedOn: moment(),
          photoMetadata: photoID,
        });
          await supabase.from("Photography").insert({
            id: photoID,
            fileID: fileID,
            lastUpdatedOn: date ? moment(date) : moment(),
            photoName: file.name,
            takenOn: date ? moment(date) : moment(),
            uploadedOn: moment(),
            isPublic: false,
            isSetup: false,
            isPortfolio: false,
            isPinned: false,
          });
          return NextResponse.json({ fileName, filePath, supabaseStatus, supabaseError }, { status: 200 });
    }
    if (uploadDestination === "videography") {
      const videoID = formData.get("mediaID") as string;
      // console.log(videoID)
  
      const { status: supabaseStatus, error: supabaseError } = await supabase
        .from("VideographyMedia")
        .insert({
          fileID,
          fileKey: filePath,
          fileTitle: file.name,
          fileExtension: fileExtension,
          filePath: `${uploadEndpoint}/${filePath}`,
          fileVersionID: upload.VersionId,
          capturedOn: date ? moment(date) : moment(),
          uploadedOn: moment(),
          videoMetadata: videoID,
        });
         await supabase
           .from("Videography")
           .update({
             videoFileID: fileID,
             lastUpdatedOn: date ? moment(date) : moment(),
           })
           .eq("id", videoID);
          
          return NextResponse.json(
            {
              videoUploaded: fileUploaded,
              fileID,
              videoID,
              fileName,
              filePath,
              supabaseStatus,
              supabaseError
            },
            { status: 200 }
          );
    }
    if (uploadDestination === "thumbnail") {
      const videoID = formData.get("mediaID") as string;
  
      const { status: supabaseStatus, error: supabaseError } = await supabase
        .from("ThumbnailMedia")
        .insert({
          fileID,
          fileKey: filePath,
          fileTitle: file.name,
          fileExtension: fileExtension,
          filePath: `${uploadEndpoint}/${filePath}`,
          fileVersionID: upload.VersionId,
          capturedOn: date ? moment(date) : moment(),
          uploadedOn: moment(),
          thumbnailMetadata: videoID,
        });
          await supabase
            .from("Videography")
            .update({
              thumbnailFileID: fileID,
              lastUpdatedOn: date ? moment(date) : moment(),
            })
            .eq("id", videoID);
          return NextResponse.json(
            {
              thumbnailUploaded: fileUploaded,
              fileID,
              videoID,
              fileName,
              filePath,
              supabaseStatus,
              supabaseError
            },
            { status: 200 }
          );
    }
}