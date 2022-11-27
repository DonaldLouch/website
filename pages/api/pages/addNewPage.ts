import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const postData = JSON.parse(req.body) as unknown | any | null;

    const post = await prisma.page.create({
      data: {
        id: postData.id,
        title: postData.title,
        slug: postData.slug,
        pageStatus: postData.postStatus,
        lastUpdatedOn: postData.postedOn,
      },
    });

    res.status(200).json(post);
  } catch (error: any) {
    if (error.code === "P2002") {
      res
        .status(400)
        .json({ message: "Slug is already used. Try another slug." });
    } else {
      res.status(500).json({ error });
    }
  }
}
