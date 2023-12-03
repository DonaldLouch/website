import { S3Client } from "@aws-sdk/client-s3";

export default new S3Client({
  endpoint: `https://${process.env.NEXT_PUBLIC_VULTR_HOST_NAME!}:443`,
  region: "sjc1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_VULTR_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_VULTR_SECRET_KEY!,
  },
});