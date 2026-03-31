import { backblaze } from '@better-upload/server/clients';

const b2 = backblaze({
  region: "us-west-004",
  applicationKeyId: process.env.VITE_BACKBLAZE_APPLICATION_KEY_ID!,
  applicationKey: process.env.VITE_BACKBLAZE_APPLICATION_KEY!,
})

export default b2;