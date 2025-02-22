"use client"

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import FormButton from "@/app/(Components)/(Form)/FormButton"
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone"
import FormNumber from "@/app/(Components)/(Form)/FormNumber"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import InlineCode from "@/app/(Components)/(MarkdownCode)/InlineCode"
import HugeIcon from "@/app/(Components)/HugeIcon"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { userList } from "@/app/actions/clerk"
import supabase from "@/lib/supabase"
import { useUser } from "@clerk/nextjs"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { ActionIcon, Box, Code, Grid, Modal, SimpleGrid, Stack, Text } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { randomId, useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as yup from 'yup'

export default function CreateNewInvoice({isStaff, invoices, usersList}: any) {
    const prams = useSearchParams()
    const openID = prams.get("openID") as string
    const router = useRouter()

    const [opened, { open, close }] = useDisclosure(false)

    const [invoiceTypeSelected, setInvoiceTypeSelected] = useState(null)
    const [statusSelect, setStatusSelect] = useState(null)
    const [relatedInvoiceSelected, setRelatedInvoiceSelected] = useState(null)
    const [relatedItemSelected, setRelatedItemSelected] = useState(null)
    const [clientSelected, setClientSelected] = useState(null)
    // console.log(usersList)
    

    const [clientProjects, setClientProjects] = useState<any>([])
    const [adminProjects, setAdminProjects] = useState<any>([])
    const [clientTasks, setClientTasks] = useState<any>([])
    const [adminTasks, setAdminTasks] = useState<any>([])
    const [clientTickets, setClientTickets] = useState<any>([])
    const [adminTickets, setAdminTickets] = useState<any>([])
    
    const [versionNumber, setVersionNumber] = useState<string | number>(0.00)

    const [subTotal, setSubTotal] = useState<any>(0.00)
    const [discounts, setDiscounts] = useState<any>(0.00)
    const [total, setTotal] = useState<any>(0.00)
    const [paid, setPaid]= useState<any>(0.00)
    const [owing, setOwing] = useState<any>(0.00)

    const { user } = useUser()
    const userID = user?.id

    const users = new Array({id: "admin", name: "ADMIN", email: ""})
    usersList.forEach((user: any) => {
        users.push({ id: user.id, name: user.username, email: user.emailAddresses[0].emailAddress });
    });
   
    
    const isOpenedID = openID === "newInvoice" ? true : false

    function forceClose() {
        router.push(`/portal/invoices`)
    }

    const onSubmit = async (values: any) => {
        const getRelatedInvoice = relatedInvoiceSelected ? relatedInvoiceSelected.split("_") : null
        const id = relatedInvoiceSelected ? "invoice_" + invoiceTypeSelected + (versionNumber && ";;" + versionNumber) +"_"+ getRelatedInvoice[2] : "invoice_"+ invoiceTypeSelected +"_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        const actualID = id.split("_")[2]

        const subItemsValue = new Array()
            values.itemsRow.forEach((item: any) => {
                const itemName = item.name.split(";;")
                subItemsValue.push({
                    type: item.itemType,
                    quantity: item.quantity,
                    name: {type: itemName[0], id: itemName[1], related: itemName[2] || null},
                    price: item.price,
                    total: parseFloat((item.quantity * item.price).toFixed(2))
                })
            })

        const relatedArray = relatedItemSelected ? relatedItemSelected.split(";;") : []
        const relatedTo = {type: relatedArray[0], id: relatedArray[1], related: relatedArray[2] || null}

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Invoices").insert({ 
            id,
            invoiceID: actualID,
            invoiceType: invoiceTypeSelected,
            versionNumber: versionNumber ? (versionNumber as number) : null,
            relatedInvoice: relatedInvoiceSelected ? relatedInvoiceSelected : null,
            relatedItem: relatedItemSelected ? relatedTo : null,
            client: clientSelected,
            items: subItemsValue,
            notes: values.notes,
            subTotal: parseFloat(subTotal.toFixed(2)),
            discounts: parseFloat(discounts.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            paid: parseFloat(paid.toFixed(2)),
            owing: parseFloat(owing.toFixed(2)),
            createdOn: new Date(values.createdOn),
            dueOn: values.dueOn ? new Date(values.dueOn) : null,
            paidOn: values.paidOn ? new Date(values.paidOn) : null,
            status: statusSelect ? statusSelect : "Sent"
        });
        if (supabaseStatus) {
            notifications.show({ 
                title: `${supabaseStatus === 201 ? "Invoice Created 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
                message: `${supabaseStatus === 201 ? `You have successfully created an invoice!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
                color: supabaseStatus === 201 ? "black" : "red",
                icon: supabaseStatus === 201 ? <HugeIcon name="sent" /> : <HugeIcon name="alert-diamond" />
            });
        }
        if (supabaseStatus === 201) {
            router.push(`/portal/invoice/${actualID}`);
        }
    }

    const initialItemsValues = new Array()

    const initialValues = {
        invoiceType: "",
        relatedInvoiceID: "",
        relatedItemID: "",
        client: "",
        itemsRow: initialItemsValues,
        notes: "",       
        // subTotal: subTotal,
        // discounts: discounts,
        // total: total,
        // paid: paid,
        // owing: owing,
        createdOn: new Date(),
        dueOn: null,
        paidOn: null,
        status: "Sent"
    }
    const schema = yup.object().shape({
        // invoiceType: yup.string().nonNullable("The type of invoice is required.").required("The type of invoice is required."),
        // client: yup.string().nonNullable("The client is required.").required("The client is required."),
        // items: yup.array().required("Items are required to process an invoice."),
        // notes: yup.string(),
        // subTotal: yup.number().required("The sub total amount is required."),
        // discounts: yup.number(),
        // total: yup.number().required("The total amount is required."),
        // paid: yup.number(),
        // owing: yup.number(),
        // createdOn: yup.date().required("The creation date is required."),
        // dueOn: yup.date(),
        // paidOn: yup.date(),
        // status: yup.string()
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    // const OPTIONS = new Array(
    //     {value: "VALUE", label: "LABEL"},
    // )

    const invoiceTypeOptions = new Array(
        {value: "Proposed", label: "Proposed"},
        {value: "Official", label: "Official"},
        {value: "Final", label: "Final"},
    )

    useEffect(() => {
        const fetchClientProjects = async () => {
            const {data} = await supabase.from('Projects').select().contains('client', {id: userID}).order('lastUpdated', { ascending: false }) as any
            setClientProjects(data)
        }
        fetchClientProjects()
        
        const fetchAdminProjects = async () => {
            const {data} = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }) : undefined
            setAdminProjects(data)
        }
        fetchAdminProjects()

        const fetchClientTasks = async () => {
            const {data} = await supabase.from('Tasks').select().match({'clientID': userID}).order('lastUpdated', { ascending: false }) as any
            setClientTasks(data)
        }
        fetchClientTasks()

        const fetchAdminTasks = async () => {
            const {data} = isStaff ? await supabase.from('Tasks').select().order('lastUpdated', { ascending: false }) : undefined
            setAdminTasks(data)
        }
        fetchAdminTasks()

        const fetchClientTickets = async () => {
            const {data} = await supabase.from('Tickets').select().contains('from', {id: userID}).order('lastUpdatedOn', { ascending: false }) as any
            setClientTickets(data)
        }
        fetchClientTickets()

        const fetchAdminTickets = async () => {
            const {data} = isStaff ? await supabase.from('Tickets').select().order('lastUpdatedOn', { ascending: false }) : undefined
            setAdminTickets(data)
        }
        fetchAdminTickets()
    }, [])
    const relatedOptions = new Array(
        // {group: "", items: [{label: "Nothing", value: ""}]},
        {label: "Custom", value: "Custom"},
        {group: "Projects", items: []},
        {group: "All Projects", items: []},
        {group: "Tasks", items: []},
        {group: "All Tasks", items: []},
        {group: "Tickets", items: []},
        {group: "All Tickets", items: []},
    ) as any
    clientProjects.forEach((project: any) => {
        project.client.id === userID && relatedOptions[1].items.push({"value": `Project;;${project.id}`, "label": `${project.name} (${project.id})`})
    })
    adminProjects.forEach((project: any) => {
        project.client.id != userID && relatedOptions[2].items.push({"value": `Project;;${project.id}`, "label": `${project.name} (${project.id})`})
    })
    clientTasks.forEach((task: any) => {
        task.clientID === userID && relatedOptions[3].items.push({"value": `Task;;${task.id};;${task.projectID}`, "label": `${task.title} (${task.id})`})
    })
    adminTasks.forEach((task: any) => {
        task.clientID != userID && relatedOptions[4].items.push({"value": `Task;;${task.id};;${task.projectID}`, "label": `${task.title} (${task.id})`})
    })
    clientTickets.forEach((ticket: any) => {
        ticket.clientID === userID && relatedOptions[5].items.push({"value": `Ticket;;${ticket.id}`, "label": `${ticket.subject} (${ticket.id})`})
    })
    adminTickets.forEach((ticket: any) => {
        ticket.clientID != userID && relatedOptions[6].items.push({"value": `Ticket;;${ticket.id}`, "label": `${ticket.subject} (${ticket.id})`})
    })

    const relatedInvoiceOptions = new Array()
    invoices.forEach((invoice: any) => {
        relatedInvoiceOptions.push({value: invoice.id, label: `${invoice.id} for ${invoice.client}`})
    })

    const userOptions = new Array()
    users.forEach((user: any) => {
        userOptions.push({label: `${user.name} (${user.email})`, value: `${user.id}`})
    })

    const statusOptions = new Array(
        {value: "Sent", label: "Sent"},
        {value: "Seen By Client", label: "Seen By Client"},
        {value: "Under Review", label: "Under Review"},
        {value: "Approved", label: "Approved"},
        {value: "Declined", label: "Declined"},
        {value: "Partially Paid", label: "Partially Paid"},
        {value: "Fully Paid", label: "Fully Paid"},
        {value: "Canceled", label: "Canceled"},
        {value: "Flagged", label: "Flagged"},
    )

    const itemTypeOptions = new Array(
        {value: "Product", label: "Product"},
        {value: "Minutes", label: "Minutes"},
        {value: "Hours", label: "Hours"},
        {value: "Days", label: "Days"},
        {value: "Weeks", label: "Weeks"},
        {value: "Months", label: "Months"},
        {value: "Years", label: "Years"},
        {value: "Amount", label: "Amount"},
    )

    const [selectedItems, setSelectedItems] = useState(new Map())

    const itemsFields = form.values.itemsRow.map((item: any, index: any) => {
        function handleSelect(value: any) {
            setSelectedItems(prev => new Map(prev).set(`${item.key}`, value))
            form.setFieldValue(`itemsRow.${index}.name`, value === "Custom" ? "Custom;;" : value);
        }
        
        return <Draggable key={item.key} index={index} draggableId={item.key}>
        {(provided: any) => (
            <Grid gutter="2rem"
            ref={provided.innerRef}
            {...provided.draggableProps} {...provided.dragHandleProps}
            >
                <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                    <HugeIcon name="drag-drop" />
                </Box></Grid.Col>
                <Grid.Col span={1.3}><FormSelect inputID={`itemsRow.${index}.itemType`} inputData={itemTypeOptions} key={form.key(`itemsRow.${index}.itemType`)} {...form.getInputProps(`itemsRow.${index}.itemType`)} /></Grid.Col>
                <Grid.Col span={1.2}>
                     <FormNumber 
                        key={form.key(`itemsRow.${index}.quantity`)}
                        inputID={`itemsRow.${index}.quantity`}
                        {...form.getInputProps(`itemsRow.${index}.quantity`)}
                        icon={<HugeIcon name="grid" />}
                    />
                </Grid.Col>
                <Grid.Col span={7}>
                    <SimpleGrid cols={selectedItems.get(item.key) === "Custom" ? 2 : 1}>
                        <FormSelect inputID={`itemsRow.${index}.relatedItem`} inputData={relatedOptions} {...form.getInputProps(`itemsRow.${index}.relatedItem`)} onChange={(value: any) => handleSelect(value)} clearable searchable />
                        {selectedItems.get(item.key) === "Custom" && (
                            <FormInput inputID={`itemsRow.${index}.name`} {...form.getInputProps(`itemsRow.${index}.name`)} key={form.key(`itemsRow.${index}.name`)} />
                        )}
                    </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={1.5}>
                    <FormNumber 
                        key={form.key(`itemsRow.${index}.price`)}
                        inputID={`itemsRow.${index}.price`} 
                        value={item.price} 
                        {...form.getInputProps(`itemsRow.${index}.price`)} 
                        icon={<HugeIcon name="dollar-02" />} 
                        decimalScale={2}
                        fixedDecimalScale
                        // prefix="$"
                        suffix=" CAD"
                    />
                    </Grid.Col>
                <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('itemsRow', index)}>
                    <HugeIcon name="delete-02" size="1rem" />
                </ActionIcon></Grid.Col>
            </Grid>
        )}
        </Draggable>
})

   useEffect(() => {
        const newSubTotal = form.values.itemsRow.reduce((acc: number, item: any) => acc + (item.price * item.quantity),0);
        setSubTotal(parseFloat(newSubTotal.toFixed(2)));
        setTotal(parseFloat((newSubTotal - (discounts as number)).toFixed(2)));
        setOwing(parseFloat((total - paid).toFixed(2)));
    }, [form.values.itemsRow, discounts, paid]);


    return <><PrimaryButton onClick={open} primNewIcon={{name: "invoice-01", variant: "duotone"}}>Add New Invoice</PrimaryButton>
        <Modal opened={isOpenedID ? true : opened} onClose={isOpenedID ? forceClose : close} title="Create New Invoice" yOffset="2rem" xOffset="2rem" size="100%"      
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={4} my="2rem">
                    <FormSelect inputID="invoiceType" inputLabel="Invoice Type" inputData={invoiceTypeOptions} {...form.getInputProps(`invoiceType`)} onChange={setInvoiceTypeSelected} value={invoiceTypeSelected} />
                    <FormNumber 
                        inputID="versionNumber" 
                        inputLabel="Version Number" 
                        // inputDescription="Field will get numbers when you add items. This is read only!"
                        value={versionNumber} 
                        onChange={setVersionNumber}
                        icon={<HugeIcon name="grid" />} 
                    />
                    <FormSelect inputID="relatedInvoiceID" inputLabel="Related Invoice ID" inputData={relatedInvoiceOptions} {...form.getInputProps(`relatedInvoiceID`)} onChange={setRelatedInvoiceSelected} value={relatedInvoiceSelected} clearable searchable />
                    <FormSelect inputID="relatedItem" inputLabel="Related Item" inputData={relatedOptions} {...form.getInputProps(`relatedItem`)} onChange={setRelatedItemSelected} value={relatedItemSelected} clearable searchable />
                </SimpleGrid>

                <FormSelect inputID="client" inputLabel="Client" inputData={userOptions} {...form.getInputProps(`from`)} onChange={setClientSelected} value={clientSelected} searchable clearable />

                <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                    <SectionTitle headingTitle="Items" />
                    {itemsFields.length > 0 ? (
                    <Grid my="0">
                        <Grid.Col span={0.5}><></></Grid.Col>
                        <Grid.Col span={1.3} ta="center"><Text>Type</Text></Grid.Col>
                        <Grid.Col span={1.2} ta="center"><Text>Quantity</Text></Grid.Col>
                        <Grid.Col span={7} ta="center"><Text>Name</Text></Grid.Col>
                        <Grid.Col span={1.5} ta="center"><Text>Price</Text></Grid.Col>
                        <Grid.Col span={0.5}><></></Grid.Col>
                    </Grid>
                    ) : <InlineCode code="You currently have not added any items to the invoice. Note that you need to add at least one item in to proceed with the invoice creation." ta="center" />}

                    <DragDropContext
                    onDragEnd={({ destination, source }: any) =>
                        destination?.index !== undefined && form.reorderListItem('itemsRow', { from: source.index, to: destination.index })
                    }
                    >
                    <Droppable droppableId="itemsDnD" direction="vertical">
                        {(provided: any) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                            {itemsFields}
                            {provided.placeholder}
                        </Box>
                        )}
                    </Droppable>
                    </DragDropContext>

                    <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('itemsRow', {
                        key: randomId(), 
                        itemType: "Product",
                        quantity: 1,
                        name: "",
                        price: 1.00
                    })}>Add More Item(s)</FormButton>
                </Stack>

                <FormTextArea inputID="notes" inputLabel="Notes" textRows={3} {...form.getInputProps('notes')} />

                <SimpleGrid cols={invoiceTypeSelected === "Final"  || invoiceTypeSelected === "Pending" ? 5 : 3} my="2rem">                    
                    <FormNumber 
                        inputID="subTotal" 
                        inputLabel="Sub Total" 
                        // inputDescription="Field will get numbers when you add items. This is read only!"
                        value={subTotal} 
                        onChange={setSubTotal}
                        icon={<HugeIcon name="dollar-02" />} 
                        decimalScale={2}
                        fixedDecimalScale
                        suffix=" CAD"
                        isRequired 
                        readOnly
                    />
                    <FormNumber 
                        inputID="discounts" 
                        inputLabel="Discounts" 
                        value={discounts} 
                        onChange={setDiscounts}
                        icon={<HugeIcon name="dollar-02" />} 
                        decimalScale={2}
                        fixedDecimalScale
                        suffix=" CAD" 
                    />
                    <FormNumber 
                        inputID="total" 
                        inputLabel="Total" 
                        value={total} 
                        onChange={setTotal}
                        icon={<HugeIcon name="dollar-02" />} 
                        decimalScale={2}
                        fixedDecimalScale
                        suffix=" CAD"
                        isRequired 
                    />
                    {invoiceTypeSelected === "Final" || invoiceTypeSelected === "Pending" ? 
                        <FormNumber 
                            inputID="paid" 
                            inputLabel="Paid" 
                            value={paid} 
                            onChange={setPaid}
                            icon={<HugeIcon name="dollar-02" />} 
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" CAD"
                        /> : null
                    }
                    {invoiceTypeSelected === "Final" || invoiceTypeSelected === "Pending" ? 
                        <FormNumber 
                            inputID="owing" 
                            inputLabel="Owing" 
                            value={owing} 
                            onChange={setOwing}
                            icon={<HugeIcon name="dollar-02" />} 
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" CAD"
                            readOnly
                        /> : null
                    }
                </SimpleGrid>
                <SimpleGrid cols={invoiceTypeSelected === "Final" ? 3 : 2} my="2rem">
                    <FormDatePicker dateLabel="Created On" datePlaceholder="Select when the invoice will be active" {...form.getInputProps('createdOn')} isRequired />
                    <FormDatePicker dateLabel="Due Date" datePlaceholder="Select when the invoice will be due" {...form.getInputProps('dueOn')} />
                    {invoiceTypeSelected === "Final"  && <FormDatePicker dateLabel="Paid On" datePlaceholder="Select when the invoice will be active" {...form.getInputProps('paidOn')} />}
                </SimpleGrid>

                {invoiceTypeSelected === "Final" && 
                    <FormSelect inputID="status" inputLabel="Status" inputData={statusOptions} {...form.getInputProps(`status`)} onChange={setStatusSelect} value={statusSelect} clearable />
                }
                
                <FormSubmitButton icon={<HugeIcon name="sent" />}>Create New Invoice</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
