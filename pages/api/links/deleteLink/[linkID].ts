import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../config/prisma";

export default async function signature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // cloudinary.config({
  //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //     api_key: process.env.CLOUDINARY_API_KEY,
  //     api_secret: process.env.CLOUDINARY_API_SECRET
  // })

  const linkID = req.query.linkID as any;
  // const mediaIDSplit = mediaIDQuery.split(';;') as any
  // const mediaID = mediaIDSplit[0] + "/" + mediaIDSplit[1]

  if (method === "POST") {
    try {
      const deletePrisma = await prisma.links.deleteMany({
        where: {
          id: linkID,
        },
      });

      return res.status(200).json(deletePrisma);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.json({ error: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    console.log(`Method ${method} Not Allowed`);
  }
  res.end();
}
