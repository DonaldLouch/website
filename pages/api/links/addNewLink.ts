import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const linkData = JSON.parse(req.body) as unknown|any|null

        const link = await prisma.links.create({
            data: {
                iconPrefix: linkData.iconPrefix,
                iconName: linkData.iconName,
                title: linkData.title,
                subTitle: linkData.subTitle,
                link: linkData.link,
            },
        })

        res.status(200).json(link)
    } catch (error: any) {
            res.status(500).json({ error })
    }
}