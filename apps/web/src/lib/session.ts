import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

const TOKEN_EXPIRATION = '24h';
const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 1day

export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + TOKEN_EXPIRATION_MS);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as Session;
  } catch (error) {
    console.error('Failed to verify session:', error);
    redirect('/auth/sign-in');
  }
}

export async function deleteSession() {
  await (await cookies()).delete('session');
}
