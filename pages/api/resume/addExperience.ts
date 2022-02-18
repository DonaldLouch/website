import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../config/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
    //     return res.status(405).json({ message: 'Method Not Allowed' })
    // }

    try {
        const experienceData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)

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