import EmailTemplate from "@/components/mail/EmailTemplate";
import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendContact = createServerFn({method: "POST"})
    .inputValidator((data: { to?: string, from?: string, subject: string, body: any }) => data)
    .handler(async (ctx) => {
        const { to, from, subject, body } = ctx.data
        const sendTo = to || undefined + "hello@donaldlouch.ca"
        const { error } = await resend.emails.send({
            from: from || "Donald Louch<hello@donaldlouch.ca>",
            to: [sendTo],
            subject: subject,
            react: EmailTemplate({body}),
        });

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