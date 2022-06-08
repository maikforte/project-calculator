import './Button.css';

export const Button = (props) => {
	return (
		<button id={props.id} className="button"
			disabled={props.disabled}
			onClick={props.onClick}>
				{props.children}
		</button>
	)
}
