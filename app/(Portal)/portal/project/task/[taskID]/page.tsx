// "use client"
// import { Box } from "@chakra-ui/react"
import { useSession } from "next-auth/react"

// import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
// import { useState } from "react"
import GetTask from "./GetTask"

import { Alert, AlertIcon, AlertTitle, Badge, Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, AlertDescription,
useDisclosure, 
Card,
CardHeader,
CardBody,
Link,
Box} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
import { Suspense, useState } from "react";
import { BreadCrumb } from "../../../(Components)/BreadCrumbsComponent";
// import moment from 'moment';
import Loading from "../../../(Config)/ContentLoading";

// import OverviewComponent from "./(Sections)/OverviewComponent";
// import DetailsComponent from "./(Sections)/DetailsComponent";
// import TasksComponent from "./(Sections)/TasksComponent";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";

import { FormInput } from "../../../(Form)/FormInput";
import { FormNumber } from "../../../(Form)/FormNumber";
import { FormTextArea } from "../../../(Form)/FormTextArea";
import { FormInputReadOnly } from "../../../(Form)/FormInputReadOnly";
import { FormSelect } from "../../../(Form)/FormSelect";
import { FormSwitch } from "../../../(Form)/FormSwitch";

import { ProjectStatus } from "../../../../lib/projectStatus";
import { TaskPriority } from "../../../../lib/taskPriority";
import moment from "moment";
import { serialize } from 'next-mdx-remote/serialize';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MdxContent } from "../../../mdx-content";
import { ModalComp } from "../../../(Components)/ModalComponent";

{/* <Link href="/projects">Go Back To All Projects</Link> */}
            {/* ts-expect-error Server Component */}
            {/* <GetTask taskID={taskID} {...session} /> */}

