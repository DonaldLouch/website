import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../config/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const linkData = JSON.parse(req.body) as unknown | any | null;
    // console.log(linkData)
    const link = await prisma.links.update({
      where: {
        id: linkData.id,
      },
      data: {
        id: linkData.id,
        iconPrefix: linkData.iconPrefix,
        iconName: linkData.iconName,
        title: linkData.title,
        subTitle: linkData.subTitle,
        link: linkData.link,
        lastUpdatedOn: new Date(),
      },
    });
    res.status(200).json(link);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating link" });
  }
}
