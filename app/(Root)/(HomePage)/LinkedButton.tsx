import { Icon, IconButton, Link, Tooltip } from "@chakra-ui/react"
import { Facebook02Icon, NewTwitterIcon, Linkedin02Icon, YoutubeIcon, ThreadsIcon, InstagramIcon, TiktokIcon, GithubIcon, ArrowUpRight01Icon } from "@hugeicons/react"


// import { BsFacebook, BsGithub, BsInstagram, BsLink45Deg, BsLinkedin, BsThreads, BsTiktok, BsTwitterX, BsYoutube } from "react-icons/bs"

interface LinkedButtonProps {
  id: string
  link: string
  subTitle: string | null | undefined
  title: string
  icon: any
}

export const LinkedButton = (buttonLink: LinkedButtonProps) => {
  const icon = 
  buttonLink.icon === "facebook-02" ? <Facebook02Icon size="2rem" /> :
  buttonLink.icon === "new-twitter" ? <NewTwitterIcon size="2rem" /> :
  buttonLink.icon === "linkedin-02" ? <Linkedin02Icon size="2rem" /> :
  buttonLink.icon === "youtube" ? <YoutubeIcon size="2rem" /> :
  buttonLink.icon === "threads" ? <ThreadsIcon size="2rem" /> :
  buttonLink.icon === "instagram" ? <InstagramIcon size="2rem" /> :
  buttonLink.icon === "tiktok" ? <TiktokIcon size="2rem" /> :
  buttonLink.icon === "github" ? <GithubIcon size="2rem" /> :
  <ArrowUpRight01Icon size="2rem" />
  return (
    <Link
      key={buttonLink.id}
      href={buttonLink.link}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Tooltip label={buttonLink.subTitle}>
        {/* <IconButton
          aria-label={`${buttonLink.title} Link`}
          variant="unstyled"
          h="auto"
          fontSize="4xl"
          _hover={{ color: "primary" }}
          icon={<FontAwesomeIcon icon={["fab", buttonLink.icon]} />}
        /> */}
        {icon}
        {/* <Icon as={icon} boxSize="3rem" /> */}
      </Tooltip>
    </Link>
  )
}
