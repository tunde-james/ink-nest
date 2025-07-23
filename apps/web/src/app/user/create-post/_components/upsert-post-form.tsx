'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/components/submit-button';
import { PostFormState } from '@/lib/types/form-state';
import { toast } from 'sonner';

interface Props {
  state: PostFormState;
  formAction: (payload: FormData) => void;
}

function UpsertPostForm({ state, formAction }: Props) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (state?.ok) {
      toast.success('Success');
    } else if (state?.errors) {
      toast.error('Oops! failed to save');
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter your post title"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-red-500 animate-shake">{state.errors.title}</p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here"
          rows={8}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">{state.errors.content}</p>
      )}

      <div>
        <Label htmlFor="thumbnail"></Label>
        <Input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) {
              setImageUrl(URL.createObjectURL(event.target.files[0]));
            }
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {!!imageUrl && (
          <Image src={imageUrl} alt="post thumbnail" height={150} width={200} />
        )}
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">{state.errors.tags}</p>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          name="published"
          className="mx-2 h-4 w-4"
          defaultValue={state?.data?.published}
        />
        <Label htmlFor="published">Publish Now</Label>
      </div>
      {!!state?.errors?.isPublished && (
        <p className="text-red-500 animate-shake">{state.errors.isPublished}</p>
      )}

      <SubmitButton className="bg-blue-700">Save</SubmitButton>
    </form>
  );
}

export default UpsertPostForm;
