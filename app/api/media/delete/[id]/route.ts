import s3 from "@/lib/s3"
import { DeleteBucketLifecycleCommand, DeleteObjectCommand, DeleteObjectsCommand, GetBucketLifecycleConfigurationCommand, S3Client } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

// const s3 = new S3Client({
//   endpoint: `https://${process.env.NEXT_PUBLIC_VULTR_HOST_NAME!}:443`,
//   region: "sjc1",
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_VULTR_ACCESS_KEY!,
//     secretAccessKey: process.env.NEXT_PUBLIC_VULTR_SECRET_KEY!,
//   },
// });
export async function POST(request: Request) {
  const formData = await request.formData()
  const id = formData.get("fileKey") as string
  const versionID = formData.get("versionID") as string

  const fileDelete = {
    "Bucket": process.env.S3_BUCKET_NAME,
    "Delete": {
      "Objects": [
        {
          "Key": id,
          "VersionId": versionID,
        }
      ],
      // "Quiet": true
    }
  }
  const command = new DeleteObjectsCommand(fileDelete)
  const response = await s3.send(command);

  console.log(response)


  return NextResponse.json({ response }, { status: 200 });
}
