
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resumeData = JSON.parse(req.body) as unknown|any|null
        const resume = await prisma.resumeWorkExperience.update({
          where: {
            id: resumeData.id,
          },
          data: {
            position: resumeData.position,
            startDate: resumeData.startDate,
            endDate: resumeData.endDate,
            description: resumeData.description,
          },
        });
       await prisma.resume.update({
          where: { id: "ckzp10ifd01967cvu4kc66p5o" },
          data: { lastUpdatedOn: new Date() },
        });
        res.status(200).json(resume)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating post" })
    }
}