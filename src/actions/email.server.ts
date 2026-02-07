import EmailAuth from "@/components/mail/EmailAuth";
import EmailContact from "@/components/mail/EmailContact";
import EmailJob from "@/components/mail/EmailJob";
import EmailTemplate from "@/components/mail/EmailTemplate";
import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendEmail = createServerFn({method: "POST"})
    .inputValidator((data: { type: "contact"|"job"|"auth", to?: string, from?: string, subject?: string, body: any }) => data)
    .handler(async (ctx) => {
        const { type, to, from, subject, body } = ctx.data
        const sendTo = to || "hello@donaldlouch.ca"
        const sendInfo: any = {
            from: from || "Donald Louch<hello@donaldlouch.ca>",
            to: [sendTo],
            replyTo: from || undefined,
            subject: subject,
        }
        const authInfo: any = type == "auth" ? {
            user: { 
                ...body.user, 
                email: body.newEmail 
            },
            url: body.url || undefined
        } : undefined
        if (type == "auth") {
            switch (body.authType) {
                case "emailVerification":
                    authInfo.title = "Email Verification"
                    authInfo.subject = "Email Verification For Donald Louch's Website"
                    authInfo.text = "Thank you for signing up! Please verify your email address"
                    authInfo.linkText = "Please follow the following link to verify your email address"
                    authInfo.buttonText = "Verify Email"
                    break
                case "passwordReset":
                    authInfo.title = "Password Reset"
                    authInfo.subject = "Password Reset For Donald Louch's Website"
                    authInfo.text = "You have requested to reset your password"
                    authInfo.linkText = "Please follow the following link to reset your password"
                    authInfo.buttonText = "Reset Password"
                    break
                case "emailChange":
                    authInfo.title = "Email Change"
                    authInfo.subject = "Email Change For Donald Louch's Website"
                    authInfo.text = "You have requested to change your email address"
                    authInfo.linkText = "Please follow the following link to confirm your new email address"
                    authInfo.buttonText = "Confirm Email Change"
                    break
                case "deleteAccount":
                    authInfo.title = "Delete Account"
                    authInfo.subject = "Delete Account For Donald Louch's Website"
                    authInfo.text = "You have requested to delete your account"
                    authInfo.linkText = "Please follow the following link to confirm your account deletion"
                    authInfo.buttonText = "Confirm Account Deletion"
                    break
                case "welcomeEmail":
                    authInfo.title = "Welcome to Donald Louch's Website"
                    authInfo.subject = "Welcome to Donald Louch's Website!"
                    authInfo.text = "Thank you for joining Donald Louch's Website"
                    break
            }
        }
        switch(type) {
            case 'contact':
                sendInfo.react = EmailContact({body})
                break
            case 'job':
                sendInfo.subject = `Job Request: ${body.jobType}`
                sendInfo.react = EmailJob({body})
                break
            case "auth":
                sendInfo.to = [`${body.user.name}<${body.user.email}>`]
                sendInfo.from = "Auth at Donald Louch<hello@donaldlouch.ca>"
                sendInfo.subject = authInfo.subject
                sendInfo.react = EmailAuth({body})
        }
        const { error } = await resend.emails.send(sendInfo);

        if (error) {
            return { success: false, error: true, ...error };
        }
        return { success: true };
    })



/*
export const SendContact = createServerFn({method: "POST"})
    .inputValidator((data: { }) => data)
    .handler(async (ctx) => {
        const {  } = ctx.data
    })
*/