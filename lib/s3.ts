import { S3Client } from "@aws-sdk/client-s3"

export default new S3Client({
  endpoint: `https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}`,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  }
})