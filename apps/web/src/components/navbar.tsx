import Link from 'next/link';

import { getSession } from '@/lib/session';
import SignInPanel from './sign-in-panel';
import Profile from './profile';

type Props = {};

async function Navbar(props: Props) {
  const session = await getSession();

  return (
    <>
      <h1 className="text-2xl font-bold p-2">Ink Nest</h1>

      <div className="flex flex-col md:flex-row gap-2 md:ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>

        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <SignInPanel />
        )}
      </div>
    </>
  );
}

export default Navbar;
