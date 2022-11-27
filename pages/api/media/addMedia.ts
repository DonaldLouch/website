import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
    //     return res.status(405).json({ message: 'Method Not Allowed' })
    // }

    try {
        const mediaData = JSON.parse(req.body) as unknown|any|null
        console.log(mediaData)

        const media = await prisma.media.create({
            data: {
                mediaPublicID: mediaData.mediaPublicID,
                mediaSignature: mediaData.mediaSignature,
                mediaKind: mediaData.mediaKind,
                mediaTitle: mediaData.mediaTitle,
                mediaExtension: mediaData.mediaExtension,
                mediaPath: mediaData.mediaPath,
                mediaSize: mediaData.mediaSize,
                mediaDimensions: mediaData.mediaDimensions,
            },
        })

        res.status(200).json(media)
    } catch (error) {
        console.log(error)
        // res.status(500).json({ error: "Error creating business" })
    }
}