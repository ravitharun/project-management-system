import React from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  name?: string;
  required?: boolean;
  classNameStyle?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  type,
  placeholder,
  value,
  name,
  required,
  classNameStyle,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
      hover:border-gray-400 transition ${classNameStyle}`}
    />
  );
}

export default Input;