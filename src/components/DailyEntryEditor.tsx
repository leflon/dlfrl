'use client';
import { $Enums, type DailyEntry } from '@prisma/client';
import { RefObject, useEffect, useRef, useState } from 'react';
import Button from './Button';
import Image from 'next/image';
import TextArea from './TextArea';
import { createDailyEntry } from '@/app/actions/createDailyEntry';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default function DailyEntryEditor({action}: {
	action: 'create' | 'edit'
	data?: DailyEntry
}) {
	const [currentStep, setCurrentStep] = useState(1);
	const [mood, setMood] = useState<$Enums.Mood>('NEUTRAL');
	const [moodReason, setMoodReason] = useState('');
	const [funFact, setFunFact] = useState('');
	const [scheduleRespected, setscheduleRespected] = useState('');
	const [nextDaySchedule, setnextDaySchedule] = useState('');
	const form: RefObject<HTMLFormElement> = useRef(null);

	const animationRefs: RefObject<HTMLDivElement>[] = Array(5).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [animationStep, setAnimationStep] = useState(-1);

	const launchEndAnimation = () => {
		console.log('oui');
		setCurrentStep(currentStep + 1);
		setAnimationStep(0);
	};

	const goPrevious = () => {
		if (currentStep > 0)
			setCurrentStep(currentStep - 1);
	};

	const goNext = () => {
		// to be improved lol
		if (currentStep === 1)
			if (mood) setCurrentStep(currentStep + 1);
		if (currentStep === 2)
			if (moodReason) setCurrentStep(currentStep + 1);
		if (currentStep === 3)
			if (funFact) setCurrentStep(currentStep + 1);
		if (currentStep === 4)
			if (scheduleRespected) setCurrentStep(currentStep + 1);
		if (currentStep === 5)
			if (nextDaySchedule) {
				launchEndAnimation();
			}
	};
	
	useEffect(() => {
		if (animationStep === -1)
			return;
		const interval = setInterval(() => {
			setAnimationStep(animationStep + 1);
		}, 2000);

		if (animationStep === 4) {
			clearInterval(interval);
			setTimeout(() => {
				form.current!.requestSubmit();
			}, 2500);
		}

		return () => clearInterval(interval);
	}, [animationStep]);

	return (
		<div
			className='relative w-full h-full bg-background flex flex-col'
		>
			<form 
				className='relative h-1/2 flex justify-center'
				action={createDailyEntry}
				ref={form}
			>
				<EditorStep step={1} viewedStep={currentStep} title='오늘은 기분이 어땠어?'>
					<MoodSelector onChange={setMood} name='mood'/>
				</EditorStep>
				<EditorStep step={2} viewedStep={currentStep} title='왜 이런 느낌이 드나?'>
					<TextArea
						name='moodReason'
						placeholder='조금만이라도 써봐.'
						onChange={setMoodReason}
						className='flex-1'
					/>
				</EditorStep>
				<EditorStep step={3} viewedStep={currentStep} title='오늘의 좋은 일이 뭐였나?'>
					<TextArea
						name='funFact'
						placeholder='아무거나. 재밌는거, 귀여운거, TMI... 오늘은 한 개라도 좋았지?~ '
						onChange={setFunFact}
						className='flex-1'
					/>
				</EditorStep>
				<EditorStep step={4} viewedStep={currentStep} title='오늘은 예정대로 됐나?'>
					<TextArea
						name='scheduleRespected'
						placeholder='할일 다 할 수 있었어? 예기치 않은 게 있었나?'
						onChange={setscheduleRespected}
						className='flex-1'
					/>
				</EditorStep>
				<EditorStep step={5} viewedStep={currentStep} title='내일의 예정은 뭐야?'>
					<TextArea
						name='nextDaySchedule'
						placeholder='누구를 만나? 할일 있어? 대학교 다니기 밖에말이지~'
						onChange={setnextDaySchedule}
						className='flex-1'
					/>
				</EditorStep>
			</form>
			{currentStep < 6 &&
				<div className='flex gap-4 justify-center'>
					<Button 
						disabled={currentStep === 1} 
						onClick={goPrevious}>
							돌아가기
					</Button>
					<Button 
						onClick={goNext}
					>
						{currentStep === 5 ? '보내기'  : '다음'}
					</Button>
				</div>
			}
			{ animationStep !== -1 &&
				<div className='absolute text-center top-1/2 translate-y-[-50%] w-full'>
					<div className='font-title text-4xl'>항목 올리는중...</div>
					<div className='relative text-center font-input text-lg mx-4'>
						<Image 
							src={`/images/${mood}.png`} 
							alt={mood} 
							width={128} 
							height={128} 
							className='absolute animate-pulse blur-sm top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
						/>
						<div className='relative h-20 flex items-center'>
							{[moodReason, funFact, scheduleRespected, nextDaySchedule].map((text, i) => 
								<div 
									ref={animationRefs[i]} 
									key={i}
									className={'text-2xl absolute w-full transiton-all duration-300'
									+ (animationStep < i  ? ' translate-y-[100%] scale-75 opacity-0' : '')
									+ (animationStep > i  ? ' translate-y-[-100%] scale-75 opacity-0' : '')
									+ (animationStep === i  ? ' translate-y0 scale-100 opacity-1' : '')
									}
								>
									{text}
								</div>
							)}
							<div 
								ref={animationRefs[4]} 
								className={'absolute font-title transition-all duration-300 delay-100'
									+ (animationStep >= 4 ? ' scale-100 opacity-1' : ' scale-75 opacity-0')
								}
							>
								올렸읍니다! 오늘 쓰셔서 축하합니다! 이제 잘 느긋해져보세요.
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

type EditorStepProps = {
	children: React.ReactNode;
	title: string;
	step: number;
	viewedStep: number;
}
const EditorStep = ({step, viewedStep, title, children}: EditorStepProps) => {
	return (
		<div className={'EditorStep flex h-full w-full text-center flex-col items-center py-4' + (viewedStep > step ? ' passed' : viewedStep < step ? ' next' : ' current')}>
			<div className='flex-shrink-0 font-title text-4xl size-14 rounded-full flex justify-center items-center text-white bg-gray-800'>{step}</div>
			<div className='font-title text-3xl my-4 text-amber-950'>{title}</div>
			{children}
		</div>
	);
};

type MoodSelectorProps = {
	// eslint-disable-next-line no-unused-vars
	onChange: (mood: keyof typeof $Enums.Mood) => void;
	name?: string;
}

const MoodSelector = ({onChange, name}: MoodSelectorProps) => {
	const moods = {
		VERY_SAD: '아주 슬퍼',
		SAD: '슬퍼',
		ANGRY: '화 나',
		NEUTRAL: '자제해',
		HAPPY: '행복해',
		VERY_HAPPY: '아주 행복해'
	};

	const [selected, setSelected] = useState<keyof typeof moods>('NEUTRAL');
	const select = (mood: keyof typeof moods) => {
		setSelected(mood);
		onChange(mood);
	};

	const refs: RefObject<HTMLDivElement>[] = Array(Object.keys(moods).length).fill(0).map(() => useRef<HTMLDivElement>(null));
	const container = useRef<HTMLDivElement>(null);

	let timeout: string | number | NodeJS.Timeout | undefined;
	const onScroll = () => {
		let closest: number, 
			closestDistance: number | null = null;
		for (let i = 0; i < refs.length; i++) {
			const ref = refs[i];
			const left = container.current!.getBoundingClientRect().left;
			const middle = container.current!.offsetWidth / 2 + left;
			const elementLeft = ref.current!.getBoundingClientRect().left;
			const elementWidth = ref.current!.offsetWidth;
			const distanceFromMiddle = Math.abs(middle - elementLeft - elementWidth / 2);
			if (!closestDistance || distanceFromMiddle < closestDistance) {
				closestDistance = distanceFromMiddle;
				closest = i;
			}
			const maxDistance = middle - left; // maximum distance to either border
			// Calculate scale factor: 
			// Scale is 1 at the middle and goes to 0 at the borders.
			const factor = Math.max(0.4, 1 - (distanceFromMiddle / maxDistance));
			ref.current!.style.transform = `scale(${factor})`;
			ref.current!.style.opacity = `${factor}`;
		}
		select(Object.keys(moods)[closest!] as keyof typeof moods);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			container.current!.scroll({
				left: closest * 128,
				behavior: 'smooth'
			});
		}, 100);
	};

	useEffect(() => { // Set default value to 'NEUTRAL'
		const position = 3 * 128;
		container.current!.scroll({left: position});
	}, []);

	return (
		<div>
			<input type='hidden' name={name} value={selected} />
			<div className='flex overflow-x-scroll' ref={container} onScroll={onScroll}>
				<div className='relative w-[128px] h-[128px] flex-shrink-0'></div>
				{
					Object.entries(moods).map(([key, val], i) => 
						<div 
							key={key} 
							className='flex flex-col items-center justify-center flex-shrink-0' ref={refs[i]} 

						>
							<Image src={`/images/${key.toLowerCase()}.png`} alt={val} width={128} height={128} className='drop-shadow-lg'/>
						</div>
					)
				}
				<div className='relative w-[128px] h-[128px] flex-shrink-0'></div>
			</div>
			<div className='text-center font-title text-3xl mt-4'>{moods[selected]}</div>
		</div>
	);
};