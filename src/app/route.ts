import { getUserId } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
	const userId = await getUserId();
	if (userId)
		return NextResponse.redirect(new URL('/entries/daily', request.nextUrl));
	return NextResponse.redirect(new URL('/login', request.nextUrl));
}