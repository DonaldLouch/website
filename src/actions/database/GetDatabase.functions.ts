import { createServerFn } from '@tanstack/react-start'
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/utils/db'

// Maintenance Mode
export const GetMaintenanceMode = createServerFn({ method: 'GET' }).handler(() => prisma.maintenanceMode.findFirst())

// About Me
export const GetAboutMe = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())

//Resume
type ResumeType =
    | "resume"
    | "work"
    | "history"
    | "workPlus"
    | "education"
    | "educationPlus"
    | "historyID"

const orderByDate = {
    orderBy: { startDate: "desc" as const },
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
})

const companyLogos: Record<string, string> = {
    "McDonald's": "https://cdn.brandfetch.io/mcdonalds.ca",
    "Donald Louch Productions": "/logo/logo.svg",
    "Vancouver Island University": "https://img.logo.dev/viu.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
    "Royal Roads University": "https://img.logo.dev/royalroads.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
    "Antica Productions": "https://img.logo.dev/anticaproductions.com?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
    "Westshore Centre for Learning and Training": "https://img.logo.dev/sd62.bc.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
}

const schoolLogos: Record<string, string> = {
    "Vancouver Island University": companyLogos["Vancouver Island University"],
    "Camosun College": "https://img.logo.dev/camosun.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
    "Westshore Centre for Learning and Training": companyLogos["Westshore Centre for Learning and Training"],
    "Dunsmuir Middle School": "https://img.logo.dev/sd62.bc.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ",
}

export type ResumeData = Prisma.ResumeModel
export type ResumeWorkData = Prisma.ResumeWorkExperienceModel[]
export type ResumeEducationData = Prisma.ResumeEducationModel[]

const formatRange = (start?: any, end?: any) => {
  if (!start) return ""
  const startLabel = dateFormatter.format(start)
  if (!end || start.getTime() === end.getTime()) return startLabel
  return `${startLabel} - ${dateFormatter.format(end)}`
}

export const GetResume = createServerFn({ method: "GET" })
    .inputValidator((data: { type: ResumeType, id?: string }) => data)
    .handler(async ({ data }) => {
        const { type, id } = data
        switch (type) {
            case "workPlus": {
                const [work, history] = await Promise.all([
                    prisma.resumeWorkExperience.findMany(orderByDate),
                    prisma.resumeWorkExperienceHistory.findMany(orderByDate),
                ])

                const historyByWorkId = new Map()

                for (const h of history) {
                    const arr = historyByWorkId.get(h.workID) ?? []
                    arr.push(h)
                    historyByWorkId.set(h.workID, arr)
                }

                return work.map((experience) => {
                    const historyItems = historyByWorkId.get(experience.id) ?? []
                    const image = companyLogos[experience.company] ?? null

                    const getStartDate = experience.startDate
                    const getEndDate = experience.endDate || undefined


                    return {
                        id: experience.id,
                        imageType: image ? "Avatar" : null,
                        image,
                        label: `${formatRange(getStartDate, getEndDate)}: ${experience.company}`,
                        description: historyItems.length > 1
                            ? `${experience.position} + ${historyItems.length} other positions`
                            : experience.position,
                        job: experience,
                        history: historyItems
                    }
                })
            }
            case "educationPlus": {
                const education = await prisma.resumeEducation.findMany(orderByDate)

                return education.map((school) => {
                    const image = schoolLogos[school.school] ?? null

                    return {
                        id: school.id,
                        imageType: image ? "Avatar" : null,
                        image,
                        label: `${school.startDate} - ${school.endDate ?? "Present"}: ${school.school}`,
                        description: school.degree,
                        school,
                    }
                })
            }
            case "resume":
                return prisma.resume.findFirst()
            case "work":
                return prisma.resumeWorkExperience.findMany(orderByDate)
            case "history":
                return prisma.resumeWorkExperienceHistory.findMany(orderByDate)
            case "education":
                return prisma.resumeEducation.findMany(orderByDate)
            case "historyID":
                return prisma.resumeWorkExperienceHistory.findMany({ where: { workID: id  } })
        }
    })

// Distinct
export const GetAllLocationData = createServerFn({ method: 'GET' })
    .handler(async () => {
        const res = await prisma.locations.findMany({
            select: {
                locations: true
            },
            orderBy: { locations: 'asc' }
        })
        return res.map(r => r.locations)
    })

export const GetAllTagData = createServerFn({ method: 'GET' })
    .handler(async () => {
        const res = await prisma.tags.findMany({
            select: {
                tags: true
            },
            orderBy: { tags: 'asc' }
        })
        return res.map(r => r.tags)
    })

// Links
export type LinkSetData = Prisma.LinkSetModel & {
    media: any
}

