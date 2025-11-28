import { link } from 'fs/promises';
import nodemailer from "nodemailer";

import { NextResponse } from "next/server";

// import { createId } from "@paralleldrive/cuid2";
import supabase from "@/lib/supabase";

// export const dynamic = "force-dynamic";

interface SendEmailData {
  user: {
    name: string
    email: string
  }
  url: string
  type: string
}

export async function POST(request: Request) {
	const { user, url, type } = (await request.json()) as SendEmailData;
	let subject = "Email From Donald Louch's Website"
	let title = null
	let text = null
	let linkText = null
	let buttonText = null
	
	switch (type) {
		case "emailVerification":
			title = "Email Verification"
			subject = "Email Verification For Donald Louch's Website"
			text = "Thank you for signing up! Please verify your email address"
			linkText = "Please follow the following link to verify your email address"
			buttonText = "Verify Email"
			break
		case "passwordReset":
			title = "Password Reset"
			subject = "Password Reset For Donald Louch's Website"
			text = "You have requested to reset your password"
			linkText = "Please follow the following link to reset your password"
			buttonText = "Reset Password"
			break
		case "emailChange":
			title = "Email Change"
			subject = "Email Change For Donald Louch's Website"
			text = "You have requested to change your email address"
			linkText = "Please follow the following link to confirm your new email address"
			buttonText = "Confirm Email Change"
			break
		case "deleteAccount":
			title = "Delete Account"
			subject = "Delete Account For Donald Louch's Website"
			text = "You have requested to delete your account"
			linkText = "Please follow the following link to confirm your account deletion"
			buttonText = "Confirm Account Deletion"
			break
		case "welcomeEmail":
			title = "Welcome to Donald Louch's Website"
			subject = "Welcome to Donald Louch's Website!"
			text = "Thank you for joining Donald Louch's Website"
			break
	}

	try { 
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
			replyTo: `${user.name}<${user.email}>`,
			to: "Donald Louch<hello@donaldlouch.ca>",
			subject,
			text: `Hello ${user.name},\n\n${text}.${linkText && `\n\n${linkText}. ${url}.`}\n\nCheers,\n\nDonald Louch.}`,
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
																<h1 style="margin: 0; color: #f4f4f4; direction: ltr; font-family: 'Noto Sans', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 900; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 46px;"><span class="tinyMce-placeholder" style="word-break: break-word;">${title}</span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">${text}.</p>
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
													${linkText && `
														<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad">
																	<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																		<p style="margin: 0;">${linkText}.</p>
																	</div>
																</td>
															</tr>
														</table>
														<table class="button_block block-14" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><a href=${url} target="_blank" style="color:#0f111b;text-decoration:none;"><!--[if mso]>
																<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href=${url}  style="height:50px;width:101px;v-text-anchor:middle;" arcsize="8%" fillcolor="#e7c462">
																<v:stroke dashstyle="Solid" weight="0px" color="#e7c462"/>
																<w:anchorlock/>
																<v:textbox inset="0px,0px,0px,0px">
																<center dir="false" style="color:#0f111b;font-family:sans-serif;font-size:20px">
																<![endif]--><span class="button" style="background-color: #e7c462; mso-shading: transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 0 1rem 0 1rem; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #0f111b; display: inline-block; font-family: 'Noto Sans, Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 40px;">${buttonText}</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
															</td>
														</tr>
													</table>
														<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f4f4f4;direction:ltr;font-family:'Noto Sans', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">If the button dose not work, please visit this link: ${url}.</p>
																</div>
															</td>
														</tr>
													</table>
													`}

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
		};

		return NextResponse.json({ message: "Email sent successfully"}, { status: 200 });
	} catch (error) {
		console.log("The error", error)
	}
}
