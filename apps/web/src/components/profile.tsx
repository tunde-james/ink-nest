import Link from 'next/link';

import { SessionUser } from '@/lib/session';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid';

type Props = {
  user: SessionUser;
};

function Profile({ user }: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center gap-3">
          <UserIcon className="w-4" />
          <p className="">{user.name}</p>
        </div>

        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-400 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end">
          <a href="/api/auth/sign-out">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>

          <Link href="/user/create-post">
            <PencilSquareIcon className="w-4" />
            <span>Create New Post</span>
          </Link>

          <Link href="/user/create-post">
            <ListBulletIcon className="w-4" />
            <span>Posts</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Profile;
