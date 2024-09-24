import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/entries', '/profile'];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

	// 3. Decrypt the session from the cookie
	const cookie = cookies().get('session')?.value;
	let session;
	try {
		session = cookie ? await decrypt(cookie) : null;
	} catch (_) {
		return NextResponse.redirect(new URL('/logout', req.nextUrl));
	}

	const isLoggedIn = typeof session?.userId === 'number';

	if (path.startsWith('/login') && isLoggedIn) {
		return NextResponse.redirect(new URL('/entries/daily', req.nextUrl));
	}

	// 5. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/login', req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};