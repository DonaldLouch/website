'use client'

import { Box, Grid, Group, Text } from '@mantine/core';

import classes from './StatsGrid.module.css';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';

// const icons = {
//   user: IconUserPlus,
//   discount: IconDiscount2,
//   receipt: IconReceipt2,
//   coin: IconCoin,
// };

// const data = [
//   { title: 'Revenue', value: '13,456' },
//   { title: 'Profit', icon: <BsCoin />, value: '4,145' },
//   { title: 'Profit', icon: <BsCoin />, value: '4,145' },
//   { title: 'Profit', icon: <BsCoin />, value: '4,145'},
//   { title: 'Profit', icon: <BsCoin />, value: '4,145', difference: -13, differenceText: "Compared to previous month" },
//   { title: 'Profit', icon: <BsCoin />, value: '4,145', difference: -13 },
// ] as const;

export default function StatsGroup({ statsData }: { statsData: [title: any, value: any, icon?: any, difference?: number, differenceText?: string]}) {
  const stats = statsData.map((stat: any) => {
    return (
      <Grid.Col p="1rem" style={{borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)"}} key={stat.title} bg="none" span={3} m="0.5rem">
        <Group justify="space-between" m="0" lh="0">
          <Text size="0.9rem" c="grey" tt="uppercase" fw="700" lh="0" ta={{base: "center", sm: "left"}}>{stat.title}</Text>
          {stat.icon && <Box c="grey" display={{base: "none", sm: "initial"}}>{stat.icon}</Box>}
        </Group>

        <Group align="center" gap="0.5rem" justify="center">
          <Text className={classes.value} fw={700} fz={{base: "1.3rem", sm: "1.6rem"}}>{stat.value}</Text>
          {stat.difference &&
            <Text c={stat.difference > 0 ? 'teal' : 'red'} fz="sm" fw={500} ff="monospace" lh={1} display={{base: "none", sm: "initial"}}>
                <span style={{paddingRight: "0.2rem"}}>{stat.difference}%</span>
                {stat.difference > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />}
            </Text>
        }
        </Group>
        {stat.difference && stat.differenceText &&<Text fz="xs" c="grey" mt="0.5rem" ff="heading" display={{base: "none", sm: "initial"}}>{stat.differenceText}</Text>}
      </Grid.Col>
    );
  })

  return (
    <Box>
      <Grid align="center" justify="center">{stats}</Grid>
    </Box>
  );
}
