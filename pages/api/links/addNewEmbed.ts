import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const embedData = JSON.parse(req.body) as unknown|any|null

        const embed = await prisma.embed.create({
            data: {
                title: embedData.title,
                link: embedData.link,
                embedLink: embedData.embed,
                options: embedData.options,
                note: embedData.note,
            },
        })

        res.status(200).json(embed)
    } catch (error: any) {
            res.status(500).json({ error })
    }
}