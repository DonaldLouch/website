import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
    //     return res.status(405).json({ message: 'Method Not Allowed' })
    // }

    try {
        const educationData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)

        const education = await prisma.resumeEducation.create({
            data: {
                school: educationData.school,
                degree: educationData.degree,
                startDate: educationData.startDate,
                endDate: educationData.endDate,
                description: educationData.description,
            },
        })

        res.status(200).json(education)
    } catch (error: any) {
            res.status(500).json({ error })
        
    }
}