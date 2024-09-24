import 'server-only';
import { cookies } from 'next/headers';
import { EncryptJWT, jwtDecrypt } from 'jose';
// Encrypt function
export async function encrypt(data: Record<string, unknown>): Promise<string> {
	const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

	// Encrypt the payload as a JWT
	const jwe = await new EncryptJWT(data)
		.setProtectedHeader({ alg: 'dir', enc: 'A256CBC-HS512' })
		.setIssuedAt()
		.setExpirationTime('30d')
		.encrypt(secretKey);

	return jwe;
}

// Decrypt function
export async function decrypt(ciphertext: string): Promise<Record<string, unknown>> {
	const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

	// Decrypt the token
	const { payload } = await jwtDecrypt(ciphertext, secretKey);

	return payload as Record<string, unknown>; // Return the decrypted payload
}


export async function createSession(userId: number) {
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });

	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
}

export async function updateSession() {
	const session = cookies().get('session')?.value;
	const payload = session ? decrypt(session) : null;

	if (!session || !payload)
		return null;

	const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	});
};

export async function getUserId(): Promise<number | null> {
	const session = cookies().get('session')?.value;
	if (!session)
		return null;
	return decrypt(session).then(({ userId }) => userId as number);
}

export function deleteSession() {
	cookies().delete('session');
}