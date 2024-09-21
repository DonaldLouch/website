'use client'

import DisplayDate from "@/lib/DisplayDate";
import { ArrowDown02Icon, Book02Icon, CheckmarkBadge01Icon, CheckmarkBadge03Icon, ContactIcon, Delete02Icon, GridIcon, InformationCircleIcon, Loading03Icon, MailAtSign01Icon, Menu01Icon, Remove01Icon, Remove02Icon, SmartPhone01Icon, TaskDone01Icon, Time02Icon, UnavailableIcon, ViewIcon } from "@hugeicons/react";
import { ActionIcon, Alert, Anchor, AspectRatio, Badge, Box, Card, Divider, Grid, Group, Menu, Modal, rem, Stack, Table, Text, Title, Tooltip } from "@mantine/core";

import { ProjectStatus } from "@/lib/Project/projectStatus";
import { TaskPriority } from "@/lib/Project/taskPriority";

import classes from "@/app/(Components)/Components.module.css"
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import PriorityBadge from "../../../(Components)/PriorityBadge";
import StatusBadge from "../../../(Components)/StatusBadge";
import moment from "moment";
import TaskDescription from "./TaskDescription";
import TaskForm from "./TaskForm";
import AddSubTask from "./AddSubTask";
import SubTaskCheck from "./SubTaskCheck";

