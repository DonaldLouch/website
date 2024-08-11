import { TagsIcon } from "@hugeicons/react"
import { Combobox, Input, useCombobox } from "@mantine/core"
import { useEffect, useState } from "react"
// import { BsTags } from "react-icons/bs"

export default function TagFilter( {tagData}: any ) {
    const combobox = useCombobox()
    const [value, setValue] = useState('')
    
    const shouldFilterOptions = !tagData.some((item: any) => item === value)

    useEffect(() => {
        if (value) window.location.href = value.includes("#") ? `/feed/photography?search=tag&value=${value.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${value}`
    }, [value])


    const filteredOptions = shouldFilterOptions 
        ? tagData.filter((item:any) => item.tag.toLowerCase().includes(value.toLowerCase().trim()))
        : null

    const options = filteredOptions.map((item: any) => (
        <Combobox.Option value={item.tag} key={item.tag}>
            {item.tag}
        </Combobox.Option>
    ))
    return <Combobox
        onOptionSubmit={(optionValue) => {
            setValue(optionValue);
            combobox.closeDropdown();
        }}
        store={combobox}
        withinPortal={false}
    >
        <Combobox.Target>
            <Input
                type="text"
                placeholder="Filter photos by tags"
                value={value}
                onChange={(event: any) => {
                    setValue(event.currentTarget.value);
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                leftSection={<TagsIcon />}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>No tag found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}
