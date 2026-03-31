import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'
import { authMiddleware } from '@/middleware/auth'

export const AddResumeWorkHistory = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { values: any }) => data)
    .handler(async (ctx) => {
        const { values } = ctx.data
        try {
            await prisma.resumeWorkExperienceHistory.create({ data: values })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    })

export type UploadMetaData = {
    fileID: string
    fileExtension: string
  uploadDestination: string
  bucket: string
  uploadEndpoint: string
  mediaID?: string
  filePath?: string
  getFileID?: string
  redirectPath?: string
  fileName: string
  fileType: string
  date: Date
  fileSize: number,
  versionID: string
};

export const AddMedia = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { metadata: UploadMetaData }) => data)
    .handler(async (ctx) => {
        const { metadata } = ctx.data
        const { uploadDestination, bucket, uploadEndpoint, mediaID, fileName, fileType, date, fileSize, versionID, fileID, filePath, fileExtension } = metadata

        const getDateNow = new Date()
        // const fileExtension = fileType.split("/")[1]

        // const fileID = `${uploadDestination}_${
        //     Date.now().toString(36).toUpperCase() +
        //     Math.random().toString(36).substring(2, 5).toLowerCase() +
        //     Math.random().toString(36).substring(2, 5).toUpperCase() +
        //     Math.random().toString(36).substring(2, 5).toLowerCase()
        // }` as string

        // const filePath =
        //     uploadDestination != "thumbnail/linkSet"
        //         ? `${uploadDestination}/${fileID}.${fileExtension}`
        //         : `${uploadDestination}/${mediaID}.${fileExtension}`
        
        const id = mediaID ? mediaID : uploadDestination === "photography" ? "photo"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase() : "file"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        
        const databaseData: any = {
            fileID,
            fileKey: filePath,
            fileTitle: fileName,
            fileExtension: fileExtension,
            filePath: `${uploadEndpoint}/${filePath}`,
            fileVersionID: versionID,
            capturedOn: date || getDateNow,
            uploadedOn: getDateNow,
            metadata: id
        }

        try {
            switch (uploadDestination) {
                case 'photography':
                    if (databaseData) {
                        await prisma.photographyMedia.create({ data: databaseData })
                        await prisma.photography.create({ data: {
                            id,
                            fileID,
                            lastUpdatedOn: getDateNow,
                            photoName: fileName,
                            capturedOn: date ? new Date(date) : getDateNow,
                            uploadedOn: getDateNow,
                            isPublic: false,
                            isSetup: false,
                            isPortfolio: false,
                            isPinned: false,
                        }})
                    }
                    break;
                case 'videography':
                    if (databaseData) {
                        await prisma.videographyMedia.create({ data: databaseData })
                        await prisma.videography.update({ where: { id }, data: {
                            videoFileID: fileID,
                            lastUpdatedOn: getDateNow
                        }})
                    }
                    break;
                case 'thumbnail':
                    if (databaseData) {
                        await prisma.thumbnailMedia.create({ data: databaseData })
                        await prisma.videography.update({ where: { id }, data: {
                            thumbnailFileID: fileID,
                            lastUpdatedOn: getDateNow
                        }})
                    }
                    break;
            }
            return { success: true }
        } catch (error: any) {
            return { success: false, error: error instanceof Error ? { message: error.message } : {} }
        }
    })

// Template
// export const UpdateDATABASE_SUB = createServerFn({ method: 'POST' })
//     .middleware([authMiddleware])
//     .inputValidator((data: { VALUE: any }) => data)
//     .handler(async (ctx) => {
//         const { VALUE } = ctx.data
//         await prisma.DATABASE.create({ data: {} })
//     })