export default function TaskRow({ task, isStaff, isOpenedID }: { task: any, isStaff?: boolean, isOpenedID: boolean }) {    
//   const projectStatus = ProjectStatus.find(({ id }) => id === task.status)
//   const taskPriority = TaskPriority.find(({ id }) => id === task.priority)
  const project = task.projectID

//   console.log(project)
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const currentTime = new Date()
  const deadline = new Date(task.deadline)

//   console.log()

  function forceClose() {
    router.push(`/portal/project/${project.id}?openID=tasks`)
  }
  return <>
    <Table.Tr key={task.id} style={{opacity: task.isCompleted && "0.7"}} c={task.isCompleted ? "green" : "white"}>
        <Table.Td w="5%" ta="center">
            {/* {isStaff && 
                // DRAG and DROP
            } */}
            <Text fz="sm">#{task.taskOrderNumber}</Text>
        </Table.Td>

        <Table.Td w="32.5%">
            <Tooltip label={task.title}>
                <Text fz="sm" fw={!task.isCompleted ? "900" : "600"} lineClamp={1} td={task.isCompleted && "line-through"}>{task.title}</Text>
            </Tooltip>
        </Table.Td>

        <Table.Td w="10%" ta="center">
            <Tooltip label={task.startDate ? <DisplayDate source={task.startDate} /> : "Not Listed"}>
                <Text fz="sm" fw="600" c={currentTime < new Date(task.startDate) ? "green" : "white"}>{task.startDate ? <DisplayDate source={task.startDate} format="MM-DD-YYYY" />  : "Not Listed"}</Text>
            </Tooltip>
            <Text fz="xs" c="dimmed" mt="-1rem">
                Start Date
            </Text>
        </Table.Td>

        <Table.Td w="10%" ta="center">
            <Tooltip label={task.deadline && !task.isCompleted ? <DisplayDate source={task.deadline} /> : task.isCompleted ? <DisplayDate source={task.completedOn} /> : "Not Listed"}>
                <Text fz="sm" fw="600" c={!task.deadline ? "white" : currentTime < new Date(task.deadline) ? "green" : task.completedOn && new Date(task.completedOn) < new Date(deadline) ? "green" :  "red"}>{task.deadline && !task.isCompleted ? <DisplayDate source={task.deadline} format="MM-DD-YYYY" /> : task.isCompleted ? <DisplayDate source={task.completedOn} format="MM-DD-YYYY" /> :  "Not Listed"}</Text>
            </Tooltip>
            <Text fz="xs" c="dimmed" mt="-1rem">
                {!task.isCompleted ? "Deadline" : "Completed On"}
            </Text>
        </Table.Td>

        <Table.Td w="10%" ta="center">
            <Tooltip label={task.subTasks ? `${task.subTasks.filter((item: { isCompleted: boolean; }) => item.isCompleted === false).length} Sub Task Left of ${task.subTasks.length} Sub Tasks` : "No Sub Tasks!"}>
                <Text fz="sm" fw="600">{task.subTasks ? `${task.subTasks.filter((item: { isCompleted: boolean; }) => item.isCompleted === false).length}/${task.subTasks.length}` : "No Sub Tasks!"}</Text>
            </Tooltip>
            <Text fz="xs" c="dimmed" mt="-1rem">
                Sub Tasks
            </Text>
        </Table.Td>

        <Table.Td w="12.5%" ta="right">
            <PriorityBadge priority={task.priority} />
        </Table.Td>

        <Table.Td w="15%" ta="left">
            {task.isCompleted ? <Tooltip label={`Task Completed On ${moment(task.completedOn).format("MMMM Do, YYYY [at] h:mma")}`}>
                <Badge color="green" leftSection={<CheckmarkBadge03Icon variant="twotone" />}>
                    Completed!
                </Badge>
            </Tooltip> : <StatusBadge status={task.status} />}
        </Table.Td>
        
        <Table.Td>
            <Group gap="1rem" justify="flex-end" p="0 1rem">
                <Tooltip label="View Project">
                    <ActionIcon variant="subtle" color={!task.isCompleted ? "gray" : "green"} onClick={open}>
                        {!task.isCompleted ? <ViewIcon style={{ width: rem(16), height: rem(16) }} variant="twotone" /> : <TaskDone01Icon style={{ width: rem(16), height: rem(16) }} />}
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Table.Td>
    </Table.Tr>
    <Modal opened={isOpenedID ? true : opened} onClose={isOpenedID ? forceClose : close} title={`Task: ${task.title}`} yOffset="2rem" xOffset="2rem" size="100%"  
        overlayProps={{
            backgroundOpacity: 0.5, 
            blur: 4,
        }} 
        styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
        radius="lg"
    >
        <Box component="main" id={task.taskID} color="white">
            <Group mb="1rem" justify="space-between" align="center" mt="1rem">
                <Group align="center" w="50%">
                    <Title ff="body" fw="900" style={{ wordBreak: "break-all" }}>{task.title}</Title>
                </Group>
                <Group align="center" justify="center">
                    <PriorityBadge priority={task.priority} />
                    {/* <StatusBadge status={task.status} /> */}
                    {task.isCompleted ? <Tooltip label={`Task Completed On ${moment(task.completedOn).format("MMMM Do, YYYY [at] h:mma")}`}>
                        <Badge color="green" leftSection={<CheckmarkBadge03Icon variant="twotone" />}>
                           Completed!
                        </Badge>
                    </Tooltip> : <StatusBadge status={task.status} />}
                </Group>
            </Group>
            <Divider />
            <Card bg="none" c="white" m="1rem 0">
               <Title size="2xl" td="underline" fw="900" order={2}>At a Glance</Title>
                    <Grid gutter="2rem">
                        <Grid.Col span={8}>
                            <TaskDescription task={task} isStaff={isStaff} />
                            <Title size="xl" td="underline" fw="900" order={3} ta="center" mt="1rem">Sub Tasks</Title>
                            <AddSubTask task={task} isStaff={isStaff} />
                              {!task.subTasks ? <Alert variant="light" color="green" icon={<InformationCircleIcon variant="twotone"/>}><Text my="0.5rem" c="white">There currently is no sub tasks assigned for this task. Donald Louch will add new sub tasks as the task progresses so make sure to check back!</Text></Alert> : task.subTasks.map((subtask: any, index: number) => (
                                <SubTaskCheck subtask={subtask} isStaff={isStaff} allSubTasks={task.subTasks} index={index} taskID={task.id} />
                              ))
                                
                              }
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <AspectRatio ratio={16/9} p="2rem" mt="2rem !important" style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }}>
                                <Stack m="0" gap="0">
                                    <Title size="2xl" td="underline" fw="900" order={2} ta="center" my="1rem">Project Information</Title>
                                    <Stack>
                                        <Tooltip label={`${project.name}`}>
                                            <Text fz="2xl" fw="900" lineClamp={1} m="0">{project.name}</Text>
                                        </Tooltip>
                                        <Text fz="xs" c="dimmed" mt="-1rem">
                                            Project Name
                                        </Text>
                                    </Stack>
                                    <Stack gap="0">
                                        <Group c="white" m="0" gap="0.5rem">
                                            <GridIcon />
                                            <Tooltip label={project.id}>
                                                <Anchor href={`/portal/project/${project.id}`} c="var(--secondary)" underline="hover" m="0"><Text lineClamp={1}>{project.id}</Text></Anchor>
                                            </Tooltip>
                                        </Group>
                                        <Text fz="xs" c="dimmed" mt="-0.5rem">
                                            Project ID
                                        </Text>
                                    </Stack>
                                    <Title size="2xl" td="underline" fw="900" order={2} ta="center" my="1rem">Task Information</Title>
                                    <Group c="white" m="0" gap="0.5rem">
                                        <GridIcon />
                                        <Tooltip label={project.id}>
                                            <Anchor href={`/portal/project/${project.id}?openID=${task.id}`} c="var(--secondary)" underline="hover" m="0"><Text lineClamp={1}>{task.id}</Text></Anchor>
                                        </Tooltip>
                                    </Group>
                                    <Text fz="xs" c="dimmed" mt="-0.5rem">
                                        Project ID
                                    </Text>
                                    <TaskForm task={task} isStaff={isStaff} />
                                    {task.createdOn &&
                                        <Stack m="1rem 0 0.5rem">
                                            <Tooltip label={task.createdOn ? <DisplayDate source={task.createdOn} /> : "Not Listed"}>
                                                <Text fw="900" lineClamp={1} m="0">{task.createdOn ? <DisplayDate source={task.createdOn} />  : "Not Listed"}</Text>
                                            </Tooltip>
                                            <Text fz="xs" c="dimmed" mt="-1rem">
                                                Created On
                                            </Text>
                                        </Stack>
                                    }
                                    {task.startDate &&
                                        <Stack my="0.5rem">
                                            <Tooltip label={task.startDate ? <DisplayDate source={task.startDate} /> : "Not Listed"}>
                                                <Text fw="900" lineClamp={1} m="0" c={currentTime < new Date(task.startDate) ? "green" : "white"}>{task.startDate ? <DisplayDate source={task.startDate} />  : "Not Listed"}</Text>
                                            </Tooltip>
                                            <Text fz="xs" c="dimmed" mt="-1rem">
                                                Start Date
                                            </Text>
                                        </Stack>
                                    }
                                    {task.deadline  &&
                                        <Stack my="0.5rem">
                                            <Tooltip label={task.deadline ? <DisplayDate source={task.deadline} /> : "Not Listed"}>
                                                <Text fw="900" lineClamp={1} m="0" c={currentTime < new Date(task.deadline) ? "green" : task.completedOn && new Date(task.completedOn) < new Date(deadline) ? "green" : "red"}>{task.deadline? <DisplayDate source={task.deadline} /> : "Not Listed"}</Text>
                                            </Tooltip>
                                            <Text fz="xs" c="dimmed" mt="-1rem">
                                                Deadline
                                            </Text>
                                        </Stack>
                                    }
                                    {task.isCompleted &&
                                        <Stack my="0.5rem">
                                            <Tooltip label={task.isCompleted ? <DisplayDate source={task.completedOn} /> : "Not Listed"}>
                                                <Text fw="900" lineClamp={1} m="0" c={task.completedOn && new Date(task.completedOn) < new Date(deadline) ? "green" :  "red"}>{task.isCompleted ? <DisplayDate source={task.completedOn} /> :  "Not Listed"}</Text>
                                            </Tooltip>
                                            <Text fz="xs" c="dimmed" mt="-1rem">
                                                Completed On
                                            </Text>
                                        </Stack>
                                    }
                                </Stack>
                            </AspectRatio>
                        </Grid.Col>
                    </Grid>
            </Card>
        </Box>
    </Modal>
  </>
}