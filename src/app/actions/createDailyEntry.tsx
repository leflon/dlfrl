'use server';

import db from '@/lib/db';
import { getUserId } from '@/lib/session';
import { $Enums } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function createDailyEntry(formData: FormData) {
	const userId = (await getUserId())!;
	await db.dailyEntry.create({
		data: {
			datetime: new Date(),
			mood: formData.get('mood') as keyof typeof $Enums.Mood,
			moodReason: formData.get('moodReason')!.toString(),
			funFact: formData.get('funFact')!.toString(),
			scheduleRespected: formData.get('scheduleRespected')!.toString(),
			nextDaySchedule: formData.get('nextDaySchedule')!.toString(),
			userId
		}
	});
	redirect('/entries/daily');
}