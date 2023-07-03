import { ClerkProvider } from "@clerk/nextjs";


export default function SigninLayout({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>
}