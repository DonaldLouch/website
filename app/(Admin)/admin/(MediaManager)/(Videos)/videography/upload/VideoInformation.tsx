'use client'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
// import FormInput from "@/app/(Components)/(Form)/FormInput"
import { FormInputCard } from "@/app/(Components)/(Form)/FormInputCard"
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly"
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch"
// import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"
import { Badge, Box, Button, Code, Icon, IconButton, Link, Stack, Text, useToast } from "@chakra-ui/react"

import { FieldArray, Formik } from "formik"
// import { SubmitButton } from "formik-chakra-ui"
import moment from "moment"
import { useRouter } from "next/navigation"
import { BsBookmarkDash, BsBookmarkPlus, BsCameraReels, BsLink45Deg, BsMusicNoteList, BsPeople, BsPersonDash, BsPersonPlus, BsPlusLg, BsTrash2 } from "react-icons/bs"

import * as Yup from 'yup'

export default function VideoInformation({videoID}: {videoID: string}) {
    const toast = useToast()
    const toastID = "toastID"
    const router = useRouter()
    
    // categoryData

    const onSubmit =  async (values: any, actions: any) => {
        const tagArray =  values.tags.split(',')

        const chapterArray = values.chaptersOption? values.chaptersRow.sort((a: any,b: any)=> (a.timeCode > b.timeCode ? 1 : -1)) : null
       
        const musicArray = new Array()
        if(values.musicCreditOption) {
            values.musicRow.forEach((music: any) => {
                const musicTimeCode = music.timeCode && 
                    music?.timeCode.includes(",") ? music?.timeCode.split(",").sort() 
                    : music?.timeCode.includes(";;") ? music?.timeCode.split(";;").sort() 
                    : music.timeCode ? music.timeCode 
                    : null
                musicArray.push({"timeCode":  musicTimeCode, "title": music.title ? music.title : null, "artist": music.artist ? music.artist : null, "link": music.link ? music.link : null, "info": music.info ? music.info : null})
            })
        }

        const creditArray = values.videoRow ? values.videoRow : null
        
        const starringArray = new Array()
        if(values.starringOption) {
            values.starringRow.forEach((starring: any) => {
                const starringTimeCode = starring.timeCode && 
                    starring?.timeCode.includes(",") ? starring?.timeCode.split(",").sort() 
                    : starring?.timeCode.includes(";;") ? starring?.timeCode.split(";;").sort() 
                    : starring.timeCode ? starring.timeCode 
                    : null
                // const timeCode = timeCodeConvert.split(";;").sort() ? timeCodeConvert.split(";;").sort() : starring.timeCode as any
                starringArray.push({"timeCode": starringTimeCode, "displayName": starring.displayName ? starring.displayName : null, "link": starring.link ? starring.link : null})
            })
        }

        const linkArray = values.linksRow ? values.linksRow : null

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Videography").update({ 
            title: values.title,
            excerpt: values.excerpt,
            description: values.description,
            category: values.category,
            videoPrivacy: values.videoPrivacy,
            videoType: values.videoType,

            tags: tagArray,
            chapters: chapterArray,
            musicCredits: musicArray,
            videoCredits: creditArray,
            starring: starringArray,
            links: linkArray,

            uploadedOn: moment().utcOffset(8),
            lastUpdatedOn: moment().utcOffset(8),

            isSetup: values.title && values.excerpt && values.videoPrivacy && values.tags && values.videoType ? true : false,
            isPortfolio: values.isPortfolio,
            isPinned: values.isPinned
        }).eq('id', values.id)
        supabaseStatus && !toast.isActive(toastID) &&
            toast({
                id: toastID,
                title: `${supabaseStatus === 204 ? `Video "${values.title}" Uploaded 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
                description: `${supabaseStatus === 204 ? `You have successfully uploaded your video!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
                status: `${supabaseStatus === 204 ? "success" : "error"}`,
                duration: 9000,
                isClosable: true,
            })
        supabaseStatus === 204 && router.push('/admin/videography/upload?step=5')
        actions.setSubmitting(false)
    }

    const initialValues = {
        id: videoID,
        chaptersOption: false,
        musicCreditOption: false,
        videoCreditOption: false,
        starringOptions: false,
        linksOptions: false,
        isPinned: false,
        isPortfolio: false,
        excerpt: "No current excerpt, right now!",
        description: "No current description, right now!",
    }
    const validationSchema = Yup.object({
        id: Yup.string().required(),
        title: Yup.string().required('This field is required.'),
        excerpt: Yup.string().required('This field is required.'),
        // description: Yup.string().required('This field is required.'),
        tags: Yup.string().required('This field is required.'),
        videoPrivacy: Yup.string().required('This field is required.'),
    })
    return (
        <Box as="main" pt="1rem" color="white">
            <SectionCard styleType="primaryCard" id="videoUpload">
                <SectionTitle headingTitle="Video Information" />
                <Text>Please note that the video information can be edited later at any point thought the <Code>Video Manager</Code> portal. However, before you can video the video you must include a title for the video, the excerpt, tag or tags for the video, as well as, if the video is public/unlisted/private.</Text>
            </SectionCard>
            {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values, errors }: any) => (
                    <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" my="2rem">
                        {JSON.stringify(errors, null, 2)}
                        <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                        
                        <FormInput inputID="title" inputLabel="Video Title" inputType="text" inputDescription="Providing is a mandatory field so that it will help people see what they'll be watching before clicking play on the video." />
                        <FormTextArea inputID="excerpt" inputLabel="Excerpt" textRows={4} />
                        <FormTextArea inputID="description" inputLabel="Description" textRows={10} helperText={`You may use markdown language on this field. For examples of Markdown please open this page from ${<Link href="https://www.markdownguide.org/basic-syntax/" variant="primary" isExternal>Markdown Guide</Link>}`} />
                        <FormSelect selectLabel="Video Type" selectID="videoType" selectPlaceholder="Select A Video Type">
                            <option value="Horizontal">Horizontal (Best for Desktop)</option>
                            <option value="Vertical">Vertical (Best for Mobile)</option>
                        </FormSelect>
                        <FormSelect selectLabel="Category" selectID="category" selectPlaceholder="Select A Category">
                            {categoryData.map((category: any) => (
                                <option key={category.index} value={category.catName}>{category.catName}</option>
                            ))} 
                        </FormSelect>
                        <FormInput inputID="tags" inputLabel="Tags" inputType="text" inputDescription={`Please separate each tag with a comma (",")`} />
                        
                        <FormSwitch 
                            inputID="chaptersOption" 
                            helperText={values.chaptersOption ? "This video does not have any chapters" : "Does this video have chapters?"} 
                        />
                        {values.chaptersOption === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Chapters" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting and to make sure chapters work properly please make sure to add a proper time format of 0:00 or 00:00. For example 0:20 or 01:30.</Code>
                                <Stack id="theChaptersSection">
                                    <FieldArray
                                        name="chaptersRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.chaptersRow && values.chaptersRow.length > 0 ? (
                                                    values.chaptersRow.map((chapter: any, index: number) => (
                                                        <FormInputCard key={index} id={`${chapter.name}_${index}`}>
                                                            <FormInputRow inputID={`chaptersRow.${index}.timeCode`} inputLabel="Time Code" inputType="text"/>
                                                            <FormInputRow inputID={`chaptersRow.${index}.title`} inputLabel="Title" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Chapter"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsBookmarkDash /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Chapter"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { timeCode: '', title: '' })}
                                                            ><BsBookmarkPlus /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Chapter"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsBookmarkPlus} /> }
                                                        > Add a Chapter</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}
                        
                        <FormSwitch 
                            inputID="musicCreditOption" 
                            helperText={values.musicCreditOption ? "This video does not have any music credits" : "Does this video have music credits?"} 
                        />
                        {values.musicCreditOption === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Music Credits" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, if you have a song playing multiple times and you would like to credit the song each time, please add double ";;" and space at the start and finish. As an example: &#34;0:00;;2:09;;8:10&#34;. For the links please format as LINK;;NAME. If there is more than one link please septate with double pipe "||" As an example: &#34;https://google.ca;;Google||https://donaldlouch.ca;;Donald Louch&#34;. </Code>
                                <Stack id="theMusicSection">
                                    <FieldArray
                                        name="musicRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.musicRow && values.musicRow.length > 0 ? (
                                                    values.musicRow.map((music: any, index: number) => (
                                                        <FormInputCard key={index} id={`${music.name}_${index}`}>
                                                            <FormInputRow inputID={`musicRow.${index}.timeCode`} inputLabel="Time Code" inputType="text"/>
                                                            <FormInputRow inputID={`musicRow.${index}.title`} inputLabel="Title" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.artist`} inputLabel="Artist" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.link`} inputLabel="Link To Song" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.info`} inputLabel="Description" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Music Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsTrash2 /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Music Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { timeCode: '', title: '', artist: '', link: '', info: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Music Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsMusicNoteList} />}
                                                        >Add a Music Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}
                        
                        <FormSwitch 
                            inputID="videoCreditOption" 
                            helperText={values.videoCreditOption ? "This video does not have any additional video credits" : "Does this video have additional video credits?"} 
                        />
                        {values.videoCreditOption === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Video Credits" />
                                <Stack id="theVideoSection">
                                    <FieldArray
                                        name="videoRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.videoRow && values.videoRow.length > 0 ? (
                                                    values.videoRow.map((video: any, index: number) => (
                                                        <FormInputCard key={index} id={`${video.name}_${index}`}>
                                                            <FormInputRow inputID={`videoRow.${index}.title`} inputLabel="Credit Title" inputType="text"/>
                                                            <FormInputRow inputID={`videoRow.${index}.value`} inputLabel="Credit Value" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Video Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsTrash2 /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Video Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { title: '', value: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Video Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsCameraReels} />}
                                                        >Add a Video Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}
                        
                        <FormSwitch 
                            inputID="starringOptions" 
                            helperText={values.starringOptions ? "This video does not have anyone that is starring in it" : "Does this video have anyone that is starring in it?"} 
                        />
                        {values.starringOptions === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Starring Credits" />
                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, if you have a song playing multiple times and you would like to credit the song each time, please add double ";;" and space at the start and finish. As an example: &#34;0:00;;2:09;;8:10&#34;. For the link please format as just as a single link, as an example: &#34;https://donaldlouch.ca/about&#34;. </Code>
                                <Stack id="theStarringSection">
                                    <FieldArray
                                        name="starringRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.starringRow && values.starringRow.length > 0 ? (
                                                    values.starringRow.map((star: any, index: number) => (
                                                        <FormInputCard key={index} id={`${star.name}_${index}`}>
                                                            <FormInputRow inputID={`starringRow.${index}.timeCode`} inputLabel="Time Code" inputType="text"/>
                                                            <FormInputRow inputID={`starringRow.${index}.displayName`} inputLabel="Display Name" inputType="text" />
                                                            <FormInputRow inputID={`starringRow.${index}.link`} inputLabel="Profile Link" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Starring Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsPersonDash /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Starring Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { timeCode: '', displayName: '', link: '' })}
                                                            ><BsPersonPlus /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Starring Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsPeople} />}
                                                        >Add a Starring Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}

                        <FormSwitch 
                            inputID="linksOptions" 
                            helperText={values.linksOptions ? "This video does not have any link(s) associated with it" : "Does this video have any link(s) associated with it?"} 
                        />
                        {values.linksOptions === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Links" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, please include the &#34;http(s)://&#34; in the inputting of the link. For Internal Links use the format &#34;INTERNAL;;TYPE-(such as LINK/EMBED)-||LINK&#34;</Code>
                                <Stack id="theLinksSection">
                                    <FieldArray
                                        name="linksRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.linksRow && values.linksRow.length > 0 ? (
                                                    values.linksRow.map((link: any, index: number) => (
                                                        <FormInputCard key={index} id={`${link.name}_${index}`}>
                                                            <FormInputRow inputID={`linksRow.${index}.link`} inputLabel="Link URL" inputType="text"/>
                                                            <FormInputRow inputID={`linksRow.${index}.name`} inputLabel="Link Title" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsTrash2 /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { link: '', name: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Link"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsLink45Deg} />}
                                                        >Add a Link</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )} 
                        
                        <FormSelect selectLabel="Video Privacy" selectID="videoPrivacy" selectPlaceholder="Select A Video Privacy">
                            <option value="Public">Public</option>
                            <option value="Unlisted">Unlisted</option>
                            <option value="Private">Private</option>
                        </FormSelect>
                        <Stack direction="row" gap="2rem">
                            <FormSwitch 
                                inputID="isPinned" 
                                helperText={values.isPinned ? "This video is pinned" : "Is this video pinned?"} 
                            />

                            <FormSwitch 
                                inputID="isPortfolio" 
                                helperText={values.isPortfolio ? "This video is apart of the portfolio" : "Is this video apart of the portfolio?"} 
                            />
                        </Stack>

                        <Button type="submit" variant="blackFormButton">Publish</Button> 
                    </Stack>
                )}
            </Formik> */}
        </Box>
    )
}
