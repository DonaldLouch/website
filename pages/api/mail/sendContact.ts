import type { NextApiRequest, NextApiResponse } from 'next'

// import prisma from '../../../config/prisma'
import nodemailer from 'nodemailer'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    const data = req?.body
    console.log(data)
    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    }) as any

    const mailData = {
        from: `New Contact Form<no-reply@donaldlouch.ca>`,
        replyTo: `${data?.name}<${data?.email}>`,
        to: 'Donald Louch<hello@donaldlouch.ca>',
        subject: `Form On Donald Louch: ${data?.subject}`,
        text: " New message from: " + data.name + " | " + data.body + " | Sent from: " + data.email,
        html: `<p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">${req?.body.body}</p>`
        // html: html(req)
    }

    transporter.sendMail(mailData, function (error: any, info: any) {
      if(error)
        res.status(500).json(error)
      else
        res.status(200).json(info)
    })
  }