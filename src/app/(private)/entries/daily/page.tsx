import EntryPreview from '@/components/EntryPreview';
import db from '@/lib/db';
import { getUserId } from '@/lib/session';
import { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = {
	title: '일일 항목'
};

export default async function Page() {
	// Middleware presents access without session.
	const userId = (await getUserId())!;
	const entryIds = await db.dailyEntry.findMany({
		where: {userId},
		select: {id: true}
	});
	const entry = await db.dailyEntry.findFirst({
		orderBy: {datetime: 'desc'},
		select: {datetime: true}
	});
	const lastEntryDate = entry ? entry.datetime : new Date(0);
	const now = new Date();
	const didToday = lastEntryDate.getDate() === now.getDate() && lastEntryDate.getMonth() === now.getMonth() && lastEntryDate.getFullYear() === now.getFullYear();
	const isEntryTime = now.getHours() >= 20;
	const welcomePhrase = 
		didToday ? '오늘 항목 잘 했어요! 이제 잘 쉬고 내일 보세요!'
			: isEntryTime ? '안녕하세요! 오늘의 항목을 쓸까요?'
				: '안녕하세요! 지금 너무 이르죠! 좀 이따 오시고 항목을 써보세요!';

	return (
		<div className='relative h-full flex flex-col'>
			<div className='font-title text-2xl mt-16 text-center px-4'>{welcomePhrase}</div>
			{
				(!didToday && isEntryTime) &&
				<div className='text-center my-8'>
					<Link 
						href='/entries/daily/new'
						className='font-title text-2xl border-2 border-amber-800 text-amber-800 px-6 py-2 rounded-2xl hover:bg-amber-800 hover:text-background
							transition-all duration-300'
					>
						쓰기
					</Link>
				</div>
			}
			<div className='overflow-y-auto box-border flex flex-1 justify-center p-6 flex-wrap gap-6'>
				{
					entryIds.map(({id}) =>
						<EntryPreview
							key={id}
							id={id}
						/>
					)
				}
			</div>
		</div>
	);
}