
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resumeData = JSON.parse(req.body) as unknown|any|null
        const resume = await prisma.resume.update({
            where: {
                id: resumeData.id
            },
            data: {
                firstName: resumeData.firstName,
                middleName: resumeData.middleName,
                lastName: resumeData.lastName,
                pronouns: resumeData.pronouns,
                currentAge: resumeData.currentAge,
                address: resumeData.address,
                email: resumeData.email,
                phone: resumeData.phone,
                linkedin: resumeData.linkedin,
                bioExcerpt: resumeData.bioExcerpt,
                profile: resumeData.profile,
                skills: resumeData.skills,
                avatar: resumeData.avatar,
                lastUpdatedOn: resumeData.lastUpdatedOn,
            }
        })
        res.status(200).json(resume)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating post" })
    }
}