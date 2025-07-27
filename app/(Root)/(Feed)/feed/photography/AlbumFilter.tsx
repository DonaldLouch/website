import HugeIcon from "@/app/(Components)/HugeIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Combobox, Input, useCombobox } from "@mantine/core"
import { useEffect, useState } from "react"
// import { BsImages } from "react-icons/bs"

export default function AlbumFilter( {photographyAlbum}: any ) {
    const combobox = useCombobox()
    const [value, setValue] = useState('')
    
    const shouldFilterOptions = !photographyAlbum.some((item: any) => item === value)
    
    useEffect(() => {
        if (value) window.location.href = `/album/${value}`
    }, [value])

    const filteredOptions = shouldFilterOptions 
        ? photographyAlbum.filter((item:any) => item.albumName.toLowerCase().includes(value.toLowerCase().trim()))
        : null

    const options = filteredOptions.map((item: any) => (
        <Combobox.Option value={item.slug} key={item.id}>
            {item.albumName}
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
                placeholder="Filter photos by album name"
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
                leftSection={<FontAwesomeIcon icon={["fadl", "images"]} />}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>No album found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}
