import { S3Client } from "@aws-sdk/client-s3";

export default new S3Client({
  endpoint: `https://${process.env.S3_HOST_NAME!}:443`,
  region: "sjc1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});