import { MouseEventHandler } from 'react';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	disabled?: boolean
}

export default function Button({children, onClick, disabled, className}: ButtonProps) {
	return (
		<button 
			onClick={(e) => (!disabled && onClick) && onClick(e)}
			disabled={disabled}
			className={'px-4 py-2 text-gray-900 border-gray-900 border rounded hover:bg-gray-900 hover:text-white transition duration-300 ' 
						+ 'disabled:cursor-not-allowed disabled:bg-gray-500/20 disabled:hover:text-gray-900 active:translate-y-px'
						+ (className || '')}
		>
			{children}
		</button>
	);
}