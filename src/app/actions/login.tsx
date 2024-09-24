'use server';
import db from '@/lib/db';
import { createSession } from '@/lib/session';
import {compare} from 'bcrypt';
import { redirect } from 'next/navigation';

export async function login(_state: {error: string} = {error: ''}, formData: FormData) {
	const username = formData.get('username');
	const password = formData.get('password');

	if (!username || !password) {
		return {
			error: '사용자 이름 또는 비밀번호 누락'
		};
	};

	const user = await db.user.findUnique({
		where: {
			username: username.toString()
		},
		select: {
			id: true,
			username: true,
			password: true
		}
	});

	if (!user)
		return {error: '해당 사용자가 없습니다.'};

	const match = await compare(password.toString(), user.password);

	if (!match)
		return {error: '비밀번호는 틀립니다.'};

	await createSession(user.id);
	redirect('/entries/daily');

}
