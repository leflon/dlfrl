'use client';

import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';


export default function PWAInstallPopUp() {
	const [isClosed, setIsClosed] = useState(true);
	const mqStandAlone = '(display-mode: standalone)';
	useEffect(() => {
		if (window.matchMedia(mqStandAlone).matches || localStorage.getItem('PWA_CTA') === 'true') {
			setIsClosed(true);
		} else setIsClosed(false);
	}, [isClosed]);
	const onClose = () => {
		setIsClosed(true);
		localStorage.setItem('PWA_CTA', 'true');
	};
	if (isClosed)
		return <></>;
	return (
		<div className='z-50 absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center backdrop-blur-sm'>
			<div className='w-3/4 h-3/4 bg-white p-4 rounded-xl shadow-lg shadow-black/20 overflow-scroll'>
				<div className='font-title text-2xl text-center relative'>
					<span>홈 화면에 추가하세요!</span>
					<div className='absolute right-4 top-1/2 translate-y-[-50%] w-9 h-9 cursor-pointer 
						flex items-center justify-center rounded-full transition-all duration-100 hover:bg-gray-200'
					onClick={onClose}
					>
						<IoMdClose />
					</div>
				</div>
				<div className='text-center my-4'>
					이 사이트를 Safari로 여시고 공휴 버튼 느르세요. 그리고 나서 &apos;홈 화면에 추가&apos;를 누르세요.
				</div>
				<img src='/images/pwa/installation_1.png' alt='Add to Homescreen' className='mx-auto' />
				<div className='text-center my-4'>
					그리고 &apos;추가&apos;를 누르세요.
				</div>
				<img src='/images/pwa/installation_2.png' alt='Add to Homescreen' className='mx-auto' />
			</div>
		</div>
	);
}