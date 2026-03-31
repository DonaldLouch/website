import { createFileRoute } from '@tanstack/react-router';
import { handleRequest, route, type Router } from '@better-upload/server';
// import { backblaze } from '@better-upload/server/clients';
import b2 from '@/lib/b2';

// const s3 = backblaze({
//   region: "us-west-004",
//   applicationKeyId: process.env.VITE_BACKBLAZE_APPLICATION_KEY_ID!,
//   applicationKey: process.env.VITE_BACKBLAZE_APPLICATION_KEY!,
// })

const router: Router = {
  client: b2,
  bucketName: "donaldlouch", 
  routes: {
    images: route({
      fileTypes: ['image/*'],
      multipleFiles: true,
      multipart: true, 
      partSize: 1024 * 1024 * 50,
      // onBeforeUpload: async ({ req, files, clientMetadata }) => {
      //   console.log("Before upload hook triggered", { req, files, clientMetadata })
      // //   // return {
      // //   //   generateObjectInfo: ({ file }) => ({
      // //   //     // key: clientMetadata?.key,
      // //   //     metadata: {
      // //   //         originalFileName: file.name,
      // //   //         fileType: file.type,
      // //   //         fileSize: file.size.toString()
      // //   //     },
      // //   //   }),
      // //   // }
      // },
    }),
    videos: route({
      fileTypes: ['video/*'],
      multipleFiles: true,
      multipart: true, 
      partSize: 1024 * 1024 * 50,
    }),
  },
};
export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return handleRequest(request, router);
      },
    },
  },
});