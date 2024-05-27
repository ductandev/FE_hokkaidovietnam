import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { badgeTagStatusTransform } from "@/Helper/helper";

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
    type?: string
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
        error,
        type = 'label'
    } = props;

    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <Select
            disabled={disabled}
            onValueChange={(value) => {
                onChanged && onChanged(name, value)
            }}
            value={value}
        >
            <SelectTrigger
                error={error}
                className={`
                w-full 
                ${type === 'tag' ? "px-0 border-none focus:ring-0" : ""}
                 ${customClassTrigger}`
                }
            >
                {type === 'tag' && <Badge
                    variant={badgeTagStatusTransform(value, name)}>
                    {options.find(y => y[valueKey] === value)[displayKey]}</Badge>}

                {type === "label" && <SelectValue placeholder={placeholder} />}
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
