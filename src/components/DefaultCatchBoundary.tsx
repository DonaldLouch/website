import { Box, Group, MantineProvider, Paper, Stack, Text, Title } from '@mantine/core'
import {
  rootRouteId,
  useLocation,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import PrimaryLinkedButton from './(Buttons)/PrimaryLinkedButton'
import PrimaryButton from './(Buttons)/PrimaryButton'
import { MantineTheme } from '@/config/MantineTheme'
import { is } from 'zod/v4/locales'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useLocation({select: (location) => location.pathname}) === '/' ? true : false

  console.error('Error:', error)

  return <>
  {/* <MantineProvider theme={MantineTheme}> */}
    <Paper
        p={{ base: "2rem", lg: "4rem" }}
        color="white"
        bg="none"
        shadow="bsBoldRed"
        radius="lg"
        m={{ base: "1rem", sm: "2rem" }}
      >
            <Stack align="center">
              <Title order={1} c="red.5" fz={{ base: "2rem", sm: "3rem" }} fw="900">
                Something Went Wrong!
              </Title>
              <Text c="red.2" tt="capitalize"><Box component="span" fw="900">{error.name}</Box>: {error.message}</Text>
              <Group align="center" justify="center" gap="1rem" m="0" p="0">
                <PrimaryButton
                  action={() => router.invalidate()}
                  primNewIcon={{ name: "rotate-right" }}
                >
                  Try Again
                </PrimaryButton>

                <PrimaryLinkedButton
                  link="mailto:hello@donaldlouch.ca"
                  primNewIcon={{ name: "light-envelope-at", pack: "fak" }}
                >
                  Contact Donald Louch
                </PrimaryLinkedButton>

                {!isRoot ?
                <PrimaryLinkedButton
                  link="/"
                  primNewIcon={{ name: "house", pack: "fajdr" }}
                >
                  Try Going To The Home Page
                </PrimaryLinkedButton>
                :
                 <PrimaryButton
                  action={(e: { preventDefault: () => void }) => {
                    e.preventDefault()
                    window.history.back()
                  }}
                  primNewIcon={{ name: "rotate-right" }}
                >
                  Go Back
                </PrimaryButton> 
                }
              </Group>
            </Stack>
          </Paper>
    {/* </MantineProvider> */}
    </>
}