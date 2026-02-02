import { VideoCategory } from './../../generated/prisma/client';
import { PhotographyAlbum } from './../../generated/prisma/browser';
import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Maintenance Mode
export const GetMaintenanceMode = createServerFn({ method: 'GET' }).handler(() => prisma.maintenanceMode.findFirst())

// About Me
export const GetAboutMe = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())

//Resume
// export const GetResume = createServerFn({ method: 'GET' }).handler(() => prisma.resume.findFirst())
export const GetResume = createServerFn({ method: 'GET' })
    .inputValidator((data: { type: "resume"|"work"|"history"|"workPlus"|"education"|"educationPlus" }) => data)
    .handler(async (ctx) => {
        const { type } = ctx.data

        const order: any = {
            orderBy: { startDate: 'desc' },
        }

        if (type == "workPlus") {
            const work = await prisma.resumeWorkExperience.findMany(order)
            const history = await prisma.resumeWorkExperienceHistory.findMany(order)
            const resumeExperienceArray = new Array()
            work.forEach((experience: any) => {
                const historyArray = new Array()
                history.forEach((history: any) => {
                    history.workID === experience.id ? (
                        historyArray.push(history)
                    ) : null
                })
                const iconImage = experience.company === "McDonald's" 
                    ? "https://cdn.brandfetch.io/mcdonalds.ca" 
                    : experience.company === "Donald Louch Productions" ? "/logo/logo.svg" 
                    : experience.company === "Vancouver Island University" ? "https://img.logo.dev/viu.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : experience.company === "Royal Roads University" ? "https://img.logo.dev/royalroads.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : experience.company === "Antica Productions" ? "https://img.logo.dev/anticaproductions.com?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : experience.company === "Westshore Centre for Learning and Training" ? "https://img.logo.dev/sd62.bc.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : null
               
                const options = {
                    year: 'numeric',
                    month: 'long'
                } as any

                const startDate = new Date(experience?.startDate)
                const endDate = new Date(experience?.endDate)

                const startDateFormat = new Intl.DateTimeFormat('en-US', options).format(startDate);
                const endDateFormat = new Intl.DateTimeFormat('en-US', options).format(endDate);
                
                resumeExperienceArray.push({
                    id: experience.id,
                    imageType: iconImage ? "Avatar" : null,
                    image: iconImage ? iconImage : null,
                    label: experience?.startDate === experience?.endDate ? `${startDateFormat}: ${experience.company}` : `${startDateFormat} - ${experience?.endDate ? endDateFormat : "Present"}: ${experience.company}`,
                    description: historyArray.length > 1 ? `${experience.position} + ${historyArray.length} other positions` : experience.position,
                    job: experience,
                    history: historyArray
                })
            })
            return resumeExperienceArray
        }
        
        if (type == "educationPlus") {
            const education = await prisma.resumeEducation.findMany(order)

            const resumeEducationArray = new Array()
            education.forEach((education: any) => {               
                const iconImage = education.school === "Vancouver Island University" ? "https://img.logo.dev/viu.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : education.school === "Camosun College" ? "https://img.logo.dev/camosun.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : education.school === "Westshore Centre for Learning and Training" ? "https://img.logo.dev/sd62.bc.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : education.school === "Dunsmuir Middle School" ? "https://img.logo.dev/sd62.bc.ca?token=pk_H4gEZdMqTp6aYXA1jzEvzQ" 
                    : null
               
                const options = {
                    year: 'numeric',
                    month: 'long'
                } as any
                
                const startDate = new Date(education?.startDate)
                const endDate = new Date(education?.endDate)

                const startDateFormat = new Intl.DateTimeFormat('en-US', options).format(startDate);
                const endDateFormat = new Intl.DateTimeFormat('en-US', options).format(endDate);
                
                resumeEducationArray.push({
                    // id: education.id,
                    // imageType: iconImage ? "Avatar" : null,
                    // image: iconImage ? iconImage : null,
                    // label: education?.startDate === education?.endDate ? (<>{education.startDate}: {education.school}</>) : (<>{education.startDate} - {education.endDate ? education.endDate : "Present"}: {education.school}</>),
                    // description: education.degree,
                    // content: <Text>{education.description}</Text>

                    id: education.id,
                    imageType: iconImage ? "Avatar" : null,
                    image: iconImage ? iconImage : null,
                    label: education?.startDate === education?.endDate ? `${startDateFormat}: ${education.school}` : `${startDateFormat} - ${education?.endDate ? endDateFormat : "Present"}: ${education.school}`,
                    description: education.degree,
                    school: education,
                })
            })
            return resumeEducationArray
        }
        
        if (type == "resume") return prisma.resume.findFirst()
        if (type == "work") return prisma.resumeWorkExperience.findMany(order)
        if (type == "history") return prisma.resumeWorkExperienceHistory.findMany(order)
        if (type == "education") return prisma.resumeEducation.findMany(order)   
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
export const GetAllLinks = createServerFn({ method: 'GET' })
    .handler(() => prisma.links.findMany({
        orderBy: { order: 'asc' }
    }))

export const GetAllPrimaryLinks = createServerFn({ method: 'GET' })
    .handler(() => prisma.primaryLinks.findMany({
        orderBy: { order: 'asc' }
    }))

export const GetAllLinksSets = createServerFn({ method: 'GET' })
    .handler(() => prisma.linkSet.findMany({
        orderBy: { lastUpdated: 'desc' }
    }))

export const GetAllEmbeds = createServerFn({ method: 'GET' })
    .handler(() => prisma.embed.findMany({
        orderBy: { lastUpdatedOn: 'desc' }
    }))

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

export const GetFilteredPhotography = createServerFn({ method: 'GET' })
    .inputValidator((data: { action: "data"|"count", type?: "view"|"keyword"|"location"|"tag"|"order"|"pinned"|"portfolio"|"album"|undefined|null|unknown,  keyword?: string, contentLimit?: number,  contentStart?: number }) => data)
    .handler(async (ctx) => {
        const { action, type, keyword, contentLimit, contentStart } = ctx.data
        const whereClause: any = {
            isPublic: true, 
            isSetup: true,
        }

        if (type === "view" && keyword === "pinned") {
            whereClause.isPinned = true
        }

        if (type) {
            switch (type) {
                case 'keyword':
                    whereClause.OR = [
                        { caption: { contains: keyword, mode: 'insensitive' } },
                        { photoName: { contains: keyword, mode: 'insensitive' } },
                        { tags: { has: keyword } }
                    ]
                    break
                case 'location':
                    whereClause.location = { contains: keyword, mode: 'insensitive' }
                    break
                case 'tag':
                    whereClause.tags = { has: keyword }
                    break
                case 'portfolio':
                    whereClause.isPortfolio = true
                case 'album':
                    whereClause.album = { contains: keyword, mode: 'insensitive' }
            }
        }

        const queryOptions: any = {
            orderBy: { lastUpdatedOn: type == "order" && keyword == "old" ? 'asc' : 'desc' },
            where: whereClause,
        }

        if (action === "data") {
            queryOptions.include = {
                PhotographyMedia: true,
                PhotographyAlbum: true
            }
        }

        if (contentStart !== undefined && contentLimit !== undefined) {
            queryOptions.skip = contentStart
            queryOptions.take = contentLimit
        } else if (contentLimit) {
            queryOptions.take = contentLimit
        } 
        // else {
        //     queryOptions.take = 20
        // }

        if (action === "data") return prisma.photography.findMany(queryOptions)
        if (action === "count") return prisma.photography.count(queryOptions)
    })

export const GetAlbum = createServerFn({ method: 'GET' })
    .inputValidator((data: { slug: string }) => data)
    .handler(async (ctx) => {
        const { slug } = ctx.data
        return prisma.photographyAlbum.findFirst({
        where: { slug: slug },
        // include: {
        //     // PhotographyMedia: true,
        //     // PhotographyAlbum: true
        // }
    })})

export const GetAllPhotographyAlbums = createServerFn({ method: 'GET' })
    .handler(() => prisma.photographyAlbum.findMany({
        orderBy: { lastUpdatedOn: 'desc' },
    }))

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

export const GetAllPublicVideos = createServerFn({ method: 'GET' })
    .inputValidator((data: { postLimit?: number,  from?: number, to?: number}) => data)
    .handler(async (ctx) => {
        const { postLimit, from, to } = ctx.data
        
        const queryOptions: any = {
            where: { 
                videoPrivacy: "Public",
                isSetup: true,
            },
            include: {
                VideographyMedia: true,
                ThumbnailMedia: true,
                VideoCategory: true
            },
            orderBy: { uploadedOn: "desc"  },
        }
        if (from !== undefined && to !== undefined) {
            queryOptions.skip = from
            queryOptions.take = to
        } else if (postLimit) {
            queryOptions.take = postLimit
        } else {
            queryOptions.take = 20
        }

        return prisma.videography.findMany(queryOptions)
    })

export const GetPinnedVideography = createServerFn({ method: 'GET' })
    .handler(() => prisma.videography.findMany({
        where: { videoPrivacy: "Public", isSetup: true, isPinned: true },
        include: {
            VideographyMedia: true,
            ThumbnailMedia: true,
            VideoCategory: true
        },
        orderBy: { uploadedOn: 'desc' },
        // take: 20,
    }))

export const GetAllPublicVideographyCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.videography.count({
        where: { videoPrivacy: "Public", isSetup: true },
    }))

export const GetPinnedVideographyCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.videography.count({
        where: { videoPrivacy: "Public", isSetup: true, isPinned: true },
    }))

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