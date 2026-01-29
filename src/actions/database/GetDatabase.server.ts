import { PhotographyAlbum } from './../../generated/prisma/browser';
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
export const GetPhoto = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string }) => data)
    .handler(async (ctx) => {
        const { id } = ctx.data
        console.log("db", id)
        return prisma.photography.findFirst({
        where: { id: id },
        include: {
            PhotographyMedia: true,
            PhotographyAlbum: true
        }
    })})

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

export const GetAllAlbumPhotos = createServerFn({ method: 'GET' })
    .inputValidator((data: { id: string, postLimit?: number,  from?: number, to?: number}) => data)
    .handler(async (ctx) => {
        const { id, postLimit, from, to } = ctx.data
        
        const queryOptions: any = {
            where: { 
                isPublic: true, 
                isSetup: true,
                album: id 
            },
            include: {
                PhotographyMedia: true,
                PhotographyAlbum: true
            },
            orderBy: { capturedOn: "asc"  },
        }
        if (from !== undefined && to !== undefined) {
            queryOptions.skip = from
            queryOptions.take = to
        } else if (postLimit) {
            queryOptions.take = postLimit
        } else {
            queryOptions.take = 20
        }

        return prisma.photography.findMany(queryOptions)
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
                case 'album':
                    whereClause.album = { contains: keyword, mode: 'insensitive' }
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