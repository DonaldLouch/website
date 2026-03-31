import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'
import { authMiddleware } from '@/middleware/auth'

export const DeleteResumeWork = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        try {
            await prisma.resumeWorkExperience.delete({ where: {id} })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    })
    
export const DeleteResumeHistory = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        try {
            await prisma.resumeWorkExperienceHistory.delete({ where: {id} })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    })

// export const DeleteResumeWork = createServerFn({ method: 'POST' })
//     .middleware([authMiddleware])
//     .inputValidator((data: { id: string }) => data)
//     .handler(async (ctx) => {
//         const { id } = ctx.data
//         try {
//             await prisma.resume.delete({ where: {id} })
//             return {success: true}
//         } catch (error: any) {
//             return {success: false, error}
//         }
//     })