import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
	className?: string;
	onClick?: () => void;
	btnText: string;
}

export const Button = ({ className, onClick, btnText, ...props }: ButtonProps) => (    
	<button {...props} className={`button ${className && className}`} type="button" onClick={onClick}>
		{btnText}
	</button>
);

