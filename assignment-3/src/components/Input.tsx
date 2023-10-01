import { InputHTMLAttributes } from "react";

interface InputProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
	placeholder?: string;
	onChange?: (event) => void;
}

export const Input = ({ placeholder = '', onChange, ...props }:InputProps) => {
  return (
    <input type="text" onChange={onChange} placeholder={placeholder} {...props}/>
  )
}
