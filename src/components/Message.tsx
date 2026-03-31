import { SectionCard } from "@/components/SectionCard";
import { Stack, Title, Text, Box, Center, Image } from "@mantine/core";

export default function Message() {
  return (
      <Box
        component="section"
        id="homeHero"
        w="100vw"
        h="100vh"
        maw="100vw"
        mah="100vh"
        pos="absolute"
        top="0"
        left="0"
        style={{ boxShadow: "bsSecondary", overflow: "hidden !Important", zIndex: 1000 }}
        bg="var(--blurredBackground)"
      >
        <Box
          bg="var(--mainGradient)"
          w="100vw"
          h="100%"
          opacity="0.7"
          pos="absolute"
          bgsz="150% 150%"
        ></Box>
        <Box
          bg={`no-repeat url("https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LWEIJJ2O4srNRK7or.jpeg") #333 40% 40%`}
          bgsz="cover"
          h="100%"
          w="100vw"
        ></Box>
        <Stack
          id="hero"
          pos="absolute"
          top="0"
          left="0"
          justify="center"
          h="100%"
          w="100%"
          style={{ overflow: "hidden" }}
        >
              <Center>
                    <SectionCard
                      styleType="primaryCard"
                      id="authCard"
                      w={{ base: "calc(100% - 1rem)", lg: "calc(100% - 5rem)" }}
                      fz="inherit"
                      bg="var(--darkPurpleRGBA)"
                      // m="0"
                      // p={{ base: "2rem 1rem 0", lg: "3rem 0.5rem 0" }}
                    >
                      <Image src="/logo/logo.svg" w="8rem" mx="auto" mb="1rem" />
                      <Title order={2} fz="3rem" ta="center">
                        Important Update
                      </Title>
                      <Text fz="1.3rem">Hello,</Text>
                      <Text fz="1.3rem">
                        I just wanted to thank everyone who has supported me and my work over the years. I have made the difficult decision to stop working on my digital productions (website, photography, videography, and other public digital media) and focus on other aspects of my life. I have enjoyed creating and sharing my work with you all, and I am grateful for the feedback and encouragement I have received. I hope you understand my decision and wish me the best in my future endeavors.
                      </Text>
                      <Text fz="1.3rem">With this, I am currently in the process of archiving my website and other digital media aspects, then I will be deactivating my website. Effective immediately, I will be deactivating my hello@donaldlouch.ca email address. For my public social media accounts, those will remain live and I may use them from to time. My domain name will remain active until it expires.</Text>
                      <Text fz="1.3rem" mt="2rem">Thank you again for your support and understanding!</Text>
                      <Text fz="1.3rem" mt="-1rem">Donald Louch</Text>
                    </SectionCard>
              </Center>
        </Stack>
      </Box>
    );
}
