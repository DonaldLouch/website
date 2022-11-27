import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    if (method === 'GET') {
        try {
            const media = await prisma.media.findMany()
            return res.status(200).json(media)
        } catch(e) {
            console.log("Request error", e);
            res.status(422).json(e)
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        console.log(`Method ${method} Not Allowed`)
    }
    res.end()
}