import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'
import { authMiddleware } from '@/middleware/auth'

export const UpdateResume = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { values: any, avatar?: any, id: string, address?: string, resume: any }) => data)
    .handler(async (ctx) => {
        const { values, avatar, id, address, resume } = ctx.data
        try {
            await prisma.resume.update({ where: {id}, data: {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                pronouns: values.pronouns,
                currentAge: values.currentAge,
                address: address || resume.address,
                email: values.email,
                phone: values.phone,
                linkedin: values.linkedin,
                profile: values.profile,
                skills: values.skills,
                bioExcerpt: values.bioExcerpt,
                avatar,
                lastUpdatedOn: new Date()
            } })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    }
)

export const UpdateResume_Time = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        try {
            await prisma.resume.update({ where: {id}, data: {
                lastUpdatedOn: new Date()
            } })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    })

export const UpdateResumeWork = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { values: any, id: string }) => data)
    .handler(async (ctx) => {
        const { values, id } = ctx.data
        try {
            await prisma.resumeWorkExperience.update({ where: {id}, data: values })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
        }
    })

export const UpdateResumeHistory = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: { values: any, id: string }) => data)
    .handler(async (ctx) => {
        const { values, id } = ctx.data
        try {
            await prisma.resumeWorkExperienceHistory.update({ where: {id}, data: values })
            return {success: true}
        } catch (error: any) {
            return {success: false, error}
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