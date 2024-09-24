import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
	cookies().delete('session');
	return NextResponse.redirect( new URL('/login', request.nextUrl));
}