'use client';

import UpsertPostForm from '@/app/user/create-post/_components/upsert-post-form';
import { updatePost } from '@/lib/actions/posts-actions';
import { Post } from '@/lib/types/model-types';
import { useActionState } from 'react';

interface Props {
  post: Post;
}

function UpdatePostContainer({ post }: Props) {
  console.log(post);

  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? 'on' : undefined,
      tags: post.tags?.map((tag) => tag.name).join(','),
      previousThumbnailUrl: post.thumbnail ?? undefined,
    },
  });

  return <UpsertPostForm state={state} formAction={action} isUpdate={true} />;
}

export default UpdatePostContainer;
