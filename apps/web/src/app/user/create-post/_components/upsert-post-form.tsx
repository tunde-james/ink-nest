'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PostFormState } from '@/lib/types/form-state';
import { toast } from 'sonner';

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
  isUpdate?: boolean;
};
const UpsertPostForm = ({ state, formAction, isUpdate }: Props) => {
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
      {isUpdate && (
        <input hidden name="postId" defaultValue={state?.data?.postId} />
      )}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter The Title of Your Post"
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
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">{state.errors.content}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ''}
            alt="post thumbnail"
            width={200}
            height={150}
          />
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
          id="published"
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === 'on' ? true : false}
        />
        <Label htmlFor="published">Published Now</Label>
      </div>
      {!!state?.errors?.isPublished && (
        <p className="text-red-500 animate-shake">{state.errors.isPublished}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
