'use client';

import { useActionState, useEffect } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { saveComment } from '@/lib/actions/comment-actions';
import { SessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import SubmitButton from '@/components/submit-button';
import { toast } from 'sonner';
import { CommentEntity } from '@/lib/types/model-types';

interface Props {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: Number;
      },
      Error
    >
  >;
}

function AddComment({ postId, user, className, refetch }: Props) {
  const [state, formAction] = useActionState(saveComment, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.success('Comment submitted successfully!');
    } else if (state?.errors) {
      toast.error('Failed to submit comment');
    }

    if (state?.ok) refetch();
  }, [state]);

  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={formAction} className={cn(className)}>
          <input name="postId" defaultValue={postId} hidden />
          <Label htmlFor="comment" className="mb-1">
            Your Comment
          </Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              name="content"
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>

          <p className="mb-2 border rounded-b-md p-2">
            <span className="text-slate-400">Write as: </span>
            <span className="text-slate-500">{user.name}</span>
          </p>

          <SubmitButton>Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddComment;
