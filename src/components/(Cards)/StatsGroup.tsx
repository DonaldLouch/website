// "use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Group, SimpleGrid, Text } from '@mantine/core'

// import HugeIcon from '../HugeIcon'

export default function StatsGroup({ statsData }: { statsData: [title: any, value: any, icon?: any, difference?: number, differenceText?: string]}) {
  const stats = statsData.map((stat: any) => {
    return (
      <Box p="1rem" style={{borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)"}} key={stat.title} bg="none" m="0.5rem">
        <Group justify="space-between" m="0" lh="0">
          <Text size="0.9rem" c="grey" tt="uppercase" fw="300" lh="0" ta={{base: "center", sm: "left"}}>{stat.title}</Text>
          {stat.icon && <Box c="grey">
            <FontAwesomeIcon icon={[stat.icon.variant || "fadl", stat.icon.name]} size="lg" />
          </Box>}
        </Group>

        <Group align="center" gap="0.5rem" justify="center">
          <Text fw={700} fz={{base: "1.3rem", sm: "1.6rem"}}>{stat.value}</Text>
          {stat.difference &&
            <Text c={stat.difference > 0 ? 'teal' : 'red'} fz="sm" fw={500} ff="monospace" lh={1} display={{base: "none", sm: "initial"}}>
                <span style={{paddingRight: "0.2rem"}}>{stat.difference}%</span>
                {stat.difference > 0 ? <FontAwesomeIcon icon={["fal", "arrow-up-right"]} /> : <FontAwesomeIcon icon={["fal", "arrow-down-right"]} />}
            </Text>
        }
        </Group>
        {stat.difference && stat.differenceText &&<Text fz="xs" c="grey" mt="0.5rem" ff="heading" display={{base: "none", sm: "initial"}}>{stat.differenceText}</Text>}
      </Box>
    );
  })

  return (
    <Box>
      {/* <Grid align="center" justify="center">{stats}</Grid> */}
      <SimpleGrid cols={{base: 1, sm: 2, md: 3}}>{stats}</SimpleGrid>
    </Box>
  );
}