export type PrimaryLinkData = Prisma.PrimaryLinksModel[]

export const GetLinks = createServerFn({ method: 'GET' })
    .inputValidator((data: { action?: "data", type: "links"|"primary"|"linkSets"|"embed", slug?: string }) => data)
    .handler(async (ctx) => {
        const { action, type, slug } = ctx.data
        const sortOption: any = {
            orderBy: { order: 'asc' }
        }
        switch (type) {
            case 'links':
                if (type) return prisma.links.findMany(sortOption)
                break;
            case 'primary':
                if (type) return prisma.primaryLinks.findMany(sortOption)
                break;
            case 'linkSets':
                sortOption.orderBy = { lastUpdated: 'desc' }
                if (action == "data" && slug) return prisma.linkSet.findFirst({ where: { setSlug: slug } })
                if (type) return prisma.linkSet.findMany(sortOption)
                break;
            case 'embed':
                sortOption.orderBy = { lastUpdated: 'desc' }
                if (type) return prisma.embed.findMany(sortOption)
                break;        
        }
    })

// Photography
export const GetPhoto = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        return prisma.photography.findFirst({
            where: { id: id },
            include: {
                PhotographyMedia: true,
                PhotographyAlbum: true
            }
    })})

export type PhotographyFilters = {
    action: 'data'|'count'
    type?: 'view' | 'keyword' | 'location' | 'tag' | 'order' | 'pinned' | 'portfolio' | 'album' | 'all' | "notSetup" | "admin"
    keyword?: string
    contentLimit?: number
    contentStart?: number
}

export type PhotoData = Prisma.PhotographyModel[] & {
    PhotographyMedia: Prisma.PhotographyMediaModel[],
    PhotographyAlbum: Prisma.PhotographyAlbumModel[]
}

export const GetFilteredPhotography = createServerFn({ method: 'GET' })
    .inputValidator((data: PhotographyFilters) => data)
    .handler(async (ctx) => {
        const { action, type, keyword, contentLimit, contentStart } = ctx.data

         if (action !== 'data' && action !== 'count') {
            throw new Error('Invalid action provided. Must be either "data" or "count".')
        }

        const whereClause: Prisma.PhotographyWhereInput = type != "all" ? {
            isPublic: type == "admin" ? undefined : true,
            isSetup:  type == "admin" ? undefined : type !== "notSetup" ? true :  false,
        } : {}

        if (type) {
            switch (type) {
                case 'keyword':
                if (keyword) {
                    whereClause.OR = [
                        { caption: { contains: keyword, mode: 'insensitive' } },
                        { photoName: { contains: keyword, mode: 'insensitive' } },
                        { tags: { has: keyword } },
                    ]
                }
                break
                case 'location':
                    if (keyword) {
                        whereClause.location = { contains: keyword, mode: 'insensitive' }
                    }
                    break
                case 'tag':
                    if (keyword) {
                        whereClause.tags = { has: keyword }
                    }
                    break
                case 'portfolio':
                    whereClause.isPortfolio = true
                    break
                case 'pinned':
                    whereClause.isPinned = true
                    break
                case 'album':
                    if (keyword) {
                        whereClause.album = { contains: keyword, mode: 'insensitive' }
                    }
                    break
                default:
                    console.warn(`Unknown type: ${type}. Ignoring.`);
                    break
            }
        }

        const queryOptions: Prisma.PhotographyFindManyArgs = {
            orderBy: {
                lastUpdatedOn:
                    type === 'order' && keyword === 'old' ? 'asc' : 'desc',
            },
            where: whereClause,
        }

        if (contentStart !== undefined && contentLimit !== undefined) {
            queryOptions.skip = contentStart
            queryOptions.take = contentLimit
        } else if (contentLimit !== undefined) {
            queryOptions.take = contentLimit
        }

        if (action === 'data') {
            queryOptions.include = {
                PhotographyMedia: true,
                PhotographyAlbum: true,
            }
        }

        if(action == "data") return prisma.photography.findMany(queryOptions)
        if(action == "count") return prisma.photography.count({ where: whereClause })
    })

export const GetAlbum = createServerFn({ method: 'GET' })
    .inputValidator((data: { slug: string }) => data)
    .handler(async (ctx) => {
        const { slug } = ctx.data
        return prisma.photographyAlbum.findFirst({
        where: { slug: slug },
    })})

export const GetAllPhotographyAlbums = createServerFn({ method: 'GET' }).handler(() => prisma.photographyAlbum.findMany({ orderBy: { lastUpdatedOn: 'desc' } }))

// Videography
export const GetVideo = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        
        return prisma.videography.findFirst({
            where: { id },
            include: {
                VideographyMedia: true,
                ThumbnailMedia: true,
                VideoCategory: true,
            },
        })
    })

