'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';
import { IconContext } from 'react-icons';
import { IoPerson } from 'react-icons/io5';
import { MdOutlineViewDay, MdOutlineViewWeek } from 'react-icons/md';

export default function NavBar() {
	return (
		<div className='shadow-lg h-12 py-1 flex justify-between px-1 bg-white w-[80%] mx-auto mb-4 rounded-full'>
			<NavBarButton
				icon={<MdOutlineViewDay />}
				dest='/entries/daily'
				text='일일'
			/>
			<NavBarButton
				icon={<MdOutlineViewWeek />}
				dest='/entries/weekly'
				text='주간'
				disabled={true}
			/>
			<NavBarButton
				icon={<IoPerson />}
				dest='/profile'
				text='프로파일'
			/>
		</div>
	);
}

type NavBarButtonProps = {
	dest: string;
	icon: ReactElement;
	text: string;
	disabled?: boolean
}
const NavBarButton = ({dest, disabled, icon, text}: NavBarButtonProps) => {
	const path = usePathname();
	const selected = path === dest;
	return (
		<IconContext.Provider value={{size: '24'}}>
			<Link 
				href={disabled ? '#' : dest} 
				className={
					'relative flex flex-col justify-center items-center px-6 py-1 rounded-full'
					+ (selected ? ' bg-background50' : '')
				}
			>
				{disabled && 
					<div className='absolute bg-red-500 text-white text-xs px-1 rounded opacity-[100] rotate-[30deg]'>아직!</div>
				}
				{icon}
				<div className='text-[0.6rem]'>{text}</div>
			</Link>
		</IconContext.Provider>
	);
};