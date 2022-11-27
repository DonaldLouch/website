import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const linkData = JSON.parse(req.body) as unknown|any|null

        const link = await prisma.primaryLinks.create({
            data: {
                icon: linkData.icon,
                title: linkData.title,
                subTitle: linkData.subTitle,
                link: linkData.link,
                orderNumber: 6
            },
        })

        res.status(200).json(link)
    } catch (error: any) {
            console.log(error)
            res.status(500).json({ error })
    }
}