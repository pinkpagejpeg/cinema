import { FC } from "react"
import { Combobox, Input, InputBase, useCombobox } from "@mantine/core"

export const FilterCombobox: FC<any> = ({ comboboxOptions, setFilter, currentValue }) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })

    let options = comboboxOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ))

    const optionHandler = (option) => {
        setFilter(option)
        combobox.closeDropdown()
    }

    return (
        <Combobox store={combobox} onOptionSubmit={optionHandler}>
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                >
                    {currentValue || <Input.Placeholder>{comboboxOptions[0]}</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>

    )
}
