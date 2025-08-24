import { getUserId } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
	const userId = await getUserId();
	if (userId)
		return NextResponse.redirect(new URL('/entries/daily', process.env.BASE_URL));
	return NextResponse.redirect(new URL('/login', process.env.BASE_URL));
}
