'use client';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { login } from '../../actions/login';

export default function Login() {	 
	const [state, action] = useFormState(login, undefined);
	  return (
		<form 
			action={action}
			className='flex flex-col items-center gap-6'
		>
			<Image src='/icons/icon-384x384.png' alt='logo' width={128} height={128} className='mt-8' />
			<div className='font-title text-4xl'>로그인</div>
			<div className='text-red-500'>{state?.error && state.error}</div>
			<input type="text" name="username" placeholder="이름" required />
			<input type="password" name="password" placeholder="비밀번호" required />
			<button type="submit">로그인</button>
		</form>
	  );
}