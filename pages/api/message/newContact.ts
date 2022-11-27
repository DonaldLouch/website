import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === 'POST') {
  //     return res.status(405).json({ message: 'Method Not Allowed' })
  // }

  try {
    const contactData = JSON.parse(req.body) as unknown | any | null;
    // console.log(postData)

    const contact = await prisma.contact.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
      },
    });

    res.status(200).json(contact);
  } catch (error: any) {
    // console.log(error.code)
    if (error.code === "P2002") {
      res.status(400).json({ message: "Error sending contact form." });
    } else {
      // console.log(error)
      res.status(500).json({ error });
    }
  }
}
