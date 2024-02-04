import nodemailer from "nodemailer";

import { NextResponse } from "next/server";

import { createId } from "@paralleldrive/cuid2";
import supabase from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const { name, company, email, phone, jobType, description, budget } = (await request.json()) as any
    const id = createId()

  try {
    const { data: supData, status: supStatus } = (await supabase
      .from("Job")
      .insert({ id, name, company, email, phone, type: jobType, description, budget })
      .select()) as any;
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    }) as any;
    // console.log(supData, supStatus);
    const mailData = {
      from: `New Job Request<no-reply@donaldlouch.ca>`,
      replyTo: `${name}<${email}>`,
      to: "Donald Louch<hello@donaldlouch.ca>",
      subject: `Job Request: ${jobType}`,
      text:
        " New message from: " +
        name +
        " | " +
        description +
        " | Sent from: " +
        email,
      // html: `<p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">You have a new job request from ${name} ${company && (`from the company, ${company}`)}.</p><p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">This job is for ${jobType} and they are asking for the job to be:</p><p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">${description}</p><p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">Their estimated budget is: ${budget ? (budget) : ("not listed and to be discussed.")}</p><p style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px;">You may contact ${name} by way of email at ${email} or phone at ${phone}.</p>`
      // html: html(req)

      html: `<body style="@import url('https://fonts.googleapis.com/css2?family=Lato:400,400i,700,700i&family=Playfair+Display:400,400i,700,700i&display=swap');width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
      <div class="es-wrapper-color" style="background-color:#30243c"><!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#ededed"></v:fill>
      </v:background>
      <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#30243c">
      <tr>
      <td valign="top" style="padding:0;Margin:0">
      <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
        <tr>
          <td align="center" style="padding:0;Margin:0">
          <table bgcolor="#30243c" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
            <tr>
              <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://donaldlouch.ca" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/dnvy034vzelv0ki5w0ns.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Logo" height="57" class="adapt-img"></a></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr>
          <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
            <tr>
              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:46px;font-style:normal;font-weight:bold;color:#EDEDED"><strong>New Job Request</strong></h1></td>
                    </tr>
                    <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px">You’ve received this message because there has been a new <strong>${jobType}</strong> job request from ${name}${
        company != undefined ? ` from the company, ${company}` : ""
      }. This was submitted from the Donald Louch website at <a target="_blank" href="${
        process.env.NEXT_PUBLIC_SITE_URL
      }" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#764688;font-size:14px">${
        process.env.NEXT_PUBLIC_SITE_URL
      }</a>.
                      </p>.</td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px;text-align:left">Here is the information that was submitted:</p></td>
                    </tr>
                    <tr>
                      <td align="left" style="Margin:0;padding-left:25px;padding-right:25px;padding-top:0px;padding-bottom:15px">
                        <div style="font-family:lato, 'helvetica neue', helvetica, arial, sans-serif">
                        <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Description</h2><br> ${description}
                        <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Contact Info</h2><br>${name}${
        company != undefined ? ` from the company, ${company}` : ""
      } 
                        <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Email</h2><br>${email} 
                        <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Phone Number</h2><br>${phone} 
                        <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Budget</h2><br>${
                          budget
                            ? budget
                            : "Budget was not listed and to be discussed."
                        }
                      </div>
                      </td>
                    </tr>
                    <tr>
                    <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><!--[if mso]><a href="https://donaldlouch.ca/portal/messages" target="_blank" hidden>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://donaldlouch.ca/portal/messages" 
                                  style="height:44px; v-text-anchor:middle; width:136px" arcsize="14%" stroke="f"  fillcolor="#764688">
                      <w:anchorlock></w:anchorlock>
                      <center style='color:#ededed; font-family:lato, "helvetica neue", helvetica, arial, sans-serif; font-size:18px; font-weight:400; line-height:18px;  mso-text-raise:1px'>Read Message</center>
                    </v:roundrect></a>
                  <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#764688;border-width:0px;display:inline-block;border-radius:6px;width:auto;mso-hide:all"><a href="https://donaldlouch.ca/portal/messages" class="es-button es-button-1666494623734" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#EDEDED;font-size:20px;border-style:solid;border-color:#764688;border-width:10px 30px;display:inline-block;background:#764688;border-radius:6px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">Read Message</a></span><!--<![endif]--></td>
                                        </tr>
                    <tr>
                      <td align="left" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px">Thanks,<br>Donald Louch<br></p></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
      </tr>
      </table>
      </div>
      </body>`,
    };

    const sender = await transporter.sendMail(mailData);

    const contactData = [
      { id: supData.id },
      { statusSupabase: supStatus },
      { mailID: sender.messageID },
    ];
    return NextResponse.json(contactData);
  } catch (error) {
    console.log("The error", error);
  }
}