
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const linkData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)

        await prisma.primaryLinks.updateMany({
            where: { title: "Facebook" },
            data: {
                subTitle: linkData.FacebookSubTitle,
                link: linkData.FacebookLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        await prisma.primaryLinks.updateMany({
            where: { title: "Twitter" },
            data: {
                subTitle: linkData.TwitterSubTitle,
                link: linkData.TwitterLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        await prisma.primaryLinks.updateMany({
            where: { title: "Instagram" },
            data: {
                subTitle: linkData.InstagramSubTitle,
                link: linkData.InstagramLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        await prisma.primaryLinks.updateMany({
            where: { title: "TikTok" },
            data: {
                subTitle: linkData.TikTokSubTitle,
                link: linkData.TikTokLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        await prisma.primaryLinks.updateMany({
            where: { title: "YouTube" },
            data: {
                subTitle: linkData.YouTubeSubTitle,
                link: linkData.YouTubeLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        await prisma.primaryLinks.updateMany({
            where: { title: "Linkedin" },
            data: {
                subTitle: linkData.LinkedinSubTitle,
                link: linkData.LinkedinLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any
        
        await prisma.primaryLinks.updateMany({
            where: { title: "GitHub" },
            data: {
                subTitle: linkData.GitHubSubTitle,
                link: linkData.GitHubLink,
                lastUpdatedOn: linkData.lastUpdatedOn,
            }
        }) as any

        res.status(200).json({ message: "Successfully updated primary links" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating about me" })
    }
}