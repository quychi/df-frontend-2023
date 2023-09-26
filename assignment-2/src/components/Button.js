export const Button = ({ className, onClick, btnText }) => (    
	<button className={`button ${className && className}`} type="button" onClick={onClick}>
		{btnText}
	</button>
)