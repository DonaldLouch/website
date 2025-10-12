import nodemailer from "nodemailer";

import { NextResponse } from "next/server";

// import { createId } from "@paralleldrive/cuid2";
import supabase from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { name, email, subject, message } = (await request.json()) as any;
  const id =
    "contact" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substring(2, 5).toLowerCase();
  try { 
    const { data: supData, status: supStatus } = (await supabase
      .from("Contact")
      .insert({ id, name, email, subject, message })
      .select()) as any

    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    }) as any

    const mailData = {
      from: `New Contact Form<hello@donaldlouch.ca>`,
      replyTo: `${name}<${email}>`,
      to: "Donald Louch<hello@donaldlouch.ca>",
      subject: `Form On Donald Louch: ${subject}`,
      text:
        " New message from: " +
        name +
        " | " +
        message +
        " | Sent from: " +
        email,
      html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:620px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #30243c; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #30243c;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 655px; margin: 0 auto;" width="655">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
													<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:25px;width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center">
																	<div class="fullWidth" style="max-width: 450px;"><a href="https://donaldlouch.ca" target="_blank"><img src="https://donaldlouch.ca/titleLogo/titleLogoWhite.svg" style="display: block; height: auto; border: 0; width: 100%;" width="450" alt="Donald Louch Title Logo" title="Donald Louch Title Logo" height="auto"></a></div>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 900; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 46px;"><span class="tinyMce-placeholder" style="word-break: break-word;">New ${subject} Inquire</span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">A new inquire was submitted on the Donald Louch Website. This was submitted from <a href=${process.env.NEXT_PUBLIC_SITE_URL} target="_blank" style="text-decoration: underline; color: #e7c462;" rel="noopener">${process.env.NEXT_PUBLIC_SITE_URL}</a></p>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h3 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Name</span></h3>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0;">${name}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h3 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Email Address</span></h3>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-9" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0;">${email}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-10" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h3 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Subject</span></h3>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-11" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0;">${subject}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-12" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h3 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Body</span></h3>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-13" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0;">${message}</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-14" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`,
      // html: `<p style="@import url('https://fonts.googleapis.com/css2?family=Noto Sans&display=swap'); font-family: Noto Sans, Helvetica, Arial, sans-serif; font-size: 18px;">${req?.body.message}</p>`,
      // html: `<body style="@import url('https://fonts.googleapis.com/css2?family=Noto Sans:400,400i,700,700i&family=Playfair+Display:400,400i,700,700i&display=swap'); width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
      // <div class="es-wrapper-color" style="background-color:#30243c"><!--[if gte mso 9]>
      // <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      // <v:fill type="tile" color="#30243c"></v:fill>
      // </v:background>
      // <![endif]-->
      // <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#30243c">
      // <tr>
      // <td valign="top" style="padding:0;Margin:0">
      // <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
      // <tr>
      // <td align="center" style="padding:0;Margin:0">
      // <table bgcolor="#30243c" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
      // <tr>
      // <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
      // <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
      // <tr>
      // <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
      // <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
      // <tr>
      // <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://donaldlouch.ca" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/dnvy034vzelv0ki5w0ns.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Logo" height="57" class="adapt-img"></a></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table>
      // <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
      // <tr>
      // <td align="center" style="padding:0;Margin:0">
      // <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
      // <tr>
      // <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
      // <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
      // <tr>
      // <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
      // <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
      // <tr>
      // <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:46px;font-style:normal;font-weight:bold;color:#EDEDED"><strong>New Contact</strong></h1></td>
      // </tr>
      // <tr>
      // <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px">You’ve received this message because there has been a new contact form submission from the Donald Louch website at <a target="_blank" href="${process.env.NEXT_PUBLIC_SITE_URL}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#764688;font-size:14px">${process.env.NEXT_PUBLIC_SITE_URL}</a>.</p></td>
      // </tr>
      // <tr>
      // <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px;text-align:left">Here is a preview of the responses:</p></td>
      // </tr>
      // <tr>
      // <td align="left" style="Margin:0;padding-left:25px;padding-right:25px;padding-top:0px;padding-bottom:15px">
      // <div style="font-family:lato, 'helvetica neue', helvetica, arial, sans-serif">
      //   <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Information</h2><br>Sent From ${name}<${email}>
      //   <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Subject</h2><br>${subject}
      //   <h2 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'playfair display', georgia, 'times new roman', serif;font-size:26px;font-style:normal;font-weight:bold;color:#EDEDED"><br>Message</h2><br>${message}
      // </div>
      // </td>
      // </tr>
      // <tr>
      // <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><!--[if mso]><a href="https://donaldlouch.ca/admin/messages" target="_blank" hidden>
      // <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://donaldlouch.ca/admin/messages"
      // style="height:44px; v-text-anchor:middle; width:136px" arcsize="14%" stroke="f"  fillcolor="#764688">
      // <w:anchorlock></w:anchorlock>
      // <center style='color:#ededed; font-family:lato, "helvetica neue", helvetica, arial, sans-serif; font-size:18px; font-weight:400; line-height:18px;  mso-text-raise:1px'>Read Message</center>
      // </v:roundrect></a>
      // <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#764688;border-width:0px;display:inline-block;border-radius:6px;width:auto;mso-hide:all"><a href="https://donaldlouch.ca/admin/messages" class="es-button es-button-1666494623734" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#EDEDED;font-size:20px;border-style:solid;border-color:#764688;border-width:10px 30px;display:inline-block;background:#764688;border-radius:6px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">Read Message</a></span><!--<![endif]--></td>
      // </tr>
      // <tr>
      // <td align="left" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#EDEDED;font-size:14px">Thanks,<br>Donald Louch<br></p></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table></td>
      // </tr>
      // </table>
      // </div>
      // </body>`,
      // html: html(req)
    };

    const sender = await transporter.sendMail(mailData)
    const contactData = [
      { id: supData.id },
      { statusSupabase: supStatus },
      { mailID: sender.messageID },
    ]
    return NextResponse.json(contactData);
  } catch (error) {
    console.log("The error", error)
  }
}
