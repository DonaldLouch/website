import { Combobox, Input, useCombobox } from "@mantine/core"
import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "@tanstack/react-router"

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

function FilterField( {filterType, data}: {filterType: string, data?: any} ) {
    const combobox = useCombobox()
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    
    const config = FILTER_CONFIG[filterType] || { icon: ["fal", "search"], getRedirectLocation: (v) => ({to: "/feed/photography", search: {search: filterType, value: v}}) }
    const icon = config.icon
    const redirectLocation = useMemo(() => config.getRedirectLocation(value), [value, config])

    useEffect(() => {
        if (value) {
            navigate(redirectLocation)
        }
    }, [value, redirectLocation, navigate])

    const options = useMemo(() => data?.map((item: any) => {
        const value = filterType === "album" ? item.slug : item
        const label = filterType === "album" ? item.albumName : item
        return (
            <Combobox.Option value={value} key={value}>
                {label}
            </Combobox.Option>
        )
    }) || [], [data, filterType])
    
    const handleOptionSubmit = useCallback((optionValue: string) => {
        setValue(optionValue)
        combobox.closeDropdown()
    }, [combobox])
    
    const handleChange = useCallback((event: any) => {
        setValue(event.currentTarget.value)
        combobox.openDropdown()
        combobox.updateSelectedOptionIndex()
    }, [combobox])

    return <Combobox
        onOptionSubmit={handleOptionSubmit}
        store={combobox}
        withinPortal={false}
    >
        <Combobox.Target>
            <Input
                type="text"
                placeholder={`Filter photos by ${filterType}s`}
                value={value}
                onChange={handleChange}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                leftSection={<FontAwesomeIcon icon={icon} />}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
                {options.length === 0 ? <Combobox.Empty>No {filterType} found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}

export default memo(FilterField)
