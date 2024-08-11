'use client'

import { ProjectStatus } from "@/lib/Project/projectStatus"
import { ProjectType } from "@/lib/Project/projectType"
import { useState } from "react"

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from "@mantine/form";
import { Box, SimpleGrid, Stack, Title } from "@mantine/core";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import { AlertDiamondIcon, ContactIcon, PencilEdit01Icon, SaveMoneyDollarIcon, TextFontIcon } from "@hugeicons/react";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function EditProject({project}: any) {
    
    const [editOptions, setEditOptions] = useState(false)
    const [typeSelected, setTypeSelected] = useState(project.projectKind ? project.projectKind : null)
    const [statusSelected, setStatusSelected] = useState(project.status ? project.status : null)
    const [isApprovedOption, setIsApprovedOption] = useState(project.isApproved ? project.isApproved : null)
    const [isBannerStickyOption, setIsBannerStickyOption] = useState(project.bannerMessage && project.bannerMessage.length != 0 && project.bannerMessage[0].isBannerSticky ? true : false)
    // const [isReviewedOption, setIsReviewedOption] = useState(project.isReviewed ? project.isReviewed : null)
    const [bannerOption, setBannerOption] = useState(project.bannerMessage && project.bannerMessage.length != 0  ? true: false)
    const [bannerColourSelected, setBannerColourSelected] = useState(project.bannerMessage && project.bannerMessage.length != 0 && project.bannerMessage[0].bannerColour ? project.bannerMessage[0].bannerColour : null)
    const [isVisibleClient, setIsVisibleClient] = useState(false)

    const router = useRouter()
    // console.log(project.bannerMessage.length)
    const typeOptions = new Array()
    ProjectType.forEach((type: any) => {
        typeOptions.push({label: type.fullText ? type.fullText : type.smallText, value: type.id})
    })

    const statusOptions = new Array()
    ProjectStatus.forEach((type: any) => {
        statusOptions.push({label: type.fullText ? type.fullText : type.smallText, value: type.id})
    })

    const onSubmit = async (values: any) => {
        const clientInformation = {
            id: project.client.id,
            firstName: values.firstName,
            lastName: values.lastName,
            username: project.client.username,
            email: project.client.email,
            phoneNumber: project.client.phoneNumber,
            timezone: project.client.timezone
        }

        const banner = bannerOption ? new Array() : [] as any
            bannerOption && banner?.push({
                "bannerColour": bannerColourSelected,
                "bannerTitle": values.bannerTitle,
                "bannerBody": values.bannerBody,
                "isBannerSticky": isBannerStickyOption,
            })

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Projects").update({ 
            status: statusSelected,
            name: values.projectName,
            createdOn: new Date(values.projectCreatedOn),
            startDate: new Date(values.projectStartDate),
            deadline: new Date(values.projectDeadline),
            budget: values.projectBudget,
            description: values.projectDescription,
            projectKind: typeSelected,
            isApproved: values.projectApproved,
            client: clientInformation,
            // isReviewed: values.projectReview,
            bannerMessage: banner,
            lastUpdated: new Date()

        }).eq('id', project.id)

        
        
        // if (supabaseStatus === 204) {
        //     const id = "notificationProject"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        //     const relatedTo = [
        //         "project", project.id
        //     ]
        //     const { status: supabaseStatusNotification , error: supabaseErrorNotification } = await supabase.from("Notifications").insert({ 
        //         id,
        //         clientID: project.client.id,
        //         relatedTo,
        //         title: "Project Updated",
        //         message: `There has been an update to the project ${values.title}.`,
        //         isVisibleClient
        //     }) as any
            
        //     //  supabaseStatus && notifications.show({ 
        //     //     title: `${supabaseStatus === 201 ? "Task added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
        //     //     message:`${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
        //     //     color: supabaseStatus === 201 ? "black" : "red",
        //     //     icon: supabaseStatus === 201 ? <TaskAdd01Icon /> : <AlertDiamondIcon />
        //     // })
        //     // supabaseStatus === 201
        // }
       
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `Project "${values.projectName}" Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully updated the project!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
        // actions.setSubmitting(false)
        supabaseStatus === 204 && router.refresh()

        // await updateProject(projectData)
    }

    const initialValues= {
        projectEdit: false,
        projectStatus: project.status,
        projectName: project.name,
        projectCreatedOn: project.createdOn ? new Date(project.createdOn) : null,
        projectStartDate: project.startDate ? new Date(project.startDate) : null,
        projectDeadline: project.deadline ? new Date(project.deadline) : null,
        projectBudget: project.budget,
        projectDescription: project.description,
        projectKind: project.projectKind,
        projectApproved: project.isApproved,

        firstName: project.client.firstName,
        lastName: project.client.lastName,
        // projectReview: project.isReviewed,
        // theProjectStatus: project.status,

        // bannerToggle: project.bannerMessage && project.bannerMessage.length != 0 &? true : false,
        // bannerColour: project.bannerMessage && project.bannerMessage.length != 0 &? project.bannerMessage[0].find(({ banner }: any) => banner === "bannerStatus").bannerValue : undefined,
        bannerTitle: project.bannerMessage && project.bannerMessage.length != 0 ? project.bannerMessage[0].bannerTitle : undefined,
        bannerBody: project.bannerMessage && project.bannerMessage.length != 0 ? project.bannerMessage[0].bannerBody : undefined,
        // bannerTitle: project.bannerMessage && project.bannerMessage.length != 0 &? project.bannerMessage[0].find(({ banner }: any) => banner === "bannerTitle").bannerValue : undefined,
        // bannerBody: project.bannerMessage && project.bannerMessage.length != 0 &? project.bannerMessage[0].find(({ banner }: any) => banner === "bannerBody").bannerValue : undefined,
        // bannerCloseable: project.bannerMessage && project.bannerMessage.length != 0 &? project.bannerMessage[0].find(({ banner }: any) => banner === "bannerCloseable").bannerValue : false,
        // bannerIsSticky: project.bannerMessage && project.bannerMessage.length != 0 &? project.bannerMessage[0].find(({ banner }: any) => banner === "bannerIsSticky").bannerValue : false
    }

    const validationSchema = yup.object({
        // projectID: Yup.string().required("This field is required.")
    })

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(validationSchema)
    })

    const bannerColourOptions = new Array(
        {value: "blue", label: "Information"},
        {value: "var(--secondary)", label: "Warning"},
        {value: "green", label: "Success"},
        {value: "red-6", label: "Error"},
    )
    
    return <Stack>
        <FormSwitch 
            inputID="editOptions" 
            helperText="Toggle to edit the project settings"
            onClick={(e: any) => setEditOptions(e.target.checked)} 
            checked={editOptions}
        />
        {editOptions && (<> 
            <Title size="2xl" td="underline" fw="900" order={1}>Project Settings</Title>
            <Box p="3rem 3rem 0.5rem" component="form" onSubmit={form.onSubmit(onSubmit)} style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)"}} m="0">
                <FormInput inputID="projectName" inputLabel="Project Name" {...form.getInputProps('projectName')} inputDescription="Please use a easily project name to make it easy for finding. (I.E. Install: DLPortal)" icon={<TextFontIcon variant="twotone" />} isRequired />
                <FormTextArea inputID="projectDescription" inputLabel="Project Description" helperText="MDX Enabled!" textRows={10} {...form.getInputProps('projectDescription')} isRequired />
                <SimpleGrid cols={3} my="2rem">
                    <FormDatePicker dateLabel="Created On" {...form.getInputProps('projectCreatedOn')} />
                    <FormDatePicker dateLabel="Expected Start Date" datePlaceholder="When are you expecting this project to start on?" {...form.getInputProps('projectStartDate')} />
                    <FormDatePicker dateLabel="Expected Deadline" datePlaceholder="When is the expected deadline of this project?" {...form.getInputProps('projectDeadline')} />
                </SimpleGrid>
                <FormInput inputID="projectBudget" inputLabel="Budget" {...form.getInputProps('projectBudget')} icon={<SaveMoneyDollarIcon variant="twotone"/>} inputDescription="Please include what you think will be the budget for the project. If no budget say FREE, or UNSURE if you're unsure. If currency is not in Canadian Dollar (CAD) please also specify the currency!" isRequired />
                <SimpleGrid cols={2}>
                    <FormInput inputID="firstName" inputLabel="First Name" {...form.getInputProps('firstName')} icon={<ContactIcon />} isRequired />
                    <FormInput inputID="lastName" inputLabel="Last Name" {...form.getInputProps('lastName')} icon={<ContactIcon />} isRequired />
                </SimpleGrid>
                <SimpleGrid cols={2} my="2rem">
                    <FormSelect inputID="type" inputLabel="Project Type" inputData={typeOptions} {...form.getInputProps(`type`)} onChange={setTypeSelected} value={typeSelected} searchable />
                    <FormSelect inputID="status" inputLabel="Project Status" inputData={statusOptions} {...form.getInputProps(`status`)} onChange={setStatusSelected} value={statusSelected} />
                </SimpleGrid>
                {/* <FormInputPhone inputID="phone" inputLabel="Your Phone Number" {...form.getInputProps('phone')} inputDescription="Please provide a phone number that you can be reached at if you would like. If you chose to leave it blank that is also okay. Please use the format of '(123) 456-7890'." icon={<SmartPhone01Icon variant="twotone" />} /> */}
                <SimpleGrid cols={2} mt="2rem">
                    <FormSwitch 
                        inputID="isApproved" 
                        helperText="Toggle on if you want this project to be approved"
                        {...form.getInputProps('isApproved')}
                        onClick={(e: any) => setIsApprovedOption(e.target.checked)} 
                        checked={isApprovedOption}
                    />
                    {/* <FormSwitch 
                        inputID="isReviewed" 
                        helperText="Toggle on if you want this post to be reviewed"
                        {...form.getInputProps('isReviewed')}
                        onClick={(e: any) => setIsReviewedOption(e.target.checked)} 
                        checked={isReviewedOption}
                    /> */}
                    <FormSwitch 
                        inputID="bannerOption" 
                        helperText={`Banner is ${bannerOption ? "On" : "Off"}`}
                        {...form.getInputProps('bannerOption')}
                        onClick={(e: any) => setBannerOption(e.target.checked)} 
                        checked={bannerOption}
                    />
                </SimpleGrid>
                {bannerOption && <Box p="2rem" style={{ boxShadow: "var(--mantine-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }}>
                    <Title size="2xl" td="underline" fw="900" mb="2rem" order={2}>Banner Settings</Title>
                    <FormInput inputID="bannerTitle" inputLabel="Banner Title" {...form.getInputProps('bannerTitle')} inputDescription="" icon={<TextFontIcon variant="twotone" />} />
                    <FormTextArea inputID="bannerBody" inputLabel="Banner Body" textRows={5} {...form.getInputProps('bannerBody')}  isRequired={bannerOption}  />
                    <FormSelect inputID="bannerColour" inputLabel="Banner Colour" inputData={bannerColourOptions} {...form.getInputProps(`bannerColour`)} onChange={setBannerColourSelected} value={bannerColourSelected} isRequired={bannerOption} />
                    <FormSwitch 
                        inputID="isBannerStickyOption" 
                        helperText="Is the banner sticky"
                        {...form.getInputProps('isBannerStickyOption')}
                        onClick={(e: any) => setIsBannerStickyOption(e.target.checked)} 
                        checked={isBannerStickyOption}
                    />
                </Box>}
                <FormSwitch 
                    inputID="isVisibleClient" 
                    helperText="Will this update be visible to the client?"
                    {...form.getInputProps('isVisibleClient')}
                    onClick={(e: any) => setIsVisibleClient(e.target.checked)} 
                    checked={isVisibleClient}
                />
                <FormSubmitButton icon={<PencilEdit01Icon />}>Edit Project</FormSubmitButton>
            </Box>
        </>)}
    </Stack>
}
