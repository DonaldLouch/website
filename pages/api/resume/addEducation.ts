import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const educationData = JSON.parse(req.body) as unknown|any|null

        const education = await prisma.resumeEducation.create({
            data: {
                school: educationData.school,
                degree: educationData.degree,
                startDate: educationData.startDate,
                endDate: educationData.endDate,
                description: educationData.description,
            },
        })
        await prisma.resume.update({
            where: { id: "ckzp10ifd01967cvu4kc66p5o" },
            data: { lastUpdatedOn: new Date() },
        });
        res.status(200).json(education)
    } catch (error: any) {
            res.status(500).json({ error })
        
    }
}