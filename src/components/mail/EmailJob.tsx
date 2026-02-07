import { Head, Heading, Html, Img, Link, Tailwind, Text, Hr, Body, Button } from "@react-email/components";

export default function EmailJob({ body }: any) {
	const { name, company, email, phone, jobType, description, budget  } = body
	const baseURL = process.env.VITE_WEB_URI
	return <Html lang="en">
		<Head />
		<Tailwind><Body className="bg-[#1e192a] font-['Noto_Sans, sans'] text-[#e7e7e7] text-2xl p-[4rem]"><>
			<Link className="text-gray-600 [text-decoration:none]" href="/">
				<Img
					alt="Donald Louch"
					className="mx-auto"
					width={1000}
					// height={250}
					src="https://donaldlouch.ca/titleLogo/titleLogoWhiteColoured.svg"
				/>  
			</Link>
			<Heading as="h2" className="text-center">
				New Job Request
			</Heading>
			<Text className="text-xl">
				You’ve received this message because there has been a new <strong>{jobType}</strong> job request from {name}{company ? ` from the company, ${company}` : ""}. This was submitted from the Donald Louch website at <Link href={baseURL} className="text-[#e7c462]">{baseURL}</Link>.
			</Text>
			<Hr className="my-[16px] border-gray-300 border-t-2" />
			<Heading as="h3">
				Description
			</Heading>
			<Text className="text-xl">{description}</Text>
			<Heading as="h3">
				Contact Info
			</Heading>
			<Text className="text-xl">{name}{company ? ` from the company, ${company}` : ""} </Text>
			<Heading as="h3">
				Email
			</Heading>
			<Text className="text-xl"><Link href={email} className="text-[#e7c462]">{email}</Link></Text>
			<Heading as="h3">
				Phone
			</Heading>
			<Text className="text-xl">{phone}</Text>
			<Heading as="h3">
				Budget
			</Heading>
			<Text className="text-xl">{budget || "Budget was not listed and to be discussed."}</Text>
			<Hr className="my-[16px] border-gray-300 border-t-2" />
			<Button href="https://donaldlouch.ca/admin/messages" className="rounded-[8px] bg-[#e7c462] p-[1rem] text-center text-[#1e192a]">
				Read Message
			</Button>
			<Text className="text-xl">Thanks,</Text>
			<Text className="text-xl">Donald Louch</Text>
		</></Body></Tailwind>
	</Html>
}
