import { Head, Heading, Html, Img, Link, Tailwind, Text, Hr, Body, Button } from "@react-email/components";

export default function EmailAuth({ body }: any) {
	const { url, title, text, linkText, buttonText } = body

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
				{title}
			</Heading>
			<Text className="text-xl">{text}</Text>
			<Hr className="my-[16px] border-gray-300 border-t-2" />
			{linkText && <>
				<Text className="text-xl">{linkText}</Text>
				<Button href={url} className="rounded-[8px] bg-[#e7c462] p-[1rem] text-center text-[#1e192a]">
					{buttonText}
				</Button>
				<Text className="text-xl">If the button dose not work, please visit this link: {url}.</Text>
			</>}
			<Text className="text-xl">Thanks,</Text>
			<Text className="text-xl">Donald Louch</Text>
		</></Body></Tailwind>
	</Html>
}
