import { NextRequest, NextResponse } from 'next/server';

import { getSession } from './lib/session';

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user)
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
}

export const config = {
  matcher: '/user/:path*',
};
