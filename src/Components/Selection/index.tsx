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
    valueKey: string;
    name: string;
    disabled?: boolean;
    defaultValue: any;
    customClassTrigger?: string;
    error?: string
}

export default function Selection(props: PropTypes) {
    const {
        options,
        title,
        onChanged,
        placeholder,
        displayKey,
        valueKey,
        name,
        disabled = false,
        defaultValue,
        customClassTrigger,
        error
    } = props;

    return (
        <Select
            disabled={disabled}
            onValueChange={(value) => {
                onChanged && onChanged(name, value)

            }}
            value={defaultValue}

        >
            <SelectTrigger error={error} className={`w-full ${customClassTrigger}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            {
                error && (
                    <p className="my-1 text-red-700 text-sm" >
                        {error}
                    </p>
                )
            }

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>

                    {options.map((option, index) => {
                        return <SelectItem
                            value={option[valueKey]}
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
