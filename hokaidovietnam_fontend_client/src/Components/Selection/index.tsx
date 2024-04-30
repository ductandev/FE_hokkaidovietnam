import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

type PropTypes = {
    options: Array<any>;
    placeholder?: string;
    title?: string;
    onChanged?: Function;
    displayKey: string;
    value: string;
    name: string;
    disabled?: boolean;
    defaultValue: any;
    customClassTrigger?: string;
}

export default function Selection(props: PropTypes) {
    const {
        options,
        title,
        onChanged,
        placeholder,
        displayKey,
        value,
        name,
        disabled = false,
        defaultValue,
        customClassTrigger
    } = props;

    return (
        <Select
            disabled={disabled}
            onValueChange={(value) => {
                onChanged && onChanged(name, value)

            }}
            value={defaultValue}
        >
            <SelectTrigger className={`w-full ${customClassTrigger}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>

                    {options.map((option, index) => {
                        return <SelectItem
                            value={option[value]}
                            key={index}
                        >
                            {option[displayKey]}
                        </SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
