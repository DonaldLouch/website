'use client'

import DisplayDate from "@/lib/DisplayDate";
import { ActionIcon, Avatar, Badge, Group, Menu, rem, Stack, Table, Text, Tooltip } from "@mantine/core";

import { ProjectStatus } from "@/lib/Project/projectStatus";
import { ProjectType } from "@/lib/Project/projectType";

import classes from "@/app/(Components)/Components.module.css"
import { useRouter } from "next/navigation";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function ProjectRow({ project, orderNumber, isStaff }: { project: any, orderNumber: number, isStaff?: boolean }) {    
  const projectStatus = ProjectStatus.find(({ id }) => id === project.status)
  const projectType = ProjectType.find(({ id }) => id === project.projectKind)
  
  const router = useRouter()

  function openProject() {
    router.push(`project/${project.id}`)
  }
  return <Table.Tr key={project.id}>
    <Table.Td w="7%" ta="center">
      <Text fz="sm">#{orderNumber + 1}</Text>
    </Table.Td>
    <Table.Td w="33%">
      <Group gap="sm">
        <Stack>
          <Tooltip label={project.name}>
            <Text fz="sm" lh="1" lineClamp={1} fw="600">{project.name}</Text>
          </Tooltip>
          <Tooltip label={projectType?.fullText ? projectType?.fullText : projectType?.smallText}>
            <Badge color="gray" leftSection={<HugeIcon name="book-02" />} mb="1rem" mt="-1rem">
                {projectType?.smallText}
            </Badge>
          </Tooltip>
        </Stack>
      </Group>
    </Table.Td>
    <Table.Td w="10%" ta="center">
      <Tooltip label={project.startDate ? <DisplayDate source={project.startDate} /> : "Not Listed"}>
        <Text fz="sm" fw="600">{project.startDate ? <DisplayDate source={project.startDate} format="MM-DD-YYYY" />  : "Not Listed"}</Text>
      </Tooltip>
      <Text fz="xs" c="dimmed" mt="-1rem">
        Start Date
      </Text>
    </Table.Td>
    <Table.Td w="10%" ta="center">
      <Tooltip label={project.deadline ? <DisplayDate source={project.deadline} /> : "Not Listed"}>
        <Text fz="sm" fw="600">{project.deadline ? <DisplayDate source={project.deadline} format="MM-DD-YYYY" /> : "Not Listed"}</Text>
      </Tooltip>
      <Text fz="xs" c="dimmed" mt="-1rem">
        Deadline
      </Text>
    </Table.Td>
    <Table.Td w="10%" ta="center">
      <Tooltip label={project.budget}>
        <Text fz="sm" fw="600">{project.budget} </Text>
      </Tooltip>
      <Text fz="xs" c="dimmed" mt="-1rem">
        Budget
      </Text>
    </Table.Td>
    <Table.Td w="15%" ta="center">
      <Tooltip label={projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}>
        <Badge color={projectStatus?.colorScheme ? projectStatus?.colorScheme : "blue"} leftSection={projectStatus?.icon ? projectStatus?.icon : <Loading03Icon variant="twotone" />}>
            {projectStatus?.smallText}
        </Badge>
      </Tooltip>
    </Table.Td>
    
    <Table.Td>
      <Group gap="1rem" justify="flex-end" p="0 1rem">
        <Tooltip label="View Project">
          <ActionIcon variant="subtle" color="gray" onClick={openProject}>
            <HugeIcon name="view" style={{ width: rem(16), height: rem(16) }}  variant="twotone" />
          </ActionIcon>
        </Tooltip>
        {isStaff &&
        <Menu
          transitionProps={{ transition: 'pop' }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <HugeIcon name="menu-01" style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown bg="black" c="white" bd="none" fz="1.1rem">
            <Menu.Item
              leftSection={
                <HugeIcon name="grid" style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              {project.client}
            </Menu.Item>
            <Menu.Item
              leftSection={
                <HugeIcon name="checkmark-badge-01" style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Approve Project
            </Menu.Item>
            <Menu.Item
              leftSection={
                <HugeIcon name="unavailable" style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Decline Project
            </Menu.Item>
            <Menu.Item
              leftSection={
                <HugeIcon name="delete-02" style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Delete Project
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        }
      </Group>
    </Table.Td>
  </Table.Tr>
}
