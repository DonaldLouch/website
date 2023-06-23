import FooterContent from "./FooterContent";

export default async function Footer({ isLoggedIn }: { isLoggedIn: boolean}) {
  return <FooterContent isLoggedIn={isLoggedIn} />
}
