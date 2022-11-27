import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
    //     return res.status(405).json({ message: 'Method Not Allowed' })
    // }

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

        res.status(200).json(history)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error })
    }
}