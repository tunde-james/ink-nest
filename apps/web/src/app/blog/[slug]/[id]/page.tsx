import Image from 'next/image';
import DOMPurify from 'dompurify';

import { fetchPostById } from '@/lib/actions/posts-actions';
import SanitizedContent from './_components/sanitized-content';

interface Props {
  params: { id: string };
}

async function PostPage({ params }: Props) {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mt-16 font-bold mb-4 text-slate-700">
        {post.title}
      </h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="relative h-60 w-80">
        <Image
          src={post.thumbnail ?? '/images/no-image.png'}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <SanitizedContent content={post.content || ''} />

      {/* TODO: Pust Post Comments Here  */}
    </main>
  );
}

export default PostPage;
