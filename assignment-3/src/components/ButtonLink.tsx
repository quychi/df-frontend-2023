import { ButtonHTMLAttributes } from "react";

interface ButtonLinkProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
	onClick?: () => void;
	btnText: string;
}

export const ButtonLink = ({ onClick, btnText }: ButtonLinkProps) => (
	<button className='button-link' type='button' onClick={onClick}>
		{btnText}
	</button>
)