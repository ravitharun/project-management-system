import type React from "react"

type INputProps = {
    type: string,
    placeholder?: string,
    value?: string
    name?: string
    required?: boolean,
    classNameStyle: string,
    onChangeevent: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function Input({ type, classNameStyle, placeholder, value, name, required, onChangeevent }: INputProps) {
    return (
        <>


            <input type={type} name={name} className={classNameStyle} required={required} placeholder={placeholder} value={value} onChange={onChangeevent} />
        </>)
}

export default Input