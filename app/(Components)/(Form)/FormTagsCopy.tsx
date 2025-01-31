'use client'

import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

import { useForm } from '@mantine/form';


export default  function FormTagsCopy({ initialFormValue, searchValues }: any) {
    // const [tags, setTags] = useState([])
    // useEffect(() => {
    //     const fetchTags = async () => {
    //         const { data: tagData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any
    //         setTags(tagData) 
    //     }
    //     fetchTags()
    // }, [])
    // const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
    //     // initialValues: {
    //     //     tags: initialFormValue
    //     // },
    })
   
    const [search, setSearch] = useState("")
    const [value, setValue] = useState<any[]>(initialFormValue ? initialFormValue : [])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    })

    const handleValueSelect = (val: any) => {
        setValue((current) => current.includes(val) ? current.filter((v) => v !== val) : [...current, val])
        setSearch("")
        // form.setFieldValue({value})
    }
    // useEffect(() => {
    // }, [value])

    const handleValueRemove = (val: any) => setValue((current) => current.filter((v) => v !== val))

     useEffect(() => {
        form.setValues({tags: value.toString()})
    }, [value])

    const values = value.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}
            size="lg"
            radius="sm"
            // p="1.5rem"
            styles={{
            root: { whiteSpace: "nowrap", wordBreak: "keep-all" },
            label: { marginLeft: "0.5rem" },
            }}
            w="fit-content"
            fw= "500"
            tt="capitalize"
            bg="var(--darkPurple)"
            c="white"
            mx="0.2rem"
        >
            {item}
        </Pill>
    ));

    const options = searchValues
        .filter((item: any) => item.tag.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item: any) => (
            <Combobox.Option value={item.tag} key={item.tag} active={value.includes(item.tag)}>
                <Group gap="sm">
                    {value.includes(item.tag) ? <CheckIcon size={12} /> : null}
                    <span>{item.tag}</span>
                </Group>
            </Combobox.Option>
        ));

    return <>
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.DropdownTarget >
        <PillsInput onClick={() => combobox.openDropdown()} my="2rem">
            <Pill.Group p="1rem">
            {values}

            <Combobox.EventsTarget>
                <PillsInput.Field
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    value={search}
                    placeholder="Search Tags"
                    onChange={(event) => {
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Backspace' && search.length === 0) {
                            event.preventDefault();
                            handleValueRemove(value[value.length - 1]);
                        }
                    }}
                />
            </Combobox.EventsTarget>
            </Pill.Group>
        </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
        <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing Tags Found...</Combobox.Empty>}
        </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox> 
    </>
}