import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const experienceData = JSON.parse(req.body) as unknown|any|null

        const experience = await prisma.resumeWorkExperience.create({
            data: {
                company: experienceData.company,
                position: experienceData.position,
                startDate: experienceData.startDate,
                endDate: experienceData.endDate,
                description: experienceData.description,
            },
        })

        res.status(200).json(experience)
    } catch (error: any) {
            res.status(500).json({ error })
        
    }
}