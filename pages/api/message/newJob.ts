import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const jobData = JSON.parse(req.body) as unknown | any | null;

    const job = await prisma.job.create({
      data: {
        name: jobData.name,
        company: jobData.company,
        email: jobData.email,
        phone: jobData.phone,
        type: jobData.jobType,
        description: jobData.description,
        budget: jobData.budget,
      },
    });

    res.status(200).json(job);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Job request form failed to send." });
    } else {
      res.status(500).json({ error });
    }
  }
}
