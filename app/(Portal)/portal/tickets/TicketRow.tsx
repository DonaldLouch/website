'use client'

import DisplayDate from "@/lib/DisplayDate";
import { ActionIcon, Avatar, Badge, Group, Menu, rem, Stack, Table, Text, Tooltip } from "@mantine/core";

import { ProjectStatus } from "@/lib/Project/projectStatus";
import { ProjectType } from "@/lib/Project/projectType";

import classes from "@/app/(Components)/Components.module.css"
import { useRouter } from "next/navigation";
import PriorityBadge from "../project/(Components)/PriorityBadge";
import StatusBadge from "../project/(Components)/StatusBadge";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function TicketRow({ ticket, orderNumber, isStaff }: { ticket: any, orderNumber: number, isStaff?: boolean }) {    

  // const projectStatus = ProjectStatus.find(({ id }) => id === ticket.status)
  
  const router = useRouter()

  function openProject() {
    router.push(`ticket/${ticket.id}`)
  }
  return <Table.Tr key={ticket.id}>
    {/* <Table.Td w="7%" ta="center">
      <Text fz="sm">#{orderNumber + 1}</Text>
    </Table.Td> */}
    <Table.Td w="30%">
      <Group gap="0" pl="2rem">
        <Stack>
          <Tooltip label={ticket.subject}>
            <Text fz="sm" fw="600">{ticket.subject}</Text>
          </Tooltip>
            <Text fz="xs" c="dimmed" mt="-2rem">{ticket.id}</Text>
        </Stack>
      </Group>
    </Table.Td>
    <Table.Td w="10%" ta="center">
      <Tooltip label={ticket.createdOn ? <DisplayDate source={ticket.createdOn} /> : "Not Listed"}>
        <Text fz="sm" fw="600">{ticket.createdOn ? <DisplayDate source={ticket.createdOn} format="MM-DD-YYYY" />  : "Not Listed"}</Text>
      </Tooltip>
      <Text fz="xs" c="dimmed" mt="-1rem">
        Created On
      </Text>
    </Table.Td>

    <Table.Td w="27.5%" ta="right">
      <Tooltip label={ticket.id}>
          <Badge color="gray" leftSection={ticket.relatedTo?.type === "Project" ? <HugeIcon name="files-01" /> : ticket.relatedTo?.type === "Task" ? <HugeIcon name="task-01" /> : <HugeIcon name="grid" />}>
             {ticket.relatedTo?.id}
          </Badge>
        </Tooltip>
    </Table.Td>
    
    {/* <Table.Td w="15%" ta="center">
      <Tooltip label={ticket.from ? ticket.from.type === "client" ?  ticket.from.id : "Donald Louch": "Unknown"}>
        <Badge color={projectStatus?.colorScheme ? projectStatus?.colorScheme : "blue"} leftSection={projectStatus?.icon ? projectStatus?.icon : <Loading03Icon variant="twotone" />}>
           {ticket.from ? ticket.from.type === "client" ?  `${ticket.from.firstName} ${ticket.from.lastName}` : "Donald Louch": "Unknown"}
        </Badge>
      </Tooltip>
    </Table.Td> */}

    <Table.Td w="12.5%" ta="center">
      <PriorityBadge priority={ticket.priority} />
    </Table.Td>

    <Table.Td w="15%" ta="center">
      {/* <Tooltip label={projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}> */}
        <StatusBadge status={ticket.status} />
      {/* </Tooltip> */}
    </Table.Td>
    
    <Table.Td w="15%" ta="center">
      <Group gap="1rem" justify="flex-end" p="0 1rem">
        <Tooltip label="View Ticket">
          <ActionIcon variant="subtle" color="gray" onClick={openProject}>
            <HugeIcon name="view" style={{ width: rem(16), height: rem(16) }}  variant="twotone" />
          </ActionIcon>
        </Tooltip>
        {/* {isStaff &&
        <Menu
          transitionProps={{ transition: 'pop' }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <Menu01Icon style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown bg="black" c="white" bd="none" fz="1.1rem">
            <Menu.Item
              leftSection={
                <GridIcon style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              {ticket.client}
            </Menu.Item>
            <Menu.Item
              leftSection={
                <CheckmarkBadge01Icon style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Approve Project
            </Menu.Item>
            <Menu.Item
              leftSection={
                <UnavailableIcon style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Decline Project
            </Menu.Item>
            <Menu.Item
              leftSection={
                <Delete02Icon style={{ width: rem(16), height: rem(16) }} />
              }
              c="white"
              className={classes.comboboxOption}
            >
              Delete Project
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        } */}
      </Group>
    </Table.Td>
  </Table.Tr>
}
