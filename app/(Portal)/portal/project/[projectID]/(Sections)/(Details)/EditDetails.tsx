'use client'

import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { AlertDiamondIcon, LicenseIcon, Link04Icon, PencilEdit01Icon, SaveMoneyDollarIcon, SmartPhone01Icon, TextFontIcon } from "@hugeicons/react"
import { Box, SimpleGrid, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
import { notifications } from "@mantine/notifications"
import FormNumber from "@/app/(Components)/(Form)/FormNumber"
import { useState } from "react"
import FormCheckbox from "@/app/(Components)/(Form)/FormCheckbox"
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone"

import { Timezones } from "@/lib/Timezones"

export default function EditDetails({project}: any) {
    const router = useRouter()

    const [isMaintainedOption, setIsMaintainedOption] = useState(project.details  && project.details.length != 0 ? project.details[0].mainUpdates : false)
    const [timezoneSelected, setTimezoneSelected] = useState(project.client?.timezone ? project.client?.timezone : null)
    const [dLScriptSelected, setDLScriptSelected] = useState(project.projectKind === "installDL" && project.details && project.details.length != 0 ? project.details[0].scriptName : null)

    const onSubmit = async (values: any) => {
        const details = new Array({
            "websiteName": values.websiteName,
            "websiteURL": values.websiteURL,
            // "projectKind": values.projectKind,
            "purpose": values.purpose,
            "pages": values.pages,
            "content": values.content,
            "featFunc": values.featFunc,
            "mainUpdates": isMaintainedOption,
            "scriptName":  project.projectKind === "installO" ? values.scriptName : project.projectKind === "installDL" ? dLScriptSelected : null, 
            "dlScriptOtherName": project.projectKind === "installDL" && dLScriptSelected === "other" ? values.dlScriptOtherName : null,
            "dlScriptOtherURL": project.projectKind === "installDL" && dLScriptSelected === "other" ? values.dlScriptOtherURL : null,
            "scriptURL":  project.projectKind === "installO" ? values.scriptURL : null
        }) as any
        const clientInformation = {
            id: project.client.id,
            firstName: project.client.firstName,
            lastName: project.client.lastName,
            username: project.client.username,
            email: project.client.email,
            phoneNumber: values.phone,
            timezone: timezoneSelected
        }
        console.log(clientInformation, details)
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Projects").update({ 
            details,
            client: clientInformation,
            budget: values.budget,
            lastUpdated: new Date()
        //     // description: values.projectDescription,
        //     // projectKind: typeSelected,
        //     // isApproved: values.projectApproved,
        //     // // isReviewed: values.projectReview,
        //     // bannerMessage: banner,
        //     details,
        //     lastUpdated: new Date()
        }).eq('id', project.id)
        
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `Project "${project.name}" Details Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully updated the project details!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
        // actions.setSubmitting(false)
        supabaseStatus === 204 && router.refresh()

        // await updateProject(projectData)
    }

    const initialValues= {
        websiteName: project.details  && project.details.length != 0 ? project.details[0].websiteName : undefined,
        websiteURL: project.details  && project.details.length != 0 ? project.details[0].websiteURL : undefined,
        // projectKind: project.details  && project.details.length != 0 ? project.details[0].projectKind : undefined,
        purpose: project.details  && project.details.length != 0 ? project.details[0].purpose : undefined,
        pages: project.details  && project.details.length != 0 ? project.details[0].pages : 0,
        content: project.details  && project.details.length != 0 ? project.details[0].content : undefined,
        featFunc: project.details  && project.details.length != 0 ? project.details[0].featFunc : undefined,
        phone: project.client?.phoneNumber ? project.client?.phoneNumber : undefined,
        budget: project.budget ? project.budget : undefined,

        scriptName: project.projectKind === "installO" && project.details  && project.details.length != 0 ? project.details[0].scriptName : undefined,
        scriptURL:  project.projectKind === "installO" && project.details  && project.details.length != 0 ? project.details[0].scriptURL : undefined,
        dlScriptOtherName: project.projectKind === "installDL" && project.details  && project.details.length != 0 ? project.details[0].dlScriptOtherName : undefined,
        dlScriptOtherURL: project.projectKind === "installDL" && project.details  && project.details.length != 0 ? project.details[0].dlScriptOtherURL : undefined,
        // mainUpdates: project.details ? project.details.find(({ detailOption }: any) => detailOption === "mainUpdates").detailValue : false,
    }

    const validationSchema = yup.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(validationSchema)
    })
    
    const timezoneOptions = new Array(
        {group: "America", items: []},
        {group: "Europe", items: []},
        {group: "Pacific", items: []},
        {group: "Asia", items: []},
        {group: "Antarctica", items: []},
        {group: "Africa", items: []},
        {group: "Atlantic", items: []},
        {group: "Indian", items: []},
    ) as any
    Timezones.forEach((timezone: any) => {
        timezone.group === "America" && timezoneOptions[0].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Europe" && timezoneOptions[1].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Pacific" && timezoneOptions[2].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Asia" && timezoneOptions[3].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Antarctica" && timezoneOptions[4].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Africa" && timezoneOptions[5].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Atlantic" && timezoneOptions[6].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Indian" && timezoneOptions[7].items.push({"value": timezone.value, "label": timezone.label})
    })

    const dLScriptOptions = new Array(
        {value: "opusVId", label: "OpusVid"},
        {value: "dlp", label: "Donald Louch Portal/Dashboard (DLP)"},
        {value: "dlcrm", label: "Donald Louch CRM (DLCRM)"},
        {value: "other", label: "Other Donald Louch Script"},
    )

    
    return <>
        <Title size="3xl" td="underline" fw="900" order={1} ta="center">Project Details</Title>

        <Box component="form" onSubmit={form.onSubmit(onSubmit)} m="0">
            <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="0.5rem 3rem 1rem" my="1rem">
                <Title size="xl" td="underline" fw="900" order={2} my="2rem">General Information</Title>
                <FormInput inputID="websiteName" inputLabel="Website Name" {...form.getInputProps('websiteName')} inputDescription="Please provide the name of your website. Can also be your company name." icon={<TextFontIcon variant="twotone" />} isRequired />
                <FormInput inputID="websiteURL" inputLabel="Website URL" {...form.getInputProps('websiteURL')} type="url" inputDescription="The URL may also include a URL that you are hoping to get." icon={<Link04Icon variant="twotone" />} />
                <FormNumber inputID="pages" inputLabel="Number of Expected Pages" inputDescription="How many pages are you expecting?" suffix=" Page(s)"  {...form.getInputProps('pages')} min={0} icon={<LicenseIcon variant="twotone" />} />
                <FormTextArea inputID="purpose" inputLabel="Project Purpose" textRows={5} {...form.getInputProps('purpose')} />
                <FormInputPhone inputID="phone" inputLabel="Your Phone Number" {...form.getInputProps('phone')} inputDescription="Please provide a phone number that you can be reached at if you would like. If you chose to leave it blank that is also okay. Please use the format of '(123) 456-7890'." icon={<SmartPhone01Icon variant="twotone" />} />
                <FormSelect inputID="timezone" inputLabel="Timezone" inputDescription="Please select the timezone of the contact's phone number; that way it will be easier to schedule calls for times that works for everyone!" inputData={timezoneOptions} {...form.getInputProps(`timezone`)} onChange={setTimezoneSelected} value={timezoneSelected} searchable />
                <FormInput inputID="budget" inputLabel="Budget" {...form.getInputProps('budget')} icon={<SaveMoneyDollarIcon variant="twotone"/>} inputDescription="Please include what you think will be the budget for the project. If no budget say FREE, or UNSURE if you're unsure. If currency is not in Canadian Dollar (CAD) please also specify the currency!" isRequired />
            </Box>

            <Box style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)"}} p="0.5rem 3rem 2rem" m="2rem 0 1rem">
                <Title size="xl" td="underline" fw="900" order={2} my="2rem">Website Content</Title>
                {project.projectKind === "installO" &&<>
                    <FormInput inputID="scriptName" inputLabel="Script Name" {...form.getInputProps('scriptName')} inputDescription="Please provide the name of the script you would like installed." icon={<TextFontIcon variant="twotone" />} isRequired={project.projectKind === "installO"} />
                    <FormInput inputID="scriptURL" inputLabel="Script URL" {...form.getInputProps('scriptURL')} type="url" inputDescription="Please provide the URL to the script that you're wanting installed" icon={<Link04Icon variant="twotone" />} isRequired={project.projectKind === "installO"} />
                </>}
                {project.projectKind === "installDL" &&<Box my="2rem">
                    <FormSelect inputID="scriptName" inputLabel="Which Script Do You Want Installed" inputData={dLScriptOptions} {...form.getInputProps(`scriptName`)} onChange={setDLScriptSelected} value={dLScriptSelected} searchable isRequired={project.projectKind === "installDL"} />
                    {dLScriptSelected === "other" &&<>
                        <FormInput inputID="dlScriptOtherName" inputLabel="Other Script Name" {...form.getInputProps('dlScriptOtherName')} inputDescription="Please provide the name of the script you would like installed." icon={<TextFontIcon variant="twotone" />} isRequired={project.projectKind === "installDL" && dLScriptSelected === "other"} />
                        <FormInput inputID="dlScriptOtherURL" inputLabel="Other Script URL" {...form.getInputProps('dlScriptOtherURL')} type="url" inputDescription="Please provide the URL to the script that you're wanting installed. Or the URL to the website you want replicated" icon={<Link04Icon variant="twotone" />} isRequired={project.projectKind === "installDL"} />
                    </>}
                </Box>}
                <FormTextArea inputID="content" inputLabel="Website Content" helperText="" textRows={20} {...form.getInputProps('content')} />
                <FormTextArea inputID="featFunc" inputLabel="Features or functions" helperText="You may separate each function with a new line and a dash (-)!" textRows={20} {...form.getInputProps('featFunc')} />
                <FormSwitch 
                    inputID="mainUpdates" 
                    helperText="Will you require ongoing maintenance or updates to the website after the initial project is completed?"
                    {...form.getInputProps('mainUpdates')}
                    onClick={(e: any) => setIsMaintainedOption(e.target.checked)} 
                    checked={isMaintainedOption}
                />
            </Box>

            <FormSubmitButton icon={<PencilEdit01Icon />}>Update Project Details</FormSubmitButton>
        </Box>
    </>
}
