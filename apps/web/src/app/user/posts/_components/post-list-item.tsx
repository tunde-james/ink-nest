import Image from 'next/image';

import { Post } from '@/lib/types/model-types';
import { CheckIcon } from '@heroicons/react/20/solid';
import PostActions from './post-actions';

interface Props {
  post: Post;
}

function PostListItem({ post }: Props) {
  return (
    <div className="grid grid-cols-8 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] transition text-center bg-white">
      <div className="relative h-32 w-48">
        <Image
          src={post.thumbnail ?? '/images/no-image.png'}
          alt={post.title}
          fill
          className=""
        />
      </div>

      <div className="flex flex-col gap-2 col-span-2 px-2">
        <p className="text-lg line-clamp-1 text-slate-700">{post.title}</p>
        <p className="text-sm line-clamp-3 text-slate-500">{post.content}</p>
      </div>

      <p className="flex justify-center items-center">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-center items-center">
        {post.published ? <CheckIcon className="w-5" /> : null}
      </div>

      <div className="flex justify-center items-center">
        {post._count.likes}
      </div>

      <div className="flex justify-center items-center">
        {post._count.comments}
      </div>

      <PostActions postId={post.id} />
    </div>
  );
}

export default PostListItem;
