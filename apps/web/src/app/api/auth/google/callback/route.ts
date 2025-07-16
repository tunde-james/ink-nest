import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

import { createSession } from '@/lib/session';

export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get('accessToken');
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');
  const avatar = searchParams.get('avatar');

  if (!accessToken || !userId || !name) throw new Error('Google Oauth Failed!');

  const res = await fetch(`${process.env.BACKEND_URL}/auth/verify-token`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) throw new Error('Access token verification failed');

  await createSession({
    user: {
      id: userId,
      name,
      avatar: avatar ?? undefined,
    },
    accessToken,
  });

  redirect('/');
}
