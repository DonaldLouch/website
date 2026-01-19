import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/utils/db'

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Maintenance Mode
export const GetMaintenanceMode = createServerFn({ method: 'GET' }).handler(() => prisma.maintenanceMode.findFirst())

// About Me
export const GetAboutMe = createServerFn({ method: 'GET' }).handler(() => prisma.about.findFirst())

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

export const GetAllPublicPhotographyCount = createServerFn({ method: 'GET' })
    .handler(() => prisma.photography.count({
        where: { isPublic: true, isSetup: true },
    }))

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