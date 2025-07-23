import { fetchPostById } from '@/lib/actions/posts-actions';
import UpdatePostContainer from './_components/update-post-container';

interface Props {
  params: { id: string };
}

async function UpdatePostPage({ params }: Props) {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Your Post
      </h2>

      <UpdatePostContainer post={post} />
    </div>
  );
}

export default UpdatePostPage;
