import { Image, Tooltip } from "@chakra-ui/react";
import Link from "next/link";

export const LinkedSVGButton = (buttonLink: {
  link: string;
  title: string;
  icon: any;
}) => {
  return (
    <Link href={buttonLink.link}>
      <Tooltip label={buttonLink.title}>
        <Image src="/logoFull.svg" _hover={{ border: "solid" }} h="auto" w="4rem" fontSize="inherit" maxW="none !important" />
      </Tooltip>
    </Link>
  );
};
