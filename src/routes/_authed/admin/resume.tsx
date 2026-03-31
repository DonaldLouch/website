import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.functions'

import { Box, Text, Image, SimpleGrid, Stack } from '@mantine/core'
import { GetResume, ResumeData, ResumeEducationData, ResumeWorkData } from '@/actions/database/GetDatabase.functions'
import { notifications } from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BreadCrumb } from '@/components/BreadCrumbsComponent'
import PrimaryLinkedButton from '@/components/buttons/PrimaryLinkedButton'
import { SectionCard } from '@/components/cards/SectionCard'
import FormInput from '@/components/form/FormInput'
import FormInputPhone from '@/components/form/FormInputPhone'
import FormNumber from '@/components/form/FormNumber'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import FormTextArea from '@/components/form/FormTextArea'
import { SectionTitle } from '@/components/SectionTitle'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import z from 'zod'
import AddWork from '@/components/resume/AddWork'
import WorkExperience from '@/components/resume/WorkExperience'
import EducationExperience from '@/components/resume/EducationExperience'
import AddEducation from '@/components/resume/AddEducation'
import { UpdateResume } from '@/actions/database/UpdateDatabase.functions'

export const Route = createFileRoute('/_authed/admin/resume')({
    component: RouteComponent,
    loader: async () => {
        return {
            resume: await GetResume({ data: {type: "resume"} }) as ResumeData,
            work: await GetResume({ data: {type: "work"} }) as ResumeWorkData,
            education: await GetResume({ data: {type: "education"} }) as ResumeEducationData,
            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    },

    head: () => ({
        meta: [
            ...seo({
                title: `Edit: Resume Page | ${import.meta.env.VITE_WEBSITE_NAME}`,
            }),
        ]
    })
})

function RouteComponent() {
    const { resume, work, education, isUser, isAdmin } = Route.useLoaderData()
    const navigate = useNavigate()
    const router = useRouter()
    !isAdmin && navigate({ to: "/auth", search: { message: "NoAccess" } })

    const breadCrumbs = [
        {"pageLink": "/admin/pages", "pageName": "Page Manager"},
        {"pageLink": "/admin/pagesResume", "pageName": "Edit: Resume Page"}
    ]

    const onSubmit =  async (values: any) => {
        let avatar = resume.avatar
        const address = `${values.city}, ${values.province}, ${values.country}`
        const res = await UpdateResume({ data: {values, avatar, id: resume.id, address, resume} })
            res && notifications.show({
                id: `EditResume`,
                title: `${res.success ? "Resume Information Updated 🎉" : `Error #${res.error?.code} has Occurred`}`,
                message: `${res.success ? `You have successfully updated the resume information!` : `An error has occurred: ${res.error?.message}. ${res.error?.hint && `${res.error?.hint}.`}`}`,
                color: res.success ? "green.0" : "red",
                icon: res.success ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
            })
            res.success && router.invalidate()
    }

    const addressSplit = resume.address.split(",")

    const initialValues = {
        firstName: resume.firstName,
        middleName: resume.middleName,
        lastName: resume.lastName,
        pronouns: resume.pronouns,
        currentAge: resume.currentAge,
        city: addressSplit[0],
        province: addressSplit[1],
        country: addressSplit[2],
        email: resume.email,
        phone: resume.phone,
        linkedin: resume.linkedin,
        profile: resume.profile,
        skills: resume.skills,
        bioExcerpt: resume.bioExcerpt,
    }

    const schema = z.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })

    return <>
        <BreadCrumb breads={breadCrumbs} />

        <SimpleGrid cols={2} mt="2rem" mb="0">
            <PrimaryLinkedButton link={{ to: "/portfolio/resume" }} icon={{name: "id-badge", pack: "fadl"}}>View Resume Page</PrimaryLinkedButton>
            <PrimaryLinkedButton link={{ to: "/admin/resume#experienceManager" }} icon={{name: "briefcase-blank", pack: "fal"}} isFullWidth colour="primary">Experience Manager</PrimaryLinkedButton>
        </SimpleGrid>

        <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
            <SectionCard styleType="primaryCard" m="2rem 0">
                <SimpleGrid cols={3} spacing="2rem">
                    <FormInput inputID="firstName" inputLabel="First Name" {...form.getInputProps('firstName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                    <FormInput inputID="middleName" inputLabel="Middle Name" {...form.getInputProps('middleName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} />
                    <FormInput inputID="lastName" inputLabel="Last Name" {...form.getInputProps('lastName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                </SimpleGrid>
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <FormInput inputID="pronouns" inputLabel="Pronouns" inputDescription="Please specify your preferred pronoun(s)" {...form.getInputProps('pronouns')} icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} isRequired />
                <FormNumber inputID="currentAge" inputLabel="Current Age" inputDescription="Please enter your current age" {...form.getInputProps('currentAge')} icon={<FontAwesomeIcon icon={["fal", "hashtag"]} />} isRequired />
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <SimpleGrid cols={3} spacing="2rem">
                    <FormInput inputID="city" inputLabel="City" {...form.getInputProps('city')} icon={<FontAwesomeIcon icon={["fal", "map-marker-smile"]} />} isRequired />
                    <FormInput inputID="province" inputLabel="Province" {...form.getInputProps('province')} icon={<FontAwesomeIcon icon={["fal", "map-marker-smile"]} />} isRequired />
                    <FormInput inputID="country" inputLabel="Country" {...form.getInputProps('country')} icon={<FontAwesomeIcon icon={["fal", "globe"]} />} isRequired />
                </SimpleGrid>
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <SimpleGrid cols={2} spacing="2rem">
                    <FormInput inputID="email" inputLabel="Email Address" {...form.getInputProps('email')} icon={<FontAwesomeIcon icon={["fajr", "envelope"]} />} isRequired type="email" />
                    <FormInputPhone inputID="phone" inputLabel="Phone Number" {...form.getInputProps('phone')} icon={<FontAwesomeIcon icon={["fajr", "phone"]} />} isRequired />
                </SimpleGrid>
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <FormInput inputID="linkedin" inputLabel="Linkedin" inputDescription="What is your Linkedin profile link" {...form.getInputProps('linkedin')} icon={<FontAwesomeIcon icon={["fab", "linkedin"]} />} isRequired />
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <FormTextArea inputID="bioExcerpt" inputLabel="Biography Excerpt" {...form.getInputProps('bioExcerpt')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
            </SectionCard>

            <SectionCard styleType="primaryCard" m="2rem 0">
                <FormTextArea inputID="profile" inputLabel="Profile" {...form.getInputProps('profile')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
                <FormTextArea inputID="skills" inputLabel="Skills" {...form.getInputProps('skills')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
            </SectionCard>
            {/* TODO: Thumbnail Update */}
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Update Resume Information</FormSubmitButton>
        </Box>

        <SectionTitle headingTitle="Experience Manager" id="experienceManager" />
        <SimpleGrid cols={2} my="1rem" spacing="2rem">
            <Stack gap="1rem">
                <SectionTitle headingTitle="Work Experience"/>
                <AddWork resumeID={resume.id} />
                {work?.map((experience: any) => ( <WorkExperience experience={experience} resumeID={resume.id} /> ))}
            </Stack>
            <Stack gap="1rem">
                <SectionTitle headingTitle="Education"/>
                <AddEducation resumeID={resume.id} />
                {education?.map((education: any) => ( <EducationExperience education={education} resumeID={resume.id} /> ))}
            </Stack>
        </SimpleGrid>
    </>
}