"use client";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    onInput: (e: React.ChangeEvent<any>) => any;
    onBlur: (e: React.ChangeEvent<any>) => any;
    name: string;
}

const InputFrm: React.FC<InputProps> = ({
    id,
    name,
    label,
    type = "text",
    disabled,
    required,
    onInput,
    onBlur,
}) => {

    return (
        <div className="w-full relative">
            <input
                id={id}
                name={name}
                type={type}
                disabled={disabled}
                onInput={onInput}
                onBlur={onBlur}
                placeholder=" "
                className={`
                py-3
                w-full
                text-lg
                border-b-2
                focus:border-b-black
                
                peer
                transition
                duration-700
                outline-none
                disabled:opacity-70
                disabled:cursor-not-allowed
            `}
            />
            <label
                className={`
                text-md
                text-zinc-400

                absolute
                top-4 
                left-0
                z-10

                transform 
                duration-500
                origin-[0]
                
                -translate-y-7
                peer-focus:-translate-y-7
                peer-placeholder-shown:translate-y-0
            `}
            >
                {label}
            </label>
        </div>
    );
};

export default InputFrm;
