import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: "us-west-004",
  credentials: {
    accessKeyId: process.env.VITE_BACKBLAZE_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.VITE_BACKBLAZE_APPLICATION_KEY!,
  },
  endpoint: "https://s3.us-west-004.backblazeb2.com",
});