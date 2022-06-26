import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../config/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pageID = req.query.pageID?.toString() as string;
    // const postData = JSON.parse(req.body) as unknown | any | null;
    // console.log(postData);
    const post = await prisma.page.update({
      where: {
        id: pageID,
      },

      data: {
        views: {
          increment: 1,
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating the view count." });
  }
}
