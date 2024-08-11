import { MapsSearchIcon } from "@hugeicons/react"
import { Combobox, Input, useCombobox } from "@mantine/core"
import { useEffect, useState } from "react"
// import { BsPinMap } from "react-icons/bs"

export default function LocationFilter( {locationData}: any ) {
    const combobox = useCombobox()
    const [value, setValue] = useState('')
    
    const shouldFilterOptions = !locationData.some((item: any) => item === value)
    
    useEffect(() => {
        if (value) window.location.href = `/feed/photography?search=location&value=${value}`
    }, [value])

    const filteredOptions = shouldFilterOptions 
        ? locationData.filter((item:any) => item.location.toLowerCase().includes(value.toLowerCase().trim()))
        : null

    const options = filteredOptions.map((item: any) => (
        <Combobox.Option value={item.location} key={item.location}>
            {item.location}
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
                placeholder="Filter photos by location"
                value={value}
                onChange={(event: any) => {
                    setValue(event.currentTarget.value);
                    // router.push(`/album/${value}`)
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                leftSection={<MapsSearchIcon />}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>No location found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}
