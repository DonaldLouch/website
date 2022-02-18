const cloudinary = require("cloudinary").v2

import type { NextApiResponse } from 'next'

export default function signature(res: NextApiResponse) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  )

  res.statusCode = 200
  res.json({ signature, timestamp })
}