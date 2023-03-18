import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const historyData = JSON.parse(req.body) as unknown|any|null
        console.log(historyData)

        const history = await prisma.resumeWorkExperienceHistory.create({
            data: {
                position: historyData.position,
                startDate: historyData.startDate,
                endDate: historyData.endDate,
                description: historyData.description,
                resumeID: historyData.company,
            },
        })
        await prisma.resume.update({
          where: { id: "ckzp10ifd01967cvu4kc66p5o" },
          data: { lastUpdatedOn: new Date() },
        });
        res.status(200).json(history)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error })
    }
}