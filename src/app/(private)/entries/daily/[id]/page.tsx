import { getUserId } from '@/lib/session';
import db from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '항목'
};

export default async function DailyEntryPage({params}: {params: {id: string}}) {
	const userId = (await getUserId())!;
	const id = parseInt(params.id || '-1');
	const entry = await db.dailyEntry.findUnique({
		where: {
			id,
			userId
		}
	});
	if (!entry) {
		return (
			<div className='h-full flex flex-col justify-center items-center'>
				<div className='font-title text-xl'>
					항목을 못 찾았습니다.
				</div>
				<Link href='/entries/daily' className='flex items-center justify-center gap-1 mt-4 border border-black p-1 rounded hover:bg-black hover:text-white'>
					<FiArrowLeftCircle />
					돌아가기
				</Link>
			</div>
		);
	}

	const moods = {
		VERY_SAD: '아주 슬펐어',
		SAD: '슬펐어',
		ANGRY: '화 났어',
		NEUTRAL: '자제했어',
		HAPPY: '행복했어',
		VERY_HAPPY: '아주 행복했어'
	};

	return (
		<div className='box-border'>
			<div className='font-title text-4xl py-4 text-center left-0 w-full sticky top-0 backdrop-blur-lg'>
				{entry.datetime.toLocaleDateString('ko-KR', {
					weekday: 'long',
					month: 'long',
					day: 'numeric'})
				}
			</div>
			<Question>
				그날에 기분이 어땠어?
			</Question>
			<Answer>
				<Image 
					src={`/images/${entry.mood.toLowerCase()}.png`} 
					width={128} 
					height={128} 
					alt={entry.mood} 
					className='mx-auto'
				/>
				<div>{moods[entry.mood]}</div>
			</Answer>
			<Question>
				왜 그랬어?
			</Question>
			<Answer>
				{entry.moodReason}
			</Answer>
			<Question>
				근데 재미있는 일이 있었지!
			</Question>
			<Answer>
				{entry.funFact}
			</Answer>
			<Question>
				예정대로 됐었나!
			</Question>
			<Answer>
				{entry.scheduleRespected}
			</Answer>
			<Question>
				다음 날의 예정이 뭐였지?
			</Question>
			<Answer>
				{entry.nextDaySchedule}
			</Answer>
		</div>
	);
}


const Question = ({children}: {children: React.ReactNode}) => {
	return (
		<div className='font-title text-2xl mx-4 mt-4 px-4'>
			{children}
		</div>
	);
};


const Answer = ({children}: {children: React.ReactNode}) => {
	return (
		<div className='font-input text-4xl text-center mb-6 mt-2 px-4'>
			{children}
		</div>
	);
};