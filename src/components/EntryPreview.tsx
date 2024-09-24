import db from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

type EntryPreviewProps = {
	id: number;
}

export default async function EntryPreview({id}: EntryPreviewProps) {
	const data = await db.dailyEntry.findUnique({
		where: { id }
	});
	const locked = Date.now() - data!.datetime.getTime() < 1000 * 60 * 60 * 24 * 7;
	return (
		<Link href={locked ? '#' : `/entries/daily/${id}`}>
			<div className='relative overflow-hidden cursor-pointer active:scale-90 transition duration-200 flex flex-col items-center 
							w-32 h-32 rounded-[8px] border-gray-200 border-[1px] bg-white shadow-sm shadow-black/40'
			>
				{ locked &&
					<div className='group absolute w-full h-full flex flex-col justify-center items-center text-6xl backdrop-blur-sm'>
						<div className='absolute group-hover:scale-0 group-hover:opacity-0 transition-all duration-300'>🔒</div>
						<div className='font-title text-sm text-center px-2 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300'>항목을 보낸 후 일주일이 지나야 항목을 볼 수 있습니다!</div>
					</div>
				}
				<div className='w-full border-b-[1px] border-b-gray-300 text-center font-title'>
					{data!.datetime.toLocaleDateString('en-GB').replace(/\//g, '-')}
				</div>
				<div className='flex-1 flex items-center'>
					<Image src={`/images/${data!.mood.toLowerCase()}.png`} alt={data!.mood} width={64} height={64}/>
				</div>
			</div>
		</Link>
	);
}