'use client';

import { use } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletePost } from '@/lib/actions/posts-actions';
import { Button } from '@/components/ui/button';

type Params = Promise<{ id: string }>;

function InterceptorDeletePostPage({ params }: { params: Params }) {
  const { id } = use(params);
  const postId = +id;

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href="/user/posts">Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => deletePost(postId)}
              className="bg-red-600 text-white"
            >
              <a href="/user/posts">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InterceptorDeletePostPage;