export type VideographyFilters = {
    action: 'data'|'count'
    type?: 'view' | 'keyword' | 'location' | 'tag' | 'order' | 'pinned' | 'portfolio' | 'playlist'
    keyword?: string
    contentLimit?: number
    contentStart?: number
}

export type VideoData = Prisma.VideographyGetPayload<{
    include: {
        VideographyMedia: true,
        ThumbnailMedia: true,
        VideoCategory: true
    }
}>[]

export const GetFilteredVideography = createServerFn({ method: 'GET' })
    .inputValidator((data: VideographyFilters) => data)
    .handler(async (ctx) => {
        const { action, type, keyword, contentLimit, contentStart } = ctx.data

         if (action !== 'data' && action !== 'count') {
            throw new Error('Invalid action provided. Must be either "data" or "count".')
        }

        const whereClause: Prisma.VideographyWhereInput = {
            videoPrivacy: "Public",
            isSetup: true,
        }

        if (type) {
            switch (type) {
                case 'keyword':
                if (keyword) {
                    whereClause.OR = [
                        { title: { contains: keyword, mode: 'insensitive' } },
                        { excerpt: { contains: keyword, mode: 'insensitive' } },
                        { description: { contains: keyword, mode: 'insensitive' } },
                        { starring: { has: keyword} },
                        // { videoCredits: { has: keyword} },
                        { tags: { has: keyword } },
                    ]
                }
                break
                // case 'location':
                //     if (keyword) {
                //         whereClause.videoCredits = { contains: keyword, mode: 'insensitive' }
                //     }
                //     break
                case 'tag':
                    if (keyword) {
                        whereClause.tags = { has: keyword }
                    }
                    break
                case 'portfolio':
                    whereClause.isPortfolio = true
                    break
                case 'pinned':
                    whereClause.isPinned = true
                    break
                // case 'playlist':
                //     if (keyword) {
                //         whereClause.album = { contains: keyword, mode: 'insensitive' }
                //     }
                //     break
                default:
                    console.warn(`Unknown type: ${type}. Ignoring.`);
                    break
            }
        }

        const queryOptions: Prisma.VideographyFindManyArgs = {
            orderBy: {
                uploadedOn:
                    type === 'order' && keyword === 'old' ? 'asc' : 'desc',
            },
            where: whereClause,
        }

        if (contentStart !== undefined && contentLimit !== undefined) {
            queryOptions.skip = contentStart
            queryOptions.take = contentLimit
        } else if (contentLimit !== undefined) {
            queryOptions.take = contentLimit
        }

        if (action === 'data') {
            queryOptions.include = {
                VideographyMedia: true,
                ThumbnailMedia: true,
                VideoCategory: true
            }
        }

        if(action == "data") return prisma.videography.findMany(queryOptions)
        if(action == "count") return prisma.videography.count({ where: whereClause })
    })

// Blog Posts
export const GetBlogPost = createServerFn({ method: 'GET' })
    .inputValidator((data: { slug: string }) => data)
    .handler(async (ctx) => {
        const { slug} = ctx.data
        return prisma.blogPost.findFirst({
            where: {
                slug: slug
            }
        })
    })

export type BlogData = Prisma.BlogPostModel[]

export const GetFilteredBlogPosts = createServerFn({ method: 'GET' })
    .inputValidator((data: { action: "data"|"count", type?: "category"|"tag"|"search"|"pinned",  keyword?: string, contentLimit?: number,  contentStart?: number }) => data)
    .handler(async (ctx) => {
        const { action, type, keyword, contentLimit, contentStart } = ctx.data
        const whereClause: any = {
            postStatus: "Public",
        }
        if (type) {
            switch (type) {
                case 'pinned':
                    whereClause.isPinned = true
                    break
                case 'category':
                    whereClause.category = { has: keyword }
                    break
                case 'tag':
                    whereClause.tags = { has: keyword  }
                    break
                case 'search':
                    whereClause.OR = [
                        { title: { contains: keyword, mode: 'insensitive' } },
                        { headingText: { contains: keyword, mode: 'insensitive' } },
                        { body: { contains: keyword, mode: 'insensitive' } },
                        { excerpt: { contains: keyword, mode: 'insensitive' } },
                        { tags: { has: keyword } },
                        { category: { has: keyword } }
                    ]
            }
        }
        const queryOptions: any = {
            where: whereClause,
            orderBy: { postedOn: "desc"  },
        }
        if (contentStart !== undefined && contentLimit !== undefined) {
            queryOptions.skip = contentStart
            queryOptions.take = contentLimit
        }

        if (action === "data") return prisma.blogPost.findMany(queryOptions)
        if (action === "count") return prisma.blogPost.count(queryOptions)
    })