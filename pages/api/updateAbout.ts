
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const aboutData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)
        const about = await prisma.about.update({
            where: {
                id: aboutData.id
            },
            data: {
                firstName: aboutData.firstName,
                middleName: aboutData.middleName,
                lastName: aboutData.lastName,
                currentAge: aboutData.currentAge,
                city: aboutData.city,
                province: aboutData.province,
                country: aboutData.country,
                tagLine: aboutData.tagLine,
                bio: aboutData.bio,
                email: aboutData.email,
                avatar: aboutData.avatar,
                pronouns: aboutData.pronouns,
                bioExcerpt: aboutData.bioExcerpt,

                lastUpdatedOn: aboutData.lastUpdatedOn,
            }
        })
        res.status(200).json(about)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating post" })
    }
}