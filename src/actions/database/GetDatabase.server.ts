import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Maintenance Mode
export const GetMaintenanceMode = createServerFn({ method: 'GET' }).handler(() => prisma.maintenanceMode.findFirst())

// About Me
export const GetAboutMe = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())

// Distinct
// export const GetAllLocationData = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())
// export const GetAllTagData = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())

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
export const GetPinnedPhotography = createServerFn({ method: 'GET' })
    .handler(() => prisma.photography.findMany({
        where: { isPublic: true, isSetup: true, isPinned: true },
        include: {
            PhotographyMedia: true,
            PhotographyAlbum: true
        },
        orderBy: { lastUpdatedOn: 'desc' },
        take: 20,
    }))

export const GetFilteredPhotos = createServerFn({ method: 'POST' })
    .inputValidator((data: { postLimit?: number, searchType?: string, keyword?:string, from?: number, to?: number }) => data)
    .handler(async (ctx) => {
        const { postLimit, searchType, keyword, from, to } = ctx.data

        const whereClause: any = {
            isPublic: true, 
            isSetup: true,
        }

        if (searchType === "view" && keyword === "pinned") {
            whereClause.isPinned = true
        }

        if (searchType && keyword) {
            switch (searchType) {
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
            }
        }

        const queryOptions: any = {
            include: {
                PhotographyMedia: true,
                PhotographyAlbum: true
            },
            // orderBy: { lastUpdatedOn: searchType == "order" && keyword == "old" ? 'desc' : 'asc' },
            orderBy: { lastUpdatedOn: searchType == "order" && keyword == "old" ? 'asc' : 'desc' },
            where: whereClause,
        }

        if (from !== undefined && to !== undefined) {
            queryOptions.skip = from
            queryOptions.take = to
        } else if (postLimit) {
            queryOptions.take = postLimit
        } else {
            queryOptions.take = 20
        }

        return await prisma.photography.findMany(queryOptions)
    })

export const GetAllPhotographyAlbums = createServerFn({ method: 'GET' })
    .handler(() => prisma.photographyAlbum.findMany({
        orderBy: { lastUpdatedOn: 'desc' },
    }))

export const GetAllPublicPhotographyCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.photography.count({
        where: { isPublic: true, isSetup: true },
    }))

export const GetFilteredPhotosCount = createServerFn({ method: 'GET' })
    .inputValidator((data: { searchType?: string, keyword?:string }) => data)
    .handler(async (ctx) => {
        const { searchType, keyword } = ctx.data

        const whereClause: any = {
            isPublic: true, 
            isSetup: true,
        }

        if (searchType === "view" && keyword === "pinned") {
            whereClause.isPinned = true
        }

        if (searchType && keyword) {
            switch (searchType) {
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
            }
        }

        return await prisma.photography.count({
            where: whereClause,
        })
    })

export const GetPinnedPhotographyCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.photography.count({
        where: { isPublic: true, isSetup: true, isPinned: true },
    }))

// Videography
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
export const GetPinnedBlogPosts = createServerFn({ method: 'GET' })
    .handler(() => prisma.blogPost.findMany({
        where: { postStatus: "Public", isPinned: true },
        orderBy: { postedOn: 'desc' },
        // take: 20,
    }))

export const GetAllPublicBlogPostCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.blogPost.count({
        where: { postStatus: "Public" },
    }))

export const GetPinnedBlogPostCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.blogPost.count({
        where: { postStatus: "Public", isPinned: true },
    }))




// export const GetPinnedBlogPostCount = createServerFn({ method: 'GET' })
    // .handler(async () => {
    //     const res = await prisma.blogPost.count({
    //         where: { postStatus: "Public", isPinned: true },
    //     })
    //     return res
    // })