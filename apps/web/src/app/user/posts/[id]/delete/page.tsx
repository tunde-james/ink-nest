import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { deletePost, fetchPostById } from '@/lib/actions/posts-actions';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import SubmitButton from '@/components/submit-button';
import { redirect } from 'next/navigation';

type Params = Promise<{ id: string }>;

async function DeletePostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await fetchPostById(+id);

  const formAction = async (formData: FormData) => {
    'use server';
    await deletePost(+id);

    redirect('/user/posts');
  };

  return (
    <Card className="w-96 m-12 p-6">
      <CardHeader className="flex justify-between items-center">
        <p className="text-red-500">Delete Post</p>
        <ExclamationCircleIcon className="w-8 text-red-500" />
      </CardHeader>
      <CardDescription>
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from our servers.
        </p>
        <hr className="m-3" />
        <p className="text-slate-400 font-bold">Title of the post</p>
        <p>{post.title}</p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant="secondary" asChild>
            <Link href="/user/posts">Cancel</Link>
          </Button>

          <SubmitButton className="bg-red-600 text-white">Delete</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}

export default DeletePostPage;
