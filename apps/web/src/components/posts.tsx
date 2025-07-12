import { Post } from '@/lib/types/model-types';
import PostCard from './post-card';

interface Props {
  posts: Post[];
}

function Posts({ posts }: Props) {
  return (
    <section className="container mx-auto m-8 max-w-5xl">
      <h2 className="text-5xl font-bold text-center text-gray-600 leading-tight">
        Latest Posts
      </h2>

      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}

export default Posts;
