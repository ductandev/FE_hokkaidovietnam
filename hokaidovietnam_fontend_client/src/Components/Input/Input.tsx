"use client";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onInput: (e: React.ChangeEvent<any>) => any;
  onBlur: (e: React.ChangeEvent<any>) => any;
  name: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  placeholder,
  disabled,
  required,
  onInput,
  onBlur,
  name,
}) => {

  return (
    <input
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      onInput={onInput}
      onBlur={onBlur}
      style={{ border: "0.5px solid #777171" }}
      className={`
            peer
            w-full
            indent-3
            sm:indent-5
            h-6 
            sm:h-9
            mb-4 
            sm:mb-6 
            text-[10px] 
            sm:text-base
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            `}
    />
  );
};

export default Input;
