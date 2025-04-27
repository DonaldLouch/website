'use client'

import supabase from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { FormSwitch } from '@/app/(Components)/(Form)/FormSwitch'
import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'
import { ActionIcon, Anchor, AspectRatio, Badge, Box, Flex, Group, Modal, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { randomId, useDisclosure } from '@mantine/hooks'
import { useImageSize } from 'react-image-size'
import { useEffect, useState } from 'react'

import * as yup from 'yup';

import classes from "@/app/(Components)/Components.module.css"
import ViewFullPhoto from '@/app/(Components)/ViewFullPhoto'
import DisplayDate from '@/lib/DisplayDate'
import HugeIcon from '@/app/(Components)/HugeIcon'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import FormTags from '@/app/(Components)/(Form)/FormTags'
import FormButton from '@/app/(Components)/(Form)/FormButton'
import FormDatePicker from '@/app/(Components)/(Form)/FormDatePicker'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import { useForm, yupResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export default function ViewPhotoEditAlbum({ imageData, locations, tagsData }: any) {
    const {fileID, capturedOn, uploadedOn } = imageData.fileID
    const { photoName, caption, tags, links, location, id: photoID, isPublic, isPortfolio, isPinned } = imageData as any

    const [linksOption, setLinksOption] = useState(links.length > 0 ? true : false)
    const [isPublicOption, setIsPublicOption] = useState(isPublic ? true : false)
    const [isPortfolioOption, setIsPortfolioOption] = useState(isPortfolio ? true : false)
    const [isPinnedOption, setIsPinnedOption] = useState(isPinned ? true : false)

    const router = useRouter()

    const [opened, { open, close }] = useDisclosure(false)

    const onSubmit =  async (values: any) => {
        const subLinkValue = new Array()
            values.linksRow.forEach((link: any) => subLinkValue.push(
                {
                    linkType: link.linkType, 
                    icon: link.icon, 
                    link: link.link, 
                    name: link.name
                }
            ))
        
        const locationName = values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect

        await supabase.from("PhotographyAlbum").update({ 
            lastUpdatedOn: moment()
        }).eq('id', values.albumSelect)

        if (values.capturedOn || values.uploadedOn) {
            const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyMedia").update({ 
                capturedOn: new Date(values.capturedOn),
                uploadedOn: new Date(values.uploadedOn)
            }).eq('fileID', fileID)
        }

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
            photoName: values.photoName,
            caption: values.caption,
            tags: values.tags,
            location: locationName,
            links: subLinkValue,
            capturedOn: new Date(values.capturedOn),
            uploadedOn: new Date(values.uploadedOn),
            isPublic: values.isPublic,
            isSetup: values.capturedOn && values.uploadedOn && values.caption && values.tags ? true : false,
            isPortfolio: values.isPortfolio,
            isPinned: values.isPinned
        }).eq('id', photoID)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `Photo ${photoName} Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red",
            icon: supabaseStatus === 204 ? <HugeIcon name="file-edit" variant="twotone" /> : <HugeIcon name="alert-diamond" variant="twotone" />
        })
        supabaseStatus === 204 && router.refresh()
    }

    const initialLinkValues = new Array()
        links && links.forEach((link: any) => {
            initialLinkValues.push(
                { 
                    key: randomId(),
                    linkType: link.linkType, 
                    icon: link.icon, 
                    link: link.link, 
                    name: link.name
                }
            )
        })
    
        const initialValues = { 
            fileID: fileID, 
            photoID: photoID, 
            photoName: photoName,
            linksRow: initialLinkValues,
            isPublic: isPublic ? true : false,
            isPortfolio: isPortfolio ? true : false,
            isPinned: isPinned ? true : false,
            capturedOn: new Date(capturedOn),
            uploadedOn: new Date(uploadedOn),
            caption: caption,
            tags: tags ? tags : [],
            locationSelect: location ? location : "noLocation",
        }
        const schema = yup.object().shape({
            // caption: Yup.string().required('Caption is required'),
            // tags: Yup.string().required('Tag(s) is(are) required'),
            // startDate: Yup.string().required('Start Date is required'),
            // description: Yup.string().required('Description is required'),
        })
        const form = useForm({
            mode: 'controlled',
            initialValues,
            validate: yupResolver(schema)
        }) as any
    
        const linkTypeOptions = [
            {
                value: "exLink",
                label: "External Link"
            },
            {
                value: "exEmbed",
                label: "External Embed"
            },
            {
                value: "inLink",
                label: "Internal Link"
            },
            {
                value: "inEmbed",
                label: "Internal Embed"
            },
            {
                value: "nonLink",
                label: "Non-Link"
            },
        ]
        const linkFields = form.getValues().linksRow?.map((item: any, index: any) => (
            <Group key={item.key} justify="center">
                <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} inputLabel="Link Type" inputHelperText="Please select link type" key={form.key(`links.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} />
                <FormInput inputID={`linksRow.${index}.icon`} inputLabel="Link Icon" {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`links.${index}.icon`)} />
                <FormInput inputID={`linksRow.${index}.link`} inputLabel="Link URL" {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`links.${index}.link`)} />
                <FormInput inputID={`linksRow.${index}.name`} inputLabel="Link Title" {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`links.${index}.name`)} />
                <ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
                    <HugeIcon name="delete-02" size="1rem" />
                </ActionIcon>
            </Group>
        ));
        
    const locationOptions = new Array({value: "noLocation", label: "No Location Specified!"}, {value: "newLocation", label: "Create a New Location"}, {value: "divider", label: "---", disabled: true})
        locations.forEach((location: any) => {
            locationOptions.push({value: location, label: location})
        })


    const imageURL = imageData.fileID.filePath
    const [dimensions, { loading, error }] = useImageSize(imageURL)
    
    const [photoWidth, setPhotoWidth] = useState(1920)
    const [photoHeight, setPhotoHeight] = useState(1080)

    const [imageQuality, setImageQuality] = useState(1)

    useEffect(() => {
        dimensions && !loading || error && setPhotoWidth(Number(dimensions?.width))
        dimensions && !loading || error && setPhotoHeight(Number(dimensions?.height))
        !loading || error && setImageQuality(100)
    }, [imageURL, dimensions, loading, error])
    
    
    return (<>
        <Box  onClick={open} display="inline-block">
            <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`}
                quality={imageQuality} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
                width={photoWidth}
                height={photoHeight}
                // layout={"responsive"}
                className={classes.imageCardView}
            />
        </Box>
        <Modal opened={opened} onClose={close} title={`${imageData.photoName} (${imageData.id})`} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
            id={`viewPhoto${imageData.id}`}
        >
            <Flex
                direction={{base: "column", sm: "row"}}
                gap={{base: "0.5rem", sm: "2rem"}}
                justify="flex-start"
                align="center"
                style={{
                boxShadow: "var(--mantine-shadow-bsBoldPrimary)",
                borderRadius: "var(--mantine-radius-md)"
            }}
            >
                <AspectRatio ratio={16/9} 
                    w="25%"
                >
                    <ViewFullPhoto photoData={imageData} />
                </AspectRatio>
                <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                    <Stack gap="0">
                        <Title
                            order={1}
                            style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                            fz="3rem"
                            td="underline 0.4rem var(--primary)"
                        >
                            {imageData.fileID.fileTitle}
                        </Title>
                    </Stack>
                    <Stack gap="1rem" my="1rem">
                    <Group>
                        <Badge color="var(--primary)" leftSection={<HugeIcon name="grid" />}>
                            {imageData.fileID.fileID}
                        </Badge>
                        <Badge color="var(--primary)" leftSection={<HugeIcon name="grid" />}>
                            {imageData.id}
                        </Badge>
                        <Badge color="red" leftSection={<HugeIcon name="calendar-03" />}>
                            <DisplayDate source={imageData.fileID.capturedOn} />
                        </Badge>
                        <Anchor href={imageData.fileID.filePath} target="_blank">
                            <Badge leftSection={<HugeIcon name="link-04" />} color="blue" tt="lowercase">{imageData.fileID.filePath}</Badge>
                        </Anchor>
                    </Group>
                    </Stack>
                </Flex>
            </Flex>
            <Box p="2rem" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <FormInput inputID="photoName" inputLabel="Photo Title" inputDescription="If you would like the title of the photo to be a different title than what was uploaded; you can change that here." {...form.getInputProps('photoName')} />
                <FormTextArea inputID="caption" inputLabel="Caption" textRows={4} {...form.getInputProps('caption')} />
                <FormTags searchValues={tagsData} {...form.getInputProps('tags')} />
                
                <FormSwitch 
                    inputID="linksOption" 
                    helperText="Toggle on if there are any link(s) associated with this photo"
                    onClick={(e: any) => setLinksOption(e.target.checked)} 
                    checked={linksOption}
                />
                {linksOption && (
                    <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Links" />
                            {linkFields.length > 0 ? (
                            <Group justify="center">
                                <Text>Link Type</Text>
                                <Text>Link Icon</Text>
                                <Text>Link URL</Text>
                                <Text>Link Name</Text>
                            </Group>
                            ) : <Text ta="center">There is Currently No Links! You can add one though!</Text>}
                        {linkFields}
                        <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('linksRow', {
                            key: randomId(),
                            linkType: "exLink", 
                            icon: null, 
                            link: null, 
                            name: null
                        })}>Add More Link(s)</FormButton>
                    </Stack>
                )}  
                <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem" my="1rem">
                    <SectionTitle headingTitle="Location" />
                    {form.values.locationSelect === "newLocation" ? 
                        (
                                <FormInput inputID="location" inputLabel="Location" {...form.getInputProps('location')} inputDescription="If you would like you can add a general location chip to the photo; you can add that here" />
                        ) 
                        // TODO: Add locations
                        : form.values.locationSelect ? <Text ta="center">You have selected the location: {form.values.locationSelect}</Text> 
                        : <Text ta="center">Optional: Please select a location from an excising photo or Create a New Location!</Text>
                    }
                    <FormSelect inputID="locationSelect" inputData={locationOptions} {...form.getInputProps(`locationSelect`)} />
                </Stack>

                <Group w="100%" wrap="nowrap">
                    <FormDatePicker dateLabel="Taken On" {...form.getInputProps('capturedOn')} isJustRead/>
                    <FormDatePicker dateLabel="Uploaded On" datePlaceholder="When was this uploaded?" isClearable {...form.getInputProps('uploadedOn')}/>
                </Group>
                <SimpleGrid cols={3} spacing="2.5rem">
                    <FormSwitch 
                        inputID="isPublic" 
                        helperText="Toggle on if you want this photo to be seen publicly"
                        {...form.getInputProps('isPublic')}
                        onClick={(e: any) => setIsPublicOption(e.target.checked)} 
                        checked={isPublicOption}
                    />
                    <FormSwitch 
                        inputID="isPortfolio" 
                        helperText="Toggle on if you want this photo to be a portfolio photo"
                        {...form.getInputProps('isPortfolio')}
                        onClick={(e: any) => setIsPortfolioOption(e.target.checked)} 
                        checked={isPortfolioOption}
                    />
                    <FormSwitch 
                        inputID="isPinned" 
                        helperText="Toggle on if you want this photo to be pinned"
                        {...form.getInputProps('isPinned')}
                        onClick={(e: any) => setIsPinnedOption(e.target.checked)} 
                        checked={isPinnedOption}
                    />
                </SimpleGrid>
                <FormSubmitButton icon={<HugeIcon name="pencil-edit-01" />}>Edit Photo</FormSubmitButton>
            </Box>
        </Modal>
    </>)
}
