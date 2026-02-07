import { Head, Heading, Html, Img, Link, Tailwind, Text, Hr, Body } from "@react-email/components";

export default function EmailContact({ body }: any) {
	const { subject, name, email, message } = body
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
				New {subject} Inquire
			</Heading>
			<Text className="text-xl">A new inquire was submitted on the Donald Louch Website. This was submitted from <Link href={baseURL} className="text-[#e7c462]">{baseURL}</Link>.</Text>
			<Hr className="my-[16px] border-gray-300 border-t-2" />
			<Heading as="h3">
				Name
			</Heading>
			<Text className="text-xl">{name}</Text>
			<Heading as="h3">
				Email Address
			</Heading>
			<Text className="text-xl"><Link href={email} className="text-[#e7c462]">{email}</Link></Text>
			<Heading as="h3">
				Subject
			</Heading>
			<Text className="text-xl">{subject}</Text>
			<Heading as="h3">
				Body
			</Heading>
			<Text className="text-xl">{message}</Text>
		</></Body></Tailwind>
	</Html>
}
