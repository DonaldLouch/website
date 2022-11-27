import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async function signature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const linkID = req.query.linkID as any;

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