async function getTaskData(taskID: string) {
  const res = await fetch(`/api/project/tasks/getTask?id=${taskID}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }
  return res.json();
}

type Post = {
  mdxSource: MDXRemoteSerializeResult;
};
async function getDescription(postContent: string): Promise<Post> {
    const mdxSource = await serialize(postContent, {mdxOptions: {
        development: process.env.NODE_ENV === 'development',
    }})
    return {
        mdxSource
    }
}

export default async function TaskOverview({params}: any) {
    const { taskID } = params
    const {data: session} = useSession()

    const {response: task} = await getTaskData(taskID)
    // const router = useRouter()


    const EditModal = () => {
        const [ onClose, setClosed ] = useState(true)
        const [ isOpenedMod, setOpened ] = useState(false)

        function handelOpen() {}
        // const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
                <Button
                    m="2rem !important"
                    background="white"
                    opacity="0.9"
                    variant="primary"
                    color="black"
                    // onClick={
                    //     setClosed(false) 
                    //     setOpened(true)
                    // }
                >Edit Task</Button>
             <Modal onClose={onClose} size="6xl" isOpen={isOpenedMod}>
                    <ModalOverlay />
                    <ModalContent background="black">
                        <ModalHeader>Edit Task</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Hello!</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleClose()} colorScheme="whiteAlpha">Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const onSubmit = async (values: any, actions: any) => {

    }
    const initialValues = {
        taskID: task.id,
        isCompleted: task.isCompleted ? task.isCompleted : false
    }
    const validationSchema = Yup.object({

    })
    
    const breadCrumbs = [
        {"pageLink": "/projects", "pageName": "Projects"},
        {"pageLink": `/project/${task.projectID}`, "pageName": task.project.name},
        {"pageLink": null, "pageName": task.title},
    ]
    const taskStatus = ProjectStatus.find(({ id }) => id === task.status)
    const taskPriority = TaskPriority.find(({ id }) => id === task.priority)

    const { mdxSource } = await getDescription(task.description)
    // console.log(ProjectStatus.find(({ id }) => id === project.status)?.fullText)

    return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Suspense fallback={<Loading />}>
            <Stack mb="1rem" justifyContent="space-between" direction="row" alignItems="center" mt="1rem">
                <Stack direction="row" alignItems="center">
                <Heading fontFamily="body" fontWeight="900">{task.title}</Heading>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Badge p="0.2rem 1rem" fontSize="0.9rem" borderRadius="0 1rem" colorScheme="gray" m="0 auto">{taskPriority?.text ? taskPriority?.text : null}</Badge>
                    <Badge 
                        p="0.2rem 1rem" 
                        fontSize="0.9rem"
                        borderRadius="0 1rem" 
                        colorScheme={ taskStatus?.colorScheme ? taskStatus.colorScheme : "gray" }
                        m="0 auto"
                    >{taskStatus?.fullText ? taskStatus?.fullText : taskStatus?.smallText ? taskStatus?.smallText : null}</Badge>
                </Stack>
            </Stack>
            <Divider />
            <Card>
                <CardHeader mt="1rem"><Heading size="2xl" textDecoration="underline" fontWeight="900">At a Glance</Heading></CardHeader>
                <CardBody>
                    <Stack direction="row" justifyContent="space-between" gap="3rem">
                        <Stack m="0 -3rem" w="125%">
                            <Suspense fallback={<Loading />}>
                                {task.description ? <MdxContent source={mdxSource} /> : <Box boxShadow="bsBoldSecondary" p="1.5rem 3rem" m="2rem 3rem" borderRadius="0 2rem" maxH="75vh" overflow="scroll" textAlign="center"><Text>No Description Provided</Text></Box>
                                }
                            </Suspense> 
                            {/* <Stack w="auto" boxShadow="bsBoldPrimary" padding="2rem" borderRadius="0 2rem" mt="2rem !important" mx="3rem">
                                <Text>DETAILS</Text>
                            </Stack> */}
                        </Stack>
                        <Stack w="100%">
                            <Stack aspectRatio="16/9" h="auto" boxShadow="bsBoldPrimary" padding="2rem" borderRadius="0 2rem" mt="2rem !important">
                                <Heading size="lg" textAlign="center" mb="2.5rem">Client Information</Heading>
                                <Text fontSize="2xl" fontWeight="900">{task.client.firstName} {task.client.lastName}</Text>
                                <Stack direction="row" color="white" my="0.7rem">
                                    <FontAwesomeIcon icon={["fal", "id-badge"]} color="currentColor" width="4%" />
                                    <Text>{task.client.id}</Text>
                                </Stack>
                                <Stack direction="row" color="white" my="0.7rem">
                                    <FontAwesomeIcon icon={["fal", "envelope"]} color="currentColor" width="4%" />
                                    <Link href={`mailto:${task.client.firstName} ${task.client.lastName}<${task.client.email}>?subject=RE: Donald Louch Project ${task.id}`}><Text>{task.client.email}</Text></Link>
                                </Stack>
                                <Stack direction="row" color="white" my="0.7rem">
                                    <FontAwesomeIcon icon={["fal", "phone"]} color="currentColor" width="4%" />
                                    <Text>{task.client.phoneNumber}</Text>
                                </Stack>
                                <Stack direction="row" color="white" my="0.7rem">
                                    <FontAwesomeIcon icon={["fal", "clock"]} color="currentColor" width="4%" />
                                    <Text>{moment().utc(task.client.timezone).format("MMMM Do, YYYY; h:mma")} (UTC {task.client.timezone})</Text>
                                </Stack>
                            </Stack>
                            {EditModal()}
                            {/* <Button
                                // onClick={() => handleEdit()}
                                m="2rem !important"
                                background="white"
                                opacity="0.9"
                                variant="primary"
                                color="black"
                                // onClick={() => }
                            >Edit Task</Button> */}
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
            {task.subTasks && (
                <>
                    <Heading textAlign="center">Sub Tasks</Heading>
                </>
            )}
        </Suspense>
        {/* <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent background="black">
                <ModalHeader>Edit Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Hello!</Text>
                    {/* <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, values }: any) => (
                            <Stack as="form" onSubmit={handleSubmit as any}>
                                <FormInputReadOnly
                                    inputID="taskID"
                                    inputLabel=""
                                    inputType="hidden"
                                />
                                <FormSwitch 
                                    inputID="isCompleted"
                                    helperText={`This task is ${!values.isCompleted ? "NOT" : ""} completed.`}
                                />
                            </Stack>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} colorScheme="whiteAlpha">Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>  */}
        
    </>
    )
}