import { ChangeEventHandler } from 'react';

type TextAreaProps = {
	placeholder?: string;
	value?: string;
	name?: string;
	onChange?: (_value: string) => unknown;
	className?: string;
}

export default function TextArea({className, name, placeholder, value, onChange}: TextAreaProps) {
	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({target}) => {
		target.style.height = 'auto';
		target.style.height = `${target.scrollHeight + 5}px`; // Adding some height to avoid any small scrollbar
		if (onChange)
			 onChange(target.value);
	};
	return (
		<textarea 
			name={name}
			placeholder={placeholder}
			className={'w-3/4 appearance-none outline-none bg-transparent resize-none text-2xl'
				+ ' text-amber-800 font-input font-thin border-amber-800 border-2 p-2 rounded placeholder:text-amber-900/40'
				+ (className ? ' ' + className : '')}
			onChange={handleChange}
		>
			{value}
		</textarea>
	);
}