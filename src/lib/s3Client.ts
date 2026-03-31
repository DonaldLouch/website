import { backblaze } from '@better-upload/server/clients';

export const clientS3 = backblaze({
  region: "us-west-004",
  applicationKeyId: import.meta.env.VITE_BACKBLAZE_APPLICATION_KEY_ID!,
  applicationKey: import.meta.env.VITE_BACKBLAZE_APPLICATION_KEY!,
})


// export default function s3() { return backblazeCall }