import db from '@/lib/db';
import { getUserId } from '@/lib/session';
import Link from 'next/link';

export default async function Profile() {
	const userId = (await getUserId())!;
	const user = await db.user.findUnique({where: {id: userId}, omit: {password: true}});
	console.log(user);
	return (
		<div className='text-center font-title px-4 flex flex-col justify-center items-center h-full'>
			<div>
				안녕하세요, {user?.username}! 프로파일 아직 못 만들었습니다... 폭 가다리주세요!
			</div>
			<div>
				근데 필요하시면, 로그아웃 할 수 있습니다.
			</div>
			<Link href='/logout' className='my-4 border-amber-800 border-2 px-2 py-1 rounded hover:bg-amber-800 hover:text-white'>로그 아웃</Link>
		</div>
	);
}