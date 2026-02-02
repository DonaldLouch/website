import { Combobox, Input, useCombobox } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "@tanstack/react-router"
import { useDebouncedValue } from "@mantine/hooks"

type RedirectLocationProps = {
    to: string;
    search?: {
        search: string;
        value: string;
    };
    params?: {
        [key: string]: string
    }
}

const FILTER_CONFIG: Record<string, {icon: any, getRedirectLocation: (value: string) => RedirectLocationProps}> = {
    album: {
        icon: ["fadl", "images"],
        getRedirectLocation: (value) => ({to: "/album/$slug", params: { slug: value }})
    },
    location: {
        icon: ["fadl", "map-marker-smile"],
        getRedirectLocation: (value) => ({to: "/feed/photography", search: {search: "location", value}})
    },
    tag: {
        icon: ["fadl", "tags"],
        getRedirectLocation: (value) => ({to: "/feed/photography", search: {search: "tag", value: value.replace("#", "HASHTAG")}})
    },
}

export default function FilterField({filterType, data}: {filterType: string, data?: any}) {
    const navigate = useNavigate()
    const config = FILTER_CONFIG[filterType] || { 
        icon: ["fal", "search"], 
        getRedirectLocation: (v) => ({to: "/feed/photography", search: {search: filterType, value: v}})
    }
    const icon = config.icon

    const [value, setValue] = useState<string>("")
    const [search, setSearch] = useState("")
    const [focused, setFocused] = useState(false)
    const [completed, setCompleted] = useState(false)
    const redirectLocation = config.getRedirectLocation(value)

    const itemFilter = filterType == "album" ? new Array() : data
    if (filterType == "album") {
        data.forEach((item: any) => {
            itemFilter.push(item.slug)
        })
    }

    console.log(itemFilter)
    // console.log(redirectLocation)

    useEffect(() => {
        if (focused && completed) {
            navigate(redirectLocation)
        }
    }, [value, redirectLocation, navigate, focused, completed])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })

    const shouldFilterOptions = data.every((item: any) => item !== search)
    const filteredOptions = shouldFilterOptions
        ? itemFilter.filter((item: any) => item.toLowerCase().includes(search.toLowerCase().trim()))
        : data

    const options = filteredOptions.map((item: any) => {
        const albumData = filterType == "album"  ? data.find((option: any) => option.slug === item) : null
        const optionValue = item
        const label = filterType == "album" ? albumData?.albumName : item

        return <Combobox.Option value={optionValue} key={value}>
            {label}
        </Combobox.Option>
    })

    return <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
            setValue(val)
            setSearch(val)
            combobox.closeDropdown()
            setCompleted(true)
        }}
    >
        <Combobox.Target>
            <Input
                rightSection={<Combobox.Chevron />}
                value={search}
                onChange={(event) => {
                    combobox.openDropdown()
                    combobox.updateSelectedOptionIndex()
                    setSearch(event.currentTarget.value)
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => {
                    combobox.openDropdown()
                    setFocused(true)
                }}
                onBlur={() => {
                    combobox.closeDropdown()
                    setSearch(value || "")
                }}
                placeholder={`Filter photos by ${filterType}s`}
                rightSectionPointerEvents="none"
                leftSection={<FontAwesomeIcon icon={icon} />}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>No {filterType}'s found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}